import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { LessonProgress, QuizResult } from '../types';
import {
  getLessonProgress,
  updateLessonProgress,
  checkPrerequisites,
  updateComponentProgress,
  submitQuizResult,
} from '../lib/lessons.ts';
import { toast } from 'react-hot-toast';

export function useLessonProgress(lessonId: string) {
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, completeLesson } = useStore();

  useEffect(() => {
    async function fetchProgress() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const data = await getLessonProgress(lessonId);
        setProgress(data);
      } catch (err) {
        console.error('Error fetching lesson progress:', err);
        setError(err as Error);
        toast.error('Failed to load lesson progress');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, [lessonId, user]);

  const updateProgress = async (updates: Partial<LessonProgress>) => {
    try {
      await updateLessonProgress(lessonId, updates);
      setProgress(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      console.error('Error updating progress:', err);
      setError(err as Error);
      toast.error('Failed to update progress');
      throw err;
    }
  };

  const completeQuiz = async (result: QuizResult) => {
    try {
      if (!result || !result.lessonId) {
        throw new Error('Invalid quiz result data');
      }
      console.log('Submitting quiz result:', result);
      // Submit quiz results and wait for Supabase confirmation
      const score: number = await submitQuizResult(result);
      console.log('Quiz result submitted with score:', score);
      
      // Refresh progress from Supabase to ensure consistency
      const updatedProgress = await getLessonProgress(lessonId);
      console.log('Refreshed progress from Supabase:', updatedProgress);

      // Update both global and local state with confirmed data
      completeLesson(lessonId);
      setProgress(updatedProgress);

      return score;
    } catch (err) {
      console.error('Error completing quiz:', err);
      setError(err as Error);
      toast.error('Failed to complete quiz');
      throw err;
    }
  };

  const validatePrerequisites = async (prerequisites: string[]) => {
    try {
      return await checkPrerequisites(lessonId, prerequisites);
    } catch (err) {
      console.error('Error checking prerequisites:', err);
      setError(err as Error);
      toast.error('Failed to validate prerequisites');
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
      toast.success('Progress saved');
    } catch (err) {
      console.error('Error marking component complete:', err);
      setError(err as Error);
      toast.error('Failed to save progress');
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