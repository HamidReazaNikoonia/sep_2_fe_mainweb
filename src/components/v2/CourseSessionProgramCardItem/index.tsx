import { MessageCircle, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';

type CourseSessionProgramCardItemProps = {
  title: string;
  score: number;
  description: string;
  startDate: string;
  price: number;
  duration: string;
  isPresential?: boolean;
  imageUrl: string;
  onRegister?: () => void;
};

const CourseSessionProgramCardItem: React.FC<CourseSessionProgramCardItemProps> = ({
  title,
  score = 5,
  description = 'توضیحات: نرم افزار ایلوستریتور نیازی اساسی در طراحی گرافیکی می باشد، به کمک نرم افزار',
  startDate,
  price,
  duration,
  isPresential = false,
  imageUrl,
  onRegister,
}) => {
  return (
    <div dir="rtl" className="flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-md md:flex-row">
      {/* First Section - Image and Course Info */}
      <div className="flex flex-row gap-4 md:grow">
        {/* Right Section - Image */}
        <div className="relative h-auto w-[30%] shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-lg border object-cover shadow"
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
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{score.toLocaleString('fa-IR')}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1">
              <MessageCircle className="size-4 fill-gray-400 text-gray-200" />
              <span className="text-xs text-gray-600">{32}</span>
            </div>
          </div>

          {/* Description */}
          <p className=" line-clamp-2 text-[10px] text-gray-600 md:text-xs">
            {description}
          </p>
        </div>
      </div>

      {/* Second Section - Course Details */}
      <div dir="rtl" className="flex flex-col items-end items-center gap-2 border-t pt-4 md:min-w-[200px] md:border-r md:border-t-0 md:pr-4 md:pt-0">
        {/* Price */}
        <div className="flex w-full flex-row items-center justify-between md:flex-col md:justify-center">
          <div className="text-xs text-gray-600">
            شروع قیمت از
          </div>
          <div className="flex items-center gap-1">
            <span className="text-center text-lg font-bold">{price.toLocaleString('fa-IR')}</span>
            <span className="text-sm">تومان</span>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between md:flex-col md:items-center md:justify-center">
          <div className="text-xs text-gray-600">
            شروع دوره:
            {' '}
            {startDate}
          </div>
          <div className="text-xs text-gray-600">
            مدت دوره:
            {' '}
            {duration}
          </div>
        </div>
        {/* Course Type Badge */}
        {isPresential && (
          <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            حضوری
          </div>
        )}

        {/* Register Button */}
        <div className="flex w-full flex-col">

          <Button
            variant="outline"
            size="sm"
            className="border-pink-500 bg-white/80 text-[10px] text-pink-500 shadow-sm backdrop-blur-sm hover:bg-pink-50"
          >
            <Phone className="ml-1 size-3" />
            مشاوره
          </Button>

          <Button
            onClick={onRegister}
            className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-xs text-white hover:from-pink-600 hover:to-purple-700"
          >
            ثبت نام
          </Button>

        </div>

      </div>
    </div>
  );
};

export default CourseSessionProgramCardItem;
