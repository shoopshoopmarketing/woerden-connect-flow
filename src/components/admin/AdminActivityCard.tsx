import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  User,
  Mail,
  Building,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SubmittedActivity {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  date: string;
  time: string;
  end_time?: string;
  location: string;
  address?: string;
  activity_type: string;
  organization_name: string;
  contact_person: string;
  contact_email: string;
  status: string;
  created_at: string;
  for_who?: string;
  what_to_expect?: string;
}

interface AdminActivityCardProps {
  activity: SubmittedActivity;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isProcessing: boolean;
}

const activityTypeLabels: Record<string, string> = {
  kerkdienst: 'Kerkdienst',
  lezing: 'Lezing',
  concert: 'Concert',
  cursus: 'Cursus / Workshop',
  diaconaal: 'Diaconaal initiatief',
  gebed: 'Gebed / Verstilling',
  ontmoeting: 'Ontmoeting',
  viering: 'Oecumenische viering',
};

export function AdminActivityCard({ activity, onApprove, onReject, isProcessing }: AdminActivityCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" /> Wachtend</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Goedgekeurd</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Afgewezen</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-serif text-lg font-medium text-foreground">
              {activity.title}
            </h3>
            {getStatusBadge(activity.status)}
            <Badge variant="outline">
              {activityTypeLabels[activity.activity_type] || activity.activity_type}
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {activity.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              {new Date(activity.date).toLocaleDateString('nl-NL', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'long' 
              })} om {activity.time}
              {activity.end_time && ` - ${activity.end_time}`}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {activity.location}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="w-4 h-4 flex-shrink-0" />
              {activity.organization_name}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 flex-shrink-0" />
              {activity.contact_person}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground col-span-full">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a href={`mailto:${activity.contact_email}`} className="text-primary hover:underline">
                {activity.contact_email}
              </a>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Ingediend op {new Date(activity.created_at).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <div className="flex gap-2 lg:flex-col">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-1" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">{activity.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Korte beschrijving</h4>
                  <p>{activity.description}</p>
                </div>
                {activity.long_description && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Uitgebreide beschrijving</h4>
                    <p className="whitespace-pre-wrap">{activity.long_description}</p>
                  </div>
                )}
                {activity.for_who && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Voor wie</h4>
                    <p>{activity.for_who}</p>
                  </div>
                )}
                {activity.what_to_expect && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Wat te verwachten</h4>
                    <p>{activity.what_to_expect}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Datum & tijd</h4>
                    <p>{new Date(activity.date).toLocaleDateString('nl-NL')} {activity.time}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Locatie</h4>
                    <p>{activity.location}</p>
                    {activity.address && <p className="text-sm text-muted-foreground">{activity.address}</p>}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Organisatie</h4>
                    <p>{activity.organization_name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Contact</h4>
                    <p>{activity.contact_person}</p>
                    <p className="text-sm text-muted-foreground">{activity.contact_email}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {activity.status === 'pending' && (
            <>
              <Button
                size="sm"
                onClick={() => onApprove(activity.id)}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Goedkeuren
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onReject(activity.id)}
                disabled={isProcessing}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Afwijzen
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
