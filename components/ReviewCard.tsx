"use client";

import Image from "next/image";
import { User } from "lucide-react";

interface ReviewCardProps {
  rating: number;
  content: string;
  author: {
    name: string;
    image?: string;
    isAnonymous?: boolean;
  };
}

export function ReviewCard({ rating, content, author }: ReviewCardProps) {
  return (
    <div className="w-full rounded-xl border border-[#CBD5E1] shadow-[0_4px_6px_0_rgba(0,0,0,0.03)] p-4 sm:p-6">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <span className="text-base font-semibold text-[#334155]">
              {rating.toFixed(1)}
            </span>
            <div className="flex shrink-0">
              <Image src="/images/star.svg" alt="Star" width={16} height={16} />
            </div>
          </div>
        </div>

        <div className="bg-[#F8FAFC] rounded p-3 w-full">
          <p className="text-sm text-[#334155] break-words whitespace-pre-wrap">
            {content}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full">
          {author.isAnonymous ? (
            <div className="w-6 h-6 bg-[#E2E8F0] rounded-full flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#64748B] opacity-30" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-[#E2E8F0] rounded-full flex items-center justify-center overflow-hidden shrink-0">
              {author.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <User className="w-4 h-4 text-[#64748B]" />
              )}
            </div>
          )}
          <span className="text-sm text-[#64748B] break-words min-w-0 flex-1">
            {author.name}
          </span>
        </div>
      </div>
    </div>
  );
}
