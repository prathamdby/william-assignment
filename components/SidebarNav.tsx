"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a profile page
  const isProfilePage = pathname.startsWith("/mentor/");

  // Handle window resize to detect mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile menu toggle button - only visible on mobile */}
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md border border-[#E2E8F0]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div
          className={cn(
            "min-h-screen bg-[#F8FAFC] border-r border-[#E2E8F0] fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out w-[240px]",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="pt-[87px]">
            <nav className="flex flex-col px-6 space-y-3">
              {navItems.map((item) => {
                // Check if this is the Mentor tab and if we're on a mentor profile page
                const isMentorTabAndProfilePage =
                  item.href === "/mentors" && pathname.startsWith("/mentor/");

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/") ||
                  isMentorTabAndProfilePage;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex transition-colors px-3 py-2 h-[44px] items-center gap-2 rounded-md",
                      isActive
                        ? "bg-[#E2E8F0] text-[#0F172A]"
                        : "text-[#94A3B8] hover:text-[#0F172A]",
                    )}
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.title} icon`}
                      width={20}
                      height={20}
                      className={isActive ? "opacity-100" : "opacity-70"}
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

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </>
    );
  }

  // Desktop sidebar - keep exactly as it was originally
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
