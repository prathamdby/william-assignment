"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheckIcon,
  Share2,
  X,
  Video,
  MessageSquare,
  Clock,
  Calendar,
  IndianRupee,
  PackageIcon,
  Presentation,
} from "lucide-react";
import { ProfileTabs } from "@/components/ProfileTabs";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { ReviewCard } from "@/components/ReviewCard";

// Sample data for mentor profile
const mentorData = {
  id: 1,
  name: "Jonny Rose",
  title: "Sr. Software Engineering",
  company: "Google",
  bio: "PM @Bytespectrum || xCloud @Google || xML summer @Amazon || DSA || Team Developement || Growth Management || Full Stack Developer(MERN) || Full Stack Developer(MERN)|| Growth Management || || Growth Management || Full Stack Developer",
  imgSrc:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  isVerified: true,
  reviews: 3,
  rating: 5,
  sessions: 20,
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
    amount: { value: "1,000" },
  },
];

// Digital product
const digitalProduct = {
  id: 5,
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

  // In a real app, you would fetch the mentor data using the ID
  // const { id } = params;

  return (
    <div className="flex flex-col">
      {/* Header section */}
      <div className="flex justify-between items-center py-4 px-8 border-b border-[#E2E8F0]">
        <Link href="/mentors" className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E2E8F0]">
            <X className="w-4 h-4 text-[#94A3B8]" />
          </button>
          <span className="text-sm text-[#64748B]">Back</span>
        </Link>
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E2E8F0]">
          <Share2 className="w-4 h-4 text-[#94A3B8]" />
        </button>
      </div>

      {/* Profile section */}
      <div className="px-8 py-6">
        <div className="flex gap-6">
          {/* Profile image */}
          <div className="w-[120px] h-[120px] relative rounded-full overflow-hidden">
            <Image
              src={mentorData.imgSrc}
              alt={mentorData.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Profile info */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-[#334155]">
                  {mentorData.name}
                </h1>
                {mentorData.isVerified && (
                  <BadgeCheckIcon className="w-6 h-6 text-[#00C16A]" />
                )}
              </div>
              <p className="text-lg text-[#334155]">
                {mentorData.title} at {mentorData.company}
              </p>
            </div>

            {/* Rating and sessions */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
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
                <span className="text-sm font-medium text-[#334155]">
                  {mentorData.reviews} Reviews
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#334155]">
                  {mentorData.sessions} Sessions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 p-4 bg-[#F1F5F9] rounded-md">
          <p className="text-sm text-[#334155]">{mentorData.bio}</p>
        </div>
      </div>

      {/* Services section heading */}
      <div className="px-[106px] pt-4">
        <h2 className="text-2xl font-medium text-[#0F172A] font-montserrat">
          Services
        </h2>
      </div>

      {/* Tabs */}
      <div className="px-[106px] py-4">
        <ProfileTabs
          tabs={profileTabs}
          defaultTab="all"
          onChange={setActiveTab}
        />
      </div>

      {/* Services content */}
      <div className="px-[106px] pb-8">
        {activeTab === "all" && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-8">
              {services.slice(0, 2).map((service) => (
                <ServiceCard
                  key={service.id}
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
            />
          </div>
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

      <div className="px-[106px] pb-12 flex flex-col gap-4">
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
