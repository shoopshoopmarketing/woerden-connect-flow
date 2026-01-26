import { useState } from 'react';
import { Heart, Clock, MapPin, Mail, User, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import { volunteerVacancies, volunteerCategoryLabels, VolunteerVacancy } from '@/data/volunteers';

const categoryColors: Record<VolunteerVacancy['category'], string> = {
  diaconaal: 'bg-terracotta-light text-primary',
  pastoraal: 'bg-purple-light text-purple',
  praktisch: 'bg-sage-light text-sage',
  jeugd: 'bg-secondary text-secondary-foreground',
  muziek: 'bg-accent text-accent-foreground',
  administratief: 'bg-muted text-muted-foreground',
};

function VolunteerCard({ vacancy }: { vacancy: VolunteerVacancy }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer card-hover h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <Badge className={categoryColors[vacancy.category]}>
                {volunteerCategoryLabels[vacancy.category]}
              </Badge>
              {vacancy.urgent && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Urgent
                </Badge>
              )}
            </div>
            <CardTitle className="font-serif text-xl mt-2">{vacancy.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{vacancy.organization}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {vacancy.description}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="truncate">{vacancy.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{vacancy.timeCommitment}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={categoryColors[vacancy.category]}>
              {volunteerCategoryLabels[vacancy.category]}
            </Badge>
            {vacancy.urgent && (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="w-3 h-3" />
                Urgent
              </Badge>
            )}
          </div>
          <DialogTitle className="font-serif text-2xl">{vacancy.title}</DialogTitle>
          <DialogDescription className="text-base">
            {vacancy.organization}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h4 className="font-medium mb-2">Over deze functie</h4>
            <p className="text-muted-foreground">{vacancy.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Wat ga je doen?</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {vacancy.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Wat vragen we?</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {vacancy.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">{vacancy.timeCommitment}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{vacancy.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm">Contactpersoon: {vacancy.contactPerson}</span>
            </div>
          </div>

          <Button asChild className="w-full" size="lg">
            <a href={`mailto:${vacancy.contactEmail}?subject=Interesse in vrijwilligersfunctie: ${vacancy.title}`}>
              <Mail className="w-4 h-4 mr-2" />
              Neem contact op
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Volunteers() {
  const [selectedCategory, setSelectedCategory] = useState<VolunteerVacancy['category'] | 'all'>('all');

  const filteredVacancies = selectedCategory === 'all' 
    ? volunteerVacancies 
    : volunteerVacancies.filter(v => v.category === selectedCategory);

  const categories = Object.keys(volunteerCategoryLabels) as VolunteerVacancy['category'][];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sage-light to-background section-padding">
        <div className="container-page text-center">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-4">
            Vrijwilligerswerk in Woerden
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wil jij iets betekenen voor een ander? Ontdek de vrijwilligersvacatures 
            bij kerken en diaconale organisaties in Woerden.
          </p>
        </div>
      </section>

      {/* Filter & Vacancies */}
      <section className="section-padding">
        <div className="container-page">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Alle ({volunteerVacancies.length})
            </Button>
            {categories.map(category => {
              const count = volunteerVacancies.filter(v => v.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {volunteerCategoryLabels[category]} ({count})
                </Button>
              );
            })}
          </div>

          {/* Urgent vacancies callout */}
          {filteredVacancies.some(v => v.urgent) && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Urgente vacatures</p>
                <p className="text-sm text-muted-foreground">
                  Sommige functies zijn dringend op zoek naar versterking. Kijk of jij kunt helpen!
                </p>
              </div>
            </div>
          )}

          {/* Vacancies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map(vacancy => (
              <VolunteerCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>

          {filteredVacancies.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground">
                Geen vacatures gevonden in deze categorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="bg-primary rounded-2xl p-8 sm:p-12 text-center text-primary-foreground">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4">
              Niet gevonden wat je zoekt?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
              Er zijn altijd mogelijkheden om je talenten in te zetten. 
              Neem contact op met de Raad van Kerken Woerden en we denken met je mee.
            </p>
            <Button asChild size="lg" variant="secondary">
              <a href="mailto:info@kerkeninwoerden.nl">
                <Mail className="w-4 h-4 mr-2" />
                Neem contact op
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
