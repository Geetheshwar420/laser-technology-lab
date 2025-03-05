import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { SignUpFormData, signUpSchema, signUp } from '../lib/auth';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { User, Mail, Lock, CheckSquare } from 'lucide-react';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data);
      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Sign in
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('username')}
                    id="username"
                    type="text"
                    className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                      errors.username
                        ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    } text-gray-900 focus:outline-none focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
                    placeholder="Username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                      errors.email
                        ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    } text-gray-900 focus:outline-none focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
                    placeholder="Email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    id="password"
                    type="password"
                    className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                      errors.password
                        ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    } text-gray-900 focus:outline-none focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
                    placeholder="Password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('confirmPassword')}
                    id="confirmPassword"
                    type="password"
                    className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                      errors.confirmPassword
                        ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    } text-gray-900 focus:outline-none focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
                    placeholder="Confirm Password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                {...register('acceptTerms')}
                id="accept-terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-700"
              />
              <label
                htmlFor="accept-terms"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                I accept the{' '}
                <Link
                  to="/terms"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  terms and conditions
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.acceptTerms.message}
              </p>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;