import React from 'react';
import Link from 'next/link';

import { House, ChevronLeft } from 'lucide-react';

export default function Breadcrumbs({ levels }) {
  return (
    <nav className='flex mt-4 justify-end' >
      <ol className='flex flex-wrap-reverse justify-end items-center text-right text-gray-400'>


      {levels[2] && (
          <li className='ml-2 w-full md:w-auto'>
            <div className=' items-center justify-end mt-3 md:mt-0 flex'>

              <a className='font-normal text-xs md:font-medium md:text-sm '>
                {levels[2]?.title}
              </a>
              <ChevronLeft size={18} className='ml-1' />
            </div>
          </li>
        )}

        {levels[1] && (
          <li className='ml-2'>
            <div className=' items-center flex'>

              <a className='font-normal text-xs md:font-medium md:text-sm '>
                {levels[1]?.title}
              </a>
              <ChevronLeft size={18} className='ml-1' />
            </div>
          </li>
        )}

        {levels[0] && (
          <li className='ml-2 '>
            <div className=' items-center flex'>

              <Link href={levels[0]?.link} className=' font-normal text-xs md:font-medium md:text-sm '>

                {levels[0]?.title}
              </Link>
              <ChevronLeft size={18} className='ml-1' />
            </div>
          </li>
        )}


        {/* Header Title */}
        <li className='inline-flex items-center'>
          <Link href="/" className='font-normal text-xs md:font-medium md:text-sm  inline-flex ml-2'>
            خانه
            <House size={18} className='font-normal text-xs md:font-medium md:text-sm  ml-2' />
          </Link>
        </li>
      </ol>
    </nav>
  )
}
