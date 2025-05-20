/* eslint-disable react-dom/no-missing-button-type */
import ServiceSwiper from '@/components/swiper/ServiceSwiper';
import { ChevronsLeft, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type IServiceCardSection = {
  rowTitle: string;
};

export default function ServiceCardSection({ rowTitle }: IServiceCardSection) {
  return (
    <>
      {/* Header */}
      <div className="flex w-full justify-between px-4 md:px-20">

        <Link href="/course">
          <button
            className="inline-flex items-center rounded-md bg-transparent px-1 py-2 text-xs font-medium  text-white md:px-4 md:text-sm"
          >
            <ChevronsLeft className="mr-2" />
            مشاهده همه
          </button>
        </Link>
        <div className="inline-flex items-center py-2  text-lg font-semibold text-white">

          {rowTitle}
          <ClipboardList className="ml-3" />
        </div>
      </div>
      <ServiceSwiper />
    </>
  );
}
