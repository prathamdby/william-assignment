"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Clock,
  X,
  Sliders,
} from "lucide-react";
import { NoResultsToast } from "@/components/ui/no-results-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterOption } from "./ActiveFilters";
import { cn } from "@/lib/utils";

// Role options for filter
const roleOptions = [
  { id: 1, label: "SE/SDE", value: "se-sde" },
  { id: 2, label: "DS/AI/ML", value: "ds-ai-ml" },
  { id: 3, label: "Product Management", value: "product-management" },
  { id: 4, label: "Project Management", value: "project-management" },
  { id: 5, label: "Consulting", value: "consulting" },
  { id: 6, label: "Quantitative Finance", value: "quantitative-finance" },
];

// Company options for filter
const companyOptions = [
  { id: 1, label: "FAANG", value: "faang" },
  { id: 2, label: "Startups", value: "startups" },
  { id: 3, label: "MNC's", value: "mncs" },
  { id: 4, label: "Others", value: "others" },
];

// Slot options for filter
const slotOptions = [
  { id: 1, label: "This week", value: "this-week" },
  { id: 2, label: "Next week", value: "next-week" },
  { id: 3, label: "Anytime", value: "anytime" },
];

// Rating options for filter
const ratingOptions = [
  { id: 1, label: "Low to high", value: "low-to-high" },
  { id: 2, label: "High to low", value: "high-to-low" },
];

interface MentorSearchProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (activeFilters: {
    roles: FilterOption[];
    companies: FilterOption[];
    slots: FilterOption[];
    ratings: FilterOption[];
  }) => void;
  activeFilters?: {
    roles: FilterOption[];
    companies: FilterOption[];
    slots: FilterOption[];
    ratings: FilterOption[];
  };
}

// Mock mentor data for suggestions - in a real app, this would come from API or props
const searchSuggestions = [
  "Google",
  "Microsoft",
  "Amazon",
  "Apple",
  "Facebook",
  "Slack",
  "JP Morgan",
  "Goldman Sachs",
  "Zomato",
  "Full Stack Developer",
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
];

export function MentorSearch({
  onSearch,
  onFilterChange,
  activeFilters,
}: MentorSearchProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<
    { id: number; label: string }[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showNoResultsToast, setShowNoResultsToast] = useState(false);

  // Filter states
  const [roleFilters, setRoleFilters] = useState<string[]>([]);
  const [companyFilters, setCompanyFilters] = useState<string[]>([]);
  const [slotFilter, setSlotFilter] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("");

  // Slide-up filter panel state
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const trendingSearches = [
    { id: 1, label: "Microsoft" },
    { id: 2, label: "Slack" },
    { id: 3, label: "Google" },
    { id: 4, label: "Amazon" },
  ];

  // Update internal filters when activeFilters changes from parent
  useEffect(() => {
    if (!activeFilters) return;

    // Helper to check if arrays are different regardless of order
    const areArraysDifferent = (a: string[], b: string[]) => {
      if (a.length !== b.length) return true;
      const setA = new Set(a);
      return b.some((item) => !setA.has(item));
    };

    // Update role filters
    const activeRoleValues = activeFilters.roles.map((role) => role.value);
    if (areArraysDifferent(activeRoleValues, roleFilters)) {
      setRoleFilters(activeRoleValues);
    }

    // Update company filters
    const activeCompanyValues = activeFilters.companies.map(
      (company) => company.value,
    );
    if (areArraysDifferent(activeCompanyValues, companyFilters)) {
      setCompanyFilters(activeCompanyValues);
    }

    // Update slot filter
    const activeSlotValue =
      activeFilters.slots.length > 0 ? activeFilters.slots[0].value : "";
    if (activeSlotValue !== slotFilter) {
      setSlotFilter(activeSlotValue);
    }

    // Update rating filter
    const activeRatingValue =
      activeFilters.ratings.length > 0 ? activeFilters.ratings[0].value : "";
    if (activeRatingValue !== ratingFilter) {
      setRatingFilter(activeRatingValue);
    }
  }, [activeFilters]);

  // Ref to track previous filters for comparison
  const prevFiltersRef = useRef({
    roles: [] as string[],
    companies: [] as string[],
    slot: "",
    rating: "",
  });

  // Update parent component when filters change (with safeguard against infinite updates)
  useEffect(() => {
    if (!onFilterChange) return;

    const currentFilters = {
      roles: roleFilters,
      companies: companyFilters,
      slot: slotFilter,
      rating: ratingFilter,
    };

    // Check if filters have actually changed from last time we called onFilterChange
    const prevFilters = prevFiltersRef.current;
    const haveFiltersChanged =
      JSON.stringify(prevFilters.roles) !==
        JSON.stringify(currentFilters.roles) ||
      JSON.stringify(prevFilters.companies) !==
        JSON.stringify(currentFilters.companies) ||
      prevFilters.slot !== currentFilters.slot ||
      prevFilters.rating !== currentFilters.rating;

    // Only update if filters have changed from our last update to parent
    if (haveFiltersChanged) {
      // Update ref with current values
      prevFiltersRef.current = currentFilters;

      const activeRoles = roleOptions.filter((role) =>
        roleFilters.includes(role.value),
      );
      const activeCompanies = companyOptions.filter((company) =>
        companyFilters.includes(company.value),
      );
      const activeSlots = slotFilter
        ? slotOptions.filter((slot) => slot.value === slotFilter)
        : [];
      const activeRatings = ratingFilter
        ? ratingOptions.filter((rating) => rating.value === ratingFilter)
        : [];

      onFilterChange({
        roles: activeRoles,
        companies: activeCompanies,
        slots: activeSlots,
        ratings: activeRatings,
      });
    }
  }, [
    roleFilters,
    companyFilters,
    slotFilter,
    ratingFilter,
    onFilterChange,
    roleOptions,
    companyOptions,
    slotOptions,
    ratingOptions,
  ]);

  // Handle role filter changes
  const handleRoleFilterChange = (value: string) => {
    setRoleFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Handle company filter changes
  const handleCompanyFilterChange = (value: string) => {
    setCompanyFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Handle slot filter changes (radio button)
  const handleSlotFilterChange = (value: string) => {
    setSlotFilter((prev) => (prev === value ? "" : value));
  };

  // Handle rating filter changes (radio button)
  const handleRatingFilterChange = (value: string) => {
    setRatingFilter((prev) => (prev === value ? "" : value));
  };

  // Close search suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue);
      addRecentSearch(searchValue);
    }
  };

  const handleSearchItemClick = (term: string) => {
    setSearchValue(term);
    if (onSearch) {
      onSearch(term);
      addRecentSearch(term);
    }
    setIsSearchFocused(false);
  };

  const clearSearch = () => {
    setSearchValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  const addRecentSearch = (term: string) => {
    // Only add if it doesn't already exist
    if (
      !recentSearches.some(
        (search) => search.label.toLowerCase() === term.toLowerCase(),
      )
    ) {
      // Add to recent searches, limiting to 5 most recent
      setRecentSearches((prev) => [
        { id: Date.now(), label: term },
        ...prev.slice(0, 4),
      ]);
    }
  };

  const clearRecentSearch = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
  };

  // Count active filters to display on the filter button
  const activeFilterCount =
    (roleFilters.length || 0) +
    (companyFilters.length || 0) +
    (slotFilter ? 1 : 0) +
    (ratingFilter ? 1 : 0);

  // Reset all filters
  const resetAllFilters = () => {
    setRoleFilters([]);
    setCompanyFilters([]);
    setSlotFilter("");
    setRatingFilter("");
  };

  // Apply filters and close the panel
  const applyFilters = () => {
    setIsFilterPanelOpen(false);
  };

  // Function to hide no results toast
  const hideNoResultsToast = () => {
    setShowNoResultsToast(false);
  };

  // Filter search suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!searchValue.trim()) return [];

    const lowerCaseSearch = searchValue.toLowerCase().trim();
    return searchSuggestions
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(lowerCaseSearch) &&
          suggestion.toLowerCase() !== lowerCaseSearch,
      )
      .slice(0, 6); // Limit to 6 suggestions
  }, [searchValue]);

  return (
    <>
      <NoResultsToast show={showNoResultsToast} onHide={hideNoResultsToast} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0 relative">
        <div className="relative w-full md:w-auto" ref={searchRef}>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search mentor by name, role, companies, etc."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full md:w-[352px] h-10 pl-10 pr-8 text-xs bg-[#F1F5F9] rounded-md focus:outline-none border border-[#CBD5E1] text-[#64748B] placeholder-[#64748B]"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Search suggestions dropdown - only show when we have search text and matching suggestions */}
          {isSearchFocused &&
            searchValue.trim() !== "" &&
            filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md border border-[#E2E8F0] shadow-lg z-50 p-3 pb-4">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold mb-1 text-[#0F172A]">
                      Search suggestions
                    </p>
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 py-1.5 px-2 hover:bg-[#F1F5F9] rounded cursor-pointer"
                        onClick={() => handleSearchItemClick(suggestion)}
                      >
                        <Search size={16} className="text-[#94A3B8]" />
                        <span className="text-xs text-[#334155]">
                          {suggestion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {/* Recent and trending searches dropdown - only show when focused with empty search */}
          {isSearchFocused && searchValue.trim() === "" && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg border border-[#E2E8F0] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)] z-50 p-3">
              {/* Recent searches section */}
              {recentSearches.length > 0 && (
                <div className="flex flex-col gap-2 mb-2.5">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    Recent searches
                  </span>
                  <div className="flex flex-col">
                    {recentSearches.map((search) => (
                      <div
                        key={search.id}
                        className="flex items-center justify-between px-2 py-1.5 hover:bg-[#F1F5F9] rounded cursor-pointer group"
                        onClick={() => handleSearchItemClick(search.label)}
                      >
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[#94A3B8]" />
                          <span className="text-xs leading-tight text-[#334155] font-medium">
                            {search.label}
                          </span>
                        </div>
                        <button
                          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-[#94A3B8] hover:text-[#64748B]"
                          onClick={(e) => clearRecentSearch(e, search.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending searches section */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#0F172A]">
                  Trending searches
                </span>
                <div className="flex flex-col">
                  {trendingSearches.map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#F1F5F9] rounded cursor-pointer"
                      onClick={() => handleSearchItemClick(search.label)}
                    >
                      <TrendingUp size={16} className="text-[#94A3B8]" />
                      <span className="text-xs leading-tight text-[#334155] font-medium">
                        {search.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterPanelOpen(true)}
          className="flex items-center gap-2 h-10 px-4 py-2 bg-white border border-[#CBD5E1] rounded-md text-xs font-medium text-[#334155]"
        >
          <Sliders size={16} className="text-[#94A3B8]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#334155] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Slide-up Filter Panel Overlay */}
      {isFilterPanelOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-50"
          onClick={() => setIsFilterPanelOpen(false)}
        />
      )}

      {/* Slide-up Filter Panel */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out p-5",
          isFilterPanelOpen ? "translate-y-0" : "translate-y-full",
        )}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#0F172A]">Filters</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAllFilters}
              className="text-[#64748B] text-xs"
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={applyFilters}
              className="bg-[#334155] text-white hover:bg-[#1E293B] text-xs"
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Filter content */}
        <div className="space-y-6">
          {/* Role filters */}
          <div>
            <h4 className="font-medium text-sm text-[#0F172A] mb-3">Role</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {roleOptions.map((role) => (
                <div key={role.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`role-${role.id}`}
                    checked={roleFilters.includes(role.value)}
                    onCheckedChange={() => handleRoleFilterChange(role.value)}
                    className="h-4 w-4 rounded border border-[#CBD5E1] data-[state=checked]:bg-[#334155] data-[state=checked]:border-[#334155]"
                  />
                  <label
                    htmlFor={`role-${role.id}`}
                    className="text-xs font-medium text-[#334155] cursor-pointer"
                  >
                    {role.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Company filters */}
          <div>
            <h4 className="font-medium text-sm text-[#0F172A] mb-3">Company</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {companyOptions.map((company) => (
                <div key={company.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`company-${company.id}`}
                    checked={companyFilters.includes(company.value)}
                    onCheckedChange={() =>
                      handleCompanyFilterChange(company.value)
                    }
                    className="h-4 w-4 rounded border border-[#CBD5E1] data-[state=checked]:bg-[#334155] data-[state=checked]:border-[#334155]"
                  />
                  <label
                    htmlFor={`company-${company.id}`}
                    className="text-xs font-medium text-[#334155] cursor-pointer"
                  >
                    {company.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Slot filters */}
          <div>
            <h4 className="font-medium text-sm text-[#0F172A] mb-3">
              Available Slots
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {slotOptions.map((slot) => (
                <div key={slot.id} className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center cursor-pointer ${
                      slotFilter === slot.value
                        ? "border-[#334155] bg-white"
                        : "border-[#CBD5E1]"
                    }`}
                    onClick={() => handleSlotFilterChange(slot.value)}
                  >
                    {slotFilter === slot.value && (
                      <div className="h-2 w-2 rounded-full bg-[#334155]"></div>
                    )}
                  </div>
                  <label
                    className="text-xs font-medium text-[#334155] cursor-pointer"
                    onClick={() => handleSlotFilterChange(slot.value)}
                  >
                    {slot.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating filters */}
          <div>
            <h4 className="font-medium text-sm text-[#0F172A] mb-3">Rating</h4>
            <div className="grid grid-cols-2 gap-2">
              {ratingOptions.map((rating) => (
                <div key={rating.id} className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center cursor-pointer ${
                      ratingFilter === rating.value
                        ? "border-[#334155] bg-white"
                        : "border-[#CBD5E1]"
                    }`}
                    onClick={() => handleRatingFilterChange(rating.value)}
                  >
                    {ratingFilter === rating.value && (
                      <div className="h-2 w-2 rounded-full bg-[#334155]"></div>
                    )}
                  </div>
                  <label
                    className="text-xs font-medium text-[#334155] cursor-pointer"
                    onClick={() => handleRatingFilterChange(rating.value)}
                  >
                    {rating.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom padding for mobile */}
        <div className="h-6 md:hidden" />
      </div>
    </>
  );
}
