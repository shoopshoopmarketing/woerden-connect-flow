import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ActivityType, activityTypeLabels } from '@/data/types';
import { organizations } from '@/data/organizations';

export type TimeFilter = 'all' | 'today' | 'week' | 'month';

interface FilterBarProps {
  selectedTime: TimeFilter;
  selectedTypes: ActivityType[];
  selectedOrganizations: string[];
  onTimeChange: (time: TimeFilter) => void;
  onTypeChange: (types: ActivityType[]) => void;
  onOrganizationChange: (orgs: string[]) => void;
}

const timeOptions: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'today', label: 'Vandaag' },
  { value: 'week', label: 'Deze week' },
  { value: 'month', label: 'Deze maand' },
];

const typeOptions: ActivityType[] = [
  'kerkdienst',
  'lezing',
  'concert',
  'cursus',
  'diaconaal',
  'gebed',
  'ontmoeting',
  'viering',
];

// Time filter component (stays above activities)
export function TimeFilterBar({
  selectedTime,
  onTimeChange,
}: Pick<FilterBarProps, 'selectedTime' | 'onTimeChange'>) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium text-foreground mr-2">Wanneer:</span>
      {timeOptions.map(option => (
        <Button
          key={option.value}
          variant={selectedTime === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeChange(option.value)}
          className={selectedTime === option.value ? '' : 'hover:bg-muted'}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

// Sidebar filters component
export function FilterSidebar({
  selectedTypes,
  selectedOrganizations,
  onTypeChange,
  onOrganizationChange,
}: Omit<FilterBarProps, 'selectedTime' | 'onTimeChange'>) {

  const toggleType = (type: ActivityType) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const toggleOrganization = (orgId: string) => {
    if (selectedOrganizations.includes(orgId)) {
      onOrganizationChange(selectedOrganizations.filter(o => o !== orgId));
    } else {
      onOrganizationChange([...selectedOrganizations, orgId]);
    }
  };

  const clearFilters = () => {
    onTypeChange([]);
    onOrganizationChange([]);
  };

  const hasActiveFilters = selectedTypes.length > 0 || selectedOrganizations.length > 0;

  return (
    <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-medium text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-destructive gap-1 -mr-2 h-8"
          >
            <X className="w-4 h-4" />
            Wissen
          </Button>
        )}
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <span className="text-sm font-medium text-foreground block mb-3">Type activiteit</span>
        <div className="flex flex-col gap-2">
          {typeOptions.map(type => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? 'default' : 'outline'}
              className={`cursor-pointer transition-colors justify-start py-2 px-3 ${
                selectedTypes.includes(type) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => toggleType(type)}
            >
              {activityTypeLabels[type]}
            </Badge>
          ))}
        </div>
      </div>

      {/* Organization Filter */}
      <div>
        <span className="text-sm font-medium text-foreground block mb-3">Organisatie</span>
        <div className="flex flex-col gap-2">
          {organizations.map(org => (
            <Badge
              key={org.id}
              variant={selectedOrganizations.includes(org.id) ? 'default' : 'outline'}
              className={`cursor-pointer transition-colors justify-start py-2 px-3 text-left ${
                selectedOrganizations.includes(org.id) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => toggleOrganization(org.id)}
            >
              {org.shortName || org.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// Legacy FilterBar for backwards compatibility
export function FilterBar({
  selectedTime,
  selectedTypes,
  selectedOrganizations,
  onTimeChange,
  onTypeChange,
  onOrganizationChange,
}: FilterBarProps) {
  return (
    <TimeFilterBar selectedTime={selectedTime} onTimeChange={onTimeChange} />
  );
}
