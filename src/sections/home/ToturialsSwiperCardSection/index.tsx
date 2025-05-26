/* eslint-disable react-dom/no-missing-button-type */
'use client';
import { ChevronsLeft, Video } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// componet
// import CourseCardItem from '@/components/Card/CourseCard';

import CourseCardItem from '@/components/Card/CourseCard';
import SwiperWrapper from '@/components/swiper/SwiperWrapper';
// utils
// import useResponsiveEvent from '@/hooks/useResponsiveEvent';

function ToturialSwiper() {
  return (
    <SwiperWrapper
      items={[1, 2, 3, 4, 5, 6, 7]}
      renderItem={() => <CourseCardItem />}
      swiperOptions={{
        breakpoints: {
          0: { slidesPerView: 1.2 },
          800: { slidesPerView: 3.5 },
        },
      }}
    />
  );
}

export default function ToturialsSwiperCardSection() {
  // const isMobileScreen = useResponsiveEvent(768, 200);
  return (
    <div className="">
      {/* Header */}
      <div className="flex w-full justify-between gap-y-12 px-8 pb-8">

        <Link href="/course">
          <button
            className="inline-flex items-center rounded-md bg-transparent px-1 py-2 text-xs font-medium  text-white md:px-4 md:text-sm"
          >
            <ChevronsLeft className="mr-2" />
            مشاهده همه
          </button>
        </Link>
        <div className="inline-flex items-center py-2  text-lg font-semibold text-white">

          فیلم های آموزشی
          <Video className="ml-3" />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center px-0 md:px-0 ">

        <ToturialSwiper />

      </div>

    </div>
  );
}
