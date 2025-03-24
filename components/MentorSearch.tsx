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
} from "lucide-react";
import { NoResultsToast } from "@/components/ui/no-results-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Role options for filter
const roleOptions = [
  { id: 1, label: "SE/SDE", value: "se-sde" },
  { id: 2, label: "DS/AI/ML", value: "ds-ai-ml" },
  { id: 3, label: "Product Management", value: "product-management" },
  { id: 4, label: "Project Management", value: "project-management" },
  { id: 5, label: "Consulting", value: "consulting" },
  { id: 6, label: "Quantitative Finance", value: "quantitative-finance" },
];

interface MentorSearchProps {
  onSearch?: (term: string) => void;
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

export function MentorSearch({ onSearch }: MentorSearchProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<
    { id: number; label: string }[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showNoResultsToast, setShowNoResultsToast] = useState(false);

  // Add states for filters
  const [roleFilters, setRoleFilters] = useState<string[]>([]);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  // Other filter states that would be added in a complete implementation
  const [companyFilters, setCompanyFilters] = useState<string[]>([]);
  const [slotFilters, setSlotFilters] = useState<string[]>([]);
  const [ratingFilters, setRatingFilters] = useState<string[]>([]);

  const trendingSearches = [
    { id: 1, label: "Microsoft" },
    { id: 2, label: "Slack" },
    { id: 3, label: "Google" },
    { id: 4, label: "Amazon" },
  ];

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

  // Generate autocomplete suggestions based on the current search value
  const suggestions = useMemo(() => {
    if (!searchValue.trim()) return [];

    const normalizedInput = searchValue.toLowerCase().trim();
    return searchSuggestions
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(normalizedInput) &&
          suggestion.toLowerCase() !== normalizedInput
      )
      .slice(0, 5); // Limit to 5 suggestions
  }, [searchValue]);

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
  }, []);

  // Add a search term to recent searches
  const addToRecentSearches = (term: string) => {
    if (!term.trim()) return;

    // Check if term already exists
    const existingIndex = recentSearches.findIndex(
      (item) => item.label.toLowerCase() === term.toLowerCase()
    );

    // If exists, remove it to re-add at top
    if (existingIndex !== -1) {
      const updatedSearches = [...recentSearches];
      updatedSearches.splice(existingIndex, 1);
      setRecentSearches([{ id: Date.now(), label: term }, ...updatedSearches]);
    } else {
      // If doesn't exist, add to top (limited to 5 items)
      setRecentSearches([
        { id: Date.now(), label: term },
        ...recentSearches.slice(0, 4),
      ]);
    }
  };

  // Handle search submission
  const handleSearch = (term: string) => {
    addToRecentSearches(term);
    setSearchValue(term);
    setIsSearchFocused(false);

    // Call the parent component's search handler if provided
    if (onSearch) {
      onSearch(term);
    }

    // Only show toast if there's a search term and no matching results in searchSuggestions
    if (
      term.trim() &&
      !searchSuggestions.some((suggestion) =>
        suggestion.toLowerCase().includes(term.toLowerCase())
      )
    ) {
      setShowNoResultsToast(true);
      setTimeout(() => setShowNoResultsToast(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  const handleSearchItemClick = (term: string) => {
    handleSearch(term);
  };

  const clearRecentSearch = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter((item) => item.id !== id));
  };

  const clearSearch = () => {
    setSearchValue("");
    // Focus the input after clearing
    const inputElement = searchRef.current?.querySelector("input");
    if (inputElement) {
      inputElement.focus();
    }
  };

  const hideNoResultsToast = () => {
    setShowNoResultsToast(false);
  };

  // Determine if we should show the autocomplete suggestions
  const showSuggestions =
    isSearchFocused && searchValue.trim() !== "" && suggestions.length > 0;
  const showRecentAndTrending = isSearchFocused && searchValue.trim() === "";

  return (
    <div className="flex justify-between items-center w-full">
      <NoResultsToast show={showNoResultsToast} onHide={hideNoResultsToast} />

      <div className="relative" ref={searchRef}>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search by name, company, role"
              className="w-[352px] h-10 pl-10 pr-8 text-xs bg-[#F1F5F9] rounded-md focus:outline-none border border-[#CBD5E1] text-[#64748B] placeholder-[#64748B]"
              onFocus={() => setIsSearchFocused(true)}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                onClick={clearSearch}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>

        {/* Autocomplete Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md border border-[#E2E8F0] shadow-lg z-10 p-3 pb-4">
            <div className="flex flex-col">
              <div className="flex flex-col">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 py-1 px-2 hover:bg-[#F1F5F9] rounded cursor-pointer"
                    onClick={() => handleSearchItemClick(suggestion)}
                  >
                    <Search size={16} className="text-[#94A3B8]" />
                    <span className="text-xs text-[#334155]">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent & Trending Searches Dropdown */}
        {showRecentAndTrending && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg border border-[#E2E8F0] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)] z-10 p-3">
            {/* Recent Searches Section */}
            {recentSearches.length > 0 && (
              <div className="flex flex-col gap-2 mb-2.5">
                <span className="text-xs font-semibold text-[#0F172A]">
                  Recent search
                </span>
                <div className="flex flex-col">
                  {recentSearches.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-2 py-1 hover:bg-[#F1F5F9] rounded cursor-pointer group"
                      onClick={() => handleSearchItemClick(item.label)}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#94A3B8]" />
                        <span className="text-xs leading-tight text-[#334155] font-medium">
                          {item.label}
                        </span>
                      </div>
                      <button
                        className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-[#64748B]"
                        onClick={(e) => clearRecentSearch(e, item.id)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches Section */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#0F172A]">
                Trending searches
              </span>
              <div className="flex flex-col">
                {trendingSearches.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-[#F1F5F9] rounded cursor-pointer"
                    onClick={() => handleSearchItemClick(item.label)}
                  >
                    <TrendingUp size={16} className="text-[#94A3B8]" />
                    <span className="text-xs leading-tight text-[#334155] font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <RoleFilterButton
          roleFilters={roleFilters}
          onRoleChange={handleRoleFilterChange}
          isOpen={isRoleOpen}
          setIsOpen={setIsRoleOpen}
        />
        <FilterButton label="Company" />
        <FilterButton label="Slot" />
        <FilterButton label="Rating" />
      </div>
    </div>
  );
}

interface RoleFilterButtonProps {
  roleFilters: string[];
  onRoleChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function RoleFilterButton({
  roleFilters,
  onRoleChange,
  isOpen,
  setIsOpen,
}: RoleFilterButtonProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`relative h-10 px-3 py-1.5 text-xs font-medium border-[#CBD5E1] ${
            isOpen
              ? "bg-[#F8FAFC] text-[#334155] border-[#CBD5E1]"
              : "text-[#334155]"
          } rounded-md flex items-center gap-2`}
        >
          Role
          {isOpen ? (
            <ChevronUp size={16} className="text-[#94A3B8]" />
          ) : (
            <ChevronDown size={16} className="text-[#94A3B8]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-white w-[184px] shadow-lg rounded-[6px] border border-[#E2E8F0] mt-1 p-1 overflow-visible"
        style={{
          boxShadow:
            "0px 10px 15px 0px rgba(0, 0, 0, 0.1), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)",
        }}
        sideOffset={5}
      >
        <div className="relative">
          <div className="absolute top-[-9px] left-[24px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#E2E8F0]"></div>
          <div className="absolute top-[-8px] left-[24px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
        </div>
        <div className="py-1">
          {roleOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#F8FAFC] rounded-[6px] cursor-pointer"
              onClick={() => onRoleChange(option.value)}
            >
              <div
                className={`h-4 w-4 border ${
                  roleFilters.includes(option.value)
                    ? "border-[#334155]"
                    : "border-[#94A3B8]"
                } rounded-sm flex items-center justify-center`}
              >
                {roleFilters.includes(option.value) && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33334 2.5L3.75001 7.08333L1.66667 5"
                      stroke="#334155"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-xs font-medium text-[#334155]">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      className="h-10 px-3 py-1.5 text-xs font-medium border-[#CBD5E1] text-[#334155] rounded-md"
    >
      {label}
      <ChevronDown size={16} className="ml-2" />
    </Button>
  );
}
