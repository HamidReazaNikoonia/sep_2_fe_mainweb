/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable style/jsx-one-expression-per-line */
'use client';
import { CirclePlay, CircleX, Phone } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import testPosterImg from '@/public/assets/images/webmaster-course-cover-1.png';
import TabularSection from '@/sections/courseSessionSpecific/TabularSection';
import { Headset } from 'lucide-react';

const playVideo = () => {
  console.log('playVideo');
  
};


const courseSessionData = {
  title: 'دوره وبمستر',
}

export default function page() {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  const originalPrice = 9000000;
  const price = 800000;

  return (
    <div dir="rtl" className="w-full bg-gray-200">
      {/* Header Hero */}
      <div className="container mx-auto flex flex-col gap-2 pb-12 pt-24 md:flex-row ">
        {/* Rigth Section  */}
        <div className="flex w-full flex-col rounded-2xl border bg-gradient-to-r  from-pink-500 to-purple-600 pb-16 text-xs hover:from-pink-600 hover:to-purple-700 md:w-3/5">

          {/* Title and properties */}
          <div dir="rtl" className="w-full ">

            {/* Header Title */}
            <div className="rounded-2xl p-6 ">
              <div className="flex flex-col">
                <h1 className="w-full text-2xl font-semibold text-white">
                  {courseSessionData.title}
                </h1>

                <ul style={{ transform: 'translateY(15px)' }} className="flex flex-wrap justify-start gap-x-4 rounded-2xl bg-white px-4 py-2.5">

                  <li className="mot-course-desc-item flex items-center">
                    <div className="attr-icon">
                      <Headset size={18} color="gray" />
                    </div>
                    <span className="text-xs text-gray-800 mr-2">پشتیبانی دائمی</span>
                  </li>

                  <li className="mot-course-desc-item flex items-center">
                    <div className="attr-icon">
                      <Headset size={18} color="gray" />
                    </div>
                    <span className="text-xs text-gray-800 mr-2">پشتیبانی دائمی</span>
                  </li>

                </ul>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="w-full">
            <div className="sticky top-5 flex h-96 w-full justify-center rounded-2xl bg-transparent">
              <div onClick={() => setIsPlaying(!isPlaying)} className="mot-course-video-icon absolute left-2/4 top-2/4 size-16 -translate-x-1/2 -translate-y-1/2">
                <span className={`aticon ${isPlaying ? 'hidden' : 'block'}`} data-icon=""></span>
                <CirclePlay className={`size-20 text-white ${isPlaying ? 'hidden' : 'block'}`} color="white" />
              </div>
              <Image src={testPosterImg} />
              <video className={`${isPlaying ? 'block' : 'hidden'}`} poster="https://www.aryatehran.com/wp-content/uploads/2022/04/webmaster-course-cover-1.png" src="https://d1.aryatehran.com/coursevideos/teaser-course-wordpress.mp4" />
              <div className={`${isPlaying ? 'block' : 'hidden'}`}>
                <CircleX className="size-20 text-white" color="white" />
              </div>
            </div>
          </div>

        </div>

        {/* Left Section */}
        <div className="p-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-xl md:w-2/5">
          <div className="gradient-to-r flex size-full rounded-2xl bg-white">
            <div className="flex w-full flex-col justify-between px-4 py-6">

              <div className="w-full">

                {/* Course Session Description */}
                <div className="w-full border-y border-r border-r-red-500 py-2 pr-3 text-right text-sm leading-7">
                  آموزش گیمبال دوربین به صورت حضوری و خصوصی از جمله دوره های آموزشی هدا استودیو به شمار می رود. اگر شما نیز به دنبال یادگیری حرفه‌ای کار با گیمبال و ارتقای مهارت‌های فیلم‌برداری خود هستید؟ هدا استودیو با افتخار دوره آموزشی آشنایی و کار با گیمبال دوربین را به صورت حضوری و خصوصی برگزار می‌کند.
                </div>

                {/* Action Button */}
                <div className="mt-4 hidden w-full justify-end md:flex">
                  <Button
                    variant="outline"
                    className="flex-1  bg-gradient-to-r from-pink-500 to-purple-600 text-sm text-white hover:from-pink-600 hover:to-purple-700"
                  >
                    <Phone className="ml-0 size-10" />
                    مشاوره رایگان
                  </Button>
                </div>
              </div>

              {/* Coaches */}
              <div className="flex w-full flex-col">
                {/* Header */}
                <h3 className="mt-8 text-right text-lg font-semibold text-gray-800 md:mt-0">
                  لیست اساتید این دوره آموزشی
                </h3>

                {/* Lists */}
                <ul className="flex flex-col gap-y-2  pt-4">
                  <li className=" flex w-full flex-col items-center border-y border-r border-r-4 border-gray-300 border-r-red-500 py-1.5 pr-2 md:flex-row">
                    <div className="flex w-full flex-row items-center">
                      {/* Avatar */}
                      <div>
                        <div className="mx-1 flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg md:size-8">
                          <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png" className="rounded-full" />
                        </div>
                      </div>

                      {/* Coach Name */}
                      <div className="mr-2 text-xs md:text-sm">
                        حمید نیکونیا
                      </div>

                      {/* Price */}
                      <div className="ml-0 mr-1 flex flex-1 flex-row-reverse items-center gap-3 text-left md:ml-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-gray-900 md:text-lg">{formatPrice(price)}</span>
                          <span className="text-xs text-gray-500">تومان</span>
                        </div>
                        {originalPrice && (
                          <div className="text-[10px] text-gray-400 line-through">
                            {formatPrice(originalPrice)} تومان
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons Mobile Screen */}
                    <div className="mt-4 flex w-full items-center justify-end gap-2 md:hidden">
                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:w-auto"
                      >
                        جزيیات
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-pink-500 text-xs text-pink-500 hover:bg-pink-50"
                      >
                        <Phone className="ml-0 size-4" />
                        مشاوره
                      </Button>
                    </div>

                    {/* Button Desktop Screen */}
                    <Button
                      className="mt-3 hidden w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:mt-0 md:block md:w-auto"
                    >
                      جزيیات
                    </Button>
                  </li>

                  <li className=" flex w-full flex-col items-center border-y border-r border-r-4 border-gray-300 border-r-red-500 py-1.5 pr-2 md:flex-row">
                    <div className="flex w-full flex-row items-center">
                      {/* Avatar */}
                      <div>
                        <div className="mx-1 flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg md:size-8">
                          <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png" className="rounded-full" />
                        </div>
                      </div>

                      {/* Coach Name */}
                      <div className="mr-2 text-xs md:text-sm">
                        حمید نیکونیا
                      </div>

                      {/* Price */}
                      <div className="ml-0 mr-1 flex flex-1 flex-row-reverse items-center gap-3 text-left md:ml-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-gray-900 md:text-lg">{formatPrice(price)}</span>
                          <span className="text-xs text-gray-500">تومان</span>
                        </div>
                        {originalPrice && (
                          <div className="text-[10px] text-gray-400 line-through">
                            {formatPrice(originalPrice)} تومان
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons Mobile Screen */}
                    <div className="mt-4 flex w-full items-center justify-end gap-2 md:hidden">
                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:w-auto"
                      >
                        جزيیات
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-pink-500 text-xs text-pink-500 hover:bg-pink-50"
                      >
                        <Phone className="ml-0 size-4" />
                        مشاوره
                      </Button>
                    </div>

                    {/* Button Desktop Screen */}
                    <Button
                      className="mt-3 hidden w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:mt-0 md:block md:w-auto"
                    >
                      جزيیات
                    </Button>
                  </li>

                  <li className=" flex w-full flex-col items-center border-y border-r border-r-4 border-gray-300 border-r-red-500 py-1.5 pr-2 md:flex-row">
                    <div className="flex w-full flex-row items-center">
                      {/* Avatar */}
                      <div>
                        <div className="mx-1 flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg md:size-8">
                          <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png" className="rounded-full" />
                        </div>
                      </div>

                      {/* Coach Name */}
                      <div className="mr-2 text-xs md:text-sm">
                        حمید نیکونیا
                      </div>

                      {/* Price */}
                      <div className="ml-0 mr-1 flex flex-1 flex-row-reverse items-center gap-3 text-left md:ml-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-gray-900 md:text-lg">{formatPrice(price)}</span>
                          <span className="text-xs text-gray-500">تومان</span>
                        </div>
                        {originalPrice && (
                          <div className="text-[10px] text-gray-400 line-through">
                            {formatPrice(originalPrice)} تومان
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons Mobile Screen */}
                    <div className="mt-4 flex w-full items-center justify-end gap-2 md:hidden">
                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:w-auto"
                      >
                        جزيیات
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-pink-500 text-xs text-pink-500 hover:bg-pink-50"
                      >
                        <Phone className="ml-0 size-4" />
                        مشاوره
                      </Button>
                    </div>

                    {/* Button Desktop Screen */}
                    <Button
                      className="mt-3 hidden w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:mt-0 md:block md:w-auto"
                    >
                      جزيیات
                    </Button>
                  </li>

                  <li className="mt-2 w-full cursor-pointer items-center  rounded-2xl rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 py-2 text-center text-xs text-white hover:from-pink-600 hover:to-purple-700 md:mt-0 md:text-sm">
                    {/* Avatar */}
                    مشاهده لیست کامل اساتید این دوره آموزشی
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Description Tabular Section */}
      <div className="container mx-auto pb-20">
        <TabularSection />
      </div>
    </div>
  );
}
