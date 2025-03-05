import React from 'react';
import { LessonSection } from '../../types';
import Card, { CardContent } from '../ui/Card';

interface LessonContentProps {
  section: LessonSection;
}

const LessonContent: React.FC<LessonContentProps> = ({ section }) => {
  return (
    <Card className="mb-8">
      <CardContent>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
        
        {section.imageUrl && (
          <div className="mb-6">
            <img 
              src={section.imageUrl} 
              alt={section.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div 
          className="prose prose-blue max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
        
        {section.videoUrl && (
          <div className="mt-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={section.videoUrl}
                title={section.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
        
        {section.interactive && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
              Interactive Element: {section.interactive.type}
            </p>
            <p className="text-blue-600 dark:text-blue-300">
              Interactive content will be displayed here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonContent;