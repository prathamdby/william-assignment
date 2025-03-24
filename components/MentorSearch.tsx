"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";

export function MentorSearch() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
          <Search size={16} />
        </div>
        <div className="w-[352px] h-10 pl-10 text-xs bg-[#E2E8F0] bg-opacity-70 rounded-md flex items-center">
          <span className="text-[#64748B]">Search by name</span>
        </div>
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
