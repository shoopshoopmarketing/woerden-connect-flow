import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AdminStats } from '@/components/admin/AdminStats';
import { AdminActivityList } from '@/components/admin/AdminActivityList';
import { 
  XCircle, 
  LayoutDashboard,
  Calendar,
  RefreshCw,
  Settings
} from 'lucide-react';

interface SubmittedActivity {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  date: string;
  time: string;
  end_time?: string;
  location: string;
  address?: string;
  activity_type: string;
  organization_name: string;
  contact_person: string;
  contact_email: string;
  status: string;
  created_at: string;
  for_who?: string;
  what_to_expect?: string;
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
    setLoadingActivities(true);
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

  const stats = {
    total: activities.length,
    pending: activities.filter(a => a.status === 'pending').length,
    approved: activities.filter(a => a.status === 'approved').length,
    rejected: activities.filter(a => a.status === 'rejected').length,
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-1">
                Backoffice
              </h1>
              <p className="text-muted-foreground">
                Beheer activiteiten en instellingen voor Geloof & Cultuur Woerden.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={fetchActivities}
              disabled={loadingActivities}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingActivities ? 'animate-spin' : ''}`} />
              Vernieuwen
            </Button>
          </div>

          {/* Stats */}
          <AdminStats {...stats} />

          {/* Tabs */}
          <Tabs defaultValue="activities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
              <TabsTrigger value="dashboard" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="activities" className="gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Activiteiten</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Instellingen</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-serif text-xl font-medium mb-4">Welkom in de backoffice</h2>
                <p className="text-muted-foreground mb-6">
                  Hier kun je ingediende activiteiten bekijken en goedkeuren. 
                  Momenteel wachten er <strong>{stats.pending}</strong> activiteiten op goedkeuring.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-medium mb-2">Snelle acties</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Bekijk wachtende activiteiten in het tabblad "Activiteiten"</li>
                      <li>• Keur activiteiten goed of wijs ze af</li>
                      <li>• Bekijk details voordat je een beslissing neemt</li>
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-medium mb-2">Recente statistieken</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Totaal ingediend: {stats.total}</li>
                      <li>• Goedkeuringspercentage: {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%</li>
                      <li>• Wachttijd gemiddeld: &lt; 2 werkdagen</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities">
              <AdminActivityList
                activities={activities}
                onApprove={(id) => updateStatus(id, 'approved')}
                onReject={(id) => updateStatus(id, 'rejected')}
                processingId={processingId}
                isLoading={loadingActivities}
              />
            </TabsContent>

            <TabsContent value="settings">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-serif text-xl font-medium mb-4">Instellingen</h2>
                <p className="text-muted-foreground mb-6">
                  Beheer hier de instellingen voor het platform. 
                  Deze functionaliteit wordt later uitgebreid.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <h3 className="font-medium">E-mail notificaties</h3>
                      <p className="text-sm text-muted-foreground">
                        Ontvang een e-mail bij nieuwe aanmeldingen
                      </p>
                    </div>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      Binnenkort
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <h3 className="font-medium">Automatische goedkeuring</h3>
                      <p className="text-sm text-muted-foreground">
                        Keur activiteiten van bekende organisaties automatisch goed
                      </p>
                    </div>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      Binnenkort
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <h3 className="font-medium">Beheerders toevoegen</h3>
                      <p className="text-sm text-muted-foreground">
                        Voeg nieuwe beheerders toe aan het platform
                      </p>
                    </div>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      Binnenkort
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
