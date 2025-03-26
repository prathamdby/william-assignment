"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Video,
  Clock,
  Calendar,
  IndianRupee,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
  PackageIcon,
  Presentation,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/Calendar";

interface AssistItem {
  text: string;
}

// Service type interfaces
interface BaseService {
  id: number;
  title: string;
  description: string;
  type: string;
  serviceType: {
    icon: React.ReactNode;
    label: string;
    details?: {
      icon: React.ReactNode;
      label: string;
    }[];
  };
  amount: { value: string };
}

interface CallService extends BaseService {
  type: "call";
  duration: {
    icon: React.ReactNode;
    label: string;
  };
}

interface DMService extends BaseService {
  type: "dm";
  replies: {
    icon: React.ReactNode;
    label: string;
  };
}

interface PackageService extends BaseService {
  type: "package";
  duration: {
    icon: React.ReactNode;
    label: string;
  };
}

interface WebinarService extends BaseService {
  type: "webinar";
  date: {
    icon: React.ReactNode;
    label: string;
  };
}

interface DigitalProductService extends BaseService {
  type: "product";
  thumbnailContent: {
    title: string;
    description: string;
  };
}

type Service =
  | CallService
  | DMService
  | PackageService
  | WebinarService
  | DigitalProductService;

// Type guards
const isCallService = (service: Service): service is CallService =>
  service.type === "call";
const isWebinarService = (service: Service): service is WebinarService =>
  service.type === "webinar";
const isDMService = (service: Service): service is DMService =>
  service.type === "dm";
const isPackageService = (service: Service): service is PackageService =>
  service.type === "package";
const isProductService = (service: Service): service is DigitalProductService =>
  service.type === "product";

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

const timezones = [
  "(GMT + 5:30) Chennai, Kolkata, Mumbai, New Delhi(IST)",
  "(GMT + 0:00) London, Dublin, Edinburgh (GMT)",
  "(GMT - 5:00) Eastern Time (US & Canada)",
  "(GMT - 8:00) Pacific Time (US & Canada)",
  "(GMT + 1:00) Paris, Berlin, Rome, Madrid (CET)",
  "(GMT + 8:00) Beijing, Hong Kong, Singapore",
  "(GMT + 9:00) Tokyo, Seoul (JST)",
  "(GMT + 10:00) Sydney, Melbourne (AEST)",
  "(GMT + 3:00) Moscow, St. Petersburg (MSK)",
  "(GMT - 7:00) Mountain Time (US & Canada)",
];

// Service data from mentor page
const services: Service[] = [
  {
    id: 1,
    title: "Career Guidance",
    description:
      "I'll give you advice to help with your career decisions. I'll give you advice to help with your career decisions.",
    type: "call",
    serviceType: {
      icon: <Video className="w-4 h-4 text-[#3B82F6]" />,
      label: "1:1 call",
    },
    duration: {
      icon: <Clock className="w-4 h-4 text-[#3B82F6]" />,
      label: "30 min",
    },
    amount: { value: "300" },
  },
  {
    id: 2,
    title: "Resume Review",
    description: "I'll refine your resume to land better opportunities.",
    type: "dm",
    serviceType: {
      icon: <MessageSquare className="w-4 h-4 text-[#3B82F6]" />,
      label: "Priority DM",
    },
    replies: {
      icon: <Clock className="w-4 h-4 text-[#3B82F6]" />,
      label: "In 1 day",
    },
    amount: { value: "100" },
  },
  {
    id: 3,
    title: "1 month career guidance full confidence",
    description:
      "2 x 1:1 call - Career guidance\n1 X Priority Dm - Resume review...",
    type: "package",
    serviceType: {
      icon: <PackageIcon className="w-4 h-4 text-[#3B82F6]" />,
      label: "Package",
      details: [
        {
          icon: <Video className="w-4 h-4 text-[#3B82F6]" />,
          label: "2 X 1:1 call - Career guidance",
        },
        {
          icon: <MessageSquare className="w-4 h-4 text-[#3B82F6]" />,
          label: "1 X Priority Dm - Resume review",
        },
        {
          icon: <Presentation className="w-4 h-4 text-[#3B82F6]" />,
          label: "1 X Webinar - Interview tips and tricks",
        },
      ],
    },
    duration: {
      icon: <Clock className="w-4 h-4 text-[#3B82F6]" />,
      label: "1 month",
    },
    amount: { value: "1,000" },
  },
  {
    id: 4,
    title: "Interview tips and tricks advice",
    description: "Practical strategies to boost your interview confidence.",
    type: "webinar",
    serviceType: {
      icon: <Presentation className="w-4 h-4 text-[#3B82F6]" />,
      label: "Webinar",
    },
    date: {
      icon: <Calendar className="w-4 h-4 text-[#3B82F6]" />,
      label: "On 28th Oct",
    },
    amount: { value: "200" },
  },
  {
    id: 5,
    title: "Dealing with stakeholder",
    description:
      "I'll tell you practical strategies to deal with your stakeholder and how to conduct it smoothly",
    type: "webinar",
    serviceType: {
      icon: <Presentation className="w-4 h-4 text-[#3B82F6]" />,
      label: "Webinar",
    },
    date: {
      icon: <Calendar className="w-4 h-4 text-[#3B82F6]" />,
      label: "On 30th Dec",
    },
    amount: { value: "350" },
  },
];

// Digital product
const digitalProduct: DigitalProductService = {
  id: 6,
  title: "SQL Basics Cheat Sheet",
  description: "To strengthen your SQL and data skills",
  type: "product",
  serviceType: {
    icon: <PackageIcon className="w-4 h-4 text-[#3B82F6]" />,
    label: "Digital product",
  },
  thumbnailContent: {
    title: "Associate Data engineer in SQL",
    description:
      "Gain practical knowledge in ETL, SQL and data warehousing for data engineering",
  },
  amount: { value: "500" },
};

// Add digital product to services array for consistent indexing
services.push(digitalProduct);

// Function to get service by ID
const getServiceById = (id: string): Service | undefined => {
  const serviceId = parseInt(id);
  return services.find((service) => service.id === serviceId);
};

export default function ServiceDetailsPage({
  params,
}: {
  params: { id: string; serviceId: string };
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    timezones[0],
  );
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get service data
  const service = getServiceById(params.serviceId);

  // Show error if service not found
  if (!service) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-[#0F172A] mb-4">
            Service not found
          </h1>
          <Link
            href={`/mentor/${params.id}`}
            className="px-4 py-2 bg-[#334155] text-white text-sm font-semibold rounded-md hover:opacity-90"
          >
            Back to mentor
          </Link>
        </div>
      </div>
    );
  }

  // Get mentor name based on ID (simplified for demo)
  const mentorName = "Jonny Rose";

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimezoneDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top section with back button, mentor name and service card */}
      <div className="border-b border-[#E2E8F0]">
        <div className="relative py-6">
          {/* Back button - positioned absolutely to maintain position */}
          <Link
            href={`/mentor/${params.id}`}
            className="absolute top-6 left-8 flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
            <span className="text-[#64748B]">Back</span>
          </Link>

          <div className="px-[113px]">
            {/* Mentor name with verification icon - aligned in the same line as back button */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#0F172A]">
                {mentorName}
              </h1>
              <ShieldCheck className="w-5 h-5 text-[#00C16A]" />
            </div>

            {/* Service Card */}
            <div className="mt-6 w-full rounded-xl border border-[#CBD5E1] shadow-[0_4px_6px_0_rgba(0,0,0,0.05)] p-6">
              {isProductService(service) ? (
                <div>
                  {/* Thumbnail for digital product */}
                  <div className="mb-4 rounded-lg overflow-hidden bg-[#05192D] h-56 flex flex-col justify-center">
                    <div className="p-6">
                      <h3 className="text-[24px] font-semibold text-[#03EF62] leading-[32px]">
                        {service.thumbnailContent.title}
                      </h3>
                      <p className="text-[18px] font-semibold text-white leading-[28px] mt-2">
                        {service.thumbnailContent.description}
                      </p>
                    </div>
                  </div>

                  {/* Title and description */}
                  <div className="flex flex-col gap-2 pb-6 border-b border-[#E2E8F0]">
                    <h1 className="text-xl font-semibold text-[#334155]">
                      {service.title}
                    </h1>
                    <p className="text-sm text-[#334155]">
                      {service.description}
                    </p>
                  </div>

                  {/* Assist you with section */}
                  <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
                    <p className="text-sm text-[#64748B] font-medium">
                      What you'll get
                    </p>
                    <div className="mt-2 p-4 bg-[#EFF6FF] rounded">
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
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 bg-[#EEF2FF] rounded p-3">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-[#64748B] font-medium">
                          Service type
                        </p>
                        <div className="flex items-center gap-1">
                          {service.serviceType.icon}
                          <span className="text-sm font-semibold text-[#334155]">
                            {service.serviceType.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-full border-r border-[#E2E8F0]"></div>

                    <div className="flex-1 bg-[#EEF2FF] rounded p-3">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-[#64748B] font-medium">
                          Amount
                        </p>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-[#00C16A]" />
                          <span className="text-sm font-semibold text-[#334155]">
                            {service.amount.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Title and description for regular services */}
                  <div className="flex flex-col gap-2 pb-6 border-b border-[#E2E8F0]">
                    <h1 className="text-xl font-semibold text-[#334155]">
                      {service.title}
                    </h1>
                    <p className="text-sm text-[#334155]">
                      {service.description}
                    </p>
                  </div>

                  {/* Assist you with section */}
                  <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
                    <p className="text-sm text-[#64748B] font-medium">
                      Assist you with
                    </p>
                    <div className="mt-2 p-4 bg-[#EFF6FF] rounded">
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
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 bg-[#F9FAFB] rounded p-3">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-[#64748B] font-medium">
                          Service type
                        </p>
                        <div className="flex items-center gap-1">
                          {service.serviceType.icon}
                          <span className="text-sm font-semibold text-[#334155]">
                            {service.serviceType.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-full border-r border-[#E2E8F0]"></div>

                    {(isCallService(service) || isPackageService(service)) && (
                      <div className="flex-1 bg-[#F9FAFB] rounded p-3">
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-[#64748B] font-medium">
                            Duration
                          </p>
                          <div className="flex items-center gap-1">
                            {service.duration.icon}
                            <span className="text-sm font-semibold text-[#334155]">
                              {service.duration.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {isWebinarService(service) && (
                      <div className="flex-1 bg-[#F9FAFB] rounded p-3">
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-[#64748B] font-medium">
                            Date
                          </p>
                          <div className="flex items-center gap-1">
                            {service.date.icon}
                            <span className="text-sm font-semibold text-[#334155]">
                              {service.date.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {isDMService(service) && (
                      <div className="flex-1 bg-[#F9FAFB] rounded p-3">
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-[#64748B] font-medium">
                            Replies
                          </p>
                          <div className="flex items-center gap-1">
                            {service.replies.icon}
                            <span className="text-sm font-semibold text-[#334155]">
                              {service.replies.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="h-full border-r border-[#E2E8F0]"></div>

                    <div className="flex-1 bg-[#F9FAFB] rounded p-3">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-[#64748B] font-medium">
                          Amount
                        </p>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-[#00C16A]" />
                          <span className="text-sm font-semibold text-[#334155]">
                            {service.amount.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slot section - Show for all service types */}
      <div className="px-[113px] py-6 pb-12">
        <h2 className="text-2xl font-medium text-[#0F172A] mb-8">Slot</h2>

        {/* Date and Time selection */}
        <div className="w-full rounded-xl border border-[#CBD5E1] shadow-[0_4px_6px_0_rgba(0,0,0,0.05)] p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Date picker */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-lg font-medium text-[#64748B]">Date</span>
              </div>
              <div className="rounded-lg overflow-hidden">
                <CalendarComponent
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              </div>
            </div>

            {/* Time slots */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-lg font-medium text-[#64748B]">Time</span>
              </div>
              <div className="p-4 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-[#0F172A]">
                    {formatDate(selectedDate)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time, index) => {
                    const isSelected = selectedTimeSlot === time;
                    const isFirst = time === "6:00 - 6:30PM";
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`px-3 py-2 text-xs font-medium rounded border ${
                          isSelected
                            ? "border-[#334155] bg-[#334155] text-white"
                            : isFirst && !isSelected
                              ? "border-[#64748B] bg-[#F3F4F6] text-[#334155]"
                              : "border-[#E2E8F0] bg-white text-[#334155] hover:border-[#64748B]"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
            <h3 className="text-lg font-medium text-[#0F172A] mb-3">
              Timezone
            </h3>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setIsTimezoneDropdownOpen(!isTimezoneDropdownOpen)
                }
                className="w-full px-4 py-2 text-sm text-[#334155] bg-white border border-[#CBD5E1] rounded-lg flex items-center justify-between"
              >
                <span>{selectedTimezone}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${
                    isTimezoneDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isTimezoneDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-[#CBD5E1] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {timezones.map((timezone, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedTimezone(timezone);
                        setIsTimezoneDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-[#F1F5F9] ${
                        selectedTimezone === timezone
                          ? "bg-[#F1F5F9] text-[#334155] font-medium"
                          : "text-[#334155]"
                      }`}
                    >
                      {timezone}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Confirm button */}
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 text-white text-sm font-semibold rounded-md bg-[#334155] hover:opacity-90">
              {isDMService(service)
                ? "Send Message"
                : isProductService(service)
                  ? "Get Now"
                  : "Confirm details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
