"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MentorCard } from "@/components/MentorCard";
import { MentorSearch } from "@/components/MentorSearch";
import { NoResultsToast } from "@/components/ui/no-results-toast";

// Sample mentor data
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
  },
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(mentorsData);
  const [showNoResultsToast, setShowNoResultsToast] = useState(false);

  // Filter mentors when search term changes
  useEffect(() => {
    // If search term is empty, show all mentors
    if (!searchTerm || !searchTerm.trim()) {
      setFilteredMentors(mentorsData);
      return;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = mentorsData.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(lowercaseSearchTerm) ||
        mentor.company.toLowerCase().includes(lowercaseSearchTerm) ||
        mentor.title.toLowerCase().includes(lowercaseSearchTerm) ||
        mentor.bio.toLowerCase().includes(lowercaseSearchTerm)
    );

    // Show toast if no results found
    if (filtered.length === 0) {
      setShowNoResultsToast(true);
    } else {
      setShowNoResultsToast(false);
    }

    setFilteredMentors(filtered);
  }, [searchTerm]);

  // Handle search from MentorSearch component
  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // If it's a non-matching search term, show toast
    if (
      term &&
      !mentorsData.some(
        (mentor) =>
          mentor.name.toLowerCase().includes(term.toLowerCase()) ||
          mentor.company.toLowerCase().includes(term.toLowerCase()) ||
          mentor.title.toLowerCase().includes(term.toLowerCase()) ||
          mentor.bio.toLowerCase().includes(term.toLowerCase())
      )
    ) {
      setShowNoResultsToast(true);
    }
  };

  // Hide the no results toast
  const hideNoResultsToast = () => {
    setShowNoResultsToast(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NoResultsToast show={showNoResultsToast} onHide={hideNoResultsToast} />

      <div className="bg-[#DBEAFE] py-4 px-[106px]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium font-montserrat text-[#0F172A]">
            Mentors
          </h1>
          <button className="h-10 px-4 py-2 text-xs font-semibold border border-[#CBD5E1] rounded-md text-[#334155]">
            Become a mentor
          </button>
        </div>
      </div>

      <div className="py-6 px-[106px]">
        <MentorSearch onSearch={handleSearch} />
      </div>

      <div className="flex-1 px-[106px] py-4 space-y-4">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
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
          <div className="text-center py-12 text-gray-500">
            No mentors found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
