import type { User } from '../contexts/AuthContext';
import type { Module, Lesson, UserProgress } from '../lib/supabase';

const USERS_KEY = 'learnfil_users';
const SESSION_KEY = 'learnfil_session';
const MODULES_KEY = 'learnfil_modules';
const LESSONS_KEY = 'learnfil_lessons';
const PROGRESS_KEY = 'learnfil_progress';

export interface Session {
  userId: string;
}

export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
}

export function saveUser(user: User): void {
  try {
    const users = getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);

    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
}

export function getCurrentSession(): Session | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading session from localStorage:', error);
    return null;
  }
}

export function saveSession(userId: string): void {
  try {
    const session: Session = { userId };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error saving session to localStorage:', error);
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session from localStorage:', error);
  }
}

export function getModules(): Module[] {
  try {
    const data = localStorage.getItem(MODULES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading modules from localStorage:', error);
    return [];
  }
}

export function saveModules(modules: Module[]): void {
  try {
    localStorage.setItem(MODULES_KEY, JSON.stringify(modules));
  } catch (error) {
    console.error('Error saving modules to localStorage:', error);
  }
}

export function getLessons(): Lesson[] {
  try {
    const data = localStorage.getItem(LESSONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading lessons from localStorage:', error);
    return [];
  }
}

export function saveLessons(lessons: Lesson[]): void {
  try {
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
  } catch (error) {
    console.error('Error saving lessons to localStorage:', error);
  }
}

export function getProgress(userId: string): UserProgress[] {
  try {
    const data = localStorage.getItem(`${PROGRESS_KEY}_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
    return [];
  }
}

export function saveProgress(userId: string, progress: UserProgress[]): void {
  try {
    localStorage.setItem(`${PROGRESS_KEY}_${userId}`, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
}

export function markLessonComplete(userId: string, lessonId: string, codeSubmission: string = ''): void {
  try {
    const progress = getProgress(userId);
    const existingIndex = progress.findIndex(p => p.lesson_id === lessonId);

    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      progress[existingIndex] = {
        ...progress[existingIndex],
        completed: true,
        code_submission: codeSubmission,
        completed_at: now
      };
    } else {
      const newProgress: UserProgress = {
        id: `${userId}-${lessonId}-${Date.now()}`,
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        code_submission: codeSubmission,
        completed_at: now,
        created_at: now
      };
      progress.push(newProgress);
    }

    saveProgress(userId, progress);
  } catch (error) {
    console.error('Error marking lesson complete:', error);
  }
}
