import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Question, QuizResult } from '../../types';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircle, XCircle, HelpCircle, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

interface QuizProps {
  questions: Question[];
  lessonId: string;
  onComplete: (result: QuizResult) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, lessonId, onComplete }) => {
  const navigate = useNavigate();
  const { lessons } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];

  // Find the next lesson in sequence
  const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
  const nextLesson = currentLessonIndex < lessons.length - 1 
    ? lessons[currentLessonIndex + 1] 
    : null;
  
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

  const handleCompleteQuiz = (result: QuizResult) => {
    if (quizCompleted) {
      console.warn('Quiz already completed');
      return;
    }
    console.log('Quiz completed with:', {
      correctAnswers: result.correctAnswers,
      totalQuestions: result.totalQuestions,
      score: result.score,
      lessonId: result.lessonId
    });
    setQuizCompleted(true);
    onComplete(result);
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
      
      const result: QuizResult = {
        lessonId,
        score: correctAnswers / questions.length,
        totalQuestions: questions.length,
        correctAnswers,
        completed: true,
        date: new Date()
      };
      
      handleCompleteQuiz(result);
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

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    }
  };
  
  if (quizCompleted) {
    const score = calculateScore();
    
    return (
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Quiz Completed!</h2>
        </CardHeader>
        <CardContent className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-6"
          >
            <Award className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {score.percentage}%
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You got {score.correctAnswers} out of {score.totalQuestions} questions correct
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg"
            >
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">What you did well:</h4>
              <p className="text-green-700 dark:text-green-400 text-sm">
                {score.percentage >= 80 
                  ? "Excellent work! You've mastered most of the concepts in this lesson."
                  : score.percentage >= 60
                  ? "Good job! You understand the core concepts of this lesson."
                  : "You've grasped some of the key points from this lesson."}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"
            >
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">What to focus on next:</h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                {score.percentage >= 80 
                  ? "Try exploring the advanced topics related to this lesson."
                  : score.percentage >= 60
                  ? "Review the sections where you made mistakes to strengthen your understanding."
                  : "Consider revisiting this lesson to reinforce the concepts you found challenging."}
              </p>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link to="/lessons">
            <Button variant="outline">
              Back to Lessons
            </Button>
          </Link>
          {nextLesson && (
            <Button 
              variant="primary" 
              onClick={handleNextLesson}
              className="flex items-center"
            >
              Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
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
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
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
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
        
        {isAnswerSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              selectedOption === currentQuestion.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/30'
                : 'bg-red-50 dark:bg-red-900/30'
            }`}
          >
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
          </motion.div>
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