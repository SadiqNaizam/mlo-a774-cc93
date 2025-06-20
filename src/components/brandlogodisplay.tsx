import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture } from 'lucide-react'; // Using Aperture as a generic logo icon

interface BrandLogoDisplayProps {
  /**
   * Specifies the size of the logo.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS classes to apply to the root element.
   */
  className?: string;
  /**
   * The URL the logo should link to. If null, the logo will not be interactive.
   * @default '/'
   */
  linkTo?: string | null;
  /**
   * Whether to display the logo text alongside the icon.
   * @default true
   */
  showText?: boolean;
  /**
   * The text to display for the logo.
   * @default "AppLogo"
   */
  logoText?: string;
}

const BrandLogoDisplay: React.FC<BrandLogoDisplayProps> = ({
  size = 'md',
  className = '',
  linkTo = '/', // Default link to homepage (LoginPage in the provided App.tsx)
  showText = true,
  logoText = "AppLogo",
}) => {
  console.log('BrandLogoDisplay loaded');

  const iconSizeClasses = {
    sm: 'h-6 w-6', // Icon height and width
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const textSizeClasses = {
    sm: 'text-xl', // Font size for logoText
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  // Base classes for the container, ensuring consistent layout and focus styles
  const baseContainerClasses = "flex items-center gap-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm transition-colors duration-150";
  
  const content = (
    <>
      <Aperture 
        className={`${iconSizeClasses[size]} text-primary transition-transform duration-200 ease-in-out group-hover:rotate-[15deg] group-hover:scale-110`} 
        aria-hidden={showText ? "true" : "false"} // Icon is decorative if text is present
      />
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} text-foreground`}>
          {logoText}
        </span>
      )}
    </>
  );

  if (linkTo !== null) { // Render as a link if linkTo is a string (even empty)
    return (
      <Link 
        to={linkTo} 
        // The accessible name comes from the content (logoText if shown, or just icon).
        // If !showText, the icon itself should be recognized or have an implicit role from Link.
        // For a logo image/icon link, it's common that the link itself is sufficient.
        // Adding an aria-label if text is hidden provides more explicit accessibility.
        aria-label={!showText ? `${logoText} homepage` : undefined}
        className={`${baseContainerClasses} ${className} inline-block`} // Apply custom className here
      >
        {content}
      </Link>
    );
  }

  // Render as a non-interactive div if linkTo is null
  return (
    <div 
      className={`${baseContainerClasses} ${className} inline-flex`} // Apply custom className here, use inline-flex for layout consistency
      role={!showText ? "img" : undefined} // Role 'img' if it's just an icon representing the logo
      aria-label={!showText ? `${logoText} logo` : undefined}
    >
      {content}
    </div>
  );
};

export default BrandLogoDisplay;