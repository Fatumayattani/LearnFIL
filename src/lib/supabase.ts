import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Module = {
  id: string;
  title: string;
  description: string;
  order_index: number;
  icon: string;
  estimated_minutes: number;
  created_at: string;
};

export type Lesson = {
  id: string;
  module_id: string;
  title: string;
  content: string;
  order_index: number;
  starter_code: string;
  solution_code: string;
  validation_tests: ValidationTest[];
  created_at: string;
};

export type ValidationTest = {
  description: string;
  test: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  code_submission: string;
  completed_at: string | null;
  created_at: string;
};
