// @ts-nocheck
'use client'

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ImageGallerySwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper_gallery"
      >
        <SwiperSlide>
          <img src="assets/images/s1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s4.jpg" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src="assets/images/s5.jpg" />
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <img src="assets/images/s6.jpg" />
        </SwiperSlide> */}
        <SwiperSlide>
          <img src="assets/images/s1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s4.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper_gallery2"
      >
        <SwiperSlide>
          <img src="assets/images/s1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s4.jpg" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src="assets/images/s5.jpg" />
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <img src="assets/images/s6.jpg" />
        </SwiperSlide> */}
        <SwiperSlide>
          <img src="assets/images/s1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/s4.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
