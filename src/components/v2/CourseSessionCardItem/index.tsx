import { BookCheck, Clock, MonitorSpeaker, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

interface CourseSessionCardItemProps {
  title?: string;
  subtitle?: string;
  websiteUrl?: string;
  duration?: string;
  price?: number;
  originalPrice?: number;
  courseType?: string;
  linkHref?: string;
  isPopular?: boolean;
}

const CourseSessionCardItem: React.FC<CourseSessionCardItemProps> = (props) => {
  const {
    title = "طراحی سایت مقدماتی (وردپرس)",
    subtitle = "PRELIMINARY WEB DESIGN (WORDPRESS)",
    websiteUrl = "این دوره توسط ۳ استاد در حال برگذاریست",
    duration = "مدت زمان دوره",
    price = 295000,
    originalPrice = 520000,
    courseType = "دوره حضوری",
    linkHref = "#",
    isPopular = false
  } = props.courseSessionData;
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <Link href={linkHref}>
      <div dir="rtl" className=" flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-95 hover:shadow-xl">
        {/* Purple Gradient Header */}
        <div style={{backgroundImage: 'url(https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className="relative h-36 md:h-60 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4">
          {/* Decorative elements */}
          {/* <div className="absolute left-4 top-2">
            <div className="size-2 rounded-full bg-white/30">a</div>
          </div>
          <div className="absolute right-8 top-4">
            <div className="size-1 rounded-full bg-white/40">b</div>
          </div>
          <div className="absolute bottom-6 left-6">
            <div className="size-1.5 rounded-full bg-white/25">c</div>
          </div> */}
          
          {/* Orange Circle with Laptop Icon */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-9 transform">
            <div className='flex'>
            <div className="flex mx-1 size-12 md:size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg rounded-full">
              <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png" className='rounded-full' />
            </div>
            <div className="flex mx-1 size-12 md:size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg rounded-full">
              <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png" className='rounded-full' />
            </div>
            <div className="flex mx-1 size-12 md:size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg rounded-full">
              <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png" className='rounded-full' />
            </div>
            </div>
          </div>
        </div>

         {/* Website URL */}
         <p className="mb-0 mt-6 z-20 opacity-80 py-2 bg-green-100 text-center text-xs text-black">
            {websiteUrl}
          </p>

        {/* Content Section */}
        <div className="flex flex-col px-6 pb-6 pt-2">
          {/* Course Type */}
          <div className="mb-2 text-center">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {courseType}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-center text-lg font-bold leading-tight text-gray-900">
            {title}
          </h2>

          {/* English Subtitle */}
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
            {subtitle}
          </p>

         

          {/* Course Info */}
          <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1">
              <Clock className="size-4 text-gray-400" />
              <span className="text-xs text-gray-600">{duration}</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
                <span className="text-xs text-gray-500">تومان</span>
              </div>
              {originalPrice && (
                <div className="text-xs text-gray-400 line-through">
                  {formatPrice(originalPrice)} تومان
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 border-pink-500 text-xs text-pink-500 hover:bg-pink-50"
            >
               <Phone className="ml-0 size-4" />
               مشاوره
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-xs hover:from-pink-600 hover:to-purple-700"
            >
              ثبت نام
            </Button>
          </div>

          {/* Popular Badge */}
          {isPopular && (
            <div className="absolute right-4 top-4">
              <div className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-1">
                <BookCheck className="size-3 text-white" />
                <span className="text-xs font-medium text-white">محبوب</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseSessionCardItem;
