"use client";

import { BellIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNavbar() {
  return (
    <div className="w-full flex justify-end items-center gap-4 py-4 px-4 md:px-6 border-b border-[#E2E8F0]">
      <button className="w-8 h-8 rounded-md flex items-center justify-center shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] border border-[#CBD5E1]">
        <BellIcon className="w-5 h-5 text-[#94A3B8]" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#CBD5E1] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="/images/jimmy_avatar.jpg"
                alt="User avatar"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-[#64748B]">Jimmy</span>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-[#94A3B8]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
