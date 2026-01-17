import { useState, useMemo } from 'react';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';
import { Layout } from '@/components/layout';
import { ActivityCard } from '@/components/ActivityCard';
import { FilterBar, TimeFilter } from '@/components/FilterBar';
import { activities } from '@/data/activities';
import { ActivityType } from '@/data/types';

export default function Activities() {
  const [selectedTime, setSelectedTime] = useState<TimeFilter>('all');
  const [selectedTypes, setSelectedTypes] = useState<ActivityType[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Time filter
      if (selectedTime === 'today' && !isToday(activity.date)) return false;
      if (selectedTime === 'week' && !isThisWeek(activity.date)) return false;
      if (selectedTime === 'month' && !isThisMonth(activity.date)) return false;

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(activity.type)) return false;

      // Organization filter
      if (selectedOrganizations.length > 0 && !selectedOrganizations.includes(activity.organizationId)) return false;

      return true;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [selectedTime, selectedTypes, selectedOrganizations]);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-page">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-2">
            Activiteiten
          </h1>
          <p className="text-muted-foreground mb-8">
            Ontdek wat er te doen is in Woerden op het gebied van geloof & cultuur.
          </p>

          <FilterBar
            selectedTime={selectedTime}
            selectedTypes={selectedTypes}
            selectedOrganizations={selectedOrganizations}
            onTimeChange={setSelectedTime}
            onTypeChange={setSelectedTypes}
            onOrganizationChange={setSelectedOrganizations}
          />

          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Geen activiteiten gevonden met deze filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
