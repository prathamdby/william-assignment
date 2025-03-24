"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  MessageSquareIcon,
} from "lucide-react";

const navItems = [
  {
    title: "Mentor",
    href: "/mentors",
    icon: UserIcon,
  },
  {
    title: "Job",
    href: "/jobs",
    icon: BriefcaseIcon,
  },
  {
    title: "Booking",
    href: "/bookings",
    icon: CalendarIcon,
  },
  {
    title: "Priority DM",
    href: "/priority-dm",
    icon: MessageSquareIcon,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="w-[177px] min-h-screen bg-[#F8FAFC] flex flex-col pt-[84px]">
      <div className="flex flex-col gap-3 px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
              pathname === item.href
                ? "bg-[#E2E8F0] text-[#0F172A]"
                : "text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9]",
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
