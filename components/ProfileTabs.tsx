"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface TabProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

function Tab({ label, value, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "flex items-center justify-center",
        isActive ? "bg-white text-[#334155]" : "text-[#64748B]",
      )}
      style={{
        fontFamily: "DM Sans",
        fontSize: "14px",
        fontWeight: 500,
        width: "max-content",
        minWidth: "124px",
        padding: "4px 12px",
        borderRadius: "4px",
        lineHeight: "1.43",
      }}
    >
      {label}
    </button>
  );
}

interface ProfileTabsProps {
  tabs: { label: string; value: string }[];
  defaultTab?: string;
  onChange?: (value: string) => void;
}

export function ProfileTabs({
  tabs,
  defaultTab = tabs[0]?.value,
  onChange,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Find the active tab label
  const activeTabLabel =
    tabs.find((tab) => tab.value === activeTab)?.label || tabs[0]?.label;

  return (
    <div className="w-full">
      {/* Mobile Dropdown */}
      <div className="sm:hidden w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 bg-[#F1F5F9] text-[#334155] rounded-lg">
            <span className="text-sm font-medium">{activeTabLabel}</span>
            <ChevronDown className="h-4 w-4 text-[#64748B]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  "text-sm",
                  activeTab === tab.value
                    ? "bg-[#F1F5F9] text-[#334155]"
                    : "text-[#64748B]",
                )}
              >
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block">
        <div
          className="flex"
          style={{
            backgroundColor: "#F1F5F9",
            padding: "4px 6px",
            gap: "8px",
            borderRadius: "8px",
            width: "max-content",
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              isActive={activeTab === tab.value}
              onClick={handleTabChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
