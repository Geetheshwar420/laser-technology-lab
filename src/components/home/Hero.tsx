import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Master Laser Technology Through Interactive Learning
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Explore the fascinating world of lasers with our game-based educational platform. Learn complex concepts through interactive simulations, animations, and challenges.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/lessons">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1570215171323-4ec328f3f5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Laser beam visualization" 
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-blue-500 rounded-full w-24 h-24 flex items-center justify-center text-white font-bold"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 4
              }}
            >
              Interactive
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-purple-500 rounded-full w-20 h-20 flex items-center justify-center text-white font-bold"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3.5,
                delay: 0.5
              }}
            >
              Fun
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;