/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react-dom/no-missing-button-type */
'use client';
import SwiperWrapper from '@/components/swiper/SwiperWrapper';
import CourseSessionCard from '@/sections/courseSession/CourseSessionCard';
import { ChevronsLeft, Presentation } from 'lucide-react';

import Link from 'next/link';
import React from 'react';

type CourseSessionsSectionProps = {
  courseSessions: Array<{
    id: string;
    title: string;
    sub_title: string;
    tumbnail?: {
      file_name: string;
    };
    course_session_category: {
      id: string;
      name: string;
      level: number;
      parent: string | null;
      isActive: boolean;
      path?: string;
    }[];
    coaches: {
      id: string;
      first_name: string;
      last_name: string;
      avatar?: {
        file_name: string;
      };
    }[];
    course_status: boolean;
    description?: string;
  }>;
};

function CourseSessionsSwiper({ courseSessions }: { courseSessions: CourseSessionsSectionProps['courseSessions'] }) {
  return (
    <SwiperWrapper
      items={courseSessions}
      renderItem={(item) => <CourseSessionCard data={item} />}
      swiperOptions={{
        breakpoints: {
          0: { slidesPerView: 1.2 },
          800: { slidesPerView: 3 },
        },
      }}
    />
  );
}

export default function CourseSessionsSection({ courseSessions }: CourseSessionsSectionProps) {
  return (
    <div className="">
      {/* Header */}
      <div className="flex w-full justify-end gap-y-12 px-8 pb-8">
        {/* <Link href="/course-sessions">
          <button
            className="inline-flex items-center rounded-md bg-transparent px-1 py-2 text-xs font-medium text-white md:px-4 md:text-sm"
          >
            <ChevronsLeft className="mr-2" />
            مشاهده همه
          </button>
        </Link> */}
        <div className="inline-flex text-right items-center py-2 text-lg font-semibold text-white">
          برترین دوره های آموزشی
          <Presentation className="ml-3" />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center px-0 md:px-0">
        <CourseSessionsSwiper courseSessions={courseSessions} />
      </div>
    </div>
  );
}