import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, ExternalLink, Check, X, Church } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getChurchById, getOrganizationById } from '@/data/organizations';
import { getUpcomingActivities } from '@/data/activities';
import { ActivityCard } from '@/components/ActivityCard';
import { denominationLabels, sizeLabels, styleLabels } from '@/data/types';
import { ChurchBuddyDialog } from '@/components/ChurchBuddyDialog';

export default function ChurchDetail() {
  const { id } = useParams<{ id: string }>();
  const church = getChurchById(id || '') || getOrganizationById(id || '');

  if (!church) {
    return (
      <Layout>
        <div className="container-page section-padding text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Kerk niet gevonden</h1>
          <Link to="/kerken">
            <Button variant="outline">Terug naar kerken</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Get upcoming activities for this church
  const churchActivities = getUpcomingActivities()
    .filter(activity => activity.organizationId === church.id)
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero Image */}
      {church.image && (
        <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
          <img
            src={church.image}
            alt={church.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <article className="section-padding">
        <div className="container-page max-w-4xl">
          <Link
            to="/kerken"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar kerken
          </Link>

          {/* Header */}
          <div className="mb-8">
            {church.denomination && (
              <Badge variant="secondary" className="mb-4">
                {denominationLabels[church.denomination]}
              </Badge>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-4">
              {church.name}
            </h1>

            <p className="text-lg text-muted-foreground">
              {church.description}
            </p>
          </div>

          {/* Key Info Card */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {church.serviceTime && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Diensten</p>
                    <p className="text-muted-foreground">{church.serviceTime}</p>
                  </div>
                </div>
              )}

              {church.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Adres</p>
                    <p className="text-muted-foreground">{church.address}</p>
                  </div>
                </div>
              )}

              {church.size && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Gemeentegrootte</p>
                    <p className="text-muted-foreground">{sizeLabels[church.size]}</p>
                  </div>
                </div>
              )}

              {church.serviceStyle && (
                <div className="flex items-start gap-3">
                  <Church className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Dienststijl</p>
                    <p className="text-muted-foreground">{styleLabels[church.serviceStyle]}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Long Description */}
          {church.longDescription && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-foreground leading-relaxed">
                {church.longDescription}
              </p>
            </div>
          )}

          {/* Features */}
          <div className="bg-sage-light rounded-xl p-6 mb-8">
            <h2 className="font-serif text-xl font-medium text-foreground mb-4">
              Voorzieningen & kenmerken
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FeatureItem available={church.hasChildcare} label="Kinderoppas tijdens dienst" />
              <FeatureItem available={church.hasYouthGroup} label="Actief jeugdwerk" />
              <FeatureItem available={church.hasAccessibility} label="Rolstoeltoegankelijk" />
              <FeatureItem available={church.hasParkingAvailable} label="Parkeergelegenheid" />
              <FeatureItem available={church.hasRingloop} label="Ringleiding aanwezig" />
            </div>
          </div>

          {/* Upcoming Activities */}
          {churchActivities.length > 0 && (
            <div className="mb-8">
              <h2 className="font-serif text-xl font-medium text-foreground mb-4">
                Komende activiteiten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {churchActivities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          )}

          {/* Church Buddy CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/30 rounded-xl p-6 mb-8 text-center">
            <h2 className="font-serif text-xl font-medium text-foreground mb-2">
              Voor het eerst naar deze kerk?
            </h2>
            <p className="text-muted-foreground mb-4">
              Vraag een kerkmaatje! Iemand die met je meegaat en je wegwijs maakt.
            </p>
            <ChurchBuddyDialog 
              churchId={church.id} 
              churchName={church.shortName || church.name} 
            />
          </div>

          {/* Website Link */}
          {church.website && (
            <div className="border-t border-border pt-6">
              <a
                href={church.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Bezoek de website van {church.shortName || church.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}

function FeatureItem({ available, label }: { available?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {available ? (
        <div className="w-5 h-5 bg-sage text-white rounded-full flex items-center justify-center">
          <Check className="w-3 h-3" />
        </div>
      ) : (
        <div className="w-5 h-5 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
          <X className="w-3 h-3" />
        </div>
      )}
      <span className={available ? 'text-foreground' : 'text-muted-foreground'}>
        {label}
      </span>
    </div>
  );
}
