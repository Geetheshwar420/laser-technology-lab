import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { Question, QuizResult } from '../../types';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircle, XCircle, HelpCircle, Award } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  lessonId: string;
  onComplete: (result: QuizResult) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, lessonId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { progress } = useLessonProgress(lessonId);
  const isAlreadyCompleted = progress?.completed || false;
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(optionIndex);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerSubmitted(true);
    
    // Record the user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
  };
  
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results
      const correctAnswers = userAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      ).length;
      
      const score = correctAnswers / questions.length;
      
      const result: QuizResult = {
        lessonId,
        score,
        totalQuestions: questions.length,
        correctAnswers,
        completed: true,
        date: new Date()
      };
      
      setQuizCompleted(true);
      onComplete(result);
      
      // Update points in store
      const { user, setUser } = useStore.getState();
      if (user) {
        const pointsEarned = Math.max(1, Math.floor((correctAnswers / questions.length) * 10));
        const updatedUser = {
          ...user,
          id: user.id || '',
          email: user.email || '',
          username: user.username || '',
          points: (user.points || 0) + pointsEarned,
          level: user.level || 1,
          achievements: user.achievements || [],
          completedLessons: [...new Set([...(user.completedLessons || []), lessonId])],
          bio: user.bio || '',
          website: user.website || '',
          avatar_url: user.avatar_url || '',
          current_streak: (user.current_streak || 0) + 1,
          longest_streak: Math.max(user.longest_streak || 0, (user.current_streak || 0) + 1)
        };
        console.log('Updating user with:', updatedUser);
        setUser(updatedUser);
      }
    }
  };
  
  const calculateScore = () => {
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    
    return {
      correctAnswers,
      totalQuestions: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100)
    };
  };
  
  if (isAlreadyCompleted) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Lesson Completed!
          </h2>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <Award className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              You scored: {progress?.score ? Math.round(progress.score * 100) : 0}%
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You've already completed this quiz
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="primary" onClick={() => window.location.href = '/lessons'}>
            Back to Lessons
          </Button>
          <Button 
            variant="secondary"
            onClick={() => {
              const currentIndex = useStore.getState().lessons.findIndex(
                (lesson: { id: string }) => lesson.id === lessonId
              );
              const nextLesson = useStore.getState().lessons[currentIndex + 1];
              if (nextLesson) {
                window.location.href = `/lessons/${nextLesson.id}`;
              }
            }}
          >
            Go to Next Lesson
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    
    return (
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Quiz Completed!</h2>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <Award className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {score.percentage}%
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You got {score.correctAnswers} out of {score.totalQuestions} questions correct
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">What you did well:</h4>
              <p className="text-green-700 dark:text-green-400 text-sm">
                {score.percentage >= 80 
                  ? "Excellent work! You've mastered most of the concepts in this lesson."
                  : score.percentage >= 60
                  ? "Good job! You understand the core concepts of this lesson."
                  : "You've grasped some of the key points from this lesson."}
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">What to focus on next:</h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                {score.percentage >= 80 
                  ? "Try exploring the advanced topics related to this lesson."
                  : score.percentage >= 60
                  ? "Review the sections where you made mistakes to strengthen your understanding."
                  : "Consider revisiting this lesson to reinforce the concepts you found challenging."}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="primary" onClick={() => window.location.href = '/lessons'}>
            Back to Lessons
          </Button>
          <Button 
            variant="secondary"
            onClick={() => {
              // Get next lesson ID from store
              const currentIndex = useStore.getState().lessons.findIndex(
                l => l.id === lessonId
              );
              const nextLesson = useStore.getState().lessons[currentIndex + 1];
              if (nextLesson) {
                window.location.href = `/lessons/${nextLesson.id}`;
              }
            }}
          >
            Go to Next Lesson
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quiz</h2>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {currentQuestion.text}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedOption === index 
                    ? isAnswerSubmitted
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-100 border border-green-500 dark:bg-green-900/50 dark:border-green-500'
                        : 'bg-red-100 border border-red-500 dark:bg-red-900/50 dark:border-red-500'
                      : 'bg-blue-100 border border-blue-500 dark:bg-blue-900/50 dark:border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    {isAnswerSubmitted ? (
                      selectedOption === index ? (
                        index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )
                      ) : index === currentQuestion.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                      )
                    ) : (
                      <div className={`h-5 w-5 rounded-full border-2 ${
                        selectedOption === index 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-base ${
                      isAnswerSubmitted && index === currentQuestion.correctAnswer
                        ? 'font-medium text-green-800 dark:text-green-300'
                        : isAnswerSubmitted && selectedOption === index
                        ? 'font-medium text-red-800 dark:text-red-300'
                        : 'font-medium text-gray-900 dark:text-white'
                    }`}>
                      {option}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {isAnswerSubmitted && (
          <div className={`p-4 rounded-lg mb-6 ${
            selectedOption === currentQuestion.correctAnswer
              ? 'bg-green-50 dark:bg-green-900/30'
              : 'bg-red-50 dark:bg-red-900/30'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {selectedOption === currentQuestion.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <HelpCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  selectedOption === currentQuestion.correctAnswer
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-red-800 dark:text-red-300'
                }`}>
                  {selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </h3>
                <div className={`mt-2 text-sm ${
                  selectedOption === currentQuestion.correctAnswer
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  <p>{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div></div>
        <div>
          {!isAnswerSubmitted ? (
            <Button 
              variant="primary" 
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Quiz;