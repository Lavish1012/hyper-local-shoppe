import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface CodeVerificationPendingProps {
  email: string;
  onVerificationComplete?: () => void;
}

export function CodeVerificationPending({ email, onVerificationComplete }: CodeVerificationPendingProps) {
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { resendVerification, verifyOtp } = useAuth();
  const { toast } = useToast();

  const handleResendVerification = async () => {
    setIsResending(true);
    setResendSuccess(false);
    setError('');

    const { error } = await resendVerification(email);

    if (error) {
      toast({
        title: 'Failed to resend verification',
        description: 'Please try again in a few moments.',
        variant: 'destructive',
      });
    } else {
      setResendSuccess(true);
      toast({
        title: 'Verification code sent!',
        description: 'Please check your inbox and spam folder.',
      });
    }

    setIsResending(false);
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    const { error } = await verifyOtp(email, code);

    if (error) {
      setError('Invalid or expired verification code. Please try again.');
      toast({
        title: 'Verification failed',
        description: 'Invalid or expired code. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Email verified successfully!',
        description: 'Welcome! Let\'s complete your profile setup.',
      });
      onVerificationComplete?.();
    }

    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Enter Verification Code</CardTitle>
          <CardDescription>
            We've sent a 6-digit code to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Enter the verification code from your email to complete your account setup.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={code} 
                onChange={(value) => {
                  setCode(value);
                  setError('');
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleVerifyCode}
              disabled={isVerifying || code.length !== 6}
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code? Check your spam folder or request a new one.
              </p>

              {resendSuccess && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Verification code sent successfully! Please check your inbox.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                variant="outline"
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Verification Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}