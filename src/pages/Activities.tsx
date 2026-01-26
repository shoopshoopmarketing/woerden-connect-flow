import { useState, useMemo } from 'react';
import { isToday, isThisWeek, isThisMonth, getMonth } from 'date-fns';
import { Layout } from '@/components/layout';
import { ActivityCard } from '@/components/ActivityCard';
import { TimeFilterBar, FilterSidebar, TimeFilter } from '@/components/FilterBar';
import { activities } from '@/data/activities';
import { ActivityType, TargetAudience } from '@/data/types';

const monthNameToIndex: Record<string, number> = {
  januari: 0,
  februari: 1,
  maart: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  augustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  december: 11,
};

export default function Activities() {
  const [selectedTime, setSelectedTime] = useState<TimeFilter>('all');
  const [selectedTypes, setSelectedTypes] = useState<ActivityType[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<TargetAudience[]>([]);

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Time filter
      if (selectedTime === 'today' && !isToday(activity.date)) return false;
      if (selectedTime === 'week' && !isThisWeek(activity.date)) return false;
      if (selectedTime === 'month' && !isThisMonth(activity.date)) return false;
      
      // Month filter
      if (monthNameToIndex[selectedTime] !== undefined) {
        if (getMonth(activity.date) !== monthNameToIndex[selectedTime]) return false;
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(activity.type)) return false;

      // Organization filter
      if (selectedOrganizations.length > 0 && !selectedOrganizations.includes(activity.organizationId)) return false;

      // Audience filter
      if (selectedAudiences.length > 0) {
        if (!activity.targetAudience || !activity.targetAudience.some(a => selectedAudiences.includes(a))) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [selectedTime, selectedTypes, selectedOrganizations, selectedAudiences]);

  const activeFilterCount = selectedTypes.length + selectedOrganizations.length + selectedAudiences.length;

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

          {/* Time filter above everything */}
          <TimeFilterBar
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
          />

          {/* Layout with sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with filters - hidden on mobile */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                selectedTypes={selectedTypes}
                selectedOrganizations={selectedOrganizations}
                selectedAudiences={selectedAudiences}
                onTypeChange={setSelectedTypes}
                onOrganizationChange={setSelectedOrganizations}
                onAudienceChange={setSelectedAudiences}
              />
            </aside>

            {/* Activities grid */}
            <div className="flex-1">
              {filteredActivities.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-xl">
                  <p className="text-muted-foreground">Geen activiteiten gevonden met deze filters.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    {filteredActivities.length} {filteredActivities.length === 1 ? 'activiteit' : 'activiteiten'} gevonden
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredActivities.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile: Show filter count if active */}
          <div className="lg:hidden fixed bottom-4 right-4">
            {activeFilterCount > 0 && (
              <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm shadow-lg">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} actief
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
