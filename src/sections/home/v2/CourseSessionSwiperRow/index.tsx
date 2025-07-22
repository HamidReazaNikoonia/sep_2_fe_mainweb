'use client'

import React from 'react';
import { ChevronsLeft, ClipboardList } from 'lucide-react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

// compo
import CourseSessionCardItem from '@/components/v2/CourseSessionCardItem';
import Link from 'next/link';



const sampleProduct = {
  id: "number",
  title: 'دوره مقدماتی وردپرس',
  subtitle: "توضیحات محصول در این قسمت قرار میگیرد",
  meta_title: "",
  meta_description: "",
  slug: "string",
  description: "توضیحات",
  brand: "string",
  average_rating: 3,
  countInStock: 20,
  is_available: true,
  status: true,
  qr_code: "string",
  price: 50000,

}

export default function CourseSessionSwiperRow() {
  return (
    <>
      <div className='flex justify-between w-full pb-1 px-1 gap-y-12'>

        <Link href="/course">
          <button
            className="bg-transparent text-black font-medium text-xs md:text-sm py-2 px-1 md:px-4  rounded-md inline-flex items-center">
            <ChevronsLeft className='mr-2' />
            مشاهده همه
          </button>
        </Link>
        <div className='py-2 inline-flex items-center text-sm  md:text-lg text-black font-semibold'>

          دوره های تخفیف دار
          <ClipboardList className='ml-3' />
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
        navigation={true}
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
