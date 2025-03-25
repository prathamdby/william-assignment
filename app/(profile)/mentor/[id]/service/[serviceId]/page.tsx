"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Video,
  Clock,
  Calendar,
  IndianRupee,
  ChevronDown,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/Calendar";

interface AssistItem {
  text: string;
}

const assistItems: AssistItem[] = [
  { text: "I can help you figure out your next steps." },
  {
    text: "I can guide you through career transitions and help you explore new fields.",
  },
  {
    text: "Need advice on software engineering roles? I'll help you navigate your options.",
  },
];

const timeSlots = [
  "6:00 - 6:30PM",
  "7:00 - 7:30PM",
  "8:00 - 8:30PM",
  "9:00 - 9:30PM",
  "10:00 - 10:30PM",
  "11:00 - 11:30PM",
  "12:00 - 12:30PM",
  "1:00 - 1:30PM",
  "2:00 - 2:30PM",
  "3:00 - 3:30PM",
];

export default function ServiceDetailsPage({
  params,
}: {
  params: { id: string; serviceId: string };
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${months[date.getMonth()]}, ${
      days[date.getDay()]
    }`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        <Link
          href={`/mentor/${params.id}`}
          className="flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
          <span className="text-[#64748B]">Back</span>
        </Link>

        <div className="w-full max-w-[1387px] mx-auto px-[113px] py-6">
          {/* Service Card */}
          <div className="w-full rounded-xl border border-[#CBD5E1] shadow-[0_4px_6px_0_rgba(0,0,0,0.05)] p-6">
            {/* Title and description */}
            <div className="flex flex-col gap-2 pb-6 border-b border-[#E2E8F0]">
              <h1 className="text-xl font-semibold text-[#334155]">
                Career Guidance
              </h1>
              <p className="text-sm text-[#334155]">
                I'll give you advice to help with your career decisions. I'll
                give you advice to help with your career decisions.
              </p>
            </div>

            {/* Assist you with section */}
            <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
              <p className="text-sm text-[#334155]">Assist you with</p>
              <div className="mt-2 p-4 bg-[#F8FAFC] rounded">
                <ul className="flex flex-col gap-2">
                  {assistItems.map((item, index) => (
                    <li key={index} className="text-sm text-[#334155]">
                      • {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service details */}
            <div className="mt-6 flex items-center gap-2 pb-6 border-b border-[#E2E8F0]">
              <div className="flex-1 bg-[#EEF2FF] rounded p-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#64748B] font-medium">
                    Service type
                  </p>
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-sm font-semibold text-[#334155]">
                      1:1 call
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-full border-r border-[#E2E8F0]"></div>

              <div className="flex-1 bg-[#EEF2FF] rounded p-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#64748B] font-medium">Duration</p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-sm font-semibold text-[#334155]">
                      30 min
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-full border-r border-[#E2E8F0]"></div>

              <div className="flex-1 bg-[#EEF2FF] rounded p-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#64748B] font-medium">Amount</p>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4 text-[#00C16A]" />
                    <span className="text-sm font-semibold text-[#334155]">
                      300
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slot section */}
          <div className="mt-6">
            <h2 className="text-2xl font-medium text-[#0F172A] mb-4 px-[113px]">
              Slot
            </h2>
            <div className="w-full rounded-xl border border-[#CBD5E1] shadow-[0_4px_6px_0_rgba(0,0,0,0.05)] p-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Date picker */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#64748B]" />
                    <span className="text-lg font-medium text-[#64748B]">
                      Date
                    </span>
                  </div>
                  <CalendarComponent
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                </div>

                {/* Time slots */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#64748B]" />
                    <span className="text-lg font-medium text-[#64748B]">
                      Time
                    </span>
                  </div>
                  <div className="p-4 border border-[#E2E8F0] rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-[#334155]">
                        {formatDate(selectedDate)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTimeSlot(time)}
                          className={`px-3 py-2 text-xs font-medium border rounded ${
                            selectedTimeSlot === time
                              ? "border-[#3B82F6] bg-[#EEF2FF] text-[#334155]"
                              : "border-[#CBD5E1] text-[#334155] hover:border-[#3B82F6] hover:bg-[#EEF2FF]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timezone */}
              <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
                <h3 className="text-lg font-medium text-[#64748B] mb-2">
                  Timezone
                </h3>
                <button className="w-full px-4 py-2 text-sm text-[#334155] bg-white border border-[#CBD5E1] rounded-lg flex items-center justify-between">
                  <span>
                    (GMT + 5:30) Chennai, Kolkata, Mumbai, New Delhi(IST)
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#64748B]" />
                </button>
              </div>

              {/* Confirm button */}
              <div className="mt-6 flex justify-end">
                <button
                  className={`px-4 py-2 text-white text-sm font-semibold rounded-md ${
                    selectedTimeSlot
                      ? "bg-[#334155] hover:opacity-90"
                      : "bg-[#94A3B8] cursor-not-allowed"
                  }`}
                  disabled={!selectedTimeSlot}
                >
                  Confirm details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
