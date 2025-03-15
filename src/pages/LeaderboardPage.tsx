import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import Layout from '../components/layout/Layout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { Trophy, Medal, Star, Award, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

const LeaderboardPage: React.FC = () => {
  const { user } = useStore();
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    // Simulated leaderboard data - replace with actual API call
    setLeaderboardData([
      { id: 1, username: 'LaserMaster', points: 2500, level: 8, completedLessons: 15 },
      { id: 2, username: 'PhotonPro', points: 2200, level: 7, completedLessons: 13 },
      { id: 3, username: 'WaveRider', points: 2000, level: 6, completedLessons: 12 },
      { id: 4, username: 'QuantumQuester', points: 1800, level: 6, completedLessons: 11 },
      { id: 5, username: 'OpticsExplorer', points: 1600, level: 5, completedLessons: 10 },
      // Add more users as needed
    ]);

    // Simulated progress data - replace with actual API call
    setProgressData([
      { day: 'Mon', points: 150 },
      { day: 'Tue', points: 300 },
      { day: 'Wed', points: 450 },
      { day: 'Thu', points: 500 },
      { day: 'Fri', points: 800 },
      { day: 'Sat', points: 950 },
      { day: 'Sun', points: 1200 },
    ]);
  }, []);

  const userRank = user ? leaderboardData.findIndex(entry => entry.points < (user.points || 0)) + 1 : null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Leaderboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your progress and compete with other learners in mastering laser technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {user && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Stats</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Rank</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      #{userRank || '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Points</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.points}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Level</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.level}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="points"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Learners</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-center p-4 rounded-lg ${
                        user?.id === entry.id
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex-shrink-0 w-12 text-center">
                        {index === 0 ? (
                          <Trophy className="h-6 w-6 text-yellow-500 mx-auto" />
                        ) : index === 1 ? (
                          <Medal className="h-6 w-6 text-gray-400 mx-auto" />
                        ) : index === 2 ? (
                          <Medal className="h-6 w-6 text-amber-600 mx-auto" />
                        ) : (
                          <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                            #{index + 1}
                          </span>
                        )}
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {entry.username}
                          </span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {entry.points} pts
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-4">Level {entry.level}</span>
                          <span>{entry.completedLessons} lessons completed</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Statistics</h2>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Unit I', completed: 45 },
                      { name: 'Unit II', completed: 35 },
                      { name: 'Unit III', completed: 28 },
                      { name: 'Unit IV', completed: 20 },
                      { name: 'Unit V', completed: 15 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Quick Stats
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Total Users</span>
                    <span>1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Today</span>
                    <span>456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lessons Completed</span>
                    <span>5,678</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;