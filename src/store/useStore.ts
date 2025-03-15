import { create } from 'zustand';
import { User, SimulationParams, Lesson, QuizResult } from '../types';
import { mockLessons } from '../data/mockLessons';

interface AppState {
  user: User | null;
  darkMode: boolean;
  currentLesson: Lesson | null;
  simulationParams: SimulationParams;
  isLoggedIn: boolean;
  lessons: Lesson[];
  quizResults: QuizResult[];
  
  // Actions
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  updateSimulationParams: (params: Partial<SimulationParams>) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  addQuizResult: (result: QuizResult) => void;
  completeLesson: (lessonId: string) => void;
}

const defaultSimulationParams: SimulationParams = {
  wavelength: 632.8, // HeNe laser wavelength in nm
  pumpPower: 10, // in watts
  cavityLength: 30, // in cm
  gainMedium: 'HeNe',
  reflectivity: 0.99, // 99%
  temperature: 300, // in Kelvin
};

const mockUser: User = {
  id: 'user-1',
  email: 'user@example.com',
  username: 'LaserLearner',
  points: 150,
  level: 2,
  achievements: [],
  completedLessons: []
};

export const useStore = create<AppState>((set) => ({
  user: null,
  darkMode: false,
  currentLesson: null,
  simulationParams: defaultSimulationParams,
  isLoggedIn: false,
  lessons: mockLessons,
  quizResults: [],
  
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  updateSimulationParams: (params) => 
    set((state) => ({ 
      simulationParams: { ...state.simulationParams, ...params } 
    })),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  addQuizResult: (result) => 
    set((state) => ({ 
      quizResults: [...state.quizResults, result],
      user: state.user && result.completed 
        ? {
            ...state.user,
            points: state.user.points + Math.floor(result.score * 10),
            completedLessons: state.user.completedLessons.includes(result.lessonId)
              ? state.user.completedLessons
              : [...state.user.completedLessons, result.lessonId]
          }
        : state.user
    })),
  completeLesson: (lessonId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            completedLessons: state.user.completedLessons.includes(lessonId)
              ? state.user.completedLessons
              : [...state.user.completedLessons, lessonId]
          }
        : null
    }))
}));