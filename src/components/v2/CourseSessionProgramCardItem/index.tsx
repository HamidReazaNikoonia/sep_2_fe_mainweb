import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

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
  score,
  description,
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
        <div className="relative h-32 w-32 shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Middle Section - Course Info */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>

          {/* Score */}
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{score}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Second Section - Course Details */}
      <div className="flex flex-col gap-3 items-end md:min-w-[200px] md:border-r md:pr-4 pt-4 md:pt-0 border-t md:border-t-0">
        {/* Price */}
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold">{price.toLocaleString()}</span>
          <span className="text-sm">تومان</span>
        </div>

        {/* Start Date */}
        <div className="text-sm text-gray-600">
          شروع دوره: {startDate}
        </div>

        {/* Duration */}
        <div className="text-sm text-gray-600">
          مدت دوره: {duration}
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
          className="w-full bg-green-500 hover:bg-green-600 text-white mt-2"
        >
          ثبت نام
        </Button>
      </div>
    </div>
  );
};

export default CourseSessionProgramCardItem;
