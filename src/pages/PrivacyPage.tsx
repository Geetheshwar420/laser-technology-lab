import React from 'react';
import Layout from '../components/layout/Layout';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Last updated: March 1, 2024
          </p>
        </div>

        <div className="prose prose-blue max-w-none dark:prose-invert">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Introduction
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              LaserLearn ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address</li>
                <li>Profile information</li>
                <li>Learning progress and achievements</li>
                <li>Payment information (if applicable)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Usage Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Learning activities and interactions</li>
                <li>Performance and analytics data</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                How We Use Your Information
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>We use the collected information for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and improving our services</li>
                <li>Personalizing your learning experience</li>
                <li>Communicating with you about your account</li>
                <li>Analyzing platform usage and performance</li>
                <li>Ensuring platform security and preventing fraud</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <UserCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Rights and Choices
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Control cookie preferences</li>
              </ul>
              <p className="mt-6">
                To exercise these rights or ask questions about our privacy practices, please contact us at privacy@laserlearn.edu
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;