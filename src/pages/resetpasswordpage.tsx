import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const passwordResetSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Error applies to the confirmPassword field
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const ResetPasswordPage: React.FC = () => {
  console.log('ResetPasswordPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
      // In a real app, you might validate the token with the backend here.
      console.log("Password reset token found:", resetToken);
    } else {
      setFormError("Invalid or missing password reset token. Please request a new password reset link.");
      console.error("ResetPasswordPage: No token found in URL.");
    }
  }, [searchParams]);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    if (!token) {
      setFormError("Cannot reset password without a valid token.");
      return;
    }
    setIsLoading(true);
    setFormError(null);
    setFormSuccess(null);

    console.log("Attempting password reset with token:", token, "and data:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate API response
    const isSuccess = Math.random() > 0.2; // 80% success rate for simulation

    if (isSuccess) {
      setFormSuccess("Your password has been successfully reset! Redirecting to login...");
      form.reset();
      setTimeout(() => {
        navigate('/'); // Navigate to LoginPage (path '/' from App.tsx)
      }, 3000);
    } else {
      setFormError("Failed to reset password. The token might be invalid or expired. Please try again or request a new link.");
    }
    setIsLoading(false);
  };

  const isFormDisabled = isLoading || !!formSuccess || !token;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <AuthHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <AuthFormWrapper title="Reset Your Password" className="w-full max-w-md">
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          {formSuccess && (
            <Alert variant="default" className="mb-4 bg-green-50 border-green-300 dark:bg-green-900 dark:border-green-700">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-700 dark:text-green-300">Success</AlertTitle>
              <AlertDescription className="text-green-600 dark:text-green-400">{formSuccess}</AlertDescription>
            </Alert>
          )}

          {!token && !formError && ( // Show loading/message if token is being processed or still missing before error
            <Alert className="mb-4">
              <AlertTitle>Verifying Link</AlertTitle>
              <AlertDescription>Please wait while we verify your password reset link...</AlertDescription>
            </Alert>
          )}

          {token && !formSuccess && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                          disabled={isFormDisabled}
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your new password"
                          {...field}
                          disabled={isFormDisabled}
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isFormDisabled}>
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center text-sm">
            <Link
              to="/" // LoginPage path from App.tsx
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </AuthFormWrapper>
      </main>
      <AuthFooter />
    </div>
  );
};

export default ResetPasswordPage;