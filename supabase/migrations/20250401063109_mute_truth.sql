/*
  # Lesson Management Schema

  1. New Tables
    - `lesson_progress`
      - Tracks individual lesson completion status and scores
      - Links users to lessons with completion data
      - Stores component-level progress
    
    - `user_scores`
      - Stores cumulative user scores and rankings
      - Tracks achievement progress
      - Maintains leaderboard position
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure data isolation between users

  3. Changes
    - Add foreign key constraints
    - Create indexes for performance
    - Add triggers for score updates
*/

-- Lesson Progress Table
CREATE TABLE IF NOT EXISTS lesson_progress (
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
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_lesson 
ON lesson_progress(user_id, lesson_id);

-- User Scores Table
CREATE TABLE IF NOT EXISTS user_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_score integer DEFAULT 0,
  lessons_completed integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_lesson_completed timestamptz,
  achievements jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_scores_total_score 
ON user_scores(total_score DESC);

-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;

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

-- Policies for user_scores
CREATE POLICY "Users can read all scores for leaderboard"
  ON user_scores
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own scores"
  ON user_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scores"
  ON user_scores
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to update user scores
CREATE OR REPLACE FUNCTION update_user_scores()
RETURNS TRIGGER AS $$
BEGIN
  -- Update user_scores when a lesson is completed
  IF NEW.completed = true AND (OLD.completed = false OR OLD.completed IS NULL) THEN
    INSERT INTO user_scores (user_id, total_score, lessons_completed, last_lesson_completed)
    VALUES (
      NEW.user_id,
      NEW.score,
      1,
      NEW.completed_at
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
      total_score = user_scores.total_score + NEW.score,
      lessons_completed = user_scores.lessons_completed + 1,
      last_lesson_completed = NEW.completed_at,
      current_streak = CASE
        WHEN user_scores.last_lesson_completed >= CURRENT_DATE - INTERVAL '1 day'
        THEN user_scores.current_streak + 1
        ELSE 1
      END,
      longest_streak = CASE
        WHEN user_scores.last_lesson_completed >= CURRENT_DATE - INTERVAL '1 day'
        AND user_scores.current_streak + 1 > user_scores.longest_streak
        THEN user_scores.current_streak + 1
        ELSE user_scores.longest_streak
      END,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating scores
CREATE TRIGGER update_user_scores_trigger
AFTER INSERT OR UPDATE ON lesson_progress
FOR EACH ROW
EXECUTE FUNCTION update_user_scores();

-- Function to check lesson prerequisites
CREATE OR REPLACE FUNCTION check_lesson_prerequisites(
  p_user_id uuid,
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
  WHERE user_id = p_user_id
    AND lesson_id = ANY(p_prerequisites)
    AND completed = true;

  -- Return true if all prerequisites are completed
  RETURN completed_count = array_length(p_prerequisites, 1);
END;
$$ LANGUAGE plpgsql;