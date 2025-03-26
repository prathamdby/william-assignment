"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";

interface MentorCardProps {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  imgSrc: string;
  isVerified?: boolean;
  reviews?: number;
}

export function MentorCard({
  id,
  name,
  title,
  company,
  bio,
  imgSrc,
  isVerified = true,
  reviews = 3,
}: MentorCardProps) {
  return (
    <div className="w-full rounded-xl border border-[#CBD5E1] shadow-[0_4px_6px_0_rgba(0,0,0,0.05)] p-6 flex gap-6">
      <div className="min-w-[184px] h-[184px]">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={imgSrc}
            alt={`${name} profile`}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(51,65,85,0.4)] flex items-center justify-between px-2 py-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src="/images/star.svg"
                  alt="Star"
                  width={16}
                  height={16}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-white">|</span>
              <span className="text-xs font-semibold text-white">
                {reviews} Reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1 max-w-[400px]">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-[#334155]">{name}</h3>
              {isVerified && (
                <ShieldCheckIcon className="w-5 h-5 text-[#00C16A]" />
              )}
            </div>
            <p className="text-lg text-[#334155]">
              {title} at {company}
            </p>
          </div>

          <Link href={`/mentor/${id}`}>
            <button className="h-10 px-3 py-2 bg-[#334155] text-white text-xs font-semibold rounded-md">
              View profile
            </button>
          </Link>
        </div>

        <div className="p-3 bg-[#F1F5F9] rounded-md">
          <p className="text-sm text-[#334155] line-clamp-3">{bio}</p>
        </div>
      </div>
    </div>
  );
}
