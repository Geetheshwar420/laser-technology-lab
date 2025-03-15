import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import AuthGuard from './components/auth/AuthGuard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import SimulationPage from './pages/SimulationPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const { darkMode } = useStore();
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          }
        />
        <Route
          path="/simulations"
          element={
            <AuthGuard>
              <SimulationPage />
            </AuthGuard>
          }
        />
        <Route
          path="/lessons"
          element={
            <AuthGuard>
              <LessonsPage />
            </AuthGuard>
          }
        />
        <Route
          path="/lessons/:lessonId"
          element={
            <AuthGuard>
              <LessonDetailPage />
            </AuthGuard>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <AuthGuard>
              <LeaderboardPage />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;