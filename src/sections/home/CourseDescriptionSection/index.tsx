/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

const CourseDescriptionSection = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4 pb-8 md:items-start md:p-8 md:pb-0">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        
        {/* Right Side - Image/Visual Content */}
        <div className="order-1 flex justify-center md:order-2">
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 opacity-20 blur-lg"></div>
            
            {/* Main image container */}
            <div className="relative rounded-lg bg-white p-6 shadow-xl">
              <img
                src="https://via.placeholder.com/400x300?text=دوره+آموزشی"
                alt="Course Description"
                className="h-64 w-full rounded-lg object-cover md:h-80 md:w-96"
              />
              
              {/* Stats overlay */}
              <div className="absolute -bottom-4 -right-4 rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center gap-2 text-green-600">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-semibold">+۳۲,۴۵۶</span>
                </div>
                <p className="text-xs text-gray-600">دوره مختلف</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side - Text Content */}
        <div dir="rtl" className="order-2 space-y-6 text-center md:order-1 md:text-right">
          {/* Icon */}
          <div className="flex justify-center md:justify-start">
            <BookOpen className="size-16 rounded-full bg-gradient-to-r from-green-500 to-blue-600 p-4 text-white shadow-lg md:size-20" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight text-gray-800 md:text-5xl">
            یادگیری آنلاین، زنده و تعاملی
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              کشف کن، تجربه کن، پیشرفت کن!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-gray-600 md:text-lg">
            روش‌های قدیمی رو کنار بذار با یادگیری تعاملی، مفاهیم،
            <br />
            رو عمیق‌تر درک کن و مهارت‌هاتو تقویت کن.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm">
              <Award className="mb-2 h-8 w-8 text-green-600" />
              <span className="text-sm font-semibold text-gray-800">+۱۵</span>
              <span className="text-xs text-gray-600">تجربه</span>
            </div>
            
            <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm">
              <Users className="mb-2 h-8 w-8 text-blue-600" />
              <span className="text-sm font-semibold text-gray-800">+۶۵,۰۰۰</span>
              <span className="text-xs text-gray-600">کاربر فعال</span>
            </div>
            
            <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm">
              <Clock className="mb-2 h-8 w-8 text-purple-600" />
              <span className="text-sm font-semibold text-gray-800">۲۴/۷</span>
              <span className="text-xs text-gray-600">پشتیبانی</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 text-right">
            <p className="text-sm leading-relaxed text-gray-700 md:text-base">
              در دنیای امروز، یادگیری مداوم کلید موفقیت است. ما با ارائه دوره‌های تعاملی و زنده،
              فرصتی فراهم می‌کنیم تا شما بتوانید مهارت‌هایتان را به سطح جدیدی برسانید.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 md:text-base">
              با استفاده از جدیدترین روش‌های آموزشی و تکنولوژی‌های نوین، تجربه یادگیری
              منحصر به فردی را برای شما رقم می‌زنیم.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 md:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition duration-200 hover:shadow-xl md:text-base">
              مشاهده دوره‌ها
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-50 md:text-base">
              دانلود
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescriptionSection;
