import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Form components from shadcn/ui
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from "sonner"; // For toast notifications

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log('Forgot password form submitted with email:', data.email);
    setSubmissionStatus(null); // Reset status
    setStatusMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success/error
    if (data.email === "fail@example.com") {
      setSubmissionStatus('error');
      setStatusMessage("Unable to send reset instructions. Please try again or contact support.");
      toast.error("Failed to send reset link.", {
        description: "Please check the email address or try again later.",
      });
    } else {
      setSubmissionStatus('success');
      setStatusMessage(`If an account exists for ${data.email}, you will receive an email with password reset instructions shortly.`);
      toast.success("Password reset link sent!", {
        description: `Instructions have been sent to ${data.email}.`,
      });
      form.reset(); // Clear the form on success
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormWrapper title="Forgot Your Password?">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            No problem. Enter your email address below and we'll send you instructions to reset your password.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 peer-focus:text-primary" />
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 peer" // Add peer class for icon focus styling
                          {...field}
                          disabled={form.formState.isSubmitting || submissionStatus === 'success'}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      We'll email you a link to reset your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {submissionStatus && (
                <Alert variant={submissionStatus === 'error' ? 'destructive' : 'default'} className="mt-4">
                  {submissionStatus === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{submissionStatus === 'success' ? 'Instructions Sent!' : 'Error'}</AlertTitle>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </Alert>
              )}
              
              {submissionStatus !== 'success' && (
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              )}
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            Remember your password?{' '}
            <Link to="/" className="font-medium text-primary hover:underline dark:text-primary-hover">
              Login
            </Link>
          </div>
          
          {submissionStatus === 'success' && (
             <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/')}>
                Back to Login
            </Button>
          )}

        </AuthFormWrapper>
      </main>
      <AuthFooter />
    </div>
  );
};

export default ForgotPasswordPage;