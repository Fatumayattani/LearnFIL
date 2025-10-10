import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { UserProgress } from '../lib/supabase';

export function useProgress(userId: string | null) {
  const [progress, setProgress] = useState<Map<string, UserProgress>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProgress(new Map());
      setLoading(false);
      return;
    }

    loadProgress();
  }, [userId]);

  const loadProgress = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      const progressMap = new Map<string, UserProgress>();
      data?.forEach(item => {
        progressMap.set(item.lesson_id, item);
      });

      setProgress(progressMap);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string, codeSubmission: string = '') => {
    if (!userId) return;

    try {
      const existingProgress = progress.get(lessonId);

      if (existingProgress) {
        const { error } = await supabase
          .from('user_progress')
          .update({
            completed: true,
            code_submission: codeSubmission,
            completed_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            lesson_id: lessonId,
            completed: true,
            code_submission: codeSubmission,
            completed_at: new Date().toISOString()
          });

        if (error) throw error;
      }

      await loadProgress();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const isLessonComplete = (lessonId: string): boolean => {
    return progress.get(lessonId)?.completed ?? false;
  };

  const getCompletedLessonIds = (): Set<string> => {
    const completedIds = new Set<string>();
    progress.forEach((item, lessonId) => {
      if (item.completed) {
        completedIds.add(lessonId);
      }
    });
    return completedIds;
  };

  return {
    progress,
    loading,
    markLessonComplete,
    isLessonComplete,
    getCompletedLessonIds
  };
}
