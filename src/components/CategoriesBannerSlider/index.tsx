// V2: SliderCategoriesComponent using Swiper

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

// utils
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

const categories = [
  { title: '  لوازم خودرو', image: '/assets/images/category_sample_snapshop.webp' },
  { title: 'مد و پوشاک', image: '/assets/images/category_sample_snappshop_3.webp' },
  { title: 'فرهنگ و هنر', image: '/assets/images/category_sample_snappshop_2.webp' },
  { title: '  آشپزخانه', image: '/assets/images/category_sample_snapshop_4.webp' },
  { title: 'دیجیتال', image: '/assets/images/category_sample_snapshop_5.webp' },
  { title: 'زیبایی و سلامت', image: '/assets/images/category_sample_snappshop_2.webp' },
];

export function SliderCategoriesComponentV2() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const isMobileScreen = useResponsiveEvent(768, 200);

  return (
    <div className="relative pr-4 md:pr-0">
      <div className="flex justify-between items-center px-4 md:px-12 mb-12">
        
        <div className="flex gap-2 ml-4">
          <button ref={prevRef} className="p-2 bg-gray-100 rounded-full">
            <ChevronLeft size={20} />
          </button>
          <button ref={nextRef} className="p-2 bg-gray-100 rounded-full">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className='text-right'>
          <h2 className="text-pink-600 font-bold text-lg">دسته بندی ها  </h2>
          <p className="text-sm text-gray-500">راحت و سریع خرید کنید</p>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={15}
        slidesPerView={isMobileScreen ? 3.5 : 5.5}
        dir="rtl"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center text-center w-48">
              <img src={cat.image} alt={cat.title} className="object-contain mb-2" />
              <span className="text-xs md:text-sm font-medium">{cat.title}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SliderCategoriesComponentV2;