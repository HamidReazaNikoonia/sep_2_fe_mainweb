'use client';

import { ChevronsLeft, SquarePercent } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// import required modules
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// compo
import CourseSessionCardItem from '@/components/v2/CourseSessionCardItem';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import 'swiper/css/navigation';
import './styles.css';

const sampleProduct = {
  id: 'number',
  title: 'دوره مقدماتی وردپرس',
  sub_title: 'توضیحات محصول در این قسمت قرار میگیرد',
  meta_title: '',
  meta_description: '',
  slug: 'string',
  description: 'توضیحات',
  brand: 'string',
  average_rating: 3,
  countInStock: 20,
  is_available: true,
  status: true,
  qr_code: 'string',
  price: 50000,

};

export default function CourseSessionSwiperRow() {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-y-12 px-4 pb-1 md:px-0">

        <Link href="/course">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-transparent px-1 py-2 text-xs font-medium  text-gray-500 md:px-4 md:text-sm"
          >
            <ChevronsLeft className="mr-1 size-4 md:size-5" />
            مشاهده همه
          </button>
        </Link>
        <div className="inline-flex items-center py-2 text-sm  font-semibold text-black md:text-xl">

          دوره های تخفیف دار
          <SquarePercent className="ml-2 size-6 text-gray-700 md:size-8" />
        </div>
      </div>
      <Swiper
        breakpoints={{
          // Mobile screens (less than 700px)
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10, // Optional: Reduce spacing for smaller screens
          },

          // Screens 700px and wider
          800: {
            slidesPerView: 3,
            spaceBetween: 20, // Regular spacing
          },
        }}
        centerInsufficientSlides
        centeredSlides
        loop
        pagination={{
          type: 'fraction',
        }}
        navigation
        modules={[Navigation]}
        className="course_session_swiper"
      >
        <SwiperSlide>
          <CourseSessionCardItem courseSessionData={sampleProduct} />
        </SwiperSlide>

        <SwiperSlide>
          <CourseSessionCardItem courseSessionData={sampleProduct} />
        </SwiperSlide>

        <SwiperSlide>
          <CourseSessionCardItem courseSessionData={sampleProduct} />
        </SwiperSlide>

        <SwiperSlide>
          <CourseSessionCardItem courseSessionData={sampleProduct} />
        </SwiperSlide>

        <SwiperSlide>
          <CourseSessionCardItem courseSessionData={sampleProduct} />
        </SwiperSlide>

      </Swiper>
    </>
  );
}
