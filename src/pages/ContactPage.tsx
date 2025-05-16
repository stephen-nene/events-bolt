import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message Sent',
        description: 'Thank you for your message. We will get back to you soon.',
        variant: 'default',
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help! 
            Fill out the form below or use one of our contact methods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact information */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mr-4">
                    <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-muted-foreground mb-1">For general inquiries:</p>
                    <a href="mailto:info@eventhub.com" className="text-purple-600 hover:text-purple-800">
                      info@eventhub.com
                    </a>
                    <p className="text-muted-foreground mt-2 mb-1">For support:</p>
                    <a href="mailto:support@eventhub.com" className="text-purple-600 hover:text-purple-800">
                      support@eventhub.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mr-4">
                    <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-muted-foreground mb-1">Monday-Friday, 9 AM - 6 PM EST</p>
                    <a href="tel:+14155550123" className="text-purple-600 hover:text-purple-800">
                      +1 (415) 555-0123
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mr-4">
                    <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Event Street<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mr-4">
                    <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Live Chat</h3>
                    <p className="text-muted-foreground mb-2">
                      Available Monday-Friday, 9 AM - 6 PM EST for immediate assistance.
                    </p>
                    <Button variant="outline" size="sm">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline">
                    How do I create an account?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline">
                    Can I get a refund for a cancelled event?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline">
                    How do I become an event creator?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline">
                    What payment methods do you accept?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline">
                    View all FAQs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};