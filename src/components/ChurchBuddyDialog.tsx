import { useState } from 'react';
import { Users, Heart, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock contact persons for each church
const churchBuddyContacts: Record<string, { name: string; email: string; phone?: string }> = {
  cama: { name: 'Peter van Dijk', email: 'kerkmaatje@camawoerden.nl', phone: '06-12345678' },
  rehoboth: { name: 'Marieke Jansen', email: 'welkom@rehobothkerk.nl', phone: '06-23456789' },
  gkwz: { name: 'Jan de Groot', email: 'kerkmaatje@gkwoerden.nl' },
  paxchristi: { name: 'Maria Bakker', email: 'contact@paxchristi-woerden.nl', phone: '06-34567890' },
  luthers: { name: 'Anna van Leeuwen', email: 'info@lutherswoerden.nl' },
  hervnw: { name: 'Kees Smit', email: 'kerkmaatje@hervnw.nl', phone: '06-45678901' },
  hervco: { name: 'Joke de Vries', email: 'welkom@hervco.nl' },
  baken: { name: 'Thomas Visser', email: 'kerkmaatje@hetbaken.nl', phone: '06-56789012' },
  nak: { name: 'Henk Mulder', email: 'welkom@nak-woerden.nl' },
  lighthouse: { name: 'Sarah de Jong', email: 'connect@lighthousewoerden.nl', phone: '06-67890123' },
  hvh: { name: 'Els Pietersen', email: 'info@huisvanhoop-woerden.nl' },
  rvk: { name: 'Bestuur RvK', email: 'info@kerkeninwoerden.nl' },
};

const defaultContact = { name: 'Contactpersoon', email: 'info@kerkeninwoerden.nl' };

interface ChurchBuddyDialogProps {
  churchId: string;
  churchName: string;
}

export function ChurchBuddyDialog({ churchId, churchName }: ChurchBuddyDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contact = churchBuddyContacts[churchId] || defaultContact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Vul je naam en e-mailadres in');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success('Je aanvraag is verstuurd! We nemen snel contact met je op.');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="gap-2 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <Heart className="w-5 h-5" />
          Ik wil een kerkmaatje
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Kerkmaatje
          </DialogTitle>
          <DialogDescription className="text-base">
            Een kerkmaatje is iemand die je meeneemt naar de kerk. Zo hoef je niet alleen te gaan 
            en heb je iemand die je wegwijs maakt!
          </DialogDescription>
        </DialogHeader>

        <div className="bg-sage-light rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-foreground mb-2">
            Contactpersoon bij {churchName}:
          </p>
          <div className="space-y-1">
            <p className="text-foreground font-medium">{contact.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${contact.email}`} className="hover:text-primary">
                {contact.email}
              </a>
            </div>
            {(contact as { phone?: string }).phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href={`tel:${(contact as { phone?: string }).phone}`} className="hover:text-primary">
                  {(contact as { phone?: string }).phone}
                </a>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Of laat je gegevens achter en wij zorgen dat iemand contact met je opneemt:
          </p>

          <div className="space-y-2">
            <Label htmlFor="buddy-name">Je naam *</Label>
            <Input
              id="buddy-name"
              placeholder="Vul je naam in"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buddy-email">Je e-mailadres *</Label>
            <Input
              id="buddy-email"
              type="email"
              placeholder="je@email.nl"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buddy-phone">Je telefoonnummer (optioneel)</Label>
            <Input
              id="buddy-phone"
              type="tel"
              placeholder="06-12345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={20}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buddy-message">Bericht (optioneel)</Label>
            <Textarea
              id="buddy-message"
              placeholder="Vertel iets over jezelf of stel een vraag..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              maxLength={500}
            />
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Verzenden...' : 'Verstuur aanvraag'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
