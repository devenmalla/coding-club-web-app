import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, User, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  contact: string | null;
  photo_url: string | null;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('coordinators')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (role: string) => {
    if (role.toLowerCase().includes('mentor')) {
      return <GraduationCap className="h-6 w-6" />;
    }
    return <User className="h-6 w-6" />;
  };

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
              Our Team
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals who lead and coordinate the Coding Club Nagaland University, Kohima Campus
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading team members...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Team Members Found</h3>
            <p className="text-muted-foreground">
              Team members will appear here once they are added through the admin panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-primary/20 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-4 rounded-full bg-primary/10 text-primary w-fit mb-4">
                      {member.photo_url ? (
                        <img 
                          src={member.photo_url} 
                          alt={member.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        getIcon(member.role)
                      )}
                    </div>
                    <CardTitle className="text-primary text-lg font-semibold">
                      {member.role}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">
                        {member.name}
                      </h3>
                    </div>
                    
                    {member.contact && (
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <a 
                          href={`tel:${member.contact}`}
                          className="hover:text-primary transition-colors duration-200"
                        >
                          {member.contact}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Join Our Team</h2>
              <p className="text-muted-foreground">
                Interested in taking on a leadership role? We're always looking for passionate students 
                to join our core team and help organize events, mentor fellow members, and contribute 
                to the growth of our coding community.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;