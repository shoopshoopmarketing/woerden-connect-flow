import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Organization, denominationLabels, sizeLabels, styleLabels } from '@/data/types';

interface ChurchCardProps {
  church: Organization;
  matchScore?: number;
}

export function ChurchCard({ church, matchScore }: ChurchCardProps) {
  return (
    <Link
      to={`/kerken/${church.id}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden card-hover"
    >
      {/* Image */}
      {church.image && (
        <div className="aspect-[16/10] overflow-hidden relative">
          <img
            src={church.image}
            alt={church.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {matchScore !== undefined && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {matchScore}% match
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Denomination Badge */}
        {church.denomination && (
          <Badge variant="secondary" className="mb-3">
            {denominationLabels[church.denomination]}
          </Badge>
        )}

        <h3 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
          {church.name}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {church.description}
        </p>

        {/* Meta info */}
        <div className="space-y-2 text-sm">
          {church.serviceTime && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{church.serviceTime}</span>
            </div>
          )}
          {church.neighborhood && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{church.neighborhood}</span>
            </div>
          )}
          {church.size && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{sizeLabels[church.size]}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-4">
          {church.serviceStyle && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
              {styleLabels[church.serviceStyle]}
            </span>
          )}
          {church.hasChildcare && (
            <span className="text-xs bg-sage-light text-sage px-2 py-1 rounded-full">
              Kinderoppas
            </span>
          )}
          {church.hasYouthGroup && (
            <span className="text-xs bg-purple-light text-purple px-2 py-1 rounded-full">
              Jeugdgroep
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
