"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface NoResultsToastProps {
  show: boolean;
  onHide: () => void;
  duration?: number;
  message?: string;
  icon?: React.ReactNode;
}

export function NoResultsToast({
  show,
  onHide,
  duration = 5000,
  message = "No results found",
  icon,
}: NoResultsToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setProgress(100);

      let animationFrameId: number;
      const startTime = Date.now();
      const endTime = startTime + duration;

      const animateProgress = () => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const newProgress = (remaining / duration) * 100;

        setProgress(newProgress);

        if (newProgress > 0) {
          animationFrameId = requestAnimationFrame(animateProgress);
        } else {
          setTimeout(() => {
            setIsVisible(false);
            onHide();
          }, 100);
        }
      };

      animationFrameId = requestAnimationFrame(animateProgress);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    } else {
      setIsVisible(false);
    }
  }, [show, duration, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-[32px] left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)] w-full max-w-[95%] sm:max-w-[90%] md:max-w-[705px] lg:w-[705px] animate-fade-in-down relative overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          {icon ? (
            icon
          ) : (
            <Image
              src="/icons/error_outline.svg"
              alt="Error"
              width={18}
              height={18}
              className="text-[#EF4444]"
            />
          )}
          <span className="text-sm text-[#0F172A] font-medium font-['DM Sans']">
            {message}
          </span>
        </div>
        <div
          className="h-[2px] bg-[#EF4444] absolute bottom-0 left-0 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
