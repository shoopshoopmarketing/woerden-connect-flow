import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Activity, activityTypeLabels, activityTypeColors } from '@/data/types';
import { getOrganizationName } from '@/data/organizations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityCardProps {
  activity: Activity;
  featured?: boolean;
}

export function ActivityCard({ activity, featured = false }: ActivityCardProps) {
  const formattedDate = format(activity.date, 'd MMMM', { locale: nl });
  const dayName = format(activity.date, 'EEEE', { locale: nl });
  const organizationName = getOrganizationName(activity.organizationId);

  return (
    <Link to={`/activiteiten/${activity.id}`}>
      <Card className={`group card-hover overflow-hidden h-full ${featured ? 'border-primary/20' : ''}`}>
        {activity.image && featured && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <CardContent className={featured ? 'p-5' : 'p-4'}>
          {/* Type Badge */}
          <Badge 
            variant="secondary" 
            className={`mb-3 ${activityTypeColors[activity.type]}`}
          >
            {activityTypeLabels[activity.type]}
          </Badge>

          {/* Title */}
          <h3 className={`font-serif font-medium text-foreground group-hover:text-primary transition-colors leading-snug ${
            featured ? 'text-xl mb-2' : 'text-lg mb-1.5'
          }`}>
            {activity.title}
          </h3>

          {/* Description */}
          <p className={`text-muted-foreground leading-relaxed line-clamp-2 ${
            featured ? 'text-sm mb-4' : 'text-sm mb-3'
          }`}>
            {activity.description}
          </p>

          {/* Meta Info */}
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="capitalize">{dayName} {formattedDate}</span>
              {activity.isRecurring && (
                <span className="text-xs text-primary">({activity.recurringInfo})</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{activity.time}{activity.endTime && ` - ${activity.endTime}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="truncate">{activity.location}</span>
            </div>
          </div>

          {/* Organization */}
          <p className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
            Georganiseerd door {organizationName}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
