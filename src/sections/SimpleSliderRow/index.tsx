/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { ChevronsLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';

import { truncateDescription } from '@/utils/Helpers';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Types
type NewsItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  readTime?: string;
  category?: string;
};

type SimpleSliderRowProps = {
  title?: string;
  newsItems: NewsItem[];
  showTitle?: boolean;
};

// Sample news data
const sampleNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'برگزاری کارگاه آموزش تولید محتوا با موبایل',
    description: 'گزارشی از برگزاری کارگاه تخصصی آموزش تولید محتوا در دانشگاه فردوسی مشهد که در آن راهکارهای عملی برای استفاده از موبایل در تولید محتوای باکیفیت آموزش داده شد. این کارگاه با هدف ارتقای مهارت‌های دیجیتال دانشجویان و علاقه‌مندان به حوزه تولید محتوا برگزار شد و شرکت‌کنندگان با تکنیک‌های مختلف فیلمبرداری و عکاسی با موبایل آشنا شدند.',
    imageUrl: '/assets/images/s1.jpg',
    readTime: '۵ دقیقه',
    category: 'آموزش',
  },
  {
    id: '2',
    title: 'کارگاه آموزش تولید محتوا با موبایل در دانشگاه',
    description: 'برگزاری کارگاه تخصصی آموزش تولید محتوا در دانشگاه فردوسی مشهد. در این رویداد اردیبهشت ماه ۱۴۰۴، کارگاه آموزش تولید محتوا با حضور استادان مجرب و متخصصان حوزه رسانه برگزار شد. شرکت‌کنندگان در این کارگاه با جدیدترین روش‌های تولید محتوای دیجیتال و استفاده بهینه از ابزارهای موجود آشنا شدند.',
    imageUrl: '/assets/images/s2.jpg',
    readTime: '۸ دقیقه',
    category: 'رویداد',
  },
  {
    id: '3',
    title: 'کارگاه آموزش تولید محتوا با موبایل در دانشگاه',
    description: 'دوره آموزشی کار با کپسول موبایل در تاریخ دوشنبه ۱۴ آبان در مجموعه هدا استودیو برگزار شد. آیا در مجموعه هدا استودیو مشاهده خبر این دوره جامع شامل آموزش نصب، راه‌اندازی و استفاده حرفه‌ای از کپسول‌های موبایل برای تولید محتوای ویدیویی باکیفیت است. شرکت‌کنندگان با تجهیزات مختلف و نحوه استفاده از آن‌ها آشنا خواهند شد.',
    imageUrl: '/assets/images/s3.jpg',
    readTime: '۶ دقیقه',
    category: 'دوره',
  },
  {
    id: '4',
    title: 'کارگاه آموزش تولید محتوا با موبایل در دانشگاه',
    description: 'آیا در مجموعه هدا استودیو بازدیدی برای پیگیری کنید درآمد از طراحی سایت و بررسی شرایط بازار کار این رشته، در مجموعه مدیا رلیز در تاریخ مشخص شده برگزار خواهد شد. این کارگاه تخصصی شامل آموزش طراحی وب، بازاریابی خدمات طراحی و راهکارهای کسب درآمد پایدار از این حوزه است. شرکت‌کنندگان با استراتژی‌های موثر برای جذب مشتری و قیمت‌گذاری صحیح آشنا خواهند شد.',
    imageUrl: '/assets/images/s4.jpg',
    readTime: '۱۰ دقیقه',
    category: 'کسب درآمد',
  },
  {
    id: '5',
    title: 'کارگاه آموزش تولید محتوا با موبایل در دانشگاه',
    description: 'مطالعه خبر محتوای جدید و رویدادهای آموزشی که در هفته‌های اخیر برگزار شده است. این گزارش شامل خلاصه‌ای از مهم‌ترین رویدادهای آموزشی، کارگاه‌های تخصصی و دوره‌های جدید ارائه شده توسط مجموعه هدا استودیو است.',
    imageUrl: '/assets/images/s1.jpg',
    readTime: '۴ دقیقه',
    category: 'اخبار',
  },
];

// News Card Component
const NewsCard: React.FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
  return (
    <div className="group relative flex h-full min-h-[400px] cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <Image
          src={newsItem.imageUrl}
          alt={newsItem.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        {newsItem.category && (
          <div className="absolute right-3 top-3">
            <span className="pink-gradient-bg rounded-full px-3 py-1 text-xs font-medium text-white">
              {newsItem.category}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex h-full flex-1 flex-col p-4">
        <div className="flex-1">
          {/* Title */}
          <h3 className="mb-3 text-sm font-bold leading-6 text-gray-900 transition-colors duration-200 group-hover:text-green-600">
            {newsItem.title}
          </h3>

          {/* Description - Using truncateDescription for exactly 5 lines */}
          <p className="mb-4 line-clamp-5 text-xs leading-relaxed text-gray-600">
            {truncateDescription(newsItem.description, 200)}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          {/* Read Time */}
          {newsItem.readTime && (
            <span className="text-xs text-gray-500">
              مطالعه
              {' '}
              {newsItem.readTime}
            </span>
          )}

          {/* Read More Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-pink-500 text-pink-600 transition-all duration-200 hover:bg-pink-500 hover:text-white"
          >
            مطالعه خبر
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const SimpleSliderRow: React.FC<SimpleSliderRowProps> = ({
  title = 'آخرین اخبار و رویدادها',
  newsItems = sampleNewsItems,
  showTitle = true,
}) => {
  return (
    <section className="w-full bg-gray-50 py-12" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {showTitle && (
          <div className="mb-8 flex items-center justify-between px-4 md:px-0">
            <div>
              <h2 className="text-lg font-bold text-gray-900 md:text-2xl">{title}</h2>
              <p className="mt-2 text-xs text-gray-600 md:text-sm">
                آخرین اخبار و رویدادهای هدا استودیو را اینجا پیگیری کنید
              </p>
            </div>

            <Button className="pink-gradient-bg hidden text-white hover:bg-green-600 md:block">
              <div className="flex items-center gap-2">
                دیدن همه اخبار
                <ChevronsLeft className="mr-1 size-4 md:size-5" />
              </div>
            </Button>
          </div>
        )}

        {/* Swiper Container */}
        <div className="relative px-6 md:px-0">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
            }}
            className="!pb-12"
          >
            {newsItems.map(newsItem => (
              <SwiperSlide key={newsItem.id} className="h-auto">
                <div className="h-full">
                  <NewsCard newsItem={newsItem} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Smaller size with mobile gap */}
          <div className="swiper-button-prev-custom absolute -left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-green-500 hover:text-white md:-left-5 md:size-10">
            <svg className="size-4 md:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className="swiper-button-next-custom absolute -right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-green-500 hover:text-white md:-right-5 md:size-10">
            <svg className="size-4 md:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Mobile "View All" Button */}
        <div className="mt-8 w-full text-center ">
          <Button className="pink-gradient-bg w-full text-white hover:bg-green-600 md:hidden">
            <div className="flex items-center gap-2">
              دیدن همه اخبار
              <ChevronsLeft className="mr-1 size-4 md:size-5" />
            </div>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default SimpleSliderRow;
