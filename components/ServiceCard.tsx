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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Link from "next/link";

interface ServiceCardProps {
  id: number;
  mentorId: string;
  title: string;
  description: string;
  serviceType: {
    icon: React.ReactNode;
    label: string;
    details?: {
      icon: React.ReactNode;
      label: string;
    }[];
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
  id,
  mentorId,
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
          <Link
            href={`/mentor/${mentorId}/service/${id}`}
            className="h-8 px-3 py-1.5 bg-[#334155] text-white text-xs font-semibold rounded-md hover:opacity-90"
          >
            View Details
          </Link>
        </div>

        <div className="pt-2 pb-2">
          {serviceType.details ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="text-sm w-max text-[#334155] cursor-pointer">
                  {description}
                </p>
              </HoverCardTrigger>
              <HoverCardContent
                side="right"
                align="start"
                className="relative w-[232px] p-1 ml-2 -mt-2 bg-white border border-[#E2E8F0] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.1)]"
              >
                <div className="p-1 bg-[#F8FAFC] border border-[#CBD5E1] border-dashed rounded-[4px]">
                  <div className="flex flex-col gap-0.5">
                    {serviceType.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 p-[6px] hover:bg-[#F8FAFC] rounded-[4px]"
                      >
                        <div className="w-4 h-4 text-[#3B82F6]">
                          {detail.icon}
                        </div>
                        <span className="text-xs font-medium text-[#64748B] font-['DM_Sans'] leading-[1.302em]">
                          {detail.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-[14px] -left-[5px] w-2 h-2 rotate-45 bg-white border-l border-b border-[#E2E8F0]" />
              </HoverCardContent>
            </HoverCard>
          ) : (
            <p className="text-sm text-[#334155]">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex-1 bg-[#EEF2FF] rounded p-3 cursor-pointer">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#64748B] font-medium">
                    Service type
                  </p>
                  <div className="flex items-center gap-1">
                    {serviceType.icon}
                    <span className="text-sm font-semibold text-[#334155]">
                      {serviceType.label}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            {serviceType.details && (
              <HoverCardContent className="w-[232px] p-1 bg-white border border-[#E2E8F0] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
                <div className="relative">
                  <div className="p-1 bg-[#F8FAFC] border border-[#CBD5E1] border-dashed rounded-[4px]">
                    <div className="flex flex-col gap-0.5">
                      {serviceType.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 p-[6px] hover:bg-[#F8FAFC] rounded-[4px]"
                        >
                          <div className="w-4 h-4 text-[#3B82F6]">
                            {detail.icon}
                          </div>
                          <span className="text-xs font-medium text-[#64748B] font-['DM_Sans'] leading-[1.302em]">
                            {detail.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -top-2 left-4 w-2 h-2 rotate-45 bg-white border-t border-l border-[#E2E8F0]" />
                </div>
              </HoverCardContent>
            )}
          </HoverCard>

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
