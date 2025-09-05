/* eslint-disable react/no-array-index-key */
/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { ChevronsLeft, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomImage from '@/components/CustomImage';

import { Button } from '@/components/ui/button';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Types
type Coach = {
  _id: string;
  first_name: string;
  last_name: string;
  avatar?: { file_name: string };
  description?: string;
  group_name?: string;
  specialties?: string[];
};

type CoachSliderRowProps = {
  title?: string;
  subtitle?: string;
  coaches: Coach[];
  showTitle?: boolean;
  showViewAllButton?: boolean;
  viewAllLink?: string;
};

// Sample coaches data for demonstration
const sampleCoaches: Coach[] = [
  {
    _id: '1',
    first_name: 'محمد',
    last_name: 'احمدی',
    avatar: { file_name: '1.png' },
    description: 'مربی مجرب بدنسازی با بیش از 10 سال تجربه',
    group_name: 'بدنسازی',
    specialties: ['فیلم سازی', 'طراحی هنری'],
  },
  {
    _id: '2',
    first_name: 'فاطمه',
    last_name: 'کریمی',
    avatar: { file_name: '63.png' },
    description: 'مربی یوگا و پیلاتس',
    group_name: 'یوگا',
    specialties: ['یوگا', 'پیلاتس'],
  },
  {
    _id: '3',
    first_name: 'علی',
    last_name: 'رضایی',
    avatar: { file_name: '60.png' },
    description: 'مربی شنا و ورزش‌های آبی',
    group_name: 'شنا',
    specialties: ['هوش مصنوعی', 'گرافیست'],
  },
  {
    _id: '4',
    first_name: 'زهرا',
    last_name: 'موسوی',
    avatar: { file_name: '78.png' },
    description: 'مربی ورزش‌های رزمی',
    group_name: 'ورزش‌های رزمی',
    specialties: ['نقاشی', 'هنر'],
  },
  {
    _id: '5',
    first_name: 'حسین',
    last_name: 'جعفری',
    avatar: { file_name: 'boy.png' },
    description: 'مربی دو و میدانی',
    group_name: 'دو و میدانی',
    specialties: ['طراحی', 'فضای مجازی'],
  },
  {
    _id: '6',
    first_name: 'حسین',
    last_name: 'جعفری',
    avatar: { file_name: '94.png' },
    description: 'مربی دو و میدانی',
    group_name: 'دو و میدانی',
    specialties: ['بازیگری', 'گریم'],
  },
  {
    _id: '7',
    first_name: 'حسین',
    last_name: 'جعفری',
    avatar: { file_name: '32.png' },
    description: 'مربی دو و میدانی',
    group_name: 'دو و میدانی',
    specialties: ['آرایشگری', 'زیبا شناسی'],
  },
  {
    _id: '8',
    first_name: 'حسین',
    avatar: { file_name: '22.png' },
    last_name: 'جعفری',
    description: 'مربی دو و میدانی',
    group_name: 'دو و میدانی',
    specialties: ['فتوشاپ', 'ادیت فیلم'],
  },
];

// Coach Card Component
const CoachCard: React.FC<{ coach: Coach }> = ({ coach }) => {
  const fullName = `${coach.first_name} ${coach.last_name}`;

  return (
    <div className="group relative flex h-full min-h-[280px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Avatar Container */}
      <div className="relative flex flex-1 items-center justify-center p-6 pb-4">
        <div className="relative size-24 overflow-hidden rounded-full ring-4 ring-gray-100 transition-all duration-300 group-hover:ring-8 group-hover:ring-green-200">
          {coach.avatar?.file_name
            ? (
                <CustomImage
                  fileName={coach.avatar.file_name}
                  alt={fullName}
                  className="rounded-full transition-transform duration-300 group-hover:scale-110"
                  containerClassName="w-full h-full"
                />
              )
            : (
                <div className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                  <User className="size-12 text-gray-500" />
                </div>
              )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center p-4 pt-2">
        {/* Name */}
        <h3 className="mb-2 text-center text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-green-600">
          {fullName}
        </h3>

        {/* Group Name / Specialty */}
        {/* {coach.group_name && (
          <div className="mb-3">
            <span className="inline-flex my-4 rounded-full bg-gradient-to-r from-green-50 to-blue-50 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-green-200">
              {coach.group_name}
            </span>
          </div>
        )} */}

        {/* Specialties */}
        {coach.specialties && coach.specialties.length > 0 && (
          <div className="mb-4 mt-2 flex flex-wrap justify-center gap-1">
            {coach.specialties.slice(0, 2).map((specialty, index) => (
              <span
                key={index}
                className="rounded-full border bg-gray-50 px-2 py-1 text-xs text-gray-800"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {/* View Profile Button */}
        <Button
          variant="outline"
          size="sm"
          className="mt-auto w-full border-pink-500 bg-pink-500 text-pink-100 transition-all duration-200 hover:bg-pink-700 hover:text-white group-hover:border-pink-600"
        >
          مشاهده پروفایل
        </Button>
      </div>

      {/* Decorative gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
    </div>
  );
};

// Main Component
const CoachSliderRow: React.FC<CoachSliderRowProps> = ({
  title = 'لیست بهترین اساتید آوانو',
  subtitle = 'با بهترین مربیان و اساتید آوانو آشنا شوید و مسیر ورزشی خود را با راهنمایی آن‌ها طی کنید',
  coaches = sampleCoaches,
  showTitle = true,
  showViewAllButton = true,
  viewAllLink = '/coaches',
}) => {
  return (
    <section className="test-gradient-bg w-full py-12" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {showTitle && (
          <div className="mb-8 flex items-center justify-between px-4 md:px-0">
            <div className="text-center md:text-right">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm text-gray-100 md:text-base">
                {subtitle}
              </p>
            </div>

            {showViewAllButton && (
              <Link href={viewAllLink}>
                <Button className="hidden border-pink-600 bg-blue-600 text-gray-100 hover:bg-pink-600 hover:text-white md:block">
                  <div className="flex items-center gap-2">
                    دیدن همه اساتید
                    <ChevronsLeft className="mr-1 size-4 md:size-5" />
                  </div>
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Swiper Container */}
        <div className="relative px-6 md:px-0">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={15}
            slidesPerView={1}
            navigation={{
              nextEl: '.coach-swiper-button-next-custom',
              prevEl: '.coach-swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className="!pb-12"
          >
            {coaches.map(coach => (
              <SwiperSlide key={coach._id} className="h-auto">
                <div className="h-full p-4 md:px-0">
                  <CoachCard coach={coach} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="coach-swiper-button-prev-custom absolute -left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-pink-500 hover:text-white md:-left-5 md:size-12">
            <svg className="size-5 md:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className="coach-swiper-button-next-custom absolute -right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-pink-500 hover:text-white md:-right-5 md:size-12">
            <svg className="size-5 md:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Mobile "View All" Button */}
        {showViewAllButton && (
          <div className="mt-8 w-full text-center md:hidden">
            <Link href={viewAllLink}>
              <Button className="pink-gradient-bg w-full text-white hover:bg-green-600">
                <div className="flex items-center justify-center gap-2">
                  دیدن همه اساتید
                  <ChevronsLeft className="mr-1 size-4" />
                </div>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoachSliderRow;
