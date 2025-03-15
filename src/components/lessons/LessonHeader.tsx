import React from 'react';
import { Lesson } from '../../types';
import { Clock, Award, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LessonHeaderProps {
  lesson: Lesson;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ lesson }) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  
  return (
    <div className="mb-8">
      <Link to="/lessons" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Lessons
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{lesson.title}</h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{lesson.description}</p>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor[lesson.difficulty]}`}>
          {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock className="h-5 w-5 mr-1" />
          <span>{lesson.duration} min</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Award className="h-5 w-5 mr-1" />
          <span>{lesson.points} points</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <BookOpen className="h-5 w-5 mr-1" />
          <span>{lesson.concepts.join(', ')}</span>
        </div>
      </div>
      
      {lesson.prerequisites.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Prerequisites:</h3>
          <ul className="list-disc list-inside text-blue-700 dark:text-blue-400">
            {lesson.prerequisites.map((prereq) => (
              <li key={prereq}>{prereq}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LessonHeader;