import React from 'react';
import Layout from '../components/layout/Layout';
import { FileText, AlertCircle, Key, Scale } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Last updated: March 1, 2024
          </p>
        </div>

        <div className="prose prose-blue max-w-none dark:prose-invert">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Agreement to Terms
              </h2>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-4">
                By accessing or using LaserLearn, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the platform following the posting of changes will constitute your acceptance of such changes.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Key className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                User Accounts
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>When creating an account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any security breaches</li>
              </ul>
              <p>
                We reserve the right to terminate accounts, remove content, or cancel subscriptions at our discretion.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Intellectual Property
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                All content on LaserLearn, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of LaserLearn or its content suppliers and is protected by international copyright laws.
              </p>
              <p>
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes</li>
                <li>Transfer the materials to another person</li>
                <li>Reverse engineer or decompile the software</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Limitations and Disclaimers
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                LaserLearn and its suppliers make no warranties about:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The accuracy or completeness of content</li>
                <li>The availability of the platform</li>
                <li>The security of user data</li>
                <li>The success of learning outcomes</li>
              </ul>
              <p className="mt-4">
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform.
              </p>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold">Contact Information</p>
                <p className="mt-2">
                  For questions about these Terms of Service, please contact us at:<br />
                  legal@laserlearn.edu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;