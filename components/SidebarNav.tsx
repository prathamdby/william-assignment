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
  // Consider any path starting with /mentor/ to be a profile page
  const isProfilePage = pathname.startsWith("/mentor/");

  return (
    <div
      className={cn(
        "min-h-screen bg-[#F8FAFC] border-r border-[#E2E8F0]",
        isProfilePage ? "w-[84px]" : "w-[165px]",
      )}
    >
      <div className="pt-[87px]">
        <nav
          className={cn(
            "flex flex-col",
            isProfilePage ? "px-[20px] space-y-3" : "px-4 space-y-3",
          )}
        >
          {navItems.map((item, index) => {
            // Check if this is the Mentor tab and if we're on a mentor profile page
            const isMentorTabAndProfilePage =
              item.href === "/mentors" && pathname.startsWith("/mentor/");

            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/") ||
              isMentorTabAndProfilePage;

            // Add extra space after each item except the last one
            const extraSpaceClass =
              isProfilePage && index < navItems.length - 1 ? "mb-[9px]" : "";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex transition-colors",
                  extraSpaceClass,
                  isProfilePage
                    ? cn(
                        "justify-center items-center",
                        isActive
                          ? "bg-[#E2E8F0] w-[44px] h-[44px] rounded-md"
                          : "w-[44px] h-[44px]",
                      )
                    : cn(
                        "px-3 py-2 h-[32px] items-center gap-2 rounded-md",
                        isActive
                          ? "bg-[#E2E8F0] text-[#0F172A]"
                          : "text-[#94A3B8] hover:text-[#0F172A]",
                      ),
                )}
              >
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={20}
                  height={20}
                  className={isActive ? "opacity-100" : "opacity-70"}
                />
                {!isProfilePage && (
                  <span className="font-dm-sans font-medium text-[14px]">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
