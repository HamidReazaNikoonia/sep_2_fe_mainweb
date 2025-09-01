/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable @next/next/no-img-element */
import { Users } from 'lucide-react';
import React from 'react';

const AboutCoachesSection = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-8 md:items-start md:p-8 md:pb-0">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-2 md:grid-cols-2 md:gap-10">

        {/* Left Side - Text Content */}
        <div dir="rtl" className="order-2 mx-4 space-y-2 pt-0 text-center md:mx-0 md:pt-12">
          {/* Icon */}
          <div className="hidden justify-center md:flex ">
            <Users className=" pink-gradient-bg size-16 rounded-full p-2 text-white shadow-2xl md:size-20" />
          </div>

          {/* Title */}
          <h1 className="pt-6 text-center text-xl font-semibold leading-tight text-gray-800 md:text-right md:text-4xl ">
            اساتید و هیئت علمی
            {' '}
            <span className="font-bold text-pink-600">آوانو</span>
          </h1>

          {/* Subtitle */}
          <p className="pb-4 text-center text-xs text-gray-600 md:text-right md:text-base ">
            برترین استاد از  شرکت‌های فناوری محور ایران
          </p>

          <div className="space-y-4 pb-6 text-right">
            {/* Description */}
            <p className="text-right text-xs leading-relaxed text-gray-700 md:text-base ">
              وظیفه اصلی یک مدرس در حوزه فناوری، کاهش زمان و انرژی لازم برای موفق شدن دانش پذیرانش است. برای رسیدن به این مهم باید از مشاور و مدرس آموزش دید که یک متخصص واقعی با تجربه‌های بزرگ در شرکت‌های مطرح باشد و چالش‌های متفاوتی را در نرم افزارهای سطح بالا به صورت واقعی تجربه کرده باشد.
            </p>
            <p className="text-right text-xs leading-relaxed text-gray-700 md:text-base ">
              افتخار می‌کنیم با مدرسين همکاری داریم که متخصص و به شدت با تجربه هستند و در بزرگترین شرکت‌های نرم افزاری ایران مثل دیجی کالا، مجموعه اسنی، دیوار، فیلیمو و آیارات، تخفیفان ... تجربه کار جدی داشته اشته اند.
            </p>
          </div>

          {/* Button */}
          <button className="pink-gradient-bg mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium text-white shadow-md transition duration-200 hover:bg-blue-700 md:px-6 md:py-3 md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            مشاهده دوره‌های آوانو
          </button>
        </div>

        {/* Right Side - Avatar Grid with Color Blocks */}
        <div className="order-1 flex w-full justify-center">
          <div className="flex max-w-[200px] items-center justify-center md:max-w-full">
            {/* Background: Soft Gradient Overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 via-transparent to-purple-100 opacity-70 blur-xl"></div>

            {/* Central Teacher Image - Circular, Overlapping */}
            <img
              src="https://7learn.com/assets/img/banners/teachers.png"
              alt="Main Teacher"
              className=" z-10 size-full object-cover"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCoachesSection;
