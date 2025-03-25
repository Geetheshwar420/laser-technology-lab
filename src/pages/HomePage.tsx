import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const DeveloperCard: React.FC<{
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  delay?: number;
}> = ({ name, role, image, github, linkedin, twitter, email, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
  >
    <div className="relative">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
      <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{role}</p>
      <div className="flex space-x-4">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Github className="h-5 w-5" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Twitter className="h-5 w-5" />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Mail className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

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
                difficulty: 'Beginner',
                link: '/lessons/unit-1-absorption-emission'
              },
              {
                title: 'Optical Resonators',
                description: 'Explore how optical resonators work and their role in laser systems.',
                image: 'https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
                difficulty: 'Intermediate',
                link: '/lessons/unit-2-threshold-resonators'
              },
              {
                title: 'Laser Applications',
                description: 'Discover the wide range of applications for lasers in medicine, industry, and research.',
                image: 'https://images.unsplash.com/photo-1609579857457-182bbcd11230?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                difficulty: 'Beginner',
                link: '/lessons/unit-5-applications'
              }
            ].map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={lesson.link}>
                  <img 
                    src={lesson.image} 
                    alt={lesson.title} 
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200 mb-4">
                      {lesson.difficulty}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{lesson.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{lesson.description}</p>
                    <div className="text-blue-600 dark:text-blue-400 font-medium flex items-center">
                      Start lesson <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
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
                className="rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay elements */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Wavelength: 632.8 nm</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">HeNe Laser</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-16 bg-gradient-to-b from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
              The brilliant minds behind LaserLearn's innovative learning platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto justify-center items-center text-center ">
            <DeveloperCard
              name="Geetheshwar G"
              role="Lead Software Engineer"
              image="https://media-hosting.imagekit.io//c3753e9b36ba4a07/geetheshwar.jpg?Expires=1837525104&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=MA4zM9n4fqw5O9Qicj9l2Jr437Tp8oXPZB4TyHmgz2cjN6AcGZSsHCfcqxsuhGdwSsH98da6nNcq4x3-F4ytvd5Wxw4S0PaZbctOA1V8xhKt~UGaw2Dy~aZ6tbQnTmlhxiaXfsiR5lAN4IJtreEFVb8b8Rn5OQpYox~BbrSFTxs13640GmtfyJbDKIPpITnHzGMQeXbq9jeegDrmbN9OhxSUn2WQ~0q1oZNPzyOZRiA8ezszgI5Z1HAqwx4c-8Mc9f8DC7faVfU58QxF09HSq3rtCH2HZ1-yLVyC5TCEAkZZN4cirCkPXOGeDwhu3PWMLynP9UQ6y2RnQljq1Fly8A__"
              github="https://github.com/Geetheshwar420"
              linkedin="https://linkedin.com/in/geetheshwar-g-12262a255/"
              email="geetheeshwarg@gmail.com"
              delay={0}
            />
            <DeveloperCard
              name="Dr. M S Revathy"
              role="Faculty Advisor"
              image="https://media-hosting.imagekit.io//dc4f44ac5c6549ba/revathy.jpg?Expires=1837525104&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lqyqZTLPr-wVoaR~-pHoEt8suTe4gAEoHMKzSi0FNqB~CbfwNnt9~MXN~tRjmQ6FLFkxnxzAUOcMiSwwvNn8O1yZMugaE3JXktQQuFtgSxQAKbq4QGpLRlaVuDR8QpCYRmcgSxfK-5CYL9vHL8TB5rSRtIeXNbN38SE~xzoQ67Inxli54CYdp2pTk1ANlm71ij6RSD2uDRSrJOjRfWnUUtBRnTvaHf3JZMfEx0fWmDaEFnMKCj~0ZMYYEp3H~kIGqyiQ~ga1bzH1GNi-vUPFqyeQqM0hyFA-LL~KWEDLYDlbO6lUp6YLC3Ij2I9VZuHI8LY5R6mXoJNQOFEiV~u69w__"
              linkedin="https://www.linkedin.com/in/dr-revathy-m-s-bba652149?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              email="revz27vijay@gmail.com"
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
            Ready to Master Laser Technology?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are learning laser physics through our interactive platform. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/lessons">
              <Button variant="outline" size="lg">
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
