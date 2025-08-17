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

  const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
  const product_sortType = useProductsStore((state) => state.product_sortType);
  const change_product_sortType = useProductsStore((state) => state.change_product_sortType);


  return (
    <div className="pink-gradient-bg mb-0 flex flex-col-reverse items-end justify-end py-4 pr-4 md:mb-8 md:flex-row md:py-8 md:pr-8">
     


 


       {/* Right Side */}
       <div className='flex flex-col items-end mb-4 md:mb-0'>

        {/* Header Title */}
        <h2 dir='rtl' className='mt-4 mb-0 md:mb-2 text-lg md:text-3xl text-right text-white'>
         {title || ''} 
        </h2>


        {/* Breadcrumb */}
        <div className='hidden md:block'>
        <Breadcrumbs levels={[{title: 'فیلم های آموزشی', link: '/course'}, {title: title}]} />
        </div>


        
      </div>
    </div>
  )
}
