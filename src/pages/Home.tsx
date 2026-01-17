import { Link } from 'react-router-dom';
import { Users, Heart, HandHeart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout';
import { ActivityCard } from '@/components/ActivityCard';
import { ThemeBlock } from '@/components/ThemeBlock';
import { getUpcomingActivities } from '@/data/activities';

export default function Home() {
  const upcomingActivities = getUpcomingActivities(12);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-terracotta-light to-background section-padding">
        <div className="container-page text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-4 text-balance animate-fade-in">
            Ontdek wat er te doen is in Woerden
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Van ontmoetingen en vieringen tot lezingen, concerten en diaconale initiatieven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/activiteiten">
              <Button size="lg" className="w-full sm:w-auto text-base px-8">
                Bekijk activiteiten
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/aanmelden">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                Organiseer je iets?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Theme Blocks */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ThemeBlock
              icon={Users}
              title="Ontmoeting & verbinding"
              description="Plekken waar je welkom bent voor een kop koffie, een goed gesprek of gewoon even gezelligheid."
              colorClass="bg-terracotta-light"
            />
            <ThemeBlock
              icon={Heart}
              title="Geloof & zingeving"
              description="Vieringen, gebedsmomenten en lezingen voor iedereen die op zoek is naar rust en bezinning."
              colorClass="bg-purple-light"
            />
            <ThemeBlock
              icon={HandHeart}
              title="Zorg & omzien naar elkaar"
              description="Initiatieven waar mensen elkaar helpen en ondersteunen, in woord en daad."
              colorClass="bg-sage-light"
            />
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="section-padding bg-muted/30">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
              Binnenkort in Woerden
            </h2>
            <Link to="/activiteiten" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              Bekijk alles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="bg-primary rounded-2xl p-8 sm:p-12 text-center text-primary-foreground">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4">
              Organiseer je een activiteit?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
              Maak je activiteit zichtbaar voor inwoners van Woerden. 
              Aanmelden is gratis en eenvoudig.
            </p>
            <Link to="/aanmelden">
              <Button size="lg" variant="secondary" className="text-base">
                Activiteit aanmelden
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
