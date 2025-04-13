import { supabase } from './supabase';
import { toast } from 'react-hot-toast';

export interface PointsResponse {
  status: string;
  pointsEarned: {
    basePoints: number;
    bonusPoints: number;
    multipliers: Array<{
      type: string;
      value: number;
    }>;
  };
  totalPoints: number;
  leaderboard: {
    currentRank: number;
    previousRank: number;
    pointsToNextRank: number;
  };
  achievements: Array<{
    name: string;
    description: string;
    bonusAwarded: number;
  }>;
  progressUpdate: {
    pathwayCompletion: number;
    unlockedContent: string[];
  };
}

export async function processUnitCompletion(
  unitId: string,
  retryCount: number = 3
): Promise<PointsResponse> {
  let attempt = 0;
  
  while (attempt < retryCount) {
    try {
      const { data, error } = await supabase
        .rpc('process_unit_completion', {
          p_unit_id: unitId
        });

      if (error) throw error;

      // Show achievement notifications
      if (data.achievements && data.achievements.length > 0) {
        data.achievements.forEach(achievement => {
          toast.success(`Achievement Unlocked: ${achievement.name}`, {
            duration: 5000,
            icon: '🏆'
          });
        });
      }

      // Show rank change notification
      if (data.leaderboard.currentRank < data.leaderboard.previousRank) {
        toast.success(
          `Rank Up! You're now #${data.leaderboard.currentRank} on the leaderboard!`,
          {
            duration: 5000,
            icon: '📈'
          }
        );
      }

      return data as PointsResponse;
    } catch (error: any) {
      attempt++;
      
      // Log error for debugging
      console.error(`Attempt ${attempt} failed:`, error);

      // If we've exhausted retries, throw the error
      if (attempt === retryCount) {
        toast.error('Failed to process unit completion. Please try again later.');
        throw new Error(`Failed to process unit completion: ${error.message}`);
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt), 8000))
      );
    }
  }

  // This should never be reached due to the throw in the loop
  throw new Error('Failed to process unit completion after retries');
}

export async function getLeaderboard(
  category: string = 'global',
  limit: number = 100
): Promise<Array<{
  userId: string;
  username: string;
  score: number;
  rank: number;
}>> {
  const { data, error } = await supabase
    .from('leaderboard_cache')
    .select(`
      user_id,
      score,
      rank,
      users:auth.users(
        username,
        metadata->username
      )
    `)
    .eq('category', category)
    .order('rank', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }

  return data.map(entry => ({
    userId: entry.user_id,
    username: entry.users?.username || entry.users?.metadata?.username || 'Unknown User',
    score: entry.score,
    rank: entry.rank
  }));
}

export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievement_definitions(
        name,
        description,
        badge_url,
        points_reward
      )
    `)
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }

  return data;
}

export async function getPointsHistory(
  userId: string,
  limit: number = 10
) {
  const { data, error } = await supabase
    .from('points_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching points history:', error);
    throw error;
  }

  return data;
}