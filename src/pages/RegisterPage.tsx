import React from 'react';
import { RegisterForm } from '@/components/authentication/RegisterForm';
import { Calendar } from 'lucide-react';

export const RegisterPage: React.FC = () => {
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
            <h1 className="text-4xl font-bold mb-4">Join EventHub today!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Create an account to discover and attend amazing events, or start hosting your own events to the world.
            </p>
            <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Why Sign Up?</h3>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Discover events tailored to your interests</li>
                <li>Get notified about upcoming events</li>
                <li>Save your favorite events</li>
                <li>Purchase tickets seamlessly</li>
                <li>Option to become an event creator</li>
              </ul>
            </div>
          </div>
          
          {/* Right side - Registration form */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};