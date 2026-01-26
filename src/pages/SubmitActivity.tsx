import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { activityTypeLabels, ActivityType } from '@/data/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, ArrowLeft, LogIn, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  title: string;
  organization_name: string;
  contact_person: string;
  contact_email: string;
  date: string;
  time: string;
  end_time: string;
  activity_type: string;
  location: string;
  address: string;
  description: string;
  long_description: string;
  for_who: string;
  what_to_expect: string;
  is_recurring: boolean;
  recurring_info: string;
}

export default function SubmitActivity() {
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    organization_name: '',
    contact_person: '',
    contact_email: '',
    date: '',
    time: '',
    end_time: '',
    activity_type: '',
    location: '',
    address: '',
    description: '',
    long_description: '',
    for_who: '',
    what_to_expect: '',
    is_recurring: false,
    recurring_info: '',
  });

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Niet ingelogd',
        description: 'Je moet ingelogd zijn om een activiteit aan te melden.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.activity_type) {
      toast({
        title: 'Type activiteit verplicht',
        description: 'Selecteer een type activiteit.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('submitted_activities')
        .insert({
          title: formData.title,
          organization_name: formData.organization_name,
          contact_person: formData.contact_person,
          contact_email: formData.contact_email,
          date: formData.date,
          time: formData.time,
          end_time: formData.end_time || null,
          activity_type: formData.activity_type,
          location: formData.location,
          address: formData.address || null,
          description: formData.description,
          long_description: formData.long_description || null,
          for_who: formData.for_who || null,
          what_to_expect: formData.what_to_expect || null,
          is_recurring: formData.is_recurring,
          recurring_info: formData.is_recurring ? formData.recurring_info : null,
          submitted_by: user.id,
          status: 'pending',
        });

      if (error) throw error;

      setSubmitted(true);
      toast({ 
        title: 'Bedankt!', 
        description: 'Je activiteit is ingediend en wacht op goedkeuring.' 
      });
    } catch (error) {
      console.error('Error submitting activity:', error);
      toast({
        title: 'Fout bij indienen',
        description: 'Er ging iets mis. Probeer het later opnieuw.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page max-w-xl text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page max-w-xl text-center">
            <div className="bg-muted rounded-xl p-8">
              <LogIn className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="font-serif text-2xl font-medium text-foreground mb-2">
                Inloggen vereist
              </h1>
              <p className="text-muted-foreground mb-6">
                Om een activiteit aan te melden moet je eerst inloggen of een account aanmaken.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate('/auth')}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Inloggen / Registreren
                </Button>
                <Button variant="outline" onClick={() => navigate('/')}>
                  Terug naar home
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page max-w-xl text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-medium text-foreground mb-4">
              Bedankt voor je aanmelding!
            </h1>
            <p className="text-muted-foreground mb-8">
              We bekijken je activiteit en nemen zo nodig contact met je op. 
              Je ontvangt een bericht zodra de activiteit is goedgekeurd.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: '',
                  organization_name: '',
                  contact_person: '',
                  contact_email: '',
                  date: '',
                  time: '',
                  end_time: '',
                  activity_type: '',
                  location: '',
                  address: '',
                  description: '',
                  long_description: '',
                  for_who: '',
                  what_to_expect: '',
                  is_recurring: false,
                  recurring_info: '',
                });
              }}>
                Nog een activiteit aanmelden
              </Button>
              <Button variant="outline" onClick={() => navigate('/activiteiten')}>
                Bekijk activiteiten
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
        <div className="container-page max-w-2xl">
          <Button 
            variant="ghost" 
            className="mb-4 -ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug
          </Button>

          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-2">
            Activiteit aanmelden
          </h1>
          <p className="text-muted-foreground mb-6">
            Maak je activiteit zichtbaar voor inwoners van Woerden.
          </p>

          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Na inzending bekijkt een beheerder je activiteit voordat deze gepubliceerd wordt. 
              Dit duurt meestal 1-2 werkdagen.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic info */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-medium">Basisgegevens</h2>
              
              <div>
                <Label htmlFor="title">Naam activiteit *</Label>
                <Input 
                  id="title" 
                  required 
                  placeholder="Bijv. Taizé-avondgebed"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="organization_name">Organisatie *</Label>
                <Input 
                  id="organization_name" 
                  required 
                  placeholder="Bijv. Raad van Kerken Woerden"
                  value={formData.organization_name}
                  onChange={(e) => handleChange('organization_name', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="activity_type">Type activiteit *</Label>
                <Select 
                  value={formData.activity_type} 
                  onValueChange={(value) => handleChange('activity_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kies een type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(activityTypeLabels) as ActivityType[]).map(type => (
                      <SelectItem key={type} value={type}>
                        {activityTypeLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-medium">Datum & tijd</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Datum *</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Starttijd *</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end_time">Eindtijd</Label>
                  <Input 
                    id="end_time" 
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => handleChange('end_time', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_recurring" 
                  checked={formData.is_recurring}
                  onCheckedChange={(checked) => handleChange('is_recurring', !!checked)}
                />
                <Label htmlFor="is_recurring" className="cursor-pointer">
                  Dit is een terugkerende activiteit
                </Label>
              </div>

              {formData.is_recurring && (
                <div>
                  <Label htmlFor="recurring_info">Herhaling</Label>
                  <Input 
                    id="recurring_info" 
                    placeholder="Bijv. Elke eerste zondag van de maand"
                    value={formData.recurring_info}
                    onChange={(e) => handleChange('recurring_info', e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Location */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-medium">Locatie</h2>
              
              <div>
                <Label htmlFor="location">Locatienaam *</Label>
                <Input 
                  id="location" 
                  required
                  placeholder="Bijv. Petruskerk"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Adres</Label>
                <Input 
                  id="address" 
                  placeholder="Bijv. Kerkplein 1, 3441 BG Woerden"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-medium">Contactgegevens</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_person">Contactpersoon *</Label>
                  <Input 
                    id="contact_person" 
                    required
                    value={formData.contact_person}
                    onChange={(e) => handleChange('contact_person', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">E-mail *</Label>
                  <Input 
                    id="contact_email" 
                    type="email" 
                    required
                    value={formData.contact_email}
                    onChange={(e) => handleChange('contact_email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-medium">Beschrijving</h2>
              
              <div>
                <Label htmlFor="description">Korte beschrijving * (max 200 tekens)</Label>
                <Textarea 
                  id="description" 
                  required 
                  rows={3} 
                  maxLength={200}
                  placeholder="Een korte samenvatting die bezoekers als eerste zien..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.description.length}/200 tekens
                </p>
              </div>
              
              <div>
                <Label htmlFor="long_description">Uitgebreide beschrijving</Label>
                <Textarea 
                  id="long_description" 
                  rows={5} 
                  placeholder="Meer details over de activiteit..."
                  value={formData.long_description}
                  onChange={(e) => handleChange('long_description', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="for_who">Voor wie is deze activiteit?</Label>
                <Input 
                  id="for_who" 
                  placeholder="Bijv. Iedereen, gezinnen met kinderen, 65+..."
                  value={formData.for_who}
                  onChange={(e) => handleChange('for_who', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="what_to_expect">Wat kunnen bezoekers verwachten?</Label>
                <Textarea 
                  id="what_to_expect" 
                  rows={3} 
                  placeholder="Bijv. Samen zingen, koffie na afloop, gratis toegang..."
                  value={formData.what_to_expect}
                  onChange={(e) => handleChange('what_to_expect', e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Bezig met indienen...' : 'Activiteit indienen'}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
