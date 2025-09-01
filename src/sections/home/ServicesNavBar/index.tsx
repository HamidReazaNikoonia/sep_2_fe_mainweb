/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ServicesNavBar() {
  return (
    <section dir="rtl" id="site-info">
      <div className="container mx-auto" style={{ zIndex: 10, position: 'relative' }}>
        <div className="relative flex -translate-y-1/3 flex-wrap rounded-none md:rounded-xl bg-white p-4 text-center shadow md:divide-x-2 md:divide-x-reverse md:divide-solid md:divide-slate-200 md:rounded-3xl">
          <Link href="/course-session-v2" className="mb-0 block  w-1/4 sm:mb-0 sm:w-1/4">
            <img alt="calendar" decoding="async" src="/assets/images/Alarm clock.svg" className="w-12 h-12 md:w-[80px] md:h-auto  lazyloaded mx-auto" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/calendar.png" data-ll-status="loaded" />

            <div className=" mt-1 text-xs text-slate-950 md:text-sm ">تقویم آموزشی</div>
          </Link>
          <a href="" className="mb-0 block w-1/4 sm:mb-0 sm:w-1/4">
            <img alt="courses" decoding="async" src="/assets/images/Presentation.svg" className="w-12 h-12 md:w-[80px] md:h-auto  lazyloaded mx-auto" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/online-learning.png" data-ll-status="loaded" />

            <div className=" mt-1 text-xs text-slate-950 md:text-base ">دوره ها</div>
          </a>
          <a className="relative block w-1/4 sm:w-1/4">
            <div className="absolute -top-2 left-0 z-30 rounded-full bg-yellow-500 px-2 py-0.5 text-[10px] text-gray-800  md:left-1/2">به زودی</div>
            <img alt="customer_club" decoding="async" src="/assets/images/Backpack.svg" className="mx-auto  opacity-50 w-12 h-12 md:w-[80px] md:h-auto  lazyloaded" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/medal.png" data-ll-status="loaded" />

            <div className=" mt-2 text-xs text-slate-950 opacity-50 md:text-base ">کلاب</div>
          </a>
          <a href="" className="block w-1/4 sm:w-1/4">
            <img alt="certificate" decoding="async" src="/assets/images/Diploma.svg" className="w-12 h-12 md:w-[80px] md:h-auto  lazyloaded mx-auto" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/signal.png" data-ll-status="loaded" />

            <div className=" mt-1 text-xs text-slate-950 md:text-base ">استعلام مدرک</div>
          </a>

        </div>
      </div>
    </section>
  );
}
