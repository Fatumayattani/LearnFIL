/*
  # LearnFIL Learning Platform Schema

  ## Overview
  Creates the database structure for LearnFIL, an interactive learning platform
  for Filecoin developers with lessons, modules, and progress tracking.

  ## New Tables

  ### 1. `modules`
  Core curriculum organization - each module covers a major Filecoin topic
  - `id` (uuid, primary key) - Unique module identifier
  - `title` (text) - Module name (e.g., "Understanding CIDs")
  - `description` (text) - Brief overview of what students will learn
  - `order_index` (integer) - Display order in curriculum
  - `icon` (text) - Lucide icon name for UI
  - `estimated_minutes` (integer) - Time to complete
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. `lessons`
  Individual learning units within modules
  - `id` (uuid, primary key) - Unique lesson identifier
  - `module_id` (uuid, foreign key) - Parent module
  - `title` (text) - Lesson name
  - `content` (text) - Markdown lesson content
  - `order_index` (integer) - Order within module
  - `starter_code` (text) - Initial code for sandbox
  - `solution_code` (text) - Reference solution
  - `validation_tests` (jsonb) - Test cases to verify completion
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `user_progress`
  Tracks student progress through curriculum
  - `id` (uuid, primary key) - Unique progress record
  - `user_id` (uuid) - Student identifier
  - `lesson_id` (uuid, foreign key) - Completed lesson
  - `completed` (boolean) - Completion status
  - `code_submission` (text) - Student's final code
  - `completed_at` (timestamptz) - When lesson was finished
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enables Row Level Security on all tables
  - Public read access for modules and lessons (educational content)
  - Authenticated users can track their own progress
  - Users can only view and modify their own progress records

  ## Important Notes
  1. Uses UUID for all primary keys for scalability
  2. JSONB for validation tests allows flexible test structures
  3. Order indexes enable curriculum sequencing
  4. Timestamp tracking for analytics and gamification
*/

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL,
  icon text DEFAULT 'BookOpen',
  estimated_minutes integer DEFAULT 30,
  created_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  order_index integer NOT NULL,
  starter_code text DEFAULT '',
  solution_code text DEFAULT '',
  validation_tests jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  code_submission text DEFAULT '',
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);

-- Enable Row Level Security
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Modules policies (public read)
CREATE POLICY "Anyone can view modules"
  ON modules FOR SELECT
  USING (true);

-- Lessons policies (public read)
CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  USING (true);

-- User progress policies (private read/write)
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON user_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);