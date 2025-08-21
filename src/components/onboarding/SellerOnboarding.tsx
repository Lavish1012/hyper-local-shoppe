import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, ArrowRight, Store, MapPin, Phone, Clock, Package, CreditCard, Upload, CheckCircle, Loader2 } from 'lucide-react';

interface SellerOnboardingProps {
  onComplete: () => void;
}

interface SellerData {
  shopName: string;
  storeType: string;
  shopAddress: string;
  shopPincode: string;
  ownerName: string;
  phoneNumber: string;
  whatsappNumber: string;
  openingTime: string;
  closingTime: string;
  weeklyHolidays: string[];
  productsSold: string[];
  deliveryAvailable: boolean;
  paymentMethods: string[];
  logoUrl?: string;
  storeImageUrl?: string;
}

const STORE_TYPES = [
  { value: 'grocery', label: 'Grocery Store', icon: '🛒' },
  { value: 'dairy', label: 'Dairy & Milk Products', icon: '🥛' },
  { value: 'medical', label: 'Medical & Pharmacy', icon: '💊' },
  { value: 'stationery', label: 'Stationery & Books', icon: '📚' },
  { value: 'bakery', label: 'Bakery & Confectionery', icon: '🍞' },
  { value: 'fruits_vegetables', label: 'Fruits & Vegetables', icon: '🥕' },
  { value: 'electronics', label: 'Electronics', icon: '📱' },
  { value: 'clothing', label: 'Clothing & Fashion', icon: '👕' },
  { value: 'hardware', label: 'Hardware & Tools', icon: '🔧' },
  { value: 'other', label: 'Other', icon: '🏪' },
];

const PRODUCT_CATEGORIES = [
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

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash', icon: '💵' },
  { value: 'upi', label: 'UPI (PhonePe, GPay, etc.)', icon: '📱' },
  { value: 'card', label: 'Debit/Credit Card', icon: '💳' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function SellerOnboarding({ onComplete }: SellerOnboardingProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SellerData>({
    shopName: '',
    storeType: '',
    shopAddress: '',
    shopPincode: '',
    ownerName: '',
    phoneNumber: '',
    whatsappNumber: '',
    openingTime: '09:00',
    closingTime: '21:00',
    weeklyHolidays: [],
    productsSold: [],
    deliveryAvailable: false,
    paymentMethods: ['cash'],
  });

  const totalSteps = 6;
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

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('seller_profiles')
        .insert({
          user_id: user.id,
          shop_name: data.shopName,
          store_type: data.storeType as any,
          shop_address: data.shopAddress,
          shop_pincode: data.shopPincode,
          owner_name: data.ownerName,
          phone_number: data.phoneNumber,
          whatsapp_number: data.whatsappNumber || null,
          opening_time: data.openingTime || null,
          closing_time: data.closingTime || null,
          weekly_holidays: data.weeklyHolidays,
          products_sold: data.productsSold as any,
          delivery_available: data.deliveryAvailable,
          payment_methods: data.paymentMethods as any,
          logo_url: data.logoUrl || null,
          store_image_url: data.storeImageUrl || null,
          onboarding_completed: true,
        });

      if (error) throw error;

      toast({
        title: 'Welcome to LocalMarket! 🎉',
        description: 'Your shop profile has been set up successfully.',
      });

      onComplete();
    } catch (error) {
      console.error('Error saving seller profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your shop profile. Please try again.',
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
              <Store className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Tell us about your business</h2>
              <p className="text-muted-foreground">Basic details about your shop</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name *</Label>
                <Input
                  id="shopName"
                  placeholder="Enter your shop name"
                  value={data.shopName}
                  onChange={(e) => setData(prev => ({ ...prev, shopName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeType">Type of Store *</Label>
                <Select
                  value={data.storeType}
                  onValueChange={(value) => setData(prev => ({ ...prev, storeType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your store type" />
                  </SelectTrigger>
                  <SelectContent>
                    {STORE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          {type.label}
                        </div>
                      </SelectItem>
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
              <h2 className="text-2xl font-semibold mb-2">Where is your shop located?</h2>
              <p className="text-muted-foreground">This helps customers find you easily</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopAddress">Shop Address *</Label>
                <Textarea
                  id="shopAddress"
                  placeholder="Enter your complete shop address"
                  value={data.shopAddress}
                  onChange={(e) => setData(prev => ({ ...prev, shopAddress: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopPincode">Pincode *</Label>
                <Input
                  id="shopPincode"
                  placeholder="Enter your area pincode"
                  value={data.shopPincode}
                  onChange={(e) => setData(prev => ({ ...prev, shopPincode: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
              <p className="text-muted-foreground">How can customers reach you?</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner's Full Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Enter the shop owner's name"
                  value={data.ownerName}
                  onChange={(e) => setData(prev => ({ ...prev, ownerName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  value={data.phoneNumber}
                  onChange={(e) => setData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  placeholder="Enter WhatsApp number (if different)"
                  value={data.whatsappNumber}
                  onChange={(e) => setData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Operating Hours</h2>
              <p className="text-muted-foreground">When is your shop open?</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <Input
                    id="openingTime"
                    type="time"
                    value={data.openingTime}
                    onChange={(e) => setData(prev => ({ ...prev, openingTime: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <Input
                    id="closingTime"
                    type="time"
                    value={data.closingTime}
                    onChange={(e) => setData(prev => ({ ...prev, closingTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Weekly Holidays (optional)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={data.weeklyHolidays.includes(day)}
                        onCheckedChange={() => 
                          toggleArrayItem(
                            data.weeklyHolidays, 
                            day, 
                            (holidays) => setData(prev => ({ ...prev, weeklyHolidays: holidays }))
                          )
                        }
                      />
                      <Label htmlFor={day} className="text-sm">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Products & Services</h2>
              <p className="text-muted-foreground">What do you sell?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Products Sold *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <div
                      key={category.value}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                        data.productsSold.includes(category.value)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => 
                        toggleArrayItem(
                          data.productsSold, 
                          category.value, 
                          (products) => setData(prev => ({ ...prev, productsSold: products }))
                        )
                      }
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{category.icon}</div>
                        <div className="text-xs font-medium">{category.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delivery"
                    checked={data.deliveryAvailable}
                    onCheckedChange={(checked) => setData(prev => ({ ...prev, deliveryAvailable: checked as boolean }))}
                  />
                  <Label htmlFor="delivery">🚚 Delivery Available</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Payment & Final Details</h2>
              <p className="text-muted-foreground">How do customers pay?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Payment Methods Accepted *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <div
                      key={method.value}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                        data.paymentMethods.includes(method.value)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => 
                        toggleArrayItem(
                          data.paymentMethods, 
                          method.value, 
                          (methods) => setData(prev => ({ ...prev, paymentMethods: methods }))
                        )
                      }
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{method.icon}</div>
                        <div className="text-xs font-medium">{method.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center p-6 border border-dashed border-border rounded-lg">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Shop Logo & Images</p>
                <p className="text-xs text-muted-foreground">You can upload your shop logo and images later from your dashboard</p>
              </div>

              <div className="text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">Ready to go live!</h3>
                <p className="text-muted-foreground">Your shop will be visible to customers in your area</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.shopName.trim() !== '' && data.storeType !== '';
      case 2:
        return data.shopAddress.trim() !== '' && data.shopPincode.trim() !== '';
      case 3:
        return data.ownerName.trim() !== '' && data.phoneNumber.trim() !== '';
      case 5:
        return data.productsSold.length > 0;
      case 6:
        return data.paymentMethods.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Setup Your Shop</CardTitle>
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
              {currentStep < totalSteps && ![1, 2, 3, 5, 6].includes(currentStep) && (
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
                  disabled={isLoading || !canProceed()}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting up shop...
                    </>
                  ) : (
                    <>
                      Launch My Shop
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