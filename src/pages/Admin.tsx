import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Users, Calendar, FileText, Upload, Database, Camera } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import EventManagement from '@/components/admin/EventManagement';
import ResourceManagement from '@/components/admin/ResourceManagement';
import GalleryManagement from '@/components/admin/GalleryManagement';
import TeamManagement from '@/components/admin/TeamManagement';
import AboutManagement from '@/components/admin/AboutManagement';

const Admin = () => {
  const { user, profile, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Redirect non-admin users
  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const adminTabs = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Overview and quick stats',
      icon: Database
    },
    {
      id: 'events',
      title: 'Manage Events',
      description: 'Create, edit, and manage upcoming events and workshops',
      icon: Calendar
    },
    {
      id: 'resources',
      title: 'Resource Management',
      description: 'Upload and organize resources, documents, and materials',
      icon: Upload
    },
    {
      id: 'gallery',
      title: 'Gallery Management',
      description: 'Upload and manage photos of activities and events',
      icon: Camera
    },
    {
      id: 'team',
      title: 'Team Management',
      description: 'Update and manage team members information',
      icon: Users
    },
    {
      id: 'about',
      title: 'About Section',
      description: 'Update club details, mission, and general information',
      icon: FileText
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventManagement />;
      case 'resources':
        return <ResourceManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'team':
        return <TeamManagement />;
      case 'about':
        return <AboutManagement />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {adminTabs.slice(1).map((tab, index) => {
        const Icon = tab.icon;
        return (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab(tab.id)}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-gold rounded-full w-fit">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-primary">{tab.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  {tab.description}
                </p>
                <Button className="w-full bg-gradient-gold text-primary-foreground">
                  Manage
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {profile?.name}! Manage your Coding Club from here.
              </p>
            </div>
            {activeTab !== 'dashboard' && (
              <Button 
                onClick={() => setActiveTab('dashboard')}
                variant="outline"
              >
                Back to Dashboard
              </Button>
            )}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {adminTabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={activeTab === tab.id ? "bg-gradient-gold text-primary-foreground" : ""}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.title}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;