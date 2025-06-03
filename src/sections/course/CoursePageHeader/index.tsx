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
    <div className="mb-8 bg-[#310c58] py-4 md:py-8 flex flex-col-reverse md:flex-row justify-end pr-4 md:pr-8 items-end">
     


 


       {/* Right Side */}
       <div className='flex flex-col items-end mb-4 md:mb-0'>

        {/* Header Title */}
        <h2 className='mt-4 mb-6 text-3xl text-right'>
         {title || ''} 
        </h2>


        {/* Breadcrumb */}
        <Breadcrumbs levels={[{title: 'دوره های آموزشی', link: '/course'}, {title: courseCategory, link: '/'}, {title: title}]} />


        
      </div>
    </div>
  )
}
