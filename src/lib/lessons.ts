import { mockLessons } from '../data/mockLessons';
import { supabase, restUpsertProgress, verifyTableStructure } from './supabase';
import { LessonProgress, QuizResult } from '../types';
import { toast } from 'react-hot-toast';

export async function getLessonProgress(lessonId: string): Promise<LessonProgress | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('lesson_id', lessonId)
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserLessonProgress(): Promise<LessonProgress[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .order('completed_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateLessonProgress(
  lessonId: string,
  progress: Partial<LessonProgress>
): Promise<void> {
  const { error } = await supabase
    .from('lesson_progress')
    .upsert({
      lesson_id: lessonId,
      ...progress,
      updated_at: new Date().toISOString(),
    });

  if (error) throw error;
}

export async function markLessonComplete(
  lessonId: string,
  score?: number
): Promise<void> {
  const lesson = mockLessons.find(lesson => lesson.id === lessonId);
  if (!lesson) {
    throw new Error(`Lesson ${lessonId} not found`);
  }

  try {
    const { data: existing } = await supabase
      .from('lesson_progress')
      .select('score')
      .eq('lesson_id', lessonId)
      .single();

    const finalScore = score ?? (existing?.score ?? lesson.points);

    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        lesson_id: lessonId,
        completed: true,
        score: finalScore,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;

    toast.success(`Lesson completed! ${finalScore} points earned`);
  } catch (error) {
    console.error('Error marking lesson complete:', error);
    toast.error('Failed to update lesson progress');
    throw error;
  }
}

export async function checkPrerequisites(
  lessonId: string,
  prerequisites: string[]
): Promise<boolean> {
  if (!prerequisites.length) return true;

  try {
    const { data, error } = await supabase
      .rpc('check_lesson_prerequisites', {
        p_lesson_id: lessonId,
        p_prerequisites: prerequisites,
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking prerequisites:', error);
    return false;
  }
}

export async function updateComponentProgress(
  lessonId: string,
  componentId: string,
  completed: boolean
): Promise<void> {
  try {
    const { data: existing, error: fetchError } = await supabase
      .from('lesson_progress')
      .select('components_completed')
      .eq('lesson_id', lessonId)
      .single();

    if (fetchError) throw fetchError;

    const componentsCompleted = existing?.components_completed || {};
    componentsCompleted[componentId] = completed;

    const { error: updateError } = await supabase
      .from('lesson_progress')
      .upsert({
        lesson_id: lessonId,
        components_completed: componentsCompleted,
        updated_at: new Date().toISOString(),
      });

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error updating component progress:', error);
    toast.error('Failed to update progress');
    throw error;
  }
}

export async function submitQuizResult(result: QuizResult): Promise<number> {
  const MAX_RETRIES = 3;
  let retryCount = 0;
  
  while (retryCount < MAX_RETRIES) {
    try {
      console.log('Submitting quiz result (attempt ${retryCount + 1}):', result);
      
      // Validate Supabase client and connection
      if (!supabase) throw new Error('Supabase client not initialized');
      
      // Test connection and RLS permissions
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        console.error('Supabase connection/auth error:', { authError, session });
        throw new Error('Failed to connect to Supabase or no active session');
      }
      
      // Test RLS permissions by attempting a simple select
      try {
        const { error: rlsError } = await supabase
          .from('lesson_progress')
          .select('*')
          .limit(1);
          
        if (rlsError) {
          console.error('RLS policy test failed:', rlsError);
          throw new Error('Row Level Security policy prevents access');
        }
      } catch (rlsTestError) {
        console.error('RLS policy verification failed:', rlsTestError);
        throw rlsTestError;
      }

      // Verify table structure
      await verifyTableStructure();

      // Validate lesson exists
      const lesson = mockLessons.find(l => l.id === result.lessonId);
      if (!lesson) throw new Error(`Lesson ${result.lessonId} not found`);

      // Validate quiz result
      if (result.totalQuestions <= 0 || result.correctAnswers < 0) {
        throw new Error(`Invalid quiz result: ${result.correctAnswers}/${result.totalQuestions}`);
      }

      // Calculate scores
      const quizPercentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
      const score = Math.min(
        lesson.points,
        Math.round((result.correctAnswers / result.totalQuestions) * lesson.points)
      );

      // Get authenticated user
      const { data: { user }, error: authErrorResponse } = await supabase.auth.getUser();
      if (authErrorResponse || !user) throw new Error('User not authenticated');

      // Get existing progress
      const { data: existing, error: fetchError } = await supabase
        .from('lesson_progress')
        .select('components_completed, score')
        .eq('lesson_id', result.lessonId)
        .eq('user_id', user.id)
        .single();

      if (fetchError && !fetchError.message.includes('No rows found')) {
        throw fetchError;
      }

      // Prepare update data
      const updateData = {
        lesson_id: result.lessonId,
        user_id: user.id,
        completed: true,
        score,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        components_completed: {
          ...(existing?.components_completed || {}),
          quiz_completed: true,
          quiz_score: quizPercentage,
          quiz_completed_at: new Date().toISOString(),
        }
      };

      // Try client method first with detailed debugging
      try {
        console.log('[DEBUG] Attempting to save via Supabase client with data:', JSON.stringify(updateData, null, 2));
        
        const { data, error: upsertError, status, statusText } = await supabase
          .from('lesson_progress')
          .upsert(updateData)
          .select();

        console.log('[DEBUG] Supabase client response:', {
          status,
          statusText,
          data,
          error: upsertError
        });

        if (upsertError) {
          console.error('[DEBUG] Supabase client error details:', {
            message: upsertError.message,
            code: upsertError.code,
            details: upsertError.details,
            hint: upsertError.hint
          });
          throw upsertError;
        }
        
        console.log('Quiz result successfully saved via client:', data);
      } catch (clientError) {
        console.warn('Client method failed, trying REST fallback:', clientError);
        try {
          const restData = await restUpsertProgress(updateData);
          console.log('Quiz result successfully saved via REST:', restData);
        } catch (restError) {
          console.error('REST fallback also failed:', restError);
          const errorMessage = restError instanceof Error ? restError.message : 'Unknown error during REST fallback';
          throw new Error(`Both client and REST methods failed: ${errorMessage}`);
        }
      }
      toast.success(`Quiz completed! ${quizPercentage}% (${score}/${lesson.points} points)`);
      return score;

    } catch (error) {
      retryCount++;
      console.error(`Attempt ${retryCount} failed:`, error);
      
      if (retryCount >= MAX_RETRIES) {
        toast.error('Failed to submit quiz results after multiple attempts');
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
    }
  }
  throw new Error('Unexpected error in submitQuizResult');
}

export async function calculateLessonScore(
  quizScore: number,
  completedComponents: string[]
): Promise<number> {
  const componentWeight = 0.3; // 30% for completing all components
  const quizWeight = 0.7; // 70% for quiz performance
  
  const componentScore = (completedComponents.length / 3) * 100; // Assuming 3 components per lesson
  const totalScore = Math.round(
    (componentScore * componentWeight) + (quizScore * quizWeight)
  );
  
  return totalScore;
}
