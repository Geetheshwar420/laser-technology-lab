/*
  # Point Management System

  1. New Tables
    - `points_history`: Tracks point transactions
    - `achievement_definitions`: Defines achievements
    - `user_achievements`: Tracks user achievement progress
    - `leaderboard_cache`: Caches leaderboard data
    
  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
    
  3. Functions
    - Point processing
    - Achievement handling
    - Leaderboard updates
*/

-- Points History Table
CREATE TABLE IF NOT EXISTS points_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id text NOT NULL,
  points_earned integer NOT NULL,
  bonus_points integer DEFAULT 0,
  multiplier decimal(3,2) DEFAULT 1.00,
  source_type text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  transaction_id uuid DEFAULT gen_random_uuid(),
  CONSTRAINT positive_points CHECK (points_earned >= 0)
);

-- Achievement Definitions Table
CREATE TABLE IF NOT EXISTS achievement_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  criteria jsonb NOT NULL,
  points_reward integer DEFAULT 0,
  badge_url text,
  category text,
  difficulty text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievement_definitions(id) ON DELETE CASCADE,
  progress jsonb DEFAULT '{}',
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Leaderboard Cache Table
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  score integer DEFAULT 0,
  rank integer,
  previous_rank integer,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_points_history_user_id ON points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_points_history_created_at ON points_history(created_at);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_cache_score ON leaderboard_cache(category, score DESC);

-- Enable RLS
ALTER TABLE points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own points history"
  ON points_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read achievement definitions"
  ON achievement_definitions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read leaderboard"
  ON leaderboard_cache
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to process achievements
CREATE OR REPLACE FUNCTION process_achievements(
  p_user_id uuid,
  p_unit_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_achievements jsonb := '[]';
  v_achievement RECORD;
BEGIN
  FOR v_achievement IN
    SELECT * FROM achievement_definitions 
    WHERE criteria->>'type' = 'unit_completion'
  LOOP
    -- Process achievement logic
    INSERT INTO user_achievements (
      user_id,
      achievement_id,
      progress,
      completed,
      completed_at
    )
    VALUES (
      p_user_id,
      v_achievement.id,
      jsonb_build_object('progress', 1),
      true,
      now()
    )
    ON CONFLICT (user_id, achievement_id)
    DO UPDATE SET
      progress = user_achievements.progress || 
                jsonb_build_object('progress', 
                  (user_achievements.progress->>'progress')::int + 1),
      completed = true,
      completed_at = CASE 
        WHEN user_achievements.completed THEN user_achievements.completed_at 
        ELSE now() 
      END
    WHERE NOT user_achievements.completed;
  END LOOP;

  -- Collect achievement data
  SELECT jsonb_agg(
    jsonb_build_object(
      'name', name,
      'description', description,
      'bonusAwarded', points_reward
    )
  ) INTO v_achievements
  FROM achievement_definitions
  WHERE id IN (
    SELECT achievement_id 
    FROM user_achievements 
    WHERE user_id = p_user_id 
    AND completed_at >= now() - interval '5 minutes'
  );

  RETURN COALESCE(v_achievements, '[]');
END;
$$;

-- Point Management Function
CREATE OR REPLACE FUNCTION process_unit_completion(
  p_user_id uuid,
  p_unit_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_base_points integer;
  v_bonus_points integer := 0;
  v_multiplier decimal(3,2) := 1.00;
  v_total_points integer;
  v_current_rank integer;
  v_previous_rank integer;
  v_response jsonb;
  v_achievements jsonb;
  v_transaction_id uuid;
  v_pathway_completion decimal;
  v_unlocked_content jsonb := '[]';
BEGIN
  -- Validate inputs
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RAISE EXCEPTION 'Invalid user ID';
  END IF;

  -- Check for previous completion
  IF EXISTS (
    SELECT 1 FROM points_history 
    WHERE user_id = p_user_id AND unit_id = p_unit_id
  ) THEN
    RAISE EXCEPTION 'Unit already completed';
  END IF;

  -- Generate transaction ID
  v_transaction_id := gen_random_uuid();

  -- Calculate base points
  SELECT 
    CASE 
      WHEN difficulty = 'beginner' THEN 100
      WHEN difficulty = 'intermediate' THEN 200
      WHEN difficulty = 'advanced' THEN 300
      ELSE 100
    END INTO v_base_points
  FROM lesson_progress
  WHERE lesson_id = p_unit_id
  LIMIT 1;

  -- Apply streak bonus
  SELECT 
    CASE 
      WHEN current_streak >= 7 THEN 1.5
      WHEN current_streak >= 3 THEN 1.25
      ELSE 1.0
    END INTO v_multiplier
  FROM user_scores
  WHERE user_id = p_user_id;

  -- Calculate total points
  v_total_points := (v_base_points + v_bonus_points) * v_multiplier;

  -- Process achievements
  v_achievements := process_achievements(p_user_id, p_unit_id);

  -- Record points
  INSERT INTO points_history (
    user_id,
    unit_id,
    points_earned,
    bonus_points,
    multiplier,
    source_type,
    metadata,
    transaction_id
  ) VALUES (
    p_user_id,
    p_unit_id,
    v_base_points,
    v_bonus_points,
    v_multiplier,
    'unit_completion',
    jsonb_build_object(
      'unit_id', p_unit_id,
      'completion_date', now()
    ),
    v_transaction_id
  );

  -- Update user scores
  UPDATE user_scores
  SET 
    total_score = total_score + v_total_points,
    lessons_completed = lessons_completed + 1,
    current_streak = current_streak + 1,
    longest_streak = GREATEST(longest_streak, current_streak + 1),
    last_lesson_completed = now()
  WHERE user_id = p_user_id;

  -- Get current and previous ranks
  WITH ranks AS (
    SELECT 
      user_id,
      RANK() OVER (ORDER BY total_score DESC) as rank
    FROM user_scores
  )
  SELECT 
    rank INTO v_current_rank
  FROM ranks 
  WHERE user_id = p_user_id;

  -- Update leaderboard cache
  INSERT INTO leaderboard_cache (
    user_id,
    category,
    score,
    rank,
    previous_rank
  ) VALUES (
    p_user_id,
    'global',
    v_total_points,
    v_current_rank,
    COALESCE(v_previous_rank, v_current_rank)
  )
  ON CONFLICT (user_id, category)
  DO UPDATE SET
    score = leaderboard_cache.score + v_total_points,
    previous_rank = leaderboard_cache.rank,
    rank = v_current_rank,
    updated_at = now();

  -- Calculate pathway completion
  SELECT 
    ROUND(
      (COUNT(*) FILTER (WHERE completed) * 100.0 / NULLIF(COUNT(*), 0))::numeric, 
      2
    ) INTO v_pathway_completion
  FROM lesson_progress
  WHERE user_id = p_user_id;

  -- Build response
  RETURN jsonb_build_object(
    'status', 'success',
    'pointsEarned', jsonb_build_object(
      'basePoints', v_base_points,
      'bonusPoints', v_bonus_points,
      'multipliers', jsonb_build_array(
        jsonb_build_object(
          'type', 'streak',
          'value', v_multiplier
        )
      )
    ),
    'totalPoints', v_total_points,
    'leaderboard', jsonb_build_object(
      'currentRank', v_current_rank,
      'previousRank', v_previous_rank,
      'pointsToNextRank', (
        SELECT MIN(total_score) - (
          SELECT total_score 
          FROM user_scores 
          WHERE user_id = p_user_id
        )
        FROM user_scores
        WHERE total_score > (
          SELECT total_score 
          FROM user_scores 
          WHERE user_id = p_user_id
        )
      )
    ),
    'achievements', v_achievements,
    'progressUpdate', jsonb_build_object(
      'pathwayCompletion', v_pathway_completion,
      'unlockedContent', v_unlocked_content
    )
  );
END;
$$;

-- Function to recalculate leaderboard
CREATE OR REPLACE FUNCTION refresh_leaderboard_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update global leaderboard
  INSERT INTO leaderboard_cache (
    user_id,
    category,
    score,
    rank,
    previous_rank
  )
  SELECT 
    user_id,
    'global',
    total_score,
    RANK() OVER (ORDER BY total_score DESC),
    COALESCE(lc.rank, 0)
  FROM user_scores us
  LEFT JOIN leaderboard_cache lc ON 
    lc.user_id = us.user_id AND 
    lc.category = 'global'
  ON CONFLICT (user_id, category)
  DO UPDATE SET
    score = EXCLUDED.score,
    previous_rank = leaderboard_cache.rank,
    rank = EXCLUDED.rank,
    updated_at = now();
END;
$$;

-- Trigger to refresh leaderboard periodically
CREATE OR REPLACE FUNCTION trigger_refresh_leaderboard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Refresh leaderboard if cache is older than 5 minutes
  IF NOT EXISTS (
    SELECT 1 FROM leaderboard_cache 
    WHERE updated_at >= now() - interval '5 minutes'
  ) THEN
    PERFORM refresh_leaderboard_cache();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER refresh_leaderboard_trigger
AFTER INSERT OR UPDATE ON user_scores
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_refresh_leaderboard();