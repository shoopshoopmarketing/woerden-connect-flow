import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { NewsItem } from '@/data/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const formattedDate = format(item.date, 'd MMMM yyyy', { locale: nl });

  return (
    <Link to={`/nieuws/${item.id}`}>
      <Card className="group card-hover overflow-hidden h-full">
        {item.image && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <CardContent className="p-5">
          {/* Category Badge */}
          {item.category && (
            <Badge variant="secondary" className="mb-3 bg-terracotta-light text-primary">
              {item.category}
            </Badge>
          )}

          {/* Title */}
          <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
            {item.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
            {item.excerpt}
          </p>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
