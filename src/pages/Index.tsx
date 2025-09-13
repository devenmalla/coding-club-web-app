import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import codingClubLogo from '@/assets/coding-club-logo-new.png';
import { 
  Code2, 
  Calendar, 
  FileText, 
  Users, 
  BookOpen, 
  Camera,
  ArrowRight,
  Zap,
  Target,
  Lightbulb
} from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Events & Workshops',
      description: 'Discover upcoming coding events, hackathons, and workshops',
      icon: Calendar,
      path: '/events',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Resources',
      description: 'Access coding materials, tutorials, and documentation',
      icon: BookOpen,
      path: '/resources',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Gallery',
      description: 'View photos from our events and activities',
      icon: Camera,
      path: '/gallery',
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Our Team',
      description: 'Meet our mentors and student coordinators',
      icon: Users,
      path: '/team',
      color: 'from-orange-500 to-red-600'
    },
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="p-4 bg-gradient-gold rounded-full"
        >
          <Code2 className="h-8 w-8 text-primary-foreground" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-8"
            >
              <img 
                src={codingClubLogo} 
                alt="Coding Club SET-NU Nagaland University Logo" 
                className="h-32 w-32 mx-auto"
              />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Coding Club
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-white/80 mb-4"
            >
              Nagaland University, Kohima Campus
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-8 text-white/70"
            >
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                <span>Innovation</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                <span>Excellence</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                <span>Creativity</span>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-lg text-white/70 mb-8 max-w-2xl mx-auto"
            >
              Join our community of passionate developers, innovators, and tech enthusiasts. 
              Learn, build, and grow together in the exciting world of programming.
            </motion.p>

            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Button 
                  onClick={() => navigate('/auth')}
                  size="lg"
                  className="bg-gradient-gold text-primary-foreground hover:opacity-90 text-lg px-8 py-6 rounded-xl"
                >
                  Join the Club
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>


      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Explore Our Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover everything our coding club has to offer, from exciting events to valuable resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => navigate(action.path)}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/50">
                  <CardHeader className="pb-3">
                    <div className="bg-gradient-gold p-3 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform duration-300">
                      <action.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">
                      {action.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{action.description}</p>
                    <Button variant="ghost" className="p-0 h-auto text-accent hover:text-accent/80">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you're a beginner or an experienced developer, our community welcomes everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/events')}
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                View Upcoming Events
              </Button>
              <Button 
                onClick={() => navigate('/resources')}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Browse Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
