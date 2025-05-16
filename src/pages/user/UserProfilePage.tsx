import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { User, UserRound, Mail, Lock, Bell, CreditCard, ShieldCheck, LogOut } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully.',
        variant: 'default',
      });
      setIsUpdating(false);
    }, 1500);
  };
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: 'Password Updated',
        description: 'Your password has been updated successfully.',
        variant: 'default',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsUpdating(false);
    }, 1500);
  };
  
  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar menu */}
        <div className="md:w-64 space-y-4">
          <ProfileMenu />
        </div>
        
        {/* Content area */}
        <div className="flex-1">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and how others see you on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar section */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm">Upload new image</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Profile form */}
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Account Type</Label>
                      <Input
                        id="role"
                        value={user.role === 'user' ? 'Regular User' : user.role === 'creator' ? 'Event Creator' : 'Administrator'}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Your account type determines what you can do on the platform.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Password Tab */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Update Password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage when and how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    Notification settings coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Methods Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods for booking events.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    Payment method management coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const ProfileMenu: React.FC = () => {
  const { logout } = useAuth();
  
  return (
    <Card>
      <CardContent className="p-4">
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <UserRound className="h-4 w-4 mr-2" />
            Personal Info
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Privacy
          </Button>
          <Separator className="my-2" />
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
};