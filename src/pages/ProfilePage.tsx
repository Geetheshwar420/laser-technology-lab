import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import { useStore } from '../store/useStore';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { User, Mail, Award, BookOpen, Star, Trophy, LogOut } from 'lucide-react';
import { logout } from '../lib/auth';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsLoggedIn } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setUser(null);
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock progress data - replace with actual data from your backend
  const progressData = [
    { day: 'Mon', points: 150 },
    { day: 'Tue', points: 300 },
    { day: 'Wed', points: 450 },
    { day: 'Thu', points: 500 },
    { day: 'Fri', points: 800 },
    { day: 'Sat', points: 950 },
    { day: 'Sun', points: user.points },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Overview</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {user.username}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Level</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{user.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Points</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{user.points}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Completed Lessons</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {user.completedLessons.length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Progress</h2>
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

          {/* Achievements */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.achievements.length > 0 ? (
                  user.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <Award className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                        {achievement.unlockedAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Complete lessons to earn achievements!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => navigate('/profile/edit')}
                >
                  <User className="h-5 w-5 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => navigate('/profile/email')}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Change Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => navigate('/forgot-password')}
                >
                  <Award className="h-5 w-5 mr-2" />
                  Reset Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  {isLoading ? 'Logging out...' : 'Log Out'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;