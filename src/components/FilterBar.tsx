import { useState } from 'react';
import { Filter, X } from 'lucide-react';
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

export function FilterBar({
  selectedTime,
  selectedTypes,
  selectedOrganizations,
  onTimeChange,
  onTypeChange,
  onOrganizationChange,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

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
    onTimeChange('all');
    onTypeChange([]);
    onOrganizationChange([]);
  };

  const hasActiveFilters = selectedTime !== 'all' || selectedTypes.length > 0 || selectedOrganizations.length > 0;

  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-6 mb-6">
      {/* Time Filter - Always visible */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
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

      {/* Toggle More Filters */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="text-muted-foreground hover:text-foreground gap-2"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? 'Minder filters' : 'Meer filters'}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-destructive gap-2"
          >
            <X className="w-4 h-4" />
            Filters wissen
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-border space-y-4">
          {/* Type Filter */}
          <div>
            <span className="text-sm font-medium text-foreground block mb-2">Type activiteit:</span>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map(type => (
                <Badge
                  key={type}
                  variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
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
            <span className="text-sm font-medium text-foreground block mb-2">Organisatie:</span>
            <div className="flex flex-wrap gap-2">
              {organizations.slice(0, 8).map(org => (
                <Badge
                  key={org.id}
                  variant={selectedOrganizations.includes(org.id) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
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
      )}
    </div>
  );
}
