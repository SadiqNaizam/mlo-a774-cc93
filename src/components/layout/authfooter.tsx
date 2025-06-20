import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter: React.FC = () => {
  console.log('AuthFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t mt-auto bg-background">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <nav className="flex justify-center gap-x-4 sm:gap-x-6 mb-3">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
        <p>&copy; {currentYear} Auth App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AuthFooter;