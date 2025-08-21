import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerOnboarding } from '@/components/onboarding/CustomerOnboarding';
import { SellerOnboarding } from '@/components/onboarding/SellerOnboarding';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Onboarding() {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!userRole) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
  }, [user, userRole, navigate]);

  const handleOnboardingComplete = () => {
    if (userRole === 'customer') {
      navigate('/customer-dashboard');
    } else if (userRole === 'seller') {
      navigate('/seller-dashboard');
    } else {
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {userRole === 'customer' ? (
        <CustomerOnboarding onComplete={handleOnboardingComplete} />
      ) : (
        <SellerOnboarding onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
}