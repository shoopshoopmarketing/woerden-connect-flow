import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminActivityCard } from './AdminActivityCard';

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

interface AdminActivityListProps {
  activities: SubmittedActivity[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  processingId: string | null;
  isLoading: boolean;
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

export function AdminActivityList({ 
  activities, 
  onApprove, 
  onReject, 
  processingId,
  isLoading 
}: AdminActivityListProps) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('pending');

  const filteredActivities = activities.filter(activity => {
    if (filterStatus === 'all') return true;
    return activity.status === filterStatus;
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Activiteiten laden...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { value: 'pending', label: 'Wachtend', count: activities.filter(a => a.status === 'pending').length },
          { value: 'approved', label: 'Goedgekeurd', count: activities.filter(a => a.status === 'approved').length },
          { value: 'rejected', label: 'Afgewezen', count: activities.filter(a => a.status === 'rejected').length },
          { value: 'all', label: 'Alles', count: activities.length },
        ].map((tab) => (
          <Button
            key={tab.value}
            variant={filterStatus === tab.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(tab.value as FilterStatus)}
          >
            {tab.label} ({tab.count})
          </Button>
        ))}
      </div>

      {filteredActivities.length === 0 ? (
        <div className="bg-muted rounded-xl p-12 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-xl font-medium text-foreground mb-2">
            Geen activiteiten gevonden
          </h2>
          <p className="text-muted-foreground">
            {filterStatus === 'pending' 
              ? 'Er zijn geen activiteiten die wachten op goedkeuring.'
              : 'Er zijn geen activiteiten met deze status.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <AdminActivityCard
              key={activity.id}
              activity={activity}
              onApprove={onApprove}
              onReject={onReject}
              isProcessing={processingId === activity.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
