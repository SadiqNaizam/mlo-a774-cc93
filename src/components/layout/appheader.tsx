import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BrandLogoDisplay from '@/components/BrandLogoDisplay';
import { UserCircle, LogOut, Search, LayoutDashboard, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggleButton from '@/components/themetogglebutton'; // Corrected import path

const AppHeader: React.FC = () => {
  console.log('AppHeader loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Placeholder for actual logout logic (e.g., clearing token, API calls)
    console.log('User attempting to logout');
    navigate('/'); // Redirect to LoginPage
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/post-login-landing" aria-label="Go to dashboard">
            <BrandLogoDisplay />
          </Link>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <NavLink to="/post-login-landing" className={navLinkClasses} end>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            {/* Add other main navigation links here as they become available in App.tsx */}
            {/* Example: <NavLink to="/features" className={navLinkClasses}><Star className="h-4 w-4" />Features</NavLink> */}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative ml-auto flex-1 md:grow-0 hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-muted pl-8 md:w-[150px] lg:w-[250px] focus-visible:ring-primary"
            />
          </div>

          <ThemeToggleButton /> {/* ThemeToggleButton is included here */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}> {/* Placeholder, /profile not in App.tsx */}
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}> {/* Placeholder, /settings not in App.tsx */}
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;