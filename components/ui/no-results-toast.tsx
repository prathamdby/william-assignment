"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface NoResultsToastProps {
  show: boolean;
  onHide: () => void;
  duration?: number;
}

export function NoResultsToast({
  show,
  onHide,
  duration = 5000,
}: NoResultsToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setProgress(100);

      // Set up progress animation with requestAnimationFrame for smoother animation
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
          setIsVisible(false);
          onHide();
        }
      };

      animationFrameId = requestAnimationFrame(animateProgress);

      // Auto hide after duration as a fallback
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onHide();
      }, duration);

      return () => {
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timeout);
      };
    } else {
      setIsVisible(false);
    }
  }, [show, duration, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div className="mt-4 bg-white border border-[#E2E8F0] rounded-lg shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)] w-[190px] animate-fade-in-down relative overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3">
          <Image
            src="/icons/error_outline.svg"
            alt="Error"
            width={18}
            height={18}
            className="text-[#EF4444]"
          />
          <span className="text-sm text-[#0F172A] font-medium font-['DM Sans']">
            No results found
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
