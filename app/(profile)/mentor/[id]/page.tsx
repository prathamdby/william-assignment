"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheckIcon,
  Share2,
  X,
  Video,
  MessageSquare,
  Clock,
  Calendar,
  IndianRupee,
  PackageIcon,
  Presentation,
  Linkedin,
  Instagram,
  Twitter,
  FileText,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { ProfileTabs } from "@/components/ProfileTabs";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { ReviewCard } from "@/components/ReviewCard";

interface MentorData {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  imgSrc: string;
  isVerified: boolean;
  reviews: number;
  role: string;
  companyType: string;
  availability: string;
  rating: number;
  sessions?: number;
}

// Sample mentor data from mentors page
const mentorsData: MentorData[] = [
  {
    id: 1,
    name: "Jonny Rose",
    title: "Sr. Software Engineering",
    company: "Google",
    bio: "PM @Bytespectrum || xCloud @Google || xML summer @Amazon || DSA || Team Developement || Growth Management || Full Stack Developer(MERN) || Full Stack Developer(MERN)|| Growth Management || || Growth Management || Full Stack Developer",
    imgSrc: "/images/jonny_rose.jpg",
    isVerified: true,
    reviews: 3,
    role: "se-sde",
    companyType: "faang",
    availability: "next-week",
    rating: 5,
  },
  {
    id: 2,
    name: "Dev Jain",
    title: "Sr. Software Engineering",
    company: "Microsoft",
    bio: "PM @Bytespectrum || xCloud @Google || xML summer @Amazon || DSA || Team Developement || Growth Management || Full Stack Developer(MERN)",
    imgSrc: "/images/dev_jain.jpg",
    isVerified: true,
    reviews: 3,
    role: "se-sde",
    companyType: "faang",
    availability: "this-week",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Rishi Mehta",
    title: "Sr. Software Engineering",
    company: "JP Morgan",
    bio: "Prev Application Engineer @Google",
    imgSrc: "/images/rishi_mehta.jpg",
    isVerified: true,
    reviews: 3,
    role: "se-sde",
    companyType: "mncs",
    availability: "anytime",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Heet Mistry",
    title: "Sr. Software Engineering",
    company: "Zomato",
    bio: "PM @Bytespectrum || xCloud @Google || xML summer @Amazon || DSA || Team Development",
    imgSrc: "/images/heet_mistry.jpg",
    isVerified: false,
    reviews: 3,
    role: "ds-ai-ml",
    companyType: "startups",
    availability: "next-week",
    rating: 4.2,
  },
];

// Get mentor data with proper typing
const getMentorData = (
  id: string,
): (MentorData & { sessions: number; isServicesDisabled?: boolean }) | null => {
  const mentor = mentorsData.find((m) => m.id === parseInt(id));
  if (!mentor) return null;
  return {
    ...mentor,
    sessions: 20,
    isServicesDisabled: parseInt(id) === 2, // Disable services for mentor ID 2
  };
};

const profileTabs = [
  { label: "All", value: "all" },
  { label: "1:1 Call", value: "call" },
  { label: "Priority DM", value: "dm" },
  { label: "Package", value: "package" },
  { label: "Webinar", value: "webinar" },
  { label: "Digital product", value: "product" },
];

// Sample services data
const services = [
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
const digitalProduct = {
  id: 6,
  title: "SQL Basics Cheat Sheet",
  description: "To strengthen your SQL and data skills",
  thumbnailContent: {
    title: "Associate Data engineer in SQL",
    description:
      "Gain practical knowledge in ETL, SQL and data warehousing for data engineering",
  },
  type: "product",
  amount: "500",
};

// Sample reviews data
const reviewsData = [
  {
    id: 1,
    rating: 5.0,
    content:
      "He is very friendly and makes you comfortable first, then he give the actual feedback of your technical knowledge which helps to improve yourself, honestly that 1 hour was very helpful and useful for me.",
    author: {
      name: "Vedang Shah",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    id: 2,
    rating: 4.5,
    content:
      "His ability to create a relaxed atmosphere and provide insightful feedback made the hour-long session highly productive.",
    author: {
      name: "Anonyms",
      isAnonymous: true,
    },
  },
  {
    id: 3,
    rating: 5.0,
    content:
      "He is very friendly and makes you comfortable first, then he give the actual feedback of your technical knowledge which helps to improve yourself, honestly that 1 hour was very helpful and useful for me. His honest and actionable feedback on my technical abilities was invaluable",
    author: {
      name: "Hemet Singh",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
  },
];

export default function MentorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("all");
  const mentorData = getMentorData(params.id);

  if (!mentorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative">
      {/* Back button */}
      <Link
        href="/mentors"
        className="flex items-center gap-2 absolute top-6 left-2"
      >
        <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
        <span className="text-sm text-[#64748B]">Back</span>
      </Link>
      {/* Profile section */}
      <div className="px-[113px] py-6 flex justify-center items-start gap-6 mx-auto border-b border-[#E2E8F0]">
        {/* Profile image and reviews */}
        <div className="relative w-[184px] h-[184px] rounded-lg overflow-hidden">
          <Image
            src={mentorData.imgSrc}
            alt={mentorData.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(51,65,85,0.4)] px-2 py-1.5 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src="/images/star.svg"
                  alt="Star"
                  width={12}
                  height={12}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-white">|</span>
            <span className="text-xs font-semibold text-white">
              {mentorData.reviews} Reviews
            </span>
          </div>
        </div>

        {/* Profile info */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-[#334155]">
                  {mentorData.name}
                </h1>
                {mentorData.isVerified && (
                  <ShieldCheckIcon className="w-5 h-5 text-[#00C16A]" />
                )}
              </div>
              <p className="text-lg text-[#334155]">
                {mentorData.title} at {mentorData.company}
              </p>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="px-2 py-1 bg-[#E5E7EB] rounded text-xs font-semibold text-[#0F172A]">
                {mentorData.sessions} Sessions
              </div>
              <div className="flex items-center gap-1.5">
                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  className="p-1 hover:opacity-80"
                >
                  <Linkedin className="w-5 h-5 text-[#020617] stroke-[1.5]" />
                </Link>
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  className="p-1 hover:opacity-80"
                >
                  <Instagram className="w-5 h-5 text-[#020617] stroke-[1.5]" />
                </Link>
                <Link
                  href="https://medium.com"
                  target="_blank"
                  className="p-1 hover:opacity-80"
                >
                  <FileText className="w-5 h-5 text-[#020617] stroke-[1.5]" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="p-1 hover:opacity-80"
                >
                  <Twitter className="w-5 h-5 text-[#020617] stroke-[1.5]" />
                </Link>
                <button className="p-1 hover:opacity-80">
                  <Share2 className="w-5 h-5 text-[#020617] stroke-[1.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="p-3 bg-[#F1F5F9] w-[1387px] rounded-md">
            <p className="text-sm text-[#334155]">{mentorData.bio}</p>
          </div>
        </div>
      </div>

      {/* Services section heading */}
      <div className="px-[113px] pt-4 pb-4">
        <h2 className="text-2xl font-medium text-[#0F172A]">Services</h2>
      </div>

      {/* Tabs - Only show if services are not disabled */}
      {!mentorData.isServicesDisabled && (
        <div className="px-[113px] mb-6">
          <ProfileTabs
            tabs={profileTabs}
            defaultTab="all"
            onChange={setActiveTab}
          />
        </div>
      )}

      {/* Services content */}
      <div className="px-[113px] py-6 border-b border-[#E2E8F0]">
        {mentorData.isServicesDisabled ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 81 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.5 52H44.5V60H36.5V52ZM36.5 20H44.5V44H36.5V20ZM40.46 0C18.38 0 0.5 17.92 0.5 40C0.5 62.08 18.38 80 40.46 80C62.58 80 80.5 62.08 80.5 40C80.5 17.92 62.58 0 40.46 0ZM40.5 72C22.82 72 8.5 57.68 8.5 40C8.5 22.32 22.82 8 40.5 8C58.18 8 72.5 22.32 72.5 40C72.5 57.68 58.18 72 40.5 72Z"
                    fill="#F59E0B"
                  />
                </svg>
                <h3 className="text-[#334155] text-2xl font-bold text-center leading-[1.333] whitespace-pre-line">
                  {"Temporarily out of\nservice"}
                </h3>
              </div>
              <Link
                href="/mentors"
                className="px-4 py-2 bg-[#334155] text-white text-xs font-semibold rounded-md hover:opacity-90"
              >
                Find other mentors
              </Link>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "all" && (
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-8">
                  {services.slice(0, 2).map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      mentorId={params.id}
                      title={service.title}
                      description={service.description}
                      serviceType={service.serviceType}
                      duration={service.duration}
                      date={service.date}
                      replies={service.replies}
                      amount={service.amount}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-8">
                    {services.slice(2, 4).map((service) => (
                      <ServiceCard
                        key={service.id}
                        id={service.id}
                        mentorId={params.id}
                        title={service.title}
                        description={service.description}
                        serviceType={service.serviceType}
                        duration={service.duration}
                        date={service.date}
                        replies={service.replies}
                        amount={service.amount}
                      />
                    ))}
                  </div>
                  <ProductCard
                    title={digitalProduct.title}
                    description={digitalProduct.description}
                    thumbnailContent={digitalProduct.thumbnailContent}
                    amount={digitalProduct.amount}
                    id={digitalProduct.id}
                    mentorId={params.id}
                  />
                </div>
              </div>
            )}

            {activeTab === "call" && (
              <div className="grid grid-cols-2 gap-8">
                {services
                  .filter((service) => service.type === "call")
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      mentorId={params.id}
                      title={service.title}
                      description={service.description}
                      serviceType={service.serviceType}
                      duration={service.duration}
                      date={service.date}
                      replies={service.replies}
                      amount={service.amount}
                    />
                  ))}
              </div>
            )}

            {activeTab === "dm" && (
              <div className="grid grid-cols-2 gap-8">
                {services
                  .filter((service) => service.type === "dm")
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      mentorId={params.id}
                      title={service.title}
                      description={service.description}
                      serviceType={service.serviceType}
                      duration={service.duration}
                      date={service.date}
                      replies={service.replies}
                      amount={service.amount}
                    />
                  ))}
              </div>
            )}

            {activeTab === "package" && (
              <div className="grid grid-cols-2 gap-8">
                {services
                  .filter((service) => service.type === "package")
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      mentorId={params.id}
                      title={service.title}
                      description={service.description}
                      serviceType={service.serviceType}
                      duration={service.duration}
                      date={service.date}
                      replies={service.replies}
                      amount={service.amount}
                    />
                  ))}
              </div>
            )}

            {activeTab === "webinar" && (
              <div className="grid grid-cols-2 gap-8">
                {services
                  .filter((service) => service.type === "webinar")
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      mentorId={params.id}
                      title={service.title}
                      description={service.description}
                      serviceType={service.serviceType}
                      duration={service.duration}
                      date={service.date}
                      replies={service.replies}
                      amount={service.amount}
                    />
                  ))}
              </div>
            )}

            {activeTab === "product" && (
              <div className="grid grid-cols-2 gap-8">
                <ProductCard
                  title={digitalProduct.title}
                  description={digitalProduct.description}
                  thumbnailContent={digitalProduct.thumbnailContent}
                  amount={digitalProduct.amount}
                  id={digitalProduct.id}
                  mentorId={params.id}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Reviews section */}
      <div className="px-[106px] pt-4">
        <h2 className="text-2xl font-medium text-[#0F172A] font-montserrat">
          Reviews
        </h2>
      </div>

      <div className="px-[106px] py-4 flex items-center gap-3 text-[#64748B]">
        <span className="font-semibold text-base">
          {reviewsData.length} Reviews
        </span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-base">
            {mentorData.rating.toFixed(1)}
          </span>
          <Image src="/images/star.svg" alt="Star" width={16} height={16} />
        </div>
      </div>

      <div className="px-[106px] pb-12 flex flex-col gap-4 mt-8">
        {reviewsData.map((review) => (
          <ReviewCard
            key={review.id}
            rating={review.rating}
            content={review.content}
            author={review.author}
          />
        ))}
      </div>
    </div>
  );
}
