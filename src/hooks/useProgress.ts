import { useState, useEffect } from 'react';
import { getProgress, markLessonComplete as saveComplete } from '../utils/localStorage';
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

  const loadProgress = () => {
    if (!userId) return;

    try {
      const data = getProgress(userId);
      const progressMap = new Map<string, UserProgress>();

      data.forEach(item => {
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
      saveComplete(userId, lessonId, codeSubmission);
      loadProgress();
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
