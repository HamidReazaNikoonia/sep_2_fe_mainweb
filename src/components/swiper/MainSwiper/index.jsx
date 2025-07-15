/* eslint-disable tailwindcss/no-custom-classname */
'use client';

// import { SquareCheck, SquareCheckBig } from 'lucide-react';
// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

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
        navigation
        autoplay
        effect="fade"
        grabCursor
        loop
        modules={[Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiper-zoom-container relative">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="swiper-lazy swiper-lazy-loaded"
              poster="/assets/images/hero_img_2.jpg"
              src="https://www.aryatehran.com/wp-content/uploads/2023/09/main-video.mp4"
            />
            <div dir="rtl" className="absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-black/30 p-6 text-white">
              <h4 className="mb-4 text-2xl font-bold text-yellow-500 md:text-5xl">
                خدمات آکادمی آموزشی
              </h4>
              <h5 className="mb-4 text-base font-bold text-white md:text-2xl">
                دوره های آموزشی مجازی
              </h5>
              <div className="flex w-40 md:w-64">
                <button type="button" className="mt-12 w-full rounded-2xl border-2 border-white px-4 py-2 text-center text-sm text-white transition-colors duration-300 md:text-lg">
                  جستجوی دوره ها
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* <SwiperSlide>
          <div className="swiper-zoom-container relative">
            <img alt="" className="swiper-lazy swiper-lazy-loaded"
              src="/assets/images/hero_img_2.jpg" />
            <div dir='rtl' className="absolute right-0 top-0 flex size-full flex-col justify-center bg-black/30 p-6 pr-20 text-white">
              <h4 className="mb-4 text-5xl font-bold text-yellow-500">
                خدمات آکادمی آموزشی
              </h4>
              <ul className="mb-6 space-y-6 pt-12">
                <li className="flex items-center gap-2 text-3xl">
                  <SquareCheckBig className="size-10 text-green-400" />
                  <span>برگذاری ورک شاپ های یک روزه</span>
                </li>
                <li className="flex items-center gap-2 text-3xl">
                  <SquareCheckBig className="size-10 text-green-400" />
                  <span>برگذاری دوره های آموزشی مجازی</span>

                </li>
                <li className="flex items-center gap-2 text-3xl">
                  <SquareCheckBig  className="size-10 text-green-400" />
                  <span>کلاس های آموزشی حضوری</span>

                </li>
              </ul>
              <div className='flex w-64 '>
              <button className="mr-12 mt-12 w-full self-end rounded-2xl border-2 border-white px-4 py-2 text-center text-white transition-colors duration-300">
                بیشتر
              </button>
              </div>
            </div>
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
