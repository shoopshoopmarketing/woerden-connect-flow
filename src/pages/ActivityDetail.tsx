import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getActivityById } from '@/data/activities';
import { getOrganizationById } from '@/data/organizations';
import { activityTypeLabels, activityTypeColors } from '@/data/types';

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const activity = getActivityById(id || '');

  if (!activity) {
    return (
      <Layout>
        <div className="container-page section-padding text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Activiteit niet gevonden</h1>
          <Link to="/activiteiten">
            <Button variant="outline">Terug naar activiteiten</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const organization = getOrganizationById(activity.organizationId);
  const formattedDate = format(activity.date, 'EEEE d MMMM yyyy', { locale: nl });

  return (
    <Layout>
      <article className="section-padding">
        <div className="container-page max-w-3xl">
          <Link to="/activiteiten" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Terug naar activiteiten
          </Link>

          <Badge className={`mb-4 ${activityTypeColors[activity.type]}`}>
            {activityTypeLabels[activity.type]}
          </Badge>

          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6">
            {activity.title}
          </h1>

          {/* Key Info */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8 space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground capitalize">{formattedDate}</p>
                {activity.isRecurring && <p className="text-sm text-primary">{activity.recurringInfo}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <p className="text-foreground">{activity.time}{activity.endTime && ` - ${activity.endTime}`}</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{activity.location}</p>
                {activity.address && <p className="text-sm text-muted-foreground">{activity.address}</p>}
              </div>
            </div>
            
            {/* Registration Button */}
            <div className="pt-4 border-t border-border">
              <Button className="w-full gap-2" size="lg">
                <Users className="w-5 h-5" />
                Ik kom!
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Meld je aan zodat de organisator weet hoeveel mensen er komen
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-foreground leading-relaxed">
              {activity.longDescription || activity.description}
            </p>
          </div>

          {/* For Who */}
          {activity.forWho && (
            <div className="bg-sage-light rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-sage" />
                <h3 className="font-serif text-lg font-medium text-foreground">Voor wie is dit?</h3>
              </div>
              <p className="text-muted-foreground">{activity.forWho}</p>
            </div>
          )}

          {/* What to Expect */}
          {activity.whatToExpect && (
            <div className="bg-terracotta-light rounded-xl p-6 mb-8">
              <h3 className="font-serif text-lg font-medium text-foreground mb-2">Wat kun je verwachten?</h3>
              <p className="text-muted-foreground">{activity.whatToExpect}</p>
            </div>
          )}

          {/* Organization */}
          {organization && (
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-1">Georganiseerd door</p>
              <p className="font-medium text-foreground">{organization.name}</p>
              {organization.website && (
                <a href={organization.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline text-sm mt-1">
                  Bezoek website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
