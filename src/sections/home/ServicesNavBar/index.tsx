/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function ServicesNavBar() {
  return (
    <section dir="rtl" id="site-info">
      <div className="container mx-auto" style={{ zIndex: 10, position: 'relative' }}>
        <div className="relative flex -translate-y-1/3 flex-wrap rounded-xl bg-white p-4 text-center shadow md:divide-x-2 md:divide-x-reverse md:divide-solid md:divide-slate-200 md:rounded-3xl">
          <a href="https://www.aryatehran.com/calendar/" className="mb-0 block  w-1/4 sm:mb-0 sm:w-1/4">
            <img alt="calendar" decoding="async" src="https://www.aryatehran.com/wp-content/uploads/2024/12/calendar.png" className="w-10 h-10 md:w-12 md:h-12  lazyloaded mx-auto" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/calendar.png" data-ll-status="loaded" />

            <div className=" mt-2 text-xs text-slate-950 md:text-base ">تقویم آموزشی</div>
          </a>
          <a href="https://www.aryatehran.com/course/" className="mb-0 block w-1/4 sm:mb-0 sm:w-1/4">
            <img alt="courses" decoding="async" src="https://www.aryatehran.com/wp-content/uploads/2024/12/online-learning.png" className="w-10 h-10 md:w-12 md:h-12  lazyloaded mx-auto" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/online-learning.png" data-ll-status="loaded" />

            <div className=" mt-2 text-xs text-slate-950 md:text-base ">دوره ها</div>
          </a>
          <a className="relative block w-1/4 sm:w-1/4">
            <div className="absolute -top-2 left-0 z-30 rounded-full bg-yellow-500 px-2 py-0.5 text-[10px] text-gray-800  md:left-1/2">به زودی</div>
            <img alt="customer_club" decoding="async" src="https://www.aryatehran.com/wp-content/uploads/2024/12/medal.png" className="mx-auto  opacity-50 h-10 w-10 md:h-12 md:w-12 lazyloaded" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/medal.png" data-ll-status="loaded" />

            <div className=" mt-2 text-xs text-slate-950 opacity-50 md:text-base ">کلاب</div>
          </a>
          <a href="https://www.aryatehran.com/inquiry/" className="block w-1/4 sm:w-1/4">
            <img alt="certificate" decoding="async" src="https://www.aryatehran.com/wp-content/uploads/2024/12/signal.png" className="w-10 h-10 md:w-12 md:h-12  lazyloaded mx-auto" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2024/12/signal.png" data-ll-status="loaded" />

            <div className=" mt-2 text-xs text-slate-950 md:text-base ">استعلام مدرک</div>
          </a>

        </div>
      </div>
    </section>
  );
}
