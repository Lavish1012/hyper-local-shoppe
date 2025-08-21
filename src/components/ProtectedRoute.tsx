import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'seller';
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // If authentication is required but user is not logged in
      if (requireAuth && !user) {
        navigate('/auth');
        return;
      }

      // If specific role is required but user doesn't have it
      if (requiredRole && userRole !== requiredRole) {
        // Redirect based on user's actual role
        if (userRole === 'seller') {
          navigate('/seller-dashboard');
        } else if (userRole === 'customer') {
          navigate('/customer-dashboard');
        } else {
          navigate('/');
        }
        return;
      }
    }
  }, [user, userRole, loading, navigate, requiredRole, requireAuth]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return null; // Will redirect in useEffect
  }

  // If specific role is required but user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;