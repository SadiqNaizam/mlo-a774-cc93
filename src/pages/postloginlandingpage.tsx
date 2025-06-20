import React from 'react';
import AppHeader from '@/components/layout/AppHeader'; // Custom component
import AppFooter from '@/components/layout/AppFooter'; // Custom component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui
import { Textarea } from '@/components/ui/textarea'; // shadcn/ui
import { Button } from '@/components/ui/button'; // shadcn/ui
// No Link from react-router-dom is directly needed for this page's content structure,
// as AppHeader and AppFooter handle navigation.

const PostLoginLandingPage = () => {
  console.log('PostLoginLandingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-foreground">
      <AppHeader />

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center sm:text-left">
                Welcome to Your Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                You have successfully logged in. This is your main application area.
                From here, you can access all the features and manage your account.
              </p>
              
              <div className="space-y-2">
                <label htmlFor="quick-note" className="text-sm font-medium text-muted-foreground">
                  Quick Note
                </label>
                <Textarea 
                  id="quick-note"
                  placeholder="Jot down a quick note or reminder..." 
                  className="min-h-[100px] resize-none"
                />
              </div>
              
              <div className="flex justify-end">
                <Button>
                  Save Note
                </Button>
              </div>

              <section className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold mb-3">Next Steps:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Explore your profile settings.</li>
                  <li>Check out the latest application updates.</li>
                  <li>Start a new project or task.</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default PostLoginLandingPage;