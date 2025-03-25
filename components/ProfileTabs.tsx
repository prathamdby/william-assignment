"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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
        "px-4 py-2 text-sm font-medium relative",
        isActive ? "text-[#334155]" : "text-[#94A3B8]"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#334155]" />
      )}
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

  return (
    <div className="w-full border-b border-[#E2E8F0]">
      <div className="flex space-x-4">
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
  );
}
