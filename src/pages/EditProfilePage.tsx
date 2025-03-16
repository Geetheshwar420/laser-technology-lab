import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { User, Camera } from 'lucide-react';

const editProfileSchema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || '',
      bio: user?.bio || '',
      website: user?.website || '',
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          username: data.username,
          bio: data.bio,
          website: data.website,
        },
      });

      if (error) throw error;

      setUser(user ? {
        ...user,
        username: data.username,
        bio: data.bio,
        website: data.website,
      } : null);

      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Edit Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Update your profile information
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 bg-gray-100 dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Camera className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('username')}
                    type="text"
                    className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    {...register('bio')}
                    rows={3}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.bio && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Website
                </label>
                <div className="mt-1">
                  <input
                    {...register('website')}
                    type="url"
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.website && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.website.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/profile')}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfilePage;