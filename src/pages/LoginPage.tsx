import React from 'react';
import { LoginForm } from '@/components/authentication/LoginForm';
import { Calendar } from 'lucide-react';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          {/* Left side - Brand information */}
          <div className="hidden lg:block lg:w-1/2 lg:pr-12">
            <div className="flex items-center mb-6">
              <Calendar className="h-10 w-10 text-purple-600" />
              <span className="ml-2 text-2xl font-bold tracking-tight">EventHub</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Log in to your account to continue discovering amazing events, book tickets, and manage your event calendar.
            </p>
            <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Demo Accounts Available</h3>
              <p className="text-sm text-muted-foreground">
                Try out different user roles using our demo accounts:
              </p>
              <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                <li>Regular User: Browse and book events</li>
                <li>Event Creator: Create and manage your own events</li>
                <li>Admin: Full access to platform management</li>
              </ul>
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};