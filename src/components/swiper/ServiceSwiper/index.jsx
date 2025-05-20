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

// compo
import ServiceSwiperCardItem from '@/components/Card/ServiceSwiperCardItem';
import ProductCard from '@/components/Card/ProductCard';


const sampleProduct =  {
  id: "number",
  title: 'محصول',
  subtitle: "توضیحات محصول در این قسمت قرار میگیرد",
  meta_title: "",
  meta_description: "",
  slug: "string",
  description: "توضیحات",
  brand: "string",
  average_rating: 3,
  countInStock: 20,
  is_available: true,
  status: true,
  qr_code: "string",
  price: 50000,

}

export default function ServiceSwiper() {
  

  return (
    <>
      <Swiper
        breakpoints={{
          // Mobile screens (less than 700px)
          0: {
            slidesPerView: 1.5,
            spaceBetween: 10, // Optional: Reduce spacing for smaller screens
          },
          
          // Screens 700px and wider
          800: {
            slidesPerView: 5,
            spaceBetween: 10, // Regular spacing
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
        className="service_swiper"
      >
        <SwiperSlide>
          <ProductCard product={sampleProduct}/>
        </SwiperSlide>


        <SwiperSlide>
        <ProductCard product={sampleProduct}/>
        </SwiperSlide>


        <SwiperSlide>
        <ProductCard product={sampleProduct}/>
        </SwiperSlide>


        <SwiperSlide>
        <ProductCard product={sampleProduct}/>
        </SwiperSlide>

        <SwiperSlide>
        <ProductCard product={sampleProduct}/>
        </SwiperSlide>

      </Swiper>
    </>
  );
}
