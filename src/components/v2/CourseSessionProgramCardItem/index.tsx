import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle, Phone } from 'lucide-react';

interface CourseSessionProgramCardItemProps {
  title: string;
  score: number;
  description: string;
  startDate: string;
  price: number;
  duration: string;
  isPresential?: boolean;
  imageUrl: string;
  onRegister?: () => void;
}

const CourseSessionProgramCardItem: React.FC<CourseSessionProgramCardItemProps> = ({
  title,
  score = 5,
  description = "توضیحات: نرم افزار ایلوستریتور نیازی اساسی در طراحی گرافیکی می باشد، به کمک نرم افزار",
  startDate,
  price,
  duration,
  isPresential = false,
  imageUrl,
  onRegister,
}) => {
  return (
    <div dir="rtl" className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md w-full p-4 gap-4">
      {/* First Section - Image and Course Info */}
      <div className="flex flex-row gap-4 md:flex-grow">
        {/* Right Section - Image */}
        <div className="relative w-[30%] h-auto shrink-0">
          <div className="hidden md:block absolute bottom-2 left-5 z-10">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/80 backdrop-blur-sm border-pink-500 text-[10px] text-pink-500 hover:bg-pink-50 shadow-sm"
            >
              <Phone className="ml-1 size-3" />
              مشاوره
            </Button>
          </div>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg border shadow"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Middle Section - Course Info */}
        <div className="flex flex-col gap-2 pt-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>

          <div className="flex flex-row gap-2">
            {/* Score */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{score.toLocaleString('fa-IR')}</span>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 fill-gray-400 text-gray-200" />
            <span className="text-xs text-gray-600">{32}</span>
          </div>
          </div>

          {/* Description */}
          <p className=" text-[10px] md:text-xs text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Second Section - Course Details */}
      <div dir="rtl" className="items-center flex flex-col gap-2 items-end md:min-w-[200px] md:border-r md:pr-4 pt-4 md:pt-0 border-t md:border-t-0">
        {/* Price */}
        <div className='w-full flex flex-row md:flex-col justify-between md:justify-center items-center'>
        <div className='text-xs text-gray-600'>
          شروع قیمت از
        </div>
        <div className="flex items-center gap-1">
          <span className="text-lg text-center font-bold">{price.toLocaleString('fa-IR')}</span>
          <span className="text-sm">تومان</span>
        </div>
        </div>

       <div className='w-full flex flex-row md:flex-col justify-between md:justify-center md:items-center'>
        <div className='text-xs text-gray-600'>
          شروع دوره: {startDate}
        </div>
        <div className='text-xs text-gray-600'>
          مدت دوره: {duration}
        </div>
        </div>
        {/* Course Type Badge */}
        {isPresential && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            حضوری
          </div>
        )}

        {/* Register Button */}
        <Button
          onClick={onRegister}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-xs hover:from-pink-600 hover:to-purple-700 text-white mt-2"
        >
          ثبت نام
        </Button>
      </div>
    </div>
  );
};

export default CourseSessionProgramCardItem;
