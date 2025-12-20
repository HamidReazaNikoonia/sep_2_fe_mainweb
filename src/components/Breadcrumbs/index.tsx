/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChevronLeft, House } from 'lucide-react';
import Link from 'next/link';

import React from 'react';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

export default function Breadcrumbs({ levels }: { levels: { title: string; link: string }[] }) {
  const isMobileScreen = useResponsiveEvent(768, 200);
  return (
    <nav className="mt-4 flex justify-end">
      <ol className="flex flex-wrap-reverse items-center justify-end text-right text-gray-300">

        {levels[2] && (
          <li className="ml-2 w-full md:w-auto">
            <div className=" mt-3 flex items-center justify-end md:mt-0">

              <a dir="rtl" className="text-[11px] font-normal md:text-sm md:font-medium ">
                {levels[2]?.title}
              </a>
              <ChevronLeft size={isMobileScreen ? 14 : 18} className="ml-1" />
            </div>
          </li>
        )}

        {levels[1] && (
          <li className="ml-2">
            <div className=" flex items-center">

              <a dir="rtl" className="text-[11px] font-normal md:text-sm md:font-medium ">
                {levels[1]?.title}
              </a>
              <ChevronLeft size={isMobileScreen ? 14 : 18} className="ml-1" />
            </div>
          </li>
        )}

        {levels[0] && (
          <li className="ml-2 ">
            <div className=" flex items-center">

              <Link href={levels[0]?.link} className=" text-[11px] font-normal md:text-sm md:font-medium ">

                {levels[0]?.title}
              </Link>
              <ChevronLeft size={isMobileScreen ? 14 : 18} className="ml-1" />
            </div>
          </li>
        )}

        {/* Header Title */}
        <li className="inline-flex items-center">
          <Link href="/" className="ml-2 inline-flex items-center text-[11px] font-normal  md:text-sm md:font-medium">
            خانه
            <House size={isMobileScreen ? 14 : 18} className="ml-2 text-[11px] font-normal md:text-sm  md:font-medium" />
          </Link>
        </li>
      </ol>
    </nav>
  );
}
