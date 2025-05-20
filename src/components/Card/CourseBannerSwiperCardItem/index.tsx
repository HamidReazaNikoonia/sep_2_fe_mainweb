import React from 'react'
// imageSrc, title, link
// 

import Image from "next/image";
import { Button } from "@/components/ui/button";

import useResponsiveEvent from '@/hooks/useResponsiveEvent';

import avatarImage from '@/public/assets/images/avatar.png'
import product_placeholder from "@/public/assets/images/course-banner-slideshow.jpg";

interface WebinarCardProps {
  title: string;
  subtitle: string;
  category: string;
  speaker: string;
  speakerImage: string;
  imageSrc: string;
}

const ServiceSwiperCardItem: React.FC<WebinarCardProps> = ({
  title,
  subtitle,
  category,
  speaker,
  speakerImage,
  imageSrc,
}) => {


  const isMobileScreen = useResponsiveEvent(768, 200);

  return (
    <div dir="rtl" className="bg-white relative shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row p-4">
      {/* Banner */}
      <div className="relative w-full md:w-2/5">
        {product_placeholder && (
          <Image
          src={product_placeholder}
          alt="Webinar Banner"
          width={400}
          height={200}
          className="rounded-lg"
        />
        )}
        
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-gray-400 text-sm mt-1">{category}</p>
        <p className="text-gray-600 text-xs mt-5">{subtitle}</p>
        
        
        {/* Speaker */}
        <div className="flex items-center gap-2 mt-8">
          <Image
            src={speakerImage || avatarImage}
            alt={speaker}
            width={isMobileScreen ? 30 : 40}
            height={isMobileScreen ? 30 :40}
            className="rounded-full"
          />
          <span className="text-gray-800 text-xs md:text-sm font-medium">{speaker}</span>
        </div>
      </div>
      
      {/* Registration Button */}
      <div className="absolute bottom-5 left-5 md:left-1 md:w-1/4">
        <Button className="bg-red-500 text-white text-sm px-6 py-2 rounded-lg shadow-md hover:bg-red-600">
          ثبت‌نام فوری
        </Button>
      </div>
    </div>
  );
};

export default ServiceSwiperCardItem;

