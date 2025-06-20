import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
  console.log('AppFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/70 border-t mt-auto">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm">
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-3 text-base">App Name</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your go-to application for seamless experiences and productivity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-base">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/post-login-landing" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
              {/* Add more primary navigation links if available */}
              <li><Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li> {/* Placeholder */}
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li> {/* Placeholder */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-base">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li> {/* Placeholder */}
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li> {/* Placeholder */}
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li> {/* Placeholder */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-base">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {currentYear} App Name Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;