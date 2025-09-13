import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Target, BookOpen, Users, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface ClubInfo {
  id: string;
  section: string;
  title: string;
  description: string;
}

const About = () => {
  const [clubInfo, setClubInfo] = useState<ClubInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubInfo();
  }, []);

  const fetchClubInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('club_info')
        .select('*')
        .order('section', { ascending: true });

      if (error) throw error;
      setClubInfo(data || []);
    } catch (error) {
      console.error('Error fetching club info:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (section: string) => {
    switch (section) {
      case 'vision':
        return <Lightbulb className="h-6 w-6" />;
      case 'mission':
        return <Target className="h-6 w-6" />;
      case 'objectives':
        return <BookOpen className="h-6 w-6" />;
      case 'rules':
        return <Shield className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  const renderContent = (content: string, section: string) => {
    // Handle different sections differently
    if (section === 'mission') {
      const items = content.split('•').filter(item => item.trim());
      return (
        <ul className="space-y-3 text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {item.trim()}
            </li>
          ))}
        </ul>
      );
    } else if (section === 'objectives') {
      const objectives = content.split('\n\n').filter(obj => obj.trim());
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((objective, index) => {
            const [title, description] = objective.split(': ');
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="p-4 rounded-lg border border-primary/10 bg-background/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-primary">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </motion.div>
            );
          })}
        </div>
      );
    } else if (section === 'rules') {
      const sections = content.split('\n\n').filter(sec => sec.trim());
      return (
        <div className="space-y-6">
          {sections.map((section, index) => {
            const lines = section.split('\n');
            const title = lines[0];
            const items = lines.slice(1);
            
            const isDisciplinary = title.includes('Disciplinary');
            
            return (
              <div key={index}>
                <h3 className={`text-lg font-semibold mb-3 ${isDisciplinary ? 'text-destructive flex items-center gap-2' : 'text-primary'}`}>
                  {isDisciplinary && <AlertTriangle className="h-5 w-5" />}
                  {title}
                </h3>
                {items.length > 1 ? (
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{items[0]}</p>
                )}
              </div>
            );
          })}
        </div>
      );
    } else {
      return <p className="text-lg text-muted-foreground whitespace-pre-wrap">{content}</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Coding Club Nagaland University, Kohima Campus
            </h1>
            <Link to="/">
              <Button 
                variant="outline"
                className="hidden md:flex"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="space-y-12">
          {clubInfo.map((info, index) => (
            <motion.div
              key={info.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
            >
              <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    {getIcon(info.section)}
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderContent(info.description, info.section)}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {clubInfo.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No club information available
            </h3>
            <p className="text-muted-foreground">
              Club information will be displayed here once it's added by administrators.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;