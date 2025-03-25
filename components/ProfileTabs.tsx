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

  return (
    <div className="w-full">
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
  );
}
