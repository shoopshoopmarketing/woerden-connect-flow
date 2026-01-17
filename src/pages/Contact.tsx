import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Mail, Phone, Heart } from 'lucide-react';

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: 'Bericht verzonden', description: 'We nemen zo snel mogelijk contact met je op.' });
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page max-w-xl text-center">
            <CheckCircle className="w-16 h-16 text-sage mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-medium text-foreground mb-4">Bedankt voor je bericht!</h1>
            <p className="text-muted-foreground">We nemen zo snel mogelijk contact met je op.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page max-w-xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-2">Contact</h1>
          <p className="text-muted-foreground mb-8">Heb je een vraag of wil je iets delen? Neem gerust contact met ons op.</p>

          <div className="bg-terracotta-light rounded-xl p-6 mb-6 flex items-center gap-4">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <p className="font-medium text-foreground">Direct mailen?</p>
              <a href="mailto:info@kerkeninwoerden.nl" className="text-primary hover:underline">info@kerkeninwoerden.nl</a>
            </div>
          </div>

          {/* Hulp nodig sectie */}
          <div className="bg-sage-light rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-sage mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground text-lg mb-2">Hulp nodig?</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Zit je in een moeilijke situatie en heb je hulp nodig? De gezamenlijke diaconie van de kerken in Woerden kan je misschien helpen. Wij helpen waar geen andere hulp beschikbaar is.
                </p>
                <div className="space-y-2">
                  <a 
                    href="mailto:commissiediaconie@gmail.com" 
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    commissiediaconie@gmail.com
                  </a>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  In acute nood? Vraag naar het Noodfonds.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div><Label htmlFor="name">Je naam *</Label><Input id="name" required /></div>
            <div><Label htmlFor="email">E-mailadres *</Label><Input id="email" type="email" required /></div>
            <div><Label htmlFor="subject">Onderwerp</Label><Input id="subject" placeholder="Waar gaat je bericht over?" /></div>
            <div><Label htmlFor="message">Je bericht *</Label><Textarea id="message" required rows={5} /></div>
            <Button type="submit" size="lg" className="w-full">Verstuur bericht</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
