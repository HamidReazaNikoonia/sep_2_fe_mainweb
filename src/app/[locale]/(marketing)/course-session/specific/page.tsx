/* eslint-disable style/jsx-one-expression-per-line */
'use client';
import { CirclePlay, CircleX, Phone } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import testPosterImg from '@/public/assets/images/webmaster-course-cover-1.png';

const playVideo = () => {
  console.log('playVideo');
};

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
      <div className="container mx-auto flex flex-col gap-2 pb-32 pt-24 md:flex-row ">
        {/* Rigth Section  */}
        <div className="flex w-full flex-col rounded-2xl border bg-gradient-to-r  from-pink-500 to-purple-600 pb-16 text-xs hover:from-pink-600 hover:to-purple-700 md:w-3/5">

          {/* Title and properties */}
          <div dir="rtl" className="w-full ">

            {/* Header Title */}
            <div className="mot-course-descs-container rounded-2xl p-6 ">
              <div className="mot-course-descs flex flex-col">
                <h1 className="w-full text-2xl font-semibold text-white">
                  دوره وبمستر
                </h1>

                <ul style={{ transform: 'translateY(25px)' }} className="mot-course-desc flex flex-wrap justify-start gap-x-4 rounded-2xl bg-white p-4">

                  <li className="mot-course-desc-item flex items-center">
                    <div className="attr-icon">
                      <svg width="24" height="24" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="17" r="9" fill="#f22d33"></circle>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8693 17.8361L15.0393 18.6436C15.2004 19.3417 15.0413 20.0753 14.6055 20.644C14.1697 21.2128 13.5028 21.5572 12.7868 21.5832H6.21342C5.49742 21.5572 4.83045 21.2128 4.39467 20.644C3.95888 20.0753 3.79982 19.3417 3.96092 18.6436L4.13092 17.8361C4.32645 16.743 5.26611 15.9397 6.37634 15.9165H12.6238C13.7341 15.9397 14.6737 16.743 14.8693 17.8361ZM12.7868 20.5136C13.1464 20.5094 13.4849 20.3428 13.7076 20.0603V20.0674C13.9808 19.7247 14.0872 19.2781 13.998 18.849L13.828 18.0415C13.7337 17.4431 13.2292 16.995 12.6238 16.9719H6.37634C5.77097 16.995 5.2665 17.4431 5.17217 18.0415L5.00217 18.849C4.91516 19.2759 5.02148 19.7193 5.29259 20.0603C5.51524 20.3428 5.85374 20.5094 6.21342 20.5136H12.7868Z" fill="#5F5CF0"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.85424 14.4998H9.14591C7.5811 14.4998 6.31258 13.2313 6.31258 11.6665V9.79651C6.31069 9.16472 6.56083 8.55826 7.00758 8.11152C7.45432 7.66477 8.06078 7.41463 8.69258 7.41651H10.3076C10.9394 7.41463 11.5458 7.66477 11.9926 8.11152C12.4393 8.55826 12.6895 9.16472 12.6876 9.79651V11.6665C12.6876 13.2313 11.4191 14.4998 9.85424 14.4998ZM8.69258 8.47901C7.96494 8.47901 7.37508 9.06888 7.37508 9.79651V11.6665C7.37508 12.6445 8.16791 13.4373 9.14591 13.4373H9.85424C10.8322 13.4373 11.6251 12.6445 11.6251 11.6665V9.79651C11.6251 9.44709 11.4863 9.11198 11.2392 8.8649C10.9921 8.61782 10.657 8.47901 10.3076 8.47901H8.69258Z" fill="#5F5CF0"></path>
                        <g clip-path="url(#clip0_113_4115)">
                          <path d="M15.1818 9.15247V11.7674H13.5837V9.15247H15.1818ZM5.59354 9.15247V11.7674H4.79452C4.35506 11.7674 3.9955 11.4733 3.9955 11.1137V9.15247H5.59354ZM9.58864 0.653809C5.61751 0.653809 2.39746 3.28839 2.39746 6.5375V11.1137C2.39746 12.1989 3.46815 13.0749 4.79452 13.0749H7.19158V7.84498H3.9955V6.5375C3.9955 4.00751 6.49643 1.9613 9.58864 1.9613C12.6808 1.9613 15.1818 4.00751 15.1818 6.5375V7.84498H11.9857V13.0749H15.1818V13.7287H9.58864V15.0362H14.3828C15.7091 15.0362 16.7798 14.1601 16.7798 13.0749V6.5375C16.7798 3.28839 13.5598 0.653809 9.58864 0.653809Z" fill="#f22d33"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_113_4115">
                            <rect width="19.1765" height="15.6898" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-xs">پشتیبانی دائمی</span>
                  </li>

                  <li className="mot-course-desc-item flex items-center">
                    <div className="attr-icon">
                      <svg width="24" height="24" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="17" r="9" fill="#f22d33"></circle>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8693 17.8361L15.0393 18.6436C15.2004 19.3417 15.0413 20.0753 14.6055 20.644C14.1697 21.2128 13.5028 21.5572 12.7868 21.5832H6.21342C5.49742 21.5572 4.83045 21.2128 4.39467 20.644C3.95888 20.0753 3.79982 19.3417 3.96092 18.6436L4.13092 17.8361C4.32645 16.743 5.26611 15.9397 6.37634 15.9165H12.6238C13.7341 15.9397 14.6737 16.743 14.8693 17.8361ZM12.7868 20.5136C13.1464 20.5094 13.4849 20.3428 13.7076 20.0603V20.0674C13.9808 19.7247 14.0872 19.2781 13.998 18.849L13.828 18.0415C13.7337 17.4431 13.2292 16.995 12.6238 16.9719H6.37634C5.77097 16.995 5.2665 17.4431 5.17217 18.0415L5.00217 18.849C4.91516 19.2759 5.02148 19.7193 5.29259 20.0603C5.51524 20.3428 5.85374 20.5094 6.21342 20.5136H12.7868Z" fill="#5F5CF0"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.85424 14.4998H9.14591C7.5811 14.4998 6.31258 13.2313 6.31258 11.6665V9.79651C6.31069 9.16472 6.56083 8.55826 7.00758 8.11152C7.45432 7.66477 8.06078 7.41463 8.69258 7.41651H10.3076C10.9394 7.41463 11.5458 7.66477 11.9926 8.11152C12.4393 8.55826 12.6895 9.16472 12.6876 9.79651V11.6665C12.6876 13.2313 11.4191 14.4998 9.85424 14.4998ZM8.69258 8.47901C7.96494 8.47901 7.37508 9.06888 7.37508 9.79651V11.6665C7.37508 12.6445 8.16791 13.4373 9.14591 13.4373H9.85424C10.8322 13.4373 11.6251 12.6445 11.6251 11.6665V9.79651C11.6251 9.44709 11.4863 9.11198 11.2392 8.8649C10.9921 8.61782 10.657 8.47901 10.3076 8.47901H8.69258Z" fill="#5F5CF0"></path>
                        <g clip-path="url(#clip0_113_4115)">
                          <path d="M15.1818 9.15247V11.7674H13.5837V9.15247H15.1818ZM5.59354 9.15247V11.7674H4.79452C4.35506 11.7674 3.9955 11.4733 3.9955 11.1137V9.15247H5.59354ZM9.58864 0.653809C5.61751 0.653809 2.39746 3.28839 2.39746 6.5375V11.1137C2.39746 12.1989 3.46815 13.0749 4.79452 13.0749H7.19158V7.84498H3.9955V6.5375C3.9955 4.00751 6.49643 1.9613 9.58864 1.9613C12.6808 1.9613 15.1818 4.00751 15.1818 6.5375V7.84498H11.9857V13.0749H15.1818V13.7287H9.58864V15.0362H14.3828C15.7091 15.0362 16.7798 14.1601 16.7798 13.0749V6.5375C16.7798 3.28839 13.5598 0.653809 9.58864 0.653809Z" fill="#f22d33"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_113_4115">
                            <rect width="19.1765" height="15.6898" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-xs">پشتیبانی دائمی</span>
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

        <div className="gradient-to-r flex w-full rounded-2xl bg-white from-pink-500 to-purple-600 shadow-xl md:w-2/5" style={{ border: '4px solid blue' }}>
          <div className="flex w-full flex-col justify-between px-4 py-6">

            <div className="w-full">

              {/* Course Session Description */}
              <div className="w-full border-y border-r border-r-4 border-r-red-500 py-2 pr-3 text-right text-sm leading-7">
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
  );
}
