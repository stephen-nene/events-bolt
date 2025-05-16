import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Calendar, 
  TicketIcon, 
  User, 
  LogOut, 
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'creator':
        return '/creator';
      default:
        return '/dashboard';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white dark:bg-gray-900 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold tracking-tight">EventHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/events"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Explore Events
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth/User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardPath()} className="flex w-full items-center cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex w-full items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-tickets" className="flex w-full items-center cursor-pointer">
                      <TicketIcon className="mr-2 h-4 w-4" />
                      My Tickets
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex w-full items-center cursor-pointer text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="font-medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-3 border-t">
            <Link
              to="/events"
              className="block py-2 text-base hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore Events
            </Link>
            <Link
              to="/about"
              className="block py-2 text-base hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-base hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="pt-2 border-t">
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center py-2 text-base hover:text-purple-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 text-base hover:text-purple-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    to="/my-tickets"
                    className="flex items-center py-2 text-base hover:text-purple-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <TicketIcon className="mr-2 h-5 w-5" />
                    My Tickets
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full py-2 text-base text-red-500"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full justify-center">
                    Log In
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-center bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};