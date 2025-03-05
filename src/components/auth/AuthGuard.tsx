import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { getSession } from '../../lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUser } = useStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();
        if (!session) {
          setIsLoggedIn(false);
          setUser(null);
          navigate('/login');
          return;
        }

        if (!isLoggedIn) {
          setIsLoggedIn(true);
          setUser({
            id: session.user.id,
            email: session.user.email!,
            username: session.user.user_metadata.username || 'User',
            points: 0,
            level: 1,
            achievements: [],
            completedLessons: [],
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [isLoggedIn, navigate, setIsLoggedIn, setUser]);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;