"use client";

import { Package, IndianRupee } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  thumbnailContent: {
    title: string;
    description: string;
  };
  amount: string;
  id?: number;
  mentorId?: string;
}

export function ProductCard({
  title,
  description,
  thumbnailContent,
  amount,
  id = 6, // Default ID for the digital product
  mentorId = "1", // Default mentor ID
}: ProductCardProps) {
  return (
    <div className="w-full rounded-xl border border-[#CBD5E1] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] bg-white p-4 sm:p-6">
      {/* Thumbnail - completely separate element with rounded corners */}
      <div className="mb-4 rounded-lg overflow-hidden bg-[#05192D] h-40 sm:h-56 flex flex-col justify-center">
        <div className="p-4 sm:p-6">
          <h3 className="font-dm-sans text-xl sm:text-[24px] font-semibold text-[#03EF62] leading-[1.4] break-words">
            {thumbnailContent.title}
          </h3>
          <p className="font-dm-sans text-base sm:text-[18px] font-semibold text-white leading-[1.4] sm:leading-[28px] mt-2 break-words">
            {thumbnailContent.description}
          </p>
        </div>
      </div>

      {/* Title and button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h3 className="font-dm-sans text-lg sm:text-[20px] font-semibold text-[#334155] leading-[1.4] break-words">
          {title}
        </h3>
        <Link
          href={`/mentor/${mentorId}/service/${id}`}
          className="w-full sm:w-auto h-8 px-3 py-1.5 flex items-center justify-center rounded-[6px] border border-[#334155] bg-[#334155]"
        >
          <span className="font-dm-sans text-[12px] font-semibold text-white leading-none">
            View Details
          </span>
        </Link>
      </div>

      {/* Description */}
      <div className="mt-2 mb-4">
        <p className="font-dm-sans text-[14px] font-medium text-[#334155] leading-[20px] break-words">
          {description}
        </p>
      </div>

      {/* Service details */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-[7px] w-full">
        {/* Service type */}
        <div className="flex-1 bg-[#EEF2FF] rounded-[4px] p-3 min-w-0">
          <p className="font-dm-sans text-[14px] font-medium text-[#64748B] leading-[20px]">
            Service type
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Package className="w-4 h-4 text-[#3B82F6] shrink-0" />
            <span className="font-dm-sans text-[14px] font-semibold text-[#334155] leading-[20px] break-words">
              Digital product
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="flex-1 bg-[#EEF2FF] rounded-[4px] p-3 min-w-0">
          <p className="font-dm-sans text-[14px] font-medium text-[#64748B] leading-[20px]">
            Amount
          </p>
          <div className="flex items-center gap-1 mt-2">
            <IndianRupee className="w-4 h-4 text-[#00C16A] shrink-0" />
            <span className="font-dm-sans text-[14px] font-semibold text-[#334155] leading-[20px] break-words">
              {amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
