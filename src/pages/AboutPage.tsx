import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Globe, Award, Heart, TrendingUp } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">About EventHub</h1>
              <p className="text-lg leading-relaxed text-purple-100">
                EventHub is a premier platform connecting event organizers with attendees, 
                making it easy to discover, create, and manage memorable events around the world.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Calendar className="h-48 w-48 text-purple-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            To create a global ecosystem where event creators and attendees can connect, 
            collaborate, and participate in meaningful experiences that enrich lives 
            and build communities.
          </p>
          <div className="flex justify-center">
            <Link to="/events">
              <Button className="bg-purple-600 hover:bg-purple-700">Explore Events</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features cards */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">What Makes Us Different</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 inline-block mb-4">
                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Connect with attendees and event organizers from around the world, 
                expanding your reach beyond geographic boundaries.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 inline-block mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community-Focused</h3>
              <p className="text-muted-foreground">
                Build and engage with communities around shared interests, 
                creating lasting connections and memories.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 inline-block mb-4">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Events</h3>
              <p className="text-muted-foreground">
                We curate and highlight exceptional events that meet our standards 
                for quality, safety, and attendee experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 inline-block mb-4">
                <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
              <p className="text-muted-foreground">
                Our platform learns your preferences to recommend events 
                that match your interests and past attendance.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 inline-block mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Creator Growth</h3>
              <p className="text-muted-foreground">
                We provide tools, analytics, and support to help event creators 
                grow their audience and improve their events.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 inline-block mb-4">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Experience</h3>
              <p className="text-muted-foreground">
                From discovery to booking to attendance, we ensure a smooth 
                and hassle-free experience for all parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300"
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "https://images.pexels.com/photos/3799753/pexels-photo-3799753.jpeg?auto=compress&cs=tinysrgb&w=300"
              },
              {
                name: "Jessica Williams",
                role: "Head of Marketing",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
              },
              {
                name: "David Rodriguez",
                role: "Head of Operations",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover h-full w-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-purple-100 dark:bg-purple-900">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers and attendees already using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 min-w-[150px]">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="min-w-[150px]">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};