import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ClubInfo {
  id: string;
  section: string;
  title: string;
  description: string;
  created_at: string;
}

const AboutManagement = () => {
  const { user } = useAuth();
  const [clubInfo, setClubInfo] = useState<ClubInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingInfo, setEditingInfo] = useState<ClubInfo | null>(null);
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    description: ''
  });

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
      toast.error('Failed to load club information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const infoData = {
        ...formData,
        created_by: user.id
      };

      if (editingInfo) {
        const { error } = await supabase
          .from('club_info')
          .update(infoData)
          .eq('id', editingInfo.id);

        if (error) throw error;
        toast.success('Club information updated successfully');
      } else {
        const { error } = await supabase
          .from('club_info')
          .insert([infoData]);

        if (error) throw error;
        toast.success('Club information added successfully');
      }

      resetForm();
      fetchClubInfo();
    } catch (error) {
      console.error('Error saving club info:', error);
      toast.error('Failed to save club information');
    }
  };

  const handleEdit = (info: ClubInfo) => {
    setEditingInfo(info);
    setFormData({
      section: info.section,
      title: info.title,
      description: info.description
    });
    setIsCreating(true);
  };

  const handleDelete = async (infoId: string) => {
    if (!confirm('Are you sure you want to delete this information?')) return;

    try {
      const { error } = await supabase
        .from('club_info')
        .delete()
        .eq('id', infoId);

      if (error) throw error;
      toast.success('Club information deleted successfully');
      fetchClubInfo();
    } catch (error) {
      console.error('Error deleting club info:', error);
      toast.error('Failed to delete club information');
    }
  };

  const resetForm = () => {
    setFormData({
      section: '',
      title: '',
      description: ''
    });
    setEditingInfo(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="text-center">Loading club information...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">About Section Management</h2>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-gradient-gold text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Information
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingInfo ? 'Edit Club Information' : 'Add Club Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  placeholder="e.g., vision, mission, objectives"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={8}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-gold text-primary-foreground">
                  {editingInfo ? 'Update Information' : 'Add Information'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {clubInfo.map((info) => (
          <Card key={info.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  {info.section.charAt(0).toUpperCase() + info.section.slice(1)} - {info.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(info)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(info.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{info.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {clubInfo.length === 0 && !isCreating && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No club information found
            </h3>
            <p className="text-muted-foreground">
              Start by adding sections like vision, mission, or objectives for your club.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AboutManagement;