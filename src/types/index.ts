export interface User {
  id: string;
  email: string;
  username: string;
  points: number;
  level: number;
  achievements: Achievement[];
  completedLessons: string[];
  bio?: string;
  website?: string;
  avatar_url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  concepts: string[];
  duration: number; // in minutes
  points: number;
  prerequisites: string[];
  content?: LessonContent;
}

export interface LessonContent {
  sections: LessonSection[];
  quiz: Quiz;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  interactive?: InteractiveElement;
}

export interface InteractiveElement {
  type: 'equation' | 'simulation' | 'diagram';
  data: any;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SimulationParams {
  wavelength: number;
  pumpPower: number;
  cavityLength: number;
  gainMedium: string;
  reflectivity: number;
  temperature: number;
}

export interface QuizResult {
  lessonId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completed: boolean;
  date: Date;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  components_completed: Record<string, boolean>;
  last_accessed: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}