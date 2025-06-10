'use client'
import React from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Clapperboard } from 'lucide-react';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



// images
import CourseBanner1 from "@/public/assets/images/course_banner_1.gif"
import CourseBannerMobile1 from "@/public/assets/images/course_banner_mobile_1.gif"

// Swiper Images
import CourseSwiperImg from "@/public/assets/images/course_swiper_img_1.webp"

import "./styles.css";
import Image from 'next/image';


export default function HeroSwiperSection() {


  const isMobileScreen = useResponsiveEvent(768, 200);

  return (
    <div id="course_hero" className=' relative mb-20'>

    {/* Image Banner */}
    <div className='w-full'>
      <Image alt="b1" 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
      style={{objectFit: "contain"}} 
      src={isMobileScreen ? CourseBannerMobile1 : CourseBanner1} 
      
      />

      </div>



      {/* <div className='mx-8 mt-16 justify-end flex'>
      <h3 className=' text-right mr-3 text-lg md:text-xl font-bold'>جدیدترین دوره ها</h3>
      <Clapperboard />
      </div> */}
      
       {/* <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="course_hero_swiper_section"
      >
        <SwiperSlide>
          <Image alt="dd" fill src={CourseSwiperImg} />
        </SwiperSlide>

        <SwiperSlide>
          <Image alt="dd" fill src={CourseSwiperImg} />
        </SwiperSlide>


        <SwiperSlide>
          <Image alt="dd" fill src={CourseSwiperImg} />
        </SwiperSlide>

        <SwiperSlide>
          <Image alt="dd" fill src={CourseSwiperImg} />
        </SwiperSlide>
        
      
      </Swiper> */}
    </div>
  )
}
