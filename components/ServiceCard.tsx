"use client";

import {
  IndianRupee,
  Clock,
  Calendar,
  MessageSquare,
  Video,
  Package as PackageIcon,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  serviceType: {
    icon: React.ReactNode;
    label: string;
  };
  duration?: {
    icon: React.ReactNode;
    label: string;
  };
  date?: {
    icon: React.ReactNode;
    label: string;
  };
  amount: {
    value: string;
  };
  replies?: {
    icon: React.ReactNode;
    label: string;
  };
}

export function ServiceCard({
  title,
  description,
  serviceType,
  duration,
  date,
  amount,
  replies,
}: ServiceCardProps) {
  return (
    <div className="w-full rounded-xl border border-[#CBD5E1] shadow-[0_4px_6px_0_rgba(0,0,0,0.05)] p-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-[#334155]">{title}</h3>
          <button className="h-8 px-3 py-1.5 bg-[#334155] text-white text-xs font-semibold rounded-md">
            View Details
          </button>
        </div>

        <div className="pt-2 pb-2">
          <p className="text-sm text-[#334155]">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#EEF2FF] rounded p-3">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[#64748B] font-medium">Service type</p>
              <div className="flex items-center gap-1">
                {serviceType.icon}
                <span className="text-sm font-semibold text-[#334155]">
                  {serviceType.label}
                </span>
              </div>
            </div>
          </div>

          {(duration || date) && (
            <>
              <div className="h-full border-r border-[#E2E8F0]"></div>
              <div className="flex-1 bg-[#EEF2FF] rounded p-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#64748B] font-medium">
                    {duration ? "Duration" : "Date"}
                  </p>
                  <div className="flex items-center gap-1">
                    {duration?.icon || date?.icon}
                    <span className="text-sm font-semibold text-[#334155]">
                      {duration?.label || date?.label}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {replies && (
            <>
              <div className="h-full border-r border-[#E2E8F0]"></div>
              <div className="flex-1 bg-[#EEF2FF] rounded p-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#64748B] font-medium">Replies</p>
                  <div className="flex items-center gap-1">
                    {replies.icon}
                    <span className="text-sm font-semibold text-[#334155]">
                      {replies.label}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="h-full border-r border-[#E2E8F0]"></div>
          <div className="flex-1 bg-[#EEF2FF] rounded p-3">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[#64748B] font-medium">Amount</p>
              <div className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4 text-[#00C16A]" />
                <span className="text-sm font-semibold text-[#334155]">
                  {amount.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
