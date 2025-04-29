
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  [key: string]: any; // Allow any additional props
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  ...restProps // Capture all other props
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

  // Pass all remaining props to the children
  // This ensures any props required by child components are passed along
  if (React.isValidElement(children)) {
    return React.cloneElement(children, restProps);
  }

  return <>{children}</>;
};

export default ProtectedRoute;
