import { supabase } from './supabase';
import { LessonProgress } from '../types';

export async function getLessonProgress(lessonId: string): Promise<LessonProgress | null> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('lesson_id', lessonId)
    .single();

  if (error) throw error;
  return data;
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
  score: number
): Promise<void> {
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
}

export async function checkPrerequisites(
  lessonId: string,
  prerequisites: string[]
): Promise<boolean> {
  if (!prerequisites.length) return true;

  const { data, error } = await supabase
    .rpc('check_lesson_prerequisites', {
      p_lesson_id: lessonId,
      p_prerequisites: prerequisites,
    });

  if (error) throw error;
  return data;
}

export async function updateComponentProgress(
  lessonId: string,
  componentId: string,
  completed: boolean
): Promise<void> {
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
}

export async function calculateLessonScore(
  quizScore: number,
  completedComponents: string[]
): Promise<number> {
  // Simple score calculation based on quiz performance
  return Math.round(quizScore * 100);
}