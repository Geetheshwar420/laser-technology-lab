import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* Popular Lessons Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Popular Lessons
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Start your journey with these beginner-friendly laser technology lessons.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Laser Fundamentals',
                description: 'Learn the basic principles of laser operation and the physics behind stimulated emission.',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
                difficulty: 'Beginner'
              },
              {
                title: 'Optical Resonators',
                description: 'Explore how optical resonators work and their role in laser systems.',
                image: 'https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
                difficulty: 'Intermediate'
              },
              {
                title: 'Laser Applications',
                description: 'Discover the wide range of applications for lasers in medicine, industry, and research.',
                image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
                difficulty: 'Beginner'
              }
            ].map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
              >
                <img 
                  src={lesson.image} 
                  alt={lesson.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200 mb-4">
                    {lesson.difficulty}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{lesson.description}</p>
                  <Link to="/lessons" className="text-blue-600 dark:text-blue-400 font-medium flex items-center">
                    Start lesson <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/lessons">
              <Button variant="outline" size="lg">
                View All Lessons
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Simulation Preview Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
                Interactive Laser Simulations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Experiment with virtual laser systems in our interactive simulation lab. Adjust parameters like wavelength, pump power, and cavity length to see how they affect laser performance in real-time.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Visualize laser cavity dynamics',
                  'Experiment with different gain media',
                  'Observe mode patterns and beam profiles',
                  'Study the effects of resonator design'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/simulations">
                <Button variant="primary" size="lg">
                  Try Simulations
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Laser simulation" 
                className="rounded-xl shadow-xl"
              />
              
              {/* Overlay elements */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Wavelength: 632.8 nm</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">HeNe Laser</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            Ready to Master Laser Technology?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are learning laser physics through our interactive platform. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/lessons">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Explore Lessons
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;