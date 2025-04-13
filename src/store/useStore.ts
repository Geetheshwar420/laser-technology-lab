import { create } from 'zustand';
import { User, SimulationParams, Lesson } from '../types';
import { mockLessons } from '../data/mockLessons';

interface QuizResult {
  lessonId: string;
  score: number;
  completedAt: Date;
  answers: Record<string, any>;
}

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
  completeLesson: (lessonId: string) => void;
  addQuizResult: (result: QuizResult) => void;
}

const defaultSimulationParams: SimulationParams = {
  wavelength: 632.8, // HeNe laser wavelength in nm
  pumpPower: 10, // in watts
  cavityLength: 30, // in cm
  gainMedium: 'HeNe',
  reflectivity: 0.99, // 99%
  temperature: 300, // in Kelvin
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
    })),
  addQuizResult: (result) =>
    set((state) => ({
      quizResults: [...state.quizResults, result],
      user: state.user && {
        ...state.user,
        points: state.user.points + result.score,
        completedLessons: state.user.completedLessons.includes(result.lessonId)
          ? state.user.completedLessons
          : [...state.user.completedLessons, result.lessonId]
      }
    }))
}));