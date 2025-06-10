'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { SquareCheck, SquareCheckBig } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './styles.css';

export default function MainSwiper() {
  return (
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        autoplay
        effect={"fade"}
        grabCursor
        loop
        modules={[Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiper-zoom-container relative">
            <img alt="" className="swiper-lazy swiper-lazy-loaded" 
              src="/assets/images/hero_img_1.jpg" />
            <div dir='rtl' className="absolute top-0 right-0 pr-20 w-full bg-black/30 h-full text-white p-6 flex flex-col justify-center">
              <h4 className="text-5xl font-bold mb-4 text-yellow-500">
                خدمات آکادمی آموزشی
              </h4>
              <ul className="space-y-6 pt-12 mb-6">
                <li className="flex text-3xl items-center gap-2">
                  <SquareCheckBig className="h-10 w-10 text-green-400" />
                  <span>برگذاری ورک شاپ های یک روزه</span>
                </li>
                <li className="flex text-3xl items-center gap-2">
                  <SquareCheckBig className="h-10 w-10 text-green-400" />
                  <span>برگذاری دوره های آموزشی مجازی</span>

                </li>
                <li className="flex text-3xl items-center gap-2">
                  <SquareCheckBig  className="h-10 w-10 text-green-400" />
                  <span>کلاس های آموزشی حضوری</span>

                </li>
              </ul>
              <div className='flex w-64 '>
              <button className="mr-12 mt-12 self-end w-full text-white py-2 border-2 border-white px-4 rounded-2xl transition-colors duration-300 text-center">
                بیشتر 
              </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-zoom-container relative">
            <img alt="" className="swiper-lazy swiper-lazy-loaded" 
              src="/assets/images/hero_img_2.jpg" />
            <div dir='rtl' className="absolute top-0 right-0 pr-20 w-full bg-black/30 h-full text-white p-6 flex flex-col justify-center">
              <h4 className="text-5xl font-bold mb-4 text-yellow-500">
                خدمات آکادمی آموزشی
              </h4>
              <ul className="space-y-6 pt-12 mb-6">
                <li className="flex text-3xl items-center gap-2">
                  <SquareCheckBig className="h-10 w-10 text-green-400" />
                  <span>برگذاری ورک شاپ های یک روزه</span>
                </li>
                <li className="flex text-3xl items-center gap-2">
                  <SquareCheckBig className="h-10 w-10 text-green-400" />
                  <span>برگذاری دوره های آموزشی مجازی</span>

                </li>
                <li className="flex text-3xl items-center gap-2">
                  <SquareCheckBig  className="h-10 w-10 text-green-400" />
                  <span>کلاس های آموزشی حضوری</span>

                </li>
              </ul>
              <div className='flex w-64 '>
              <button className="mr-12 mt-12 self-end w-full text-white py-2 border-2 border-white px-4 rounded-2xl transition-colors duration-300 text-center">
                بیشتر 
              </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* <SwiperSlide>
        <div className="swiper-zoom-container">
          <img alt="" className="swiper-lazy swiper-lazy-loaded" 
            src="/assets/images/sep_2_hero_img_1.webp" />
        </div>
        </SwiperSlide> */}

        {/* <SwiperSlide>
        <div className="swiper-zoom-container">
          <img alt="" className="swiper-lazy swiper-lazy-loaded" 
            src="/assets/images/sep_2_hero_img_1.webp" />
        </div>
        </SwiperSlide> */}

        {/* <SwiperSlide>
        <div className="swiper-zoom-container">
          <img alt="" className="swiper-lazy swiper-lazy-loaded" 
            src="/assets/images/sep_2_hero_img_1.webp" />
        </div>
        </SwiperSlide> */}

        {/* <SwiperSlide>
        <div className="swiper-zoom-container">
          <img alt="" className="swiper-lazy swiper-lazy-loaded" 
            src="/assets/images/sep_2_hero_img_1.webp" />
        </div>
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
