import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { LessonProgress } from '../types';
import { supabase } from '../lib/supabase';
import {
  getLessonProgress,
  updateLessonProgress,
  markLessonComplete,
  checkPrerequisites,
  updateComponentProgress,
  calculateLessonScore,
} from '../lib/lessons';

export function useLessonProgress(lessonId: string) {
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, completeLesson } = useStore();

  useEffect(() => {
    async function fetchProgress() {
      try {
        const data = await getLessonProgress(lessonId);
        setProgress(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchProgress();
    }
  }, [lessonId, user]);

  const updateProgress = async (updates: Partial<LessonProgress>) => {
    try {
      await updateLessonProgress(lessonId, updates);
      setProgress(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const completeQuiz = async (quizScore: number) => {
    try {
      const score = await calculateLessonScore(
        quizScore,
        Object.keys(progress?.components_completed || {})
      );

      // First update the database via RPC
      const { error } = await supabase.rpc('process_unit_completion', {
        p_user_id: user?.id,
        p_unit_id: lessonId
      });

      if (error) throw error;

      // Then update local state
      await markLessonComplete(lessonId, score);
      completeLesson(lessonId);

      setProgress(prev => prev ? {
        ...prev,
        completed: true,
        score,
        completed_at: new Date().toISOString(),
      } : null);

      return score;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const validatePrerequisites = async (prerequisites: string[]) => {
    try {
      return await checkPrerequisites(lessonId, prerequisites);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const markComponentComplete = async (componentId: string) => {
    try {
      await updateComponentProgress(lessonId, componentId, true);
      setProgress(prev => {
        if (!prev) return null;
        return {
          ...prev,
          components_completed: {
            ...prev.components_completed,
            [componentId]: true,
          },
        };
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    progress,
    isLoading,
    error,
    updateProgress,
    completeQuiz,
    validatePrerequisites,
    markComponentComplete,
  };
}