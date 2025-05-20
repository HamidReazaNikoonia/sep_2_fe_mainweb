'use client';
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation, FreeMode } from 'swiper/modules';

// utils
import useResponsiveEvent from '@/hooks/useResponsiveEvent'; // Adjust the path


import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import './styles.css';


export default function CommenCourseSwiper() {

  const isMobileScreen = useResponsiveEvent(768, 200);
  return (
    <>
      <Swiper 
        slidesPerView={isMobileScreen ? 1 : 3}
        spaceBetween={15}
        freeMode={true}
        pagination={{
          clickable: true,
        }} modules={[Pagination, Navigation, FreeMode]} className="commen_course_swiper">
        {Array.from({ length: 5 }).map((i, index) => (
          <SwiperSlide key={index}>
            <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
              <a href="#">
                <div className="relative flex items-end overflow-hidden rounded-xl">
                  <img src="https://componentland.com/images/0WjOaKV5XYmAEPl0ZjOv4.png" alt="Hotel Photo" />
                  <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-slate-400 ml-1 text-sm">4.9</span>
                  </div>
                </div>

                <div className="mt-1 p-2 text-right">
                  <h2 className="text-black">دوره هوش مصنوعی</h2>
                  <p className="text-slate-700 mt-1 text-xs">آموزش هوش مصنوعی برای همه</p>

                  <div className="mt-3 flex items-end justify-between">
                    <p>
                      <span className="text-sm font-bold text-blue-500"> تومان {(50000).toLocaleString('fa')}</span>
                      <span className="text-slate-400 text-xs">&nbsp; / حضوری   </span>
                    </p>


                  </div>
                </div>
              </a>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
