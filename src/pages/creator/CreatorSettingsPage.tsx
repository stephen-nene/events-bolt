import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  CreditCard, 
  Bell, 
  Settings, 
  Shield, 
  Users, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook,
  Mail
} from 'lucide-react';

export const CreatorSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Form states
  const [creatorName, setCreatorName] = useState(user?.name || '');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [facebookHandle, setFacebookHandle] = useState('');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
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
        description: 'Your creator profile has been updated successfully.',
        variant: 'default',
      });
      setIsUpdating(false);
    }, 1500);
  };
  
  const handleUpdateNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: 'Notification Preferences Updated',
        description: 'Your notification preferences have been saved.',
        variant: 'default',
      });
      setIsUpdating(false);
    }, 1500);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Creator Settings</h1>
        <p className="text-muted-foreground">
          Manage your creator profile, payout preferences, and notification settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="payout">Payout</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        
        {/* Profile tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Creator Profile</CardTitle>
              <CardDescription>
                Update your creator profile information and social media links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile picture */}
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
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="creator-name">Creator/Organization Name</Label>
                  <Input
                    id="creator-name"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell attendees about yourself or your organization"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    This bio will be visible on your creator profile and event pages
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Social Media</Label>
                  <div className="space-y-4">
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Twitter username"
                        value={twitterHandle}
                        onChange={(e) => setTwitterHandle(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Instagram username"
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Facebook page URL"
                        value={facebookHandle}
                        onChange={(e) => setFacebookHandle(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
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
        
        {/* Payout tab */}
        <TabsContent value="payout">
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>
                Manage how you receive payments from your events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-purple-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Payout Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add a bank account or payment method to receive payouts
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Add Payout Method
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Payout Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Weekly payouts</div>
                      <div className="text-sm text-muted-foreground">Receive payouts every Monday</div>
                    </div>
                    <Switch checked={true} disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Monthly payouts</div>
                      <div className="text-sm text-muted-foreground">Receive payouts on the 1st of each month</div>
                    </div>
                    <Switch checked={false} disabled />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Payout History</h3>
                <p className="text-center py-8 text-muted-foreground">
                  No payouts to display yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleUpdateNotifications} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Booking confirmations</div>
                      <div className="text-sm text-muted-foreground">Receive an email when someone books your event</div>
                    </div>
                    <Switch 
                      checked={bookingNotifications} 
                      onCheckedChange={setBookingNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Event reminders</div>
                      <div className="text-sm text-muted-foreground">Get reminders about your upcoming events</div>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Marketing emails</div>
                      <div className="text-sm text-muted-foreground">Receive tips and resources for event organizers</div>
                    </div>
                    <Switch 
                      checked={marketingEmails} 
                      onCheckedChange={setMarketingEmails} 
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Preferences'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Team tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Invite team members to help manage your events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-purple-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Team Members</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Invite people to help you manage your events and analyze data
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Invite Team Member
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Current Team</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Owner</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Pending Invitations</h3>
                <div className="rounded-md border p-6 text-center">
                  <Mail className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No pending invitations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};