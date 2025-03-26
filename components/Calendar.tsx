"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const isSelectedDate = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="p-4 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-[#0F172A]">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-slate-200 rounded"
          >
            <ChevronLeft className="w-4 h-4 text-[#64748B]" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-slate-200 rounded"
          >
            <ChevronRight className="w-4 h-4 text-[#0F172A]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs text-[#64748B] py-1">
            {day}
          </div>
        ))}

        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}

        {[...Array(daysInMonth)].map((_, index) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            index + 1,
          );
          const isSelected = isSelectedDate(date);
          const isTodayDate = isToday(date);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={`h-8 text-sm rounded-md flex items-center justify-center ${
                isSelected
                  ? "bg-[#334155] text-white"
                  : isTodayDate
                    ? "bg-[#F1F5F9] text-[#334155]"
                    : "text-[#334155] hover:bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
