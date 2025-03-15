import React from 'react';
import FeatureCard from './FeatureCard';
import { BookOpen, Lightbulb, Award, Users, Zap, MessageSquare } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Interactive Lessons',
      description: 'Learn laser physics concepts through engaging, interactive lessons with step-by-step explanations.',
      icon: BookOpen
    },
    {
      title: 'Visual Simulations',
      description: 'Experiment with virtual laser systems and see real-time changes as you adjust parameters.',
      icon: Lightbulb
    },
    {
      title: 'Gamified Learning',
      description: 'Earn points, unlock achievements, and compete on leaderboards as you master laser concepts.',
      icon: Award
    },
    {
      title: 'Multiplayer Challenges',
      description: 'Collaborate or compete with other students in real-time multiplayer learning activities.',
      icon: Users
    },
    {
      title: 'Real-time Equation Solver',
      description: 'Visualize and understand complex laser equations with our interactive equation solver.',
      icon: Zap
    },
    {
      title: 'AI Tutor Assistant',
      description: 'Get personalized help from our AI tutor that answers your questions about laser technology.',
      icon: MessageSquare
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Key Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Discover the tools that make learning laser technology engaging and effective.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;