import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Flame, Music, Users, Lightbulb, PartyPopper, Sparkles } from 'lucide-react';

interface EventTypeFilterProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

interface FilterOption {
  value: string | null;
  label: string;
  icon: React.ElementType;
}

export const EventTypeFilter: React.FC<EventTypeFilterProps> = ({
  selectedType,
  onSelectType,
}) => {
  const filterOptions: FilterOption[] = [
    { value: null, label: 'All', icon: Sparkles },
    { value: 'conference', label: 'Conferences', icon: CalendarIcon },
    { value: 'hackathon', label: 'Hackathons', icon: Lightbulb },
    { value: 'concert', label: 'Concerts', icon: Music },
    { value: 'party', label: 'Parties', icon: PartyPopper },
    { value: 'meetup', label: 'Meetups', icon: Users },
    { value: 'workshop', label: 'Workshops', icon: Flame },
  ];

  return (
    <div className="flex flex-wrap gap-2 my-6">
      {filterOptions.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            key={option.value || 'all'}
            variant={selectedType === option.value ? 'default' : 'outline'}
            className={`rounded-full ${
              selectedType === option.value ? 'bg-purple-600 hover:bg-purple-700' : ''
            }`}
            onClick={() => onSelectType(option.value)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};