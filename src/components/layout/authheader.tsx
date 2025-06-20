import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogoDisplay from '@/components/BrandLogoDisplay';

const AuthHeader: React.FC = () => {
  console.log('AuthHeader loaded');
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-background">
      <div className="container mx-auto flex items-center justify-center sm:justify-start">
        <Link to="/" aria-label="Go to homepage">
          <BrandLogoDisplay />
        </Link>
        {/* Minimalistic header: Omits main application navigation to reduce distraction on auth pages. */}
      </div>
    </header>
  );
};

export default AuthHeader;