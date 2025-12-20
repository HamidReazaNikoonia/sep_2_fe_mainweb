// @ts-nocheck
'use client'
import React, { useState } from 'react';

import { clsx } from 'clsx';

import { House, ChevronLeft, ChevronDown } from 'lucide-react';
import { useProductsStore } from '@/_store/Product';
import { isEmpty } from '@/utils/Helpers';
import Breadcrumbs from '@/components/Breadcrumbs';


const sortTypeStringMaper = {
  'price': 'قیمت',
  'createdAt': 'تاریخ',
  'title': 'الفبا'
}

export default function CoursePageHeader({title, courseCategory}: {title: string, courseCategory: string}) {

  // const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
  // const product_sortType = useProductsStore((state) => state.product_sortType);
  // const change_product_sortType = useProductsStore((state) => state.change_product_sortType);

  return (
    <div className="pink-gradient-bg mb-0 flex flex-col-reverse items-end justify-end py-4 pr-3 md:flex-row md:py-8 md:pr-8">

      {/* Right Side */}
      <div className="mx-3 mb-1 flex flex-col items-end leading-6 md:mb-0">

        {/* Header Title */}
        <h2 dir="rtl" className="mb-0 mt-2 max-w-[310px] text-right text-lg font-semibold leading-8 text-white md:mb-2 md:mt-3 md:max-w-none md:text-3xl">
          {title || ''}
        </h2>

        {/* Breadcrumb */}
        <div className="md:block">
          <Breadcrumbs levels={[{title: 'فیلم های آموزشی', link: '/course'}, { title: title || '', link: '' }]} />
        </div>

      </div>
    </div>
  );
}
