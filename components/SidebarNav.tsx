"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  {
    title: "Mentor",
    href: "/mentors",
    icon: "/icons/mentor-icon.svg",
  },
  {
    title: "Job",
    href: "/jobs",
    icon: "/icons/job-icon.svg",
  },
  {
    title: "Booking",
    href: "/bookings",
    icon: "/icons/booking-icon.svg",
  },
  {
    title: "Priority DM",
    href: "/priority-dm",
    icon: "/icons/message-icon.svg",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="w-[165px] min-h-screen bg-[#F8FAFC]">
      <div className="pt-[87px]">
        <nav className="flex flex-col space-y-3 px-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md h-[32px]",
                  isActive
                    ? "bg-[#E2E8F0] text-[#0F172A]"
                    : "text-[#94A3B8] hover:text-[#0F172A]",
                )}
              >
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={16}
                  height={16}
                />
                <span className="font-dm-sans font-medium text-[14px]">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
