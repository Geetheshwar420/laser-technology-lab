import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../../types';
import Card, { CardContent } from '../ui/Card';
import { Clock, Award, ChevronRight } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  completed?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, completed = false }) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <Link to={`/lessons/${lesson.id}`}>
      <Card className={`h-full transition-transform hover:scale-105 ${completed ? 'border-2 border-green-500 dark:border-green-600' : ''}`}>
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={`https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=250&q=80`}
              alt={lesson.title}
              className="w-full h-40 object-cover"
            />
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[lesson.difficulty]}`}>
              {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
            </div>
            {completed && (
              <div className="absolute top-3 left-3 bg-green-500 text-white p-1 rounded-full">
                <Award className="h-5 w-5" />
              </div>
            )}
          </div>
          
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{lesson.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{lesson.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{lesson.duration} min</span>
              </div>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Award className="h-4 w-4 mr-1" />
                <span>{lesson.points} pts</span>
              </div>
              
              <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LessonCard;