'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

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
        <div className="swiper-zoom-container">
          <img alt="" className="swiper-lazy swiper-lazy-loaded h-full" 
            src="/assets/images/sep_2_hero_img_1.webp" />
        </div>
        </SwiperSlide>

        <SwiperSlide>
        <div className="swiper-zoom-container">
          <img alt="" className="swiper-lazy swiper-lazy-loaded" 
            src="/assets/images/snap_shop_hero.webp" />
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
