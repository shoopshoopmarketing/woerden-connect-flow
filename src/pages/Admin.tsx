import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  User,
  Mail,
  Building
} from 'lucide-react';

interface SubmittedActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  activity_type: string;
  organization_name: string;
  contact_person: string;
  contact_email: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activities, setActivities] = useState<SubmittedActivity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchActivities();
    }
  }, [user, isAdmin]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('submitted_activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: 'Fout',
        description: 'Kon activiteiten niet ophalen.',
        variant: 'destructive',
      });
    } finally {
      setLoadingActivities(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('submitted_activities')
        .update({ 
          status, 
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setActivities(prev => 
        prev.map(a => a.id === id ? { ...a, status } : a)
      );

      toast({
        title: status === 'approved' ? 'Goedgekeurd' : 'Afgewezen',
        description: `De activiteit is ${status === 'approved' ? 'goedgekeurd' : 'afgewezen'}.`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Fout',
        description: 'Kon status niet bijwerken.',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" /> Wachtend</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Goedgekeurd</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Afgewezen</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page text-center">
            <p className="text-muted-foreground">Laden...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page max-w-lg text-center">
            <div className="bg-destructive/10 rounded-xl p-8">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h1 className="font-serif text-2xl font-medium text-foreground mb-2">
                Geen toegang
              </h1>
              <p className="text-muted-foreground mb-6">
                Je hebt geen beheerdersrechten om deze pagina te bekijken.
              </p>
              <Button onClick={() => navigate('/')}>
                Terug naar home
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-2">
              Beheerderspaneel
            </h1>
            <p className="text-muted-foreground">
              Bekijk en beheer ingediende activiteiten.
            </p>
          </div>

          {loadingActivities ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Activiteiten laden...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="bg-muted rounded-xl p-12 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-xl font-medium text-foreground mb-2">
                Geen activiteiten ingediend
              </h2>
              <p className="text-muted-foreground">
                Er zijn nog geen activiteiten ingediend door organisaties.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-lg font-medium text-foreground">
                          {activity.title}
                        </h3>
                        {getStatusBadge(activity.status)}
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {activity.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(activity.date).toLocaleDateString('nl-NL')} om {activity.time}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {activity.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="w-4 h-4" />
                          {activity.organization_name}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          {activity.contact_person}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground col-span-full">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${activity.contact_email}`} className="text-primary hover:underline">
                            {activity.contact_email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {activity.status === 'pending' && (
                      <div className="flex gap-2 lg:flex-col">
                        <Button
                          size="sm"
                          onClick={() => updateStatus(activity.id, 'approved')}
                          disabled={processingId === activity.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Goedkeuren
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(activity.id, 'rejected')}
                          disabled={processingId === activity.id}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Afwijzen
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
