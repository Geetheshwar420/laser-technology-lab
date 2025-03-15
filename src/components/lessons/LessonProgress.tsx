import React from 'react';

interface LessonProgressProps {
  currentSection: number;
  totalSections: number;
}

const LessonProgress: React.FC<LessonProgressProps> = ({ currentSection, totalSections }) => {
  const progress = Math.round((currentSection / totalSections) * 100);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Progress
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LessonProgress;