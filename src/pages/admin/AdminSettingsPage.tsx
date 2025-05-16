import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Shield, 
  Lock, 
  Mail, 
  Bell, 
  CreditCard, 
  Percent, 
  FileText, 
  Calendar,
  Globe,
  Paintbrush,
  DollarSign,
  Network,
  Info
} from 'lucide-react';
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from '@/components/ui/select';

export const AdminSettingsPage: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  
  // Settings state
  const [platformName, setPlatformName] = useState('EventHub');
  const [supportEmail, setSupportEmail] = useState('support@eventhub.com');
  const [platformFee, setPlatformFee] = useState('5');
  
  // Feature toggles
  const [isEventApprovalRequired, setIsEventApprovalRequired] = useState(true);
  const [isUserVerificationRequired, setIsUserVerificationRequired] = useState(false);
  const [allowMultiDayEvents, setAllowMultiDayEvents] = useState(true);
  const [enablePayouts, setEnablePayouts] = useState(true);
  const user = {
    name: "steve",
    email: "wefydwefvwef",
    titile: "dr",
    date: "12/2/3333",
    
  }
  const handleUpdateGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Settings updated",
        description: "General settings have been updated successfully.",
        variant: "default",
      });
      setIsUpdating(false);
    }, 1500);
  };
  
  const handleUpdateSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully.",
        variant: "default",
      });
      setIsUpdating(false);
    }, 1500);
  };
  
  const handleUpdateEmailTemplates = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Email templates updated",
        description: "Your email templates have been updated successfully.",
        variant: "default",
      });
      setIsUpdating(false);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">
          Configure and manage global settings for the platform
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-8">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        {/* General tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic platform settings and feature toggles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleUpdateGeneralSettings} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Platform Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input
                        id="platform-name"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input
                        id="support-email"
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="platform-description">Platform Description</Label>
                    <Textarea
                      id="platform-description"
                      placeholder="Describe your event platform"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Feature Management</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Event approval required</div>
                        <div className="text-sm text-muted-foreground">Require admin approval before events are published</div>
                      </div>
                      <Switch 
                        checked={isEventApprovalRequired} 
                        onCheckedChange={setIsEventApprovalRequired} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">User verification required</div>
                        <div className="text-sm text-muted-foreground">Require email verification for new accounts</div>
                      </div>
                      <Switch 
                        checked={isUserVerificationRequired} 
                        onCheckedChange={setIsUserVerificationRequired} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Multi-day events</div>
                        <div className="text-sm text-muted-foreground">Allow creation of events spanning multiple days</div>
                      </div>
                      <Switch 
                        checked={allowMultiDayEvents} 
                        onCheckedChange={setAllowMultiDayEvents} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Organizer payouts</div>
                        <div className="text-sm text-muted-foreground">Enable automatic payouts to event organizers</div>
                      </div>
                      <Switch 
                        checked={enablePayouts} 
                        onCheckedChange={setEnablePayouts} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateSecuritySettings} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Two-factor authentication</div>
                        <div className="text-sm text-muted-foreground">Require 2FA for admin accounts</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Password complexity</div>
                        <div className="text-sm text-muted-foreground">Require strong passwords (8+ chars, mixed case, numbers)</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        defaultValue={60}
                        min={15}
                        max={1440}
                      />
                      <p className="text-xs text-muted-foreground">
                        Time before inactive users are automatically logged out
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Content Security</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Content moderation</div>
                        <div className="text-sm text-muted-foreground">Enable automatic content screening for prohibited content</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Image scanning</div>
                        <div className="text-sm text-muted-foreground">Scan uploaded images for inappropriate content</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Security Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Changes to security settings may require users to re-authenticate.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Save Security Settings'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payments tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment providers, fees, and payout schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Fees</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="platform-fee"
                      type="number"
                      value={platformFee}
                      onChange={(e) => setPlatformFee(e.target.value)}
                      className="pl-10"
                      min="0"
                      max="25"
                      step="0.1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentage fee charged on each ticket sale
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Pass fees to attendees</div>
                    <div className="text-sm text-muted-foreground">Automatically add platform fees to ticket prices</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payout Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="payout-schedule">Default Payout Schedule</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="payout-schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minimum-payout">Minimum Payout Amount ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="minimum-payout"
                      type="number"
                      defaultValue="50"
                      className="pl-10"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Hold payments for review</div>
                    <div className="text-sm text-muted-foreground">Manually review payments above $500</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Providers</h3>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-purple-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Stripe is configured as your payment processor
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Configure Stripe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Save Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Email Templates tab */}
        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize email templates sent to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateEmailTemplates} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium">Email Templates</h3>
                    <Select defaultValue="welcome">
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome Email</SelectItem>
                        <SelectItem value="booking">Booking Confirmation</SelectItem>
                        <SelectItem value="reminder">Event Reminder</SelectItem>
                        <SelectItem value="organizer">Organizer Approval</SelectItem>
                        <SelectItem value="refund">Refund Notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Email Subject</Label>
                    <Input
                      id="email-subject"
                      defaultValue="Welcome to EventHub!"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-content">Email Body</Label>
                    <Textarea
                      id="email-content"
                      className="min-h-[300px] font-mono text-sm"
                      defaultValue={`<h1>Welcome to EventHub!</h1>
<p>Hello {{user.name}},</p>
<p>Thank you for joining EventHub, the premier platform for discovering amazing events!</p>
<p>With your new account, you can:</p>
<ul>
  <li>Browse and discover events matching your interests</li>
  <li>Purchase tickets securely</li>
  <li>Receive updates about upcoming events</li>
</ul>
<p>If you have any questions, feel free to contact our support team.</p>
<p>Best regards,<br/>The EventHub Team</p>`}
                    />
                    <p className="text-xs text-muted-foreground">
                      {/* Use HTML formatting and `{{variable}} placeholders for dynamic content. */}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-900">
                  <h4 className="font-medium mb-2">Available Variables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {/* <div><code>{{user.name}}</code> - User's name</div> */}
                    {/* <div><code>{{f.email}}</code> - User's email</div>
                    <div><code>{{event.title}}</code> - Event title</div>
                    <div><code>{{event.date}}</code> - Event date</div>
                    <div><code>{{booking.id}}</code> - Booking reference</div>
                    <div><code>{{booking.amount}}</code> - Booking amount</div> */}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline">
                    Preview Email
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Save Template'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Branding</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Logo</Label>
                      <div className="border rounded-md p-4 text-center">
                        <div className="w-40 h-40 mx-auto bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                          <Calendar className="h-12 w-12 text-purple-600" />
                        </div>
                        <Button variant="outline" size="sm">
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <div className="border rounded-md p-4 text-center">
                        <div className="w-40 h-40 mx-auto bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                          <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <Button variant="outline" size="sm">
                          Upload Favicon
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme Colors</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex">
                        <input 
                          type="color" 
                          id="primary-color" 
                          defaultValue="#6D28D9" 
                          className="w-12 h-10 rounded-l-md border border-r-0"
                        />
                        <Input 
                          defaultValue="#6D28D9" 
                          className="rounded-l-none" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex">
                        <input 
                          type="color" 
                          id="secondary-color" 
                          defaultValue="#0D9488" 
                          className="w-12 h-10 rounded-l-md border border-r-0"
                        />
                        <Input 
                          defaultValue="#0D9488" 
                          className="rounded-l-none" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex">
                        <input 
                          type="color" 
                          id="accent-color" 
                          defaultValue="#EC4899" 
                          className="w-12 h-10 rounded-l-md border border-r-0"
                        />
                        <Input 
                          defaultValue="#EC4899" 
                          className="rounded-l-none" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Dark Mode</div>
                      <div className="text-sm text-muted-foreground">Allow users to switch to dark mode</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Custom CSS</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-css">Custom CSS</Label>
                    <Textarea
                      id="custom-css"
                      className="min-h-[200px] font-mono text-sm"
                      placeholder="/* Add your custom CSS here */"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add custom CSS to override default styles
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};