import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'You have been logged in successfully',
        variant: 'default',
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Try using one of the demo accounts.');
      toast({
        title: 'Error',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (type: 'user' | 'creator' | 'admin') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const demoEmails = {
        user: 'user@example.com',
        creator: 'creator@example.com',
        admin: 'admin@example.com',
      };
      
      await login(demoEmails[type], 'password123');
      
      toast({
        title: 'Demo Login Success',
        description: `Logged in as ${type}`,
        variant: 'default',
      });
      
      if (type === 'admin') {
        navigate('/admin');
      } else if (type === 'creator') {
        navigate('/creator');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to login with demo account.');
      toast({
        title: 'Error',
        description: 'Failed to login with demo account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="mt-2 text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-purple-600 hover:text-purple-800"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-muted-foreground">
            Demo Accounts
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleDemoLogin('user')}
          disabled={isLoading}
        >
          Login as Regular User
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleDemoLogin('creator')}
          disabled={isLoading}
        >
          Login as Event Creator
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleDemoLogin('admin')}
          disabled={isLoading}
        >
          Login as Admin
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:text-purple-800"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};