import React from 'react'
import Link from 'next/link';
import { ChevronsLeft, ClipboardList } from 'lucide-react';
import ServiceSwiper from '@/components/swiper/ServiceSwiper';

export default function ProductCardSection() {
  return (
    <>
      {/* Header */}
      <div className='flex items-center justify-between w-full pb-2 px-4 md:px-20'>

        <Link href="/product">
          <button
            className="bg-transparent text-white font-medium text-xs md:text-sm hover:text-white py-2 px-1 md:px-4 inline-flex items-center">
            <ChevronsLeft className='mr-2' />
            مشاهده همه
          </button>
        </Link>
        <div className='py-2 inline-flex items-center  text-lg text-white font-semibold'>

          محصولات فرهنگی
          <ClipboardList className='ml-3' />
        </div>
      </div>
      <ServiceSwiper />
    </>
  )
}
