import { mockLessons } from '../data/mockLessons';
import { supabase } from './supabase';
import { LessonProgress, QuizResult } from '../types';
import { toast } from 'react-hot-toast';

export async function getLessonProgress(lessonId: string): Promise<LessonProgress | null> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('lesson_id', lessonId)
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
  lessonId: string
): Promise<void> {
  const lesson = mockLessons.find(lesson => lesson.id === lessonId);
  if (!lesson) {
    throw new Error(`Lesson ${lessonId} not found`);
  }

  try {
    // Get current progress if it exists
    const { data: existing } = await supabase
      .from('lesson_progress')
      .select('score')
      .eq('lesson_id', lessonId)
      .single();

    // Only update score if it doesn't exist
    const score = existing ? existing.score : lesson.points;

    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        lesson_id: lessonId,
        completed: true,
        score,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;

    toast.success(`Lesson completed! ${score} points earned`);
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

export async function submitQuizResult(result: QuizResult): Promise<void> {
  try {
    const lesson = mockLessons.find(l => l.id === result.lessonId);
    if (!lesson) {
      throw new Error(`Lesson ${result.lessonId} not found`);
    }

    // Calculate quiz percentage
    const quizPercentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
    
    // Calculate final score as percentage of lesson points
    const score = Math.round((quizPercentage / 100) * lesson.points);

    // Update lesson progress with quiz results
    const { error: progressError } = await supabase
      .from('lesson_progress')
      .upsert({
        lesson_id: result.lessonId,
        completed: true,
        score,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        components_completed: {
          quiz_completed: true,
          quiz_score: quizPercentage,
          quiz_completed_at: new Date().toISOString(),
        },
      });

    if (progressError) throw progressError;

    // Show success message with both percentage and points
    toast.success(`Quiz completed! ${quizPercentage}% (${score}/${lesson.points} points)`);
  } catch (error) {
    console.error('Error submitting quiz result:', error);
    toast.error('Failed to submit quiz results');
    throw error;
  }
}

export async function calculateLessonScore(
  quizScore: number,
  completedComponents: string[]
): Promise<number> {
  // Calculate weighted score based on quiz performance and completed components
  const componentWeight = 0.3; // 30% for completing all components
  const quizWeight = 0.7; // 70% for quiz performance
  
  const componentScore = (completedComponents.length / 3) * 100; // Assuming 3 components per lesson
  const totalScore = Math.round(
    (componentScore * componentWeight) + (quizScore * quizWeight)
  );
  
  return totalScore;
}