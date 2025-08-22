/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { CourseSessioonProgramHelper } from '@/utils/CourseSession';
import { convertDateToPersian, toPersianDigits } from '@/utils/Helpers';

type CourseSessionProgramCardItemProps = {
  programData: any;
  onRegister?: () => void;
};

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

const ProgramSpecificCardItem: React.FC<CourseSessionProgramCardItemProps> = ({
  programData,
  onRegister,
}) => {
  const { isPresential = false } = programData;

  const programTitle = programData?.course?.title || '';
  const programSubTitle = programData?.course?.sub_title || '';
  // const score = programData?.course?.score || 0;

  const price = programData?.price_real;
  const discountPrice = programData?.price_discounted;

  const firstSessionDate = CourseSessioonProgramHelper(programData).getFirstSessionDate();
  const formattedFirstSessionDate = convertDateToPersian(firstSessionDate);
  const sessionsCount = programData?.sessions?.length || 0;

  const imageUrl = programData?.course?.tumbnail?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${programData?.course?.tumbnail?.file_name}` : '';
  return (
    <div dir="rtl" className="flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-md md:flex-row">
      {/* First Section - Image and Course Info */}
      <div className="flex flex-col gap-4 md:grow md:flex-row">
        {/* Right Section - Image */}
        <div className="relative hidden h-auto w-[40%] shrink-0 md:block">
          <Image
            src={imageUrl}
            alt={programTitle}
            fill
            className="rounded-lg border object-cover shadow"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="relative block  h-32 w-full shrink-0 md:hidden">
          <Image
            src={imageUrl}
            alt={programTitle}
            fill
            className="rounded-lg border object-cover shadow"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Middle Section - Course Info */}
        <div className=" flex flex-col gap-1 pt-0 md:pt-2">
          {/* Title */}
          <h3 className="text-sm font-bold text-gray-800 md:text-lg">{programTitle}</h3>
          {/* <div className="flex flex-row gap-2"> */}
          {/* Score */}
          {/* <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{score.toLocaleString('fa-IR')}</span>
            </div> */}

          {/* Comments */}
          {/* <div className="flex items-center gap-1">
              <MessageCircle className="size-4 fill-gray-400 text-gray-200" />
              <span className="text-xs text-gray-600">{32}</span>
            </div> */}
          {/* </div> */}

          {/* Description */}
          <p className="text-xs text-gray-600">
            {programSubTitle}
          </p>
        </div>
      </div>

      {/* Second Section - Course Details */}
      <div dir="rtl" className="flex flex-col items-end gap-2 border-t pt-4 md:min-w-[200px] md:border-r md:border-t-0 md:pr-4 md:pt-0">
        {/* Price */}
        <div className="flex w-full flex-row items-center justify-between border-b pb-3 md:flex-col md:justify-center md:border-b-0 md:pb-0">
          <div className="text-xs text-gray-600">
            قیمت
          </div>
          <div className="flex items-center gap-2">
            {discountPrice
              ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-center text-xs font-bold text-gray-400 line-through">{price.toLocaleString('fa-IR')}</span>
                      <span className="text-sm text-gray-400">تومان</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-center text-lg font-bold text-green-600">{discountPrice.toLocaleString('fa-IR')}</span>
                      <span className="text-sm text-green-600">تومان</span>
                      <div className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-800">
                        تخفیف
                      </div>
                    </div>
                  </div>
                )
              : (
                  <div className="flex items-center gap-1">
                    <span className="text-center text-lg font-bold">{price.toLocaleString('fa-IR')}</span>
                    <span className="text-sm">تومان</span>
                  </div>
                )}
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-between md:flex-col md:justify-center">
          <div className="text-xs text-gray-600">
            شروع دوره:
            {' '}
            <span className="font-bold">{formattedFirstSessionDate}</span>
          </div>
          <div className="mt-1  text-xs text-gray-600">
            تعداد کلاس ها:
            {' '}
            <span className="font-bold">{toPersianDigits(sessionsCount)}</span>
          </div>
        </div>
        {/* Course Type Badge */}
        {isPresential && (
          <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            حضوری
          </div>
        )}

        {/* Register Button */}
        <Link className="w-full" href={`/course-session/${programData?.course?.id}`}>
          <Button
            onClick={onRegister}
            className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-xs text-white hover:from-pink-600 hover:to-purple-700"
          >
            ثبت نام
          </Button>
        </Link>
        <div className="z-10 w-full ">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-pink-500 bg-white/80 text-[10px] text-pink-500 shadow-sm backdrop-blur-sm hover:bg-pink-50"
          >
            <Phone className="ml-1 size-3" />
            مشاوره
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramSpecificCardItem;
