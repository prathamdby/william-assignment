"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, TrendingUp, Clock, X } from "lucide-react";

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
    Array<{ id: number; label: string }>
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingSearches = [
    { id: 1, label: "Microsoft" },
    { id: 2, label: "Slack" },
  ];

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

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      try {
        setRecentSearches(JSON.parse(storedSearches));
      } catch (error) {
        console.error("Failed to parse recent searches:", error);
        setRecentSearches([]);
      }
    }
  }, []);

  // Handle clicks outside the search component to close dropdown
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

    // Create a new array with the new search at the beginning
    const updatedSearches = [
      { id: Date.now(), label: term },
      ...recentSearches
        .filter((item) => item.label.toLowerCase() !== term.toLowerCase())
        .slice(0, 4),
    ];

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Handle search submission
  const handleSearch = (term: string) => {
    // If empty search, reset search results but don't add to recent searches
    if (!term.trim()) {
      setIsSearchFocused(false);

      // Call onSearch with empty string to reset search
      if (onSearch) {
        onSearch("");
      }
      return;
    }

    addToRecentSearches(term);
    setIsSearchFocused(false);

    // Call the onSearch prop if provided
    if (onSearch) {
      onSearch(term);
    }

    // In a real app, this would likely trigger a search action or route change
    console.log(`Searching for: ${term}`);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  // Handle selecting an item from dropdown
  const handleSearchItemClick = (term: string) => {
    setSearchValue(term);
    handleSearch(term);
  };

  // Clear a specific recent search
  const clearRecentSearch = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    const updatedSearches = recentSearches.filter((item) => item.id !== id);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Clear the search input and reset results
  const clearSearch = () => {
    setSearchValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  // What to display in the dropdown depends on:
  // 1. If typing (show suggestions)
  // 2. If focused but empty (show recent + trending)
  // 3. If not focused (show nothing)
  const showSuggestions =
    isSearchFocused && searchValue.trim() !== "" && suggestions.length > 0;
  const showRecentAndTrending = isSearchFocused && searchValue.trim() === "";

  return (
    <div className="flex justify-between items-center w-full">
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
          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md border border-[#E2E8F0] shadow-lg z-10 p-3 pb-4">
            {/* Recent Searches Section */}
            {recentSearches.length > 0 && (
              <div className="flex flex-col mb-4">
                <span className="text-xs font-semibold text-[#0F172A] mb-2">
                  Recent search
                </span>
                <div className="flex flex-col">
                  {recentSearches.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-1 px-2 hover:bg-[#F1F5F9] rounded cursor-pointer group"
                      onClick={() => handleSearchItemClick(item.label)}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#94A3B8]" />
                        <span className="text-xs text-[#334155]">
                          {item.label}
                        </span>
                      </div>
                      <button
                        className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-[#64748B] p-1"
                        onClick={(e) => clearRecentSearch(e, item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches Section */}
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#0F172A] mb-2">
                Trending searches
              </span>
              <div className="flex flex-col">
                {trendingSearches.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 py-1 px-2 hover:bg-[#F1F5F9] rounded cursor-pointer"
                    onClick={() => handleSearchItemClick(item.label)}
                  >
                    <TrendingUp size={16} className="text-[#94A3B8]" />
                    <span className="text-xs text-[#334155]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <FilterButton label="Role" />
        <FilterButton label="Company" />
        <FilterButton label="Slot" />
        <FilterButton label="Rating" />
      </div>
    </div>
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
