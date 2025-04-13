import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useStore } from '../store/useStore';
import LessonHeader from '../components/lessons/LessonHeader';
import LessonContent from '../components/lessons/LessonContent';
import LessonNavigation from '../components/lessons/LessonNavigation';
import LessonProgress from '../components/lessons/LessonProgress';
import Quiz from '../components/lessons/Quiz';
import Button from '../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { lessons, addQuizResult } = useStore();
  
  const lesson = lessons.find(l => l.id === lessonId);
  
  const [currentSectionId, setCurrentSectionId] = useState<string>('');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  useEffect(() => {
    if (lesson?.content?.sections && lesson.content.sections.length > 0) {
      setCurrentSectionId(lesson.content.sections[0].id);
      setCurrentSectionIndex(0);
    }
  }, [lesson]);
  
  if (!lesson || !lesson.content) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Lesson Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The lesson you're looking for doesn't exist or hasn't been created yet.
            </p>
            <Button variant="primary" onClick={() => navigate('/lessons')}>
              Back to Lessons
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const { sections, quiz } = lesson.content;
  
  const handleSectionChange = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    
    if (sectionId === 'quiz') {
      setCurrentSectionIndex(sections.length);
    } else {
      const index = sections.findIndex(section => section.id === sectionId);
      if (index !== -1) {
        setCurrentSectionIndex(index);
      }
    }
  };
  
  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      const prevIndex = currentSectionIndex - 1;
      setCurrentSectionIndex(prevIndex);
      setCurrentSectionId(sections[prevIndex].id);
    }
  };
  
  const handleNextSection = () => {
    if (currentSectionIndex < sections.length) {
      const nextIndex = currentSectionIndex + 1;
      if (nextIndex === sections.length) {
        setCurrentSectionId('quiz');
      } else {
        setCurrentSectionId(sections[nextIndex].id);
      }
      setCurrentSectionIndex(nextIndex);
    }
  };
  
  const handleQuizComplete = (result: { score: number; answers: Record<string, any> }) => {
    if (lessonId) {
      addQuizResult({
        lessonId,
        score: result.score,
        completedAt: new Date(),
        answers: result.answers
      });
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LessonHeader lesson={lesson} />
        
        <LessonProgress 
          currentSection={currentSectionIndex + 1} 
          totalSections={sections.length + 1} // +1 for quiz
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <LessonNavigation 
                sections={sections}
                currentSectionId={currentSectionId}
                onSectionChange={handleSectionChange}
              />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {currentSectionId === 'quiz' ? (
              <Quiz 
                questions={quiz.questions}
                lessonId={lesson.id}
                onComplete={handleQuizComplete}
              />
            ) : (
              <>
                {sections.map(section => (
                  section.id === currentSectionId && (
                    <LessonContent key={section.id} section={section} />
                  )
                ))}
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevSection}
                    disabled={currentSectionIndex === 0}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    onClick={handleNextSection}
                    className="flex items-center"
                  >
                    {currentSectionIndex < sections.length - 1 ? 'Next' : 'Take Quiz'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LessonDetailPage;