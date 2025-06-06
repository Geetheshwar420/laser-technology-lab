/*
  # Lesson Completion System

  1. New Tables
    - `lesson_progress`: Tracks individual lesson completion status
    - Stores component-level progress
    - Records completion timestamps
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure data isolation between users
*/

-- Drop existing objects if they exist
DO $$ BEGIN
  -- Drop policies if they exist
  DROP POLICY IF EXISTS "Users can read own lesson progress" ON lesson_progress;
  DROP POLICY IF EXISTS "Users can insert own lesson progress" ON lesson_progress;
  DROP POLICY IF EXISTS "Users can update own lesson progress" ON lesson_progress;
  
  -- Drop function if exists
  DROP FUNCTION IF EXISTS check_lesson_prerequisites;
  
  -- Drop table if exists
  DROP TABLE IF EXISTS lesson_progress;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
  WHEN undefined_object THEN
    NULL;
END $$;

-- Lesson Progress Table
CREATE TABLE lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  completed boolean DEFAULT false,
  score integer DEFAULT 0,
  components_completed jsonb DEFAULT '{}',
  last_accessed timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create index for faster lookups
CREATE INDEX idx_lesson_progress_user_lesson 
ON lesson_progress(user_id, lesson_id);

-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Policies for lesson_progress
CREATE POLICY "Users can read own lesson progress"
  ON lesson_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress"
  ON lesson_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON lesson_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to check lesson prerequisites
CREATE OR REPLACE FUNCTION check_lesson_prerequisites(
  p_lesson_id text,
  p_prerequisites text[]
)
RETURNS boolean AS $$
DECLARE
  completed_count integer;
BEGIN
  -- Count completed prerequisites
  SELECT COUNT(*)
  INTO completed_count
  FROM lesson_progress
  WHERE user_id = auth.uid()
    AND lesson_id = ANY(p_prerequisites)
    AND completed = true;

  -- Return true if all prerequisites are completed
  RETURN completed_count = array_length(p_prerequisites, 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;