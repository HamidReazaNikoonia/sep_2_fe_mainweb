'use client'

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

// componet
import CourseBannerSwiperCardItem from '@/components/Card/CourseBannerSwiperCardItem';


export default function BannerSwiper() {
  

  return (
    <>
      <Swiper
        breakpoints={{
          // Mobile screens (less than 700px)
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10, // Optional: Reduce spacing for smaller screens
          },
          
          // Screens 700px and wider
          800: {
            slidesPerView: 2,
            spaceBetween: 20, // Regular spacing
          },
        }}
        centerInsufficientSlides
        centeredSlides
        initialSlide={3}
        loop
        spaceBetween={20}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[ Navigation]}
        className="banner_swiper"
      >
        <SwiperSlide>
        <CourseBannerSwiperCardItem  speaker="مریم صفدری" category="هنری" subtitle="تجربه رشد  فروش در 4 سال، با شما راهکارهای کاربردی که رشد تیم فروش را به همراه دارد را بررسی می‌کنیم." imageSrc={`https://s3.eseminar.tv/upload/slideshow/1738428254-slideshow.jpgg`} title=" تغییر و تطبیق صدا با هوش مصنوعی" link={undefined}  />
        </SwiperSlide>


        <SwiperSlide>
        <CourseBannerSwiperCardItem  speaker="مریم صفدری" category="هنری" subtitle="تجربه رشد  فروش در 4 سال، با شما راهکارهای کاربردی که رشد تیم فروش را به همراه دارد را بررسی می‌کنیم." imageSrc={`https://s3.eseminar.tv/upload/slideshow/1738428254-slideshow.jpgg`} title=" تغییر و تطبیق صدا با هوش مصنوعی" link={undefined}  />

        </SwiperSlide>


        <SwiperSlide>
        <CourseBannerSwiperCardItem  speaker="مریم صفدری" category="هنری" subtitle="تجربه رشد  فروش در 4 سال، با شما راهکارهای کاربردی که رشد تیم فروش را به همراه دارد را بررسی می‌کنیم." imageSrc={`https://s3.eseminar.tv/upload/slideshow/1738428254-slideshow.jpgg`} title=" تغییر و تطبیق صدا با هوش مصنوعی" link={undefined}  />

        </SwiperSlide>

{/* 
        <SwiperSlide>
        <CourseBannerSwiperCardItem imageSrc={`https://s3.eseminar.tv/upload/slideshow/1738428254-slideshow.jpg`} title=" تغییر و تطبیق صدا با هوش مصنوعی" link={undefined} />
        </SwiperSlide>

        <SwiperSlide>
        <CourseBannerSwiperCardItem imageSrc={`https://s3.eseminar.tv/upload/slideshow/1738428254-slideshow.jpg`} title=" تغییر و تطبیق صدا با هوش مصنوعی" link={undefined} />
        </SwiperSlide> */}

      </Swiper>
    </>
  );
}
