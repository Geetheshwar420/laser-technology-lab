import React from 'react';
import Layout from '../components/layout/Layout';
import LessonCard from '../components/lessons/LessonCard';
import { useStore } from '../store/useStore';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { BookOpen, Award, Search } from 'lucide-react';

const LessonsPage: React.FC = () => {
  const { lessons, user } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.concepts.some(concept => concept.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const beginnerLessons = filteredLessons.filter(lesson => lesson.difficulty === 'beginner');
  const intermediateLessons = filteredLessons.filter(lesson => lesson.difficulty === 'intermediate');
  const advancedLessons = filteredLessons.filter(lesson => lesson.difficulty === 'advanced');
  
  const completedLessons = user?.completedLessons || [];
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Laser Technology Lessons
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our comprehensive lessons on laser physics and technology. From basic principles to advanced applications, we've got you covered.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search lessons by title, description, or concepts..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                All Lessons
              </TabsTrigger>
              <TabsTrigger value="beginner" className="flex items-center">
                Beginner
              </TabsTrigger>
              <TabsTrigger value="intermediate" className="flex items-center">
                Intermediate
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center">
                Advanced
              </TabsTrigger>
              {user && (
                <TabsTrigger value="completed" className="flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Completed
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          
          <TabsContent value="all">
            {filteredLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map(lesson => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    completed={completedLessons.includes(lesson.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">
                  No lessons found matching your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="beginner">
            {beginnerLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beginnerLessons.map(lesson => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    completed={completedLessons.includes(lesson.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">
                  No beginner lessons found matching your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="intermediate">
            {intermediateLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {intermediateLessons.map(lesson => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    completed={completedLessons.includes(lesson.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">
                  No intermediate lessons found matching your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="advanced">
            {advancedLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advancedLessons.map(lesson => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    completed={completedLessons.includes(lesson.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">
                  No advanced lessons found matching your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
          
          {user && (
            <TabsContent value="completed">
              {filteredLessons.filter(lesson => completedLessons.includes(lesson.id)).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLessons
                    .filter(lesson => completedLessons.includes(lesson.id))
                    .map(lesson => (
                      <LessonCard 
                        key={lesson.id} 
                        lesson={lesson} 
                        completed={true}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300">
                    You haven't completed any lessons yet.
                  </p>
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default LessonsPage;