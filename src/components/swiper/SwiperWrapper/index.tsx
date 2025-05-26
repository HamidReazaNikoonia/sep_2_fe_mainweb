/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';

type SwiperWrapperProps = {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  swiperOptions?: {
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>;
    centeredSlides?: boolean;
    centerInsufficientSlides?: boolean;
    initialSlide?: number;
    loop?: boolean;
    navigation?: boolean;
  };
  className?: string;
};

const defaultSwiperOptions = {
  slidesPerView: 1.5,
  spaceBetween: 10,
  breakpoints: {
    800: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },
  centerInsufficientSlides: true,
  centeredSlides: true,
  initialSlide: 3,
  loop: true,
  navigation: true,
};

const SwiperWrapper: React.FC<SwiperWrapperProps> = ({
  items,
  renderItem,
  swiperOptions = { },
  className = '',
}) => {
  const mergedOptions = { ...defaultSwiperOptions, ...swiperOptions };

  return (
    <Swiper
      {...mergedOptions}
      modules={[Navigation, Pagination]}
      className={`swiper-wrapper ${className}`}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperWrapper;