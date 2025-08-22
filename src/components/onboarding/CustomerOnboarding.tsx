import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, ArrowRight, User, MapPin, ShoppingBag, Bell, CheckCircle, Loader2 } from 'lucide-react';

interface CustomerOnboardingProps {
  onComplete: () => void;
}

interface CustomerData {
  age?: number;
  preferredLanguage: string;
  houseNumber: string;
  areaStreet: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  shoppingPreferences: string[];
  notificationsSms: boolean;
  notificationsEmail: boolean;
}

const SHOPPING_CATEGORIES = [
  { value: 'groceries', label: 'Groceries', icon: '🛒' },
  { value: 'stationery', label: 'Stationery', icon: '📝' },
  { value: 'snacks', label: 'Snacks', icon: '🍿' },
  { value: 'household', label: 'Household', icon: '🏠' },
  { value: 'electronics', label: 'Electronics', icon: '📱' },
  { value: 'bakery', label: 'Bakery', icon: '🍞' },
  { value: 'fruits_vegetables', label: 'Fruits & Vegetables', icon: '🥕' },
  { value: 'dairy', label: 'Dairy', icon: '🥛' },
  { value: 'medical', label: 'Medical', icon: '💊' },
  { value: 'clothing', label: 'Clothing', icon: '👕' },
];

const LANGUAGES = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep', 'Puducherry'
];

export function CustomerOnboarding({ onComplete }: CustomerOnboardingProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<CustomerData>({
    preferredLanguage: 'English',
    houseNumber: '',
    areaStreet: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    shoppingPreferences: [],
    notificationsSms: false,
    notificationsEmail: false,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const togglePreference = (category: string) => {
    setData(prev => ({
      ...prev,
      shoppingPreferences: prev.shoppingPreferences.includes(category)
        ? prev.shoppingPreferences.filter(item => item !== category)
        : [...prev.shoppingPreferences, category]
    }));
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('customer_profiles')
        .insert({
          user_id: user.id,
          age: data.age || null,
          preferred_language: data.preferredLanguage,
          house_number: data.houseNumber || null,
          area_street: data.areaStreet || null,
          landmark: data.landmark || null,
          city: data.city || null,
          state: data.state || null,
          pincode: data.pincode || null,
          shopping_preferences: data.shoppingPreferences as any,
          notifications_sms: data.notificationsSms,
          notifications_email: data.notificationsEmail,
          onboarding_completed: true,
        });

      if (error) throw error;

      toast({
        title: 'Welcome aboard! 🎉',
        description: 'Your profile has been set up successfully.',
      });

      onComplete();
    } catch (error) {
      console.error('Error saving customer profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <User className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Tell us about yourself</h2>
              <p className="text-muted-foreground">Help us personalize your experience</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (optional)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={data.age || ''}
                  onChange={(e) => setData(prev => ({ ...prev, age: e.target.value ? parseInt(e.target.value) : undefined }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select
                  value={data.preferredLanguage}
                  onValueChange={(value) => setData(prev => ({ ...prev, preferredLanguage: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Where are you located?</h2>
              <p className="text-muted-foreground">This helps us find nearby shops and delivery options</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="houseNumber">Flat, House no., Building, Company, Apartment</Label>
                <Input
                  id="houseNumber"
                  placeholder="e.g., Flat 2B, Building A, XYZ Apartments"
                  value={data.houseNumber}
                  onChange={(e) => setData(prev => ({ ...prev, houseNumber: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="areaStreet">Area, Street, Sector, Village</Label>
                <Input
                  id="areaStreet"
                  placeholder="e.g., MG Road, Sector 14"
                  value={data.areaStreet}
                  onChange={(e) => setData(prev => ({ ...prev, areaStreet: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark (optional)</Label>
                <Input
                  id="landmark"
                  placeholder="e.g., Near City Mall, Opposite Bank"
                  value={data.landmark}
                  onChange={(e) => setData(prev => ({ ...prev, landmark: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Town/City *</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  value={data.city}
                  onChange={(e) => setData(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select
                  value={data.state}
                  onValueChange={(value) => setData(prev => ({ ...prev, state: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  placeholder="Enter your pincode"
                  value={data.pincode}
                  onChange={(e) => setData(prev => ({ ...prev, pincode: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">What do you like to shop for?</h2>
              <p className="text-muted-foreground">Select your interests to get personalized recommendations</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SHOPPING_CATEGORIES.map((category) => (
                <div
                  key={category.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                    data.shoppingPreferences.includes(category.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => togglePreference(category.value)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {data.shoppingPreferences.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {data.shoppingPreferences.map((pref) => {
                  const category = SHOPPING_CATEGORIES.find(c => c.value === pref);
                  return (
                    <Badge key={pref} variant="secondary">
                      {category?.icon} {category?.label}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <Bell className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Stay updated</h2>
              <p className="text-muted-foreground">Get notified about nearby deals and offers</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms"
                  checked={data.notificationsSms}
                  onCheckedChange={(checked) => setData(prev => ({ ...prev, notificationsSms: checked as boolean }))}
                />
                <Label htmlFor="sms" className="flex-1">
                  SMS notifications for urgent deals and offers
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={data.notificationsEmail}
                  onCheckedChange={(checked) => setData(prev => ({ ...prev, notificationsEmail: checked as boolean }))}
                />
                <Label htmlFor="email" className="flex-1">
                  Email updates about weekly deals and new shops
                </Label>
              </div>
            </div>

            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">You're all set!</h3>
              <p className="text-muted-foreground">Ready to start shopping with LocalMarket</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2:
        return data.city.trim() !== '' && data.state.trim() !== '';
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Welcome to LocalMarket</CardTitle>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="p-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep < totalSteps && currentStep !== 2 && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  Skip for now
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <CheckCircle className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}