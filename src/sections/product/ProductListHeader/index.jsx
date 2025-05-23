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

export default function ProductListHeader() {

  const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
  const product_sortType = useProductsStore((state) => state.product_sortType);
  const change_product_sortType = useProductsStore((state) => state.change_product_sortType);


  return (
    <div className="mb-8 flex mr-8 md:mr-0  px-4 flex-col-reverse md:flex-row justify-between items-end">
     


      {/* Left Side */}
      <div className=' items-center flex mt-6 md:mt-0 self-start md:self-auto ml-4 md:ml-0'>
        <div className="relative w-max mx-auto">
          <button onClick={() => setSortDropDownOpen(!sortDropDownOpen)} type="button" id="dropdownToggle"
            className="px-3 inline-flex py-2.5 border border-gray-100 text-gray-800 text-xs outline-none bg-gray-100 hover:bg-gray-200 rounded-2xl shadow-sm">
                        {!isEmpty(product_sortType) &&  <span> {`  بر اساس ${sortTypeStringMaper[product_sortType]}`}&nbsp; </span> }

            مرتب سازی 
            <ChevronDown size={18} className='ml-2'  />
          </button>

          <ul onClick={() => setSortDropDownOpen(!sortDropDownOpen)} id="dropdownMenu" className={clsx('absolute divide-gray-300 text-center block shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-gray-100 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto', { hidden: !sortDropDownOpen })}  >
            <li onClick={() => change_product_sortType('price')} className='py-2 px-5 hover:bg-gray-200 text-gray-800 text-xs cursor-pointer'>
                قیمت
            </li>
            <li onClick={() => change_product_sortType('createdAt')} className='py-2 px-5 hover:bg-gray-200 text-gray-800 text-xs cursor-pointer'>
              تاریخ
            </li>
            <li onClick={() => change_product_sortType('title')} className='py-2 px-5 hover:bg-gray-200 text-gray-800 text-xs cursor-pointer'>
              الفبا
            </li>
          </ul>
        </div>
      </div>


       {/* Right Side */}
       <div className='mb-4 md:mb-0'>
        {/* Breadcrumb */}
        <Breadcrumbs levels={[{title: 'محصولات', link: '/product'}]} />


        {/* Header Title */}
        <h2 className='mt-6 text-2xl text-right font-semibold '>
         لیست محصولات
        </h2>
      </div>
    </div>
  )
}
