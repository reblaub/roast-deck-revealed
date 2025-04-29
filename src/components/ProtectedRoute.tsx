
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        navigate('/auth');
      }
    }
  }, [user, loading, requireAuth, navigate]);

  if (loading) {
    // Show a simple loading state while checking authentication
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-white/20 border-t-roast-orange rounded-full"></div>
      </div>
    );
  }

  // If requireAuth is true and no user, the useEffect will handle redirect
  // If requireAuth is false or we have a user, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
