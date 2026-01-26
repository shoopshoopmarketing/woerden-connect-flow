import { useState } from 'react';
import { Star, Send, Facebook, Twitter, Linkedin, Link2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: Date;
}

// Mock reviews data
const mockReviews: Record<string, Review[]> = {
  default: [
    {
      id: '1',
      name: 'Maria van den Berg',
      rating: 5,
      comment: 'Prachtige ervaring! De sfeer was warm en uitnodigend. Ik kom zeker terug.',
      date: new Date(2025, 0, 15),
    },
    {
      id: '2',
      name: 'Jan Pietersen',
      rating: 4,
      comment: 'Goed georganiseerd en fijne mensen ontmoet. Een aanrader voor iedereen.',
      date: new Date(2025, 0, 10),
    },
    {
      id: '3',
      name: 'Sophie de Wit',
      rating: 5,
      comment: 'Wat een mooie gemeenschap! De boodschap raakte me diep.',
      date: new Date(2024, 11, 20),
    },
  ],
};

function StarRating({ rating, onChange, interactive = false }: { 
  rating: number; 
  onChange?: (rating: number) => void;
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          onClick={() => interactive && onChange?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (hovered || rating)
                ? 'fill-primary text-primary'
                : 'text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

export function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link gekopieerd!');
  };
  
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-serif text-lg font-medium text-foreground mb-3">Delen</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => window.open(shareLinks.facebook, '_blank')}
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => window.open(shareLinks.twitter, '_blank')}
        >
          <Twitter className="w-4 h-4" />
          X
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => window.open(shareLinks.linkedin, '_blank')}
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => window.open(shareLinks.whatsapp, '_blank')}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={copyLink}
        >
          <Link2 className="w-4 h-4" />
          Kopieer link
        </Button>
      </div>
    </div>
  );
}

interface ActivityReviewsProps {
  activityId: string;
}

export function ActivityReviews({ activityId }: ActivityReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews.default);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim() || newReview.rating === 0) {
      toast.error('Vul alle velden in en geef een beoordeling');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: String(Date.now()),
        name: newReview.name.trim(),
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        date: new Date(),
      };
      
      setReviews([review, ...reviews]);
      setNewReview({ name: '', rating: 0, comment: '' });
      setIsSubmitting(false);
      toast.success('Bedankt voor je review!');
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header with average rating */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-medium text-foreground">
          Ervaringen ({reviews.length})
        </h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} gemiddeld
            </span>
          </div>
        )}
      </div>

      {/* Review form */}
      <Card>
        <CardContent className="p-5">
          <h4 className="font-medium text-foreground mb-4">Deel jouw ervaring</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Jouw beoordeling
              </label>
              <StarRating 
                rating={newReview.rating} 
                onChange={(rating) => setNewReview({ ...newReview, rating })}
                interactive 
              />
            </div>
            <Input
              placeholder="Je naam"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              maxLength={50}
            />
            <Textarea
              placeholder="Schrijf je ervaring..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={3}
              maxLength={500}
            />
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Verzenden...' : 'Plaatsen'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.date.toLocaleDateString('nl-NL', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
