"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MentorCard } from "@/components/MentorCard";
import { MentorSearch } from "@/components/MentorSearch";
import { NoResultsToast } from "@/components/ui/no-results-toast";
import { ActiveFilters, FilterOption } from "@/components/ActiveFilters";
import { Switch } from "@/components/ui/switch";

const mentorsData = [
  {
    id: 1,
    name: "Jonny Rose",
    title: "Sr. Software Engineering",
    company: "Google",
    bio: "PM @Bytespectrum || xCloud @Google || xML summer @Amazon || DSA || Team Developement || Growth Management || Full Stack Developer(MERN) || Full Stack Developer(MERN)|| Growth Management || || Growth Management || Full Stack Developer",
    imgSrc: "/images/jonny_rose.jpg",
    isVerified: true,
    reviews: 3,
    role: "se-sde",
    companyType: "faang",
    availability: "next-week",
    rating: 5,
  },
  {
    id: 2,
    name: "Dev Jain",
    title: "Sr. Software Engineering",
    company: "Microsoft",
    bio: "PM @Bytespectrum || xCloud @Google || xML summer @Amazon || DSA || Team Developement || Growth Management || Full Stack Developer(MERN)",
    imgSrc: "/images/dev_jain.jpg",
    isVerified: true,
    reviews: 3,
    role: "se-sde",
    companyType: "faang",
    availability: "this-week",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Rishi Mehta",
    title: "Sr. Software Engineering",
    company: "JP Morgan",
    bio: "Prev Application Engineer @Google",
    imgSrc: "/images/rishi_mehta.jpg",
    isVerified: true,
    reviews: 3,
    role: "se-sde",
    companyType: "mncs",
    availability: "anytime",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Heet Mistry",
    title: "Sr. Software Engineering",
    company: "Zomato",
    bio: "PM @Bytespectrum || xCloud @Google || xML summer @Amazon || DSA || Team Development",
    imgSrc: "/images/heet_mistry.jpg",
    isVerified: false,
    reviews: 3,
    role: "ds-ai-ml",
    companyType: "startups",
    availability: "next-week",
    rating: 4.2,
  },
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(mentorsData);
  const [showNoResultsToast, setShowNoResultsToast] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  const [activeFilters, setActiveFilters] = useState<{
    roles: FilterOption[];
    companies: FilterOption[];
    slots: FilterOption[];
    ratings: FilterOption[];
  }>({
    roles: [],
    companies: [],
    slots: [],
    ratings: [],
  });

  useEffect(() => {
    let filtered = mentorsData;

    if (searchTerm && searchTerm.trim()) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(lowercaseSearchTerm) ||
          mentor.company.toLowerCase().includes(lowercaseSearchTerm) ||
          mentor.title.toLowerCase().includes(lowercaseSearchTerm) ||
          mentor.bio.toLowerCase().includes(lowercaseSearchTerm),
      );
    }

    if (activeFilters.roles.length > 0) {
      const roleValues = activeFilters.roles.map((role) => role.value);
      filtered = filtered.filter((mentor) => roleValues.includes(mentor.role));
    }

    if (activeFilters.companies.length > 0) {
      const companyValues = activeFilters.companies.map(
        (company) => company.value,
      );
      filtered = filtered.filter((mentor) =>
        companyValues.includes(mentor.companyType),
      );
    }

    if (activeFilters.slots.length > 0) {
      const slotValue = activeFilters.slots[0].value;
      filtered = filtered.filter((mentor) => mentor.availability === slotValue);
    }

    if (activeFilters.ratings.length > 0) {
      const ratingValue = activeFilters.ratings[0].value;
      if (ratingValue === "high-to-low") {
        filtered = filtered.sort((a, b) => b.rating - a.rating);
      } else if (ratingValue === "low-to-high") {
        filtered = filtered.sort((a, b) => a.rating - b.rating);
      }
    }

    if (filtered.length === 0) {
      setShowNoResultsToast(true);
    } else {
      setShowNoResultsToast(false);
    }

    setFilteredMentors(filtered);
  }, [searchTerm, activeFilters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filters: {
    roles: FilterOption[];
    companies: FilterOption[];
    slots: FilterOption[];
    ratings: FilterOption[];
  }) => {
    setActiveFilters(filters);
  };

  const handleRemoveFilter = (filterType: string, value: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };

      switch (filterType) {
        case "roles":
          newFilters.roles = prev.roles.filter((role) => role.value !== value);
          break;
        case "companies":
          newFilters.companies = prev.companies.filter(
            (company) => company.value !== value,
          );
          break;
        case "slots":
          newFilters.slots = [];
          break;
        case "ratings":
          newFilters.ratings = [];
          break;
      }

      return newFilters;
    });
  };

  const hideNoResultsToast = () => {
    setShowNoResultsToast(false);
  };

  const handleToggleMentorMode = (checked: boolean) => {
    setSwitchChecked(checked);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NoResultsToast show={showNoResultsToast} onHide={hideNoResultsToast} />

      <div className="bg-[#DBEAFE] py-4 px-4 md:px-6 lg:px-[106px]">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-medium font-montserrat text-[#0F172A]">
            Mentors
          </h1>

          {isMentor ? (
            <div className="bg-[#F8FAFC] rounded-[6px] px-3 py-2 flex items-center gap-2">
              <span className="text-xs font-semibold font-['DM_Sans'] text-[#334155]">
                Switch to Mentor
              </span>
              <Switch
                checked={switchChecked}
                onCheckedChange={handleToggleMentorMode}
              />
            </div>
          ) : (
            <Button
              onClick={() => setIsMentor(true)}
              className="h-8 px-4 py-2 text-xs font-semibold font-['DM_Sans'] bg-white border border-[#CBD5E1] rounded-[6px] text-[#334155] shadow-[0_1px_2px_rgba(15,23,42,0.05)] hover:bg-white hover:text-[#334155] hover:border-[#CBD5E1] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              variant="ghost"
            >
              Become a mentor
            </Button>
          )}
        </div>
      </div>

      <div className="py-4 md:py-6 px-4 md:px-6 lg:px-[106px]">
        <MentorSearch
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
        />
      </div>

      {/* Active Filters */}
      <ActiveFilters
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      <div className="flex-1 px-4 md:px-6 lg:px-[106px] space-y-4 pb-6">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              id={mentor.id}
              name={mentor.name}
              title={mentor.title}
              company={mentor.company}
              bio={mentor.bio}
              imgSrc={mentor.imgSrc}
              isVerified={mentor.isVerified}
              reviews={mentor.reviews}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-[#64748B] text-lg">No mentors found.</p>
            <p className="text-[#64748B]">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
