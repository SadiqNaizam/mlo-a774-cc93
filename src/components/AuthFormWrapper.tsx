import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Allows additional Tailwind classes to be passed to the Card
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ title, children, className }) => {
  console.log('AuthFormWrapper loaded with title:', title);

  return (
    <Card className={cn(
      "w-full max-w-md shadow-xl", // Default styling: full width up to max-w-md, with a shadow
      className // Allows overriding or extending styles
    )}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6"> 
        {/* pt-6 for padding below the title, space-y-6 for spacing between form elements */}
        {children}
      </CardContent>
    </Card>
  );
};

export default AuthFormWrapper;