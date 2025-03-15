import React from 'react';
import { LessonSection } from '../../types';
import { ChevronRight } from 'lucide-react';

interface LessonNavigationProps {
  sections: LessonSection[];
  currentSectionId: string;
  onSectionChange: (sectionId: string) => void;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  sections,
  currentSectionId,
  onSectionChange
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lesson Contents</h3>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  currentSectionId === section.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-3 text-sm">
                  {index + 1}
                </span>
                <span className="flex-grow">{section.title}</span>
                {currentSectionId === section.id && (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => onSectionChange('quiz')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                currentSectionId === 'quiz'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-3 text-sm">
                {sections.length + 1}
              </span>
              <span className="flex-grow">Quiz</span>
              {currentSectionId === 'quiz' && (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LessonNavigation;