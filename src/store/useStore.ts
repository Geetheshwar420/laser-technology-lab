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
  completeLesson: (lessonId: string) => void;
  addQuizResult: (result: QuizResult) => Promise<void>;
}

const defaultSimulationParams: SimulationParams = {
  wavelength: 632.8, // HeNe laser wavelength in nm
  pumpPower: 10, // in watts
  cavityLength: 30, // in cm
  gainMedium: 'HeNe',
  reflectivity: 0.99, // 99%
  temperature: 300, // in Kelvin
};

export const useStore = create<AppState>((set, get) => ({
  user: (() => {
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem('userData') || 'null');
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
    }
    return storedUser || {
      id: '',
      email: '',
      username: '',
      points: 0,
      level: 1,
      achievements: [],
      completedLessons: [],
      bio: '',
      website: '',
      avatar_url: '',
      current_streak: 0,
      longest_streak: 0
    };
  })(),
  darkMode: false,
  currentLesson: null,
  simulationParams: defaultSimulationParams,
  isLoggedIn: false,
  lessons: mockLessons,
  quizResults: [],
  
  setUser: (user: User | null) => {
    if (user) {
      // Ensure all required fields exist with proper defaults
      const updatedUser: User = {
        id: user.id || '',
        email: user.email || '',
        username: user.username || '',
        points: typeof user.points === 'number' ? user.points : 0,
        level: typeof user.level === 'number' ? user.level : 1,
        achievements: Array.isArray(user.achievements) ? user.achievements : [],
        completedLessons: Array.isArray(user.completedLessons) ? user.completedLessons : [],
        bio: user.bio || '',
        website: user.website || '',
        avatar_url: user.avatar_url || '',
        current_streak: typeof user.current_streak === 'number' ? user.current_streak : 0,
        longest_streak: typeof user.longest_streak === 'number' ? user.longest_streak : 0
      };
      try {
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        set({ user: updatedUser });
        console.log('User state updated successfully:', updatedUser);
      } catch (error) {
        console.error('Failed to persist user state:', error);
        // Fallback to in-memory state if localStorage fails
        set({ user: updatedUser });
      }
    } else {
      localStorage.removeItem('userData');
      set({ user: null });
    }
  },
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
  addQuizResult: async (result) => {
    try {
      // Check if already completed
      if (get().quizResults.some(r => r.lessonId === result.lessonId)) {
        console.warn('Quiz already completed for this lesson');
        return;
      }

      // Update local state only - database is handled by useLessonProgress
      set((state) => ({
        quizResults: [...state.quizResults, result],
        user: state.user ? {
          ...state.user,
          completedLessons: state.user.completedLessons.includes(result.lessonId)
            ? state.user.completedLessons
            : [...state.user.completedLessons, result.lessonId]
        } : null
      }));
    } catch (error) {
      console.error('Error updating quiz result:', error);
      throw error;
    }
  }
}));
