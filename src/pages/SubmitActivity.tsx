import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { activityTypeLabels, ActivityType } from '@/data/types';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

export default function SubmitActivity() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: 'Bedankt!', description: 'We hebben je aanmelding ontvangen.' });
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page max-w-xl text-center">
            <CheckCircle className="w-16 h-16 text-sage mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-medium text-foreground mb-4">Bedankt voor je aanmelding!</h1>
            <p className="text-muted-foreground mb-8">We bekijken je activiteit en nemen zo nodig contact met je op.</p>
            <Button onClick={() => setSubmitted(false)} variant="outline">Nog een activiteit aanmelden</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page max-w-xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-2">Activiteit aanmelden</h1>
          <p className="text-muted-foreground mb-8">Maak je activiteit zichtbaar voor inwoners van Woerden.</p>

          <div className="bg-sage-light rounded-xl p-4 mb-8">
            <p className="text-sm text-muted-foreground">Dit platform is bedoeld om activiteiten in Woerden zichtbaar te maken. Na inzending bekijken we de aanmelding voordat deze gepubliceerd wordt.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div><Label htmlFor="name">Naam activiteit *</Label><Input id="name" required placeholder="Bijv. Taizé-avondgebed" /></div>
            <div><Label htmlFor="org">Organisatie *</Label><Input id="org" required placeholder="Bijv. Raad van Kerken Woerden" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="contact">Contactpersoon *</Label><Input id="contact" required /></div>
              <div><Label htmlFor="email">E-mail *</Label><Input id="email" type="email" required /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="date">Datum *</Label><Input id="date" type="date" required /></div>
              <div><Label htmlFor="time">Tijd *</Label><Input id="time" type="time" required /></div>
            </div>
            <div><Label htmlFor="type">Type activiteit *</Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Kies een type" /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(activityTypeLabels) as ActivityType[]).map(type => (
                    <SelectItem key={type} value={type}>{activityTypeLabels[type]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div><Label htmlFor="location">Locatie</Label><Input id="location" placeholder="Bijv. Petruskerk, Woerden" /></div>
            <div><Label htmlFor="desc">Korte beschrijving *</Label><Textarea id="desc" required rows={4} placeholder="Vertel kort wat bezoekers kunnen verwachten..." /></div>
            <Button type="submit" size="lg" className="w-full">Activiteit aanmelden</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
