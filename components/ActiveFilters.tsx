"use client";

import { X } from "lucide-react";

export interface FilterOption {
  id: number;
  label: string;
  value: string;
}

export interface ActiveFiltersProps {
  activeFilters: {
    roles: FilterOption[];
    companies: FilterOption[];
    slots: FilterOption[];
    ratings: FilterOption[];
  };
  onRemoveFilter: (filterType: string, value: string) => void;
}

export function ActiveFilters({
  activeFilters,
  onRemoveFilter,
}: ActiveFiltersProps) {
  // Check if there are any active filters
  const hasActiveFilters =
    activeFilters.roles.length > 0 ||
    activeFilters.companies.length > 0 ||
    activeFilters.slots.length > 0 ||
    activeFilters.ratings.length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="w-full pt-4 sm:pt-6 pb-4 sm:pb-[24px] px-4 md:px-6 lg:px-[106px] border-t border-[#E2E8F0]">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {activeFilters.roles.map((filter) => (
          <FilterTag
            key={`role-${filter.id}`}
            label={filter.label}
            onRemove={() => onRemoveFilter("roles", filter.value)}
          />
        ))}

        {activeFilters.companies.map((filter) => (
          <FilterTag
            key={`company-${filter.id}`}
            label={filter.label}
            onRemove={() => onRemoveFilter("companies", filter.value)}
          />
        ))}

        {activeFilters.slots.map((filter) => (
          <FilterTag
            key={`slot-${filter.id}`}
            label={filter.label}
            onRemove={() => onRemoveFilter("slots", filter.value)}
          />
        ))}

        {activeFilters.ratings.map((filter) => (
          <FilterTag
            key={`rating-${filter.id}`}
            label={filter.label}
            onRemove={() => onRemoveFilter("ratings", filter.value)}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <div className="inline-flex items-center gap-[6px] py-1 sm:py-1.5 px-3 sm:px-4 border border-[#CBD5E1] rounded-lg bg-white">
      <span className="text-xs font-semibold text-[#334155] truncate max-w-[120px] sm:max-w-none">
        {label}
      </span>
      <button
        onClick={onRemove}
        className="flex items-center justify-center text-[#94A3B8] hover:text-[#64748B] transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={16} />
      </button>
    </div>
  );
}
