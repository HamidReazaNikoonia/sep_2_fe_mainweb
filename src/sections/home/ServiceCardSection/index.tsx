/* eslint-disable react-dom/no-missing-button-type */
import ServiceSwiper from '@/components/swiper/ServiceSwiper';
import { ChevronsLeft, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ServiceCardSection() {
  return (
    <>
      {/* Header */}
      <div className="flex w-full justify-between px-4 pb-2 md:px-20">

        <Link href="/course">
          <button
            className="bg-transparent text-white font-medium text-xs md:text-sm py-2 px-1 md:px-4  rounded-md inline-flex items-center">
            <ChevronsLeft className='mr-2' />
            مشاهده همه
          </button>
        </Link>
        <div className="inline-flex items-center py-2  text-lg font-semibold text-white">

          خدمات تخصصی
          <ClipboardList className="ml-3" />
        </div>
      </div>
      <ServiceSwiper />
    </>
  );
}
