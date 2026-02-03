/* eslint-disable react-dom/no-missing-button-type */
'use client';
import { ChevronsLeft, Video } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import HSwiper from '@/components/swiper/HSwiper';
// utils
// import useResponsiveEvent from '@/hooks/useResponsiveEvent';



export default function CourseHotBanner() {
  // const isMobileScreen = useResponsiveEvent(768, 200);
  return (
    <div className="">
      {/* Header */}
      <div className="flex w-full  pb-8">

      </div>
      <div className="w-full px-2 md:px-0 ">

        <HSwiper />

      </div>

    </div>
  );
}
