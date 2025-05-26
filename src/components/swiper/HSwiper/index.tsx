/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';

import { GraduationCap } from 'lucide-react';
import React from 'react';
import { EffectFade, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './styles.css';

const BlogSlider = () => {
  const blogPosts = [
    {
      id: 1,
      date: 'شروع دوره از 5 تیر ',
      title: 'دوره آموزش هوش مصنوعی',
      text: 'توضیحات دوره در اینجا قرار میگیرد',
      image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp',
    },
    {
      id: 2,
      date: 'شروع دوره از 5 تیر ',
      title: 'دوره آموزش  روانشناسی',
      text: 'توضیحات دوره در اینجا قرار میگیرد',
      image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp',
    },
    {
      id: 3,
      date: 'شروع دوره از 5 تیر ',
      title: 'دوره آموزش  فتوشاپ',
      text: 'توضیحات دوره در اینجا قرار میگیرد',
      image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp',
    },
  ];

  return (
    <div className="blog-slider-container flex flex-col">
      <div className="mt-12 inline-flex justify-end px-4 py-2 text-2xl font-semibold  text-white md:px-12 md:text-3xl">

        دوره های داغ تابستان
        <GraduationCap size={38} className="ml-4" />
      </div>
      <Swiper
        spaceBetween={30}
        effect="fade"
        loop
        mousewheel={{
          invert: false,
        }}
        modules={[EffectFade, Mousewheel, Pagination]}
        pagination={{
          el: '.blog-slider__pagination',
          clickable: true,
        }}
        className="blog-slider"
      >
        {blogPosts.map(post => (
          <SwiperSlide key={post.id}>
            <div className="blog-slider__item">
              <div className="blog-slider__img">
                <img src={post.image} alt={post.title} />
              </div>
              <div dir="rtl" className="blog-slider__content">
                <span className="blog-slider__code">{post.date}</span>
                <div className="blog-slider__title">{post.title}</div>
                <div className="blog-slider__text">{post.text}</div>
                <a href="#" className="blog-slider__button">اطلاعات بیشتر </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="blog-slider__pagination"></div>
      </Swiper>
    </div>
  );
};

export default BlogSlider;
