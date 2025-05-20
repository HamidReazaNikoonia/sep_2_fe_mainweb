import React from 'react';
// imageSrc, title, link
//

import type { ICourseTypes } from '@/types/Course';
import { Button } from '@/components/ui/button';
import avatarImage from '@/public/assets/images/avatar.png';

import product_placeholder from '@/public/assets/images/s4.jpg';
import { filterPriceNumber } from '@/utils/Helpers';
import { BookCheck, Presentation, Star, Videotape } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

type WebinarCardProps = {
  data?: ICourseTypes;
};

const mockData = {
  title: 'دوره بازیگری',
  sub_title: 'تجربه رشد  فروش در 4 سال، با شما راهکارهای کاربردی که رشد تیم فروش را به همراه دارد را بررسی می‌کنیم.',
  speaker: 'مهدی محمدی',
  speakerImage: undefined,
  is_have_licence: true,
  course_type: 'HOZORI',
  course_status: true,
  score: 3,
  price: 50000000,
  course_category: {
    name: 'بازیگری',
  },
};

const CourseCardItem: React.FC<WebinarCardProps> = ({
  data,
}) => {
  const {
    _id,
    title,
    sub_title,
    course_status,
    is_have_licence,
    tumbnail_image,
    course_category,
    course_type,
    score,
    coach_id,
    price,
  } = data || mockData;

  return (
    <Link href={_id ? `/course/${_id}` : '/course/676c579894f20737a2e6384d'}>
      <div dir="rtl" className="relative flex flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg hover:opacity-70">
        {/* Banner */}
        <div className=" relative w-full">
          {product_placeholder && (
            <Image
              src={tumbnail_image?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${tumbnail_image?.file_name}` : product_placeholder}
              alt="Webinar Banner"
              quality={100}
              width={300}
              height={200}
              style={{
                width: '100%',
                height: 'auto',
              }}
              className="rounded-lg"
            />
          )}

          <div className="absolute bottom-2 left-4 z-10 mb-2 mt-2.5 flex items-center justify-end">
            {score && Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                strokeWidth={1}
                size={18}
                fill={index < score ? '#facc15' : 'gray'}
                stroke="none"
              />
            ))}
            <span className="mr-2 rounded bg-yellow-300 px-2.5 py-0.5 pt-1 text-xs font-semibold text-black">{score || 0}</span>

            {/* <Star  stroke='gray' fill='none' size={18} />       */}
          </div>

        </div>

        {/* Content */}
        <div className="flex grow flex-col p-4">
          <div className="flex size-full h-full flex-col justify-between">

            {/* top Side */}

            <div>
              <div className="flex justify-between">
                <h2 className="text-sm font-bold text-gray-900 md:text-lg">{title}</h2>

                {/* enum: ['HOZORI', 'OFFLINE'] */}
                {course_type === 'OFFLINE'
                  ? (
                      <div className="yellow-gradient-bg flex items-center gap-2 rounded-2xl px-4 py-1.5 md:px-5">
                        <h2 className="text-xs font-semibold text-gray-900 md:text-sm">آنلاین</h2>
                        <Videotape />
                      </div>
                    )
                  : (
                      <div className="yellow-gradient-bg flex items-center gap-2 rounded-2xl px-4 py-1.5 md:px-5">
                        <h2 className="text-xs font-semibold text-gray-900 md:text-sm">حضوری</h2>
                        <Presentation />
                      </div>
                    )}

              </div>
              <p className="mt-1 text-xs text-gray-500">{course_category && course_category?.name}</p>

              <p className="mt-5 text-xs leading-6 text-gray-600">{sub_title}</p>
            </div>

            {/* Bottom Side */}

            <div className="flex w-full items-center justify-between">
              {/* Speaker */}
              <div className="mt-6 flex items-center gap-2">
                <Image
                  src={avatarImage}
                  alt="coach_id"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-xs font-medium text-gray-800 md:text-sm">مریم صفدری</span>
              </div>

              {/* Price */}
              <div className="mt-8 flex items-center gap-2">
                <span className="text-lg font-medium text-gray-800">
                  {' '}
                  <span className="font-bold">{filterPriceNumber(price)}</span>
                  {' '}
                  تومان
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Registration Button */}
        {is_have_licence && (
          <div className="absolute left-0 top-8 ">
            <Button className="rounded-l-none rounded-r-lg bg-red-500 px-4 py-2 text-sm text-white shadow-lg hover:bg-red-600">
              دارای گواهی
              <BookCheck />
            </Button>
          </div>
        )}

      </div>
    </Link>

  );
};

export default CourseCardItem;
