/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
'use client';
import type { ICourseTypes } from '@/types/Course';
import { Heart, Star, UserRound, Users } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

import { useState } from 'react';

// import { useCartStore } from '@/_store/Cart';
import sampleImage from '@/public/assets/images/product_placeholder.png';
// Utils
import { filterPriceNumber, truncateDescription } from '@/utils/Helpers';
// import toast from 'react-hot-toast';

import './styles.css';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

// const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || '';

type ICourseItem = {
  // title: string;
  // linkHref: string;
  // imageSrc?: string;
  // courseType: string;
  // score: number;
  // teacher: {
  //   name: string;
  //   user_id: string;
  //   family: string;
  //   _id: string;
  //   __V: string;
  // };
  // participantsCounts: number;
  // price: number;
  isLikedByUser?: boolean;
  course: ICourseTypes;
};

const courseTypeMap: {
  HOZORI: string;
  OFFLINE: string;
} = {
  HOZORI: 'حضوری',
  OFFLINE: 'آنلاین',
};

export default function CourseItem({ course, isLikedByUser = false }: ICourseItem) {
  const [isLikedByUserState, setIsLikedByUserState] = useState(isLikedByUser);

  // const addToCart = useCartStore(state => state.addToCart);

  // const addToCartHandler = (course) => {
  //   // addToCart(course);
  //   toast.success('محصول به سبد خرید شما اضافه شد'); // Displays a success message
  // };

  const tumbnailImageSrc = course?.tumbnail_image && `${NEXT_PUBLIC_SERVER_FILES_URL}/${course?.tumbnail_image?.file_name}`;

  return (
    <div key={course?.id} dir="rtl" className="course-item w-full font-[Yekan_Bakh]">
      <div className="overflow-hidden rounded-md border border-[#e5e5e5] bg-[#f8f8f8] shadow-2xl transition-all duration-300 ease-in-out dark:bg-[#141414]">
        <div className="relative flex items-center justify-center">
          <Link href={`/course/${course?.id}`} className="w-full">
            <Image
              src={tumbnailImageSrc || sampleImage || ''}
              alt={course?.title}
              width={400}
              height={226}
              className="h-auto max-h-[226px] w-full rounded-t-md border-b border-[#e5e5e5] object-cover"
              style={{
                aspectRatio: '400/226',
              }}
            />
          </Link>
          {course?.price_discount && (
            <div
              className="absolute -bottom-[18px] left-5 rounded-full border-4 border-white bg-[#cf741e] p-2 text-xs text-white "
            >
              {/* <ShoppingBasket className="size-5 text-left" /> */}
              تخفیف ویژه
              {' '}
              {filterPriceNumber(course?.price_discount)}
              {' '}
              تومان
            </div>
          )}

          <div className=" absolute bottom-5 right-4 w-14">
            <button type="button" onClick={() => setIsLikedByUserState(!isLikedByUserState)} className="like-button mt-8 translate-y-full rounded-lg px-3 py-2 text-white opacity-0 transition duration-700 ease-in-out">
              <Heart fill={isLikedByUserState ? 'red' : 'none'} strokeWidth={isLikedByUserState ? 0 : 2} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h4 className="mb-1 mt-2 text-[15px] font-bold leading-normal">
              <Link href={`/course/${course?.id}`} className="text-black hover:text-primary">
                {course?.title}
              </Link>
            </h4>

            <h6 className="mb-4 text-xs text-gray-500">
              {course?.sub_title ? truncateDescription(course?.sub_title, 100) : ''}
            </h6>
            {/* <div className="inline-block rounded bg-[#e1dfe2] px-2 py-1 text-xs text-black">
              {courseTypeMap[course?.course_type] || courseTypeMap.HOZORI}
            </div> */}
          </div>

          <div className="mb-4 flex items-center justify-between text-sm">
            <div className="flex translate-y-[7px] flex-col  items-start">
              {/* <div className="text-yellow-400">★★★★★</div> */}
              <div style={{ display: 'flex', gap: '2px', flexDirection: 'row-reverse' }}>
                {Array.from({ length: 5 }, (_, index) => {
                  const starIndex = index + 1;
                  return (
                    <Star
                      key={starIndex}
                      strokeWidth={1}
                      size={18}
                      fill={starIndex <= (course?.score || 0) ? '#facc15' : 'gray'} // Fill based on selection
                      stroke="none"
                    />
                  );
                })}
              </div>
              <span className="mt-3 text-xs text-black">
                بدون امتیاز (
                {(course?.score || 0)}
                {' '}
                رای)
              </span>
            </div>

            {course?.coach_id && (
              <div className="rounded-lg border bg-[#d8e9e9] px-4 py-1.5 text-gray-800 hover:opacity-85">
                <Link href="teacher/teacher.user_id" className="flex items-center text-xs">
                  <UserRound className="ml-1 size-4" />
                  {course?.coach_id?.first_name || ''}
                  {' '}
                  {course?.coach_id?.last_name || ''}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#e1dfe2] py-1.5">
            {/* <div className="flex w-full items-center justify-center text-center text-sm text-black">
              <City className="ml-1 size-4" />
              <span>
               &nbsp; دوره آموزش&nbsp;
                {courseTypeMap[course?.course_type] || courseTypeMap.HOZORI}
              </span>
            </div> */}
          </div>

          <div className=" flex items-center justify-center py-1">
            {/* <div
              className="group relative flex items-center rounded  px-2 py-1 text-sm text-black"
              aria-label="تعداد شرکت کننده"
            >
              <Users color="black" className="ml-2 size-4" />
              <span>
                {(course?.member?.length + 2) || 0}
                {' '}
                /
                {' '}
                {course?.max_member_accept}
              </span>
              <span className="mr-2 text-xs">
                تعداد شرکت کننده
              </span>
            </div> */}
            <div className="flex items-center justify-center text-lg font-bold text-black">
              {course?.price_discount ? (
                <div className="relative">
                  <div className="flex items-center text-base font-medium text-gray-500">
                    {filterPriceNumber(course?.price_real)}
                    <span className="mr-1 text-xs">ریال</span>
                  </div>
                  {/* Custom diagonal line through the original price */}
                  <div className="absolute left-0 top-1/2 h-[1.5px] w-full -rotate-12 bg-red-500"></div>
                </div>
              ) : (
                <div className="flex items-center text-base font-bold text-black">
                  <span className="mr-1 text-sm">قیمت دوره : </span>
                  &nbsp;{filterPriceNumber(course?.price_real)}
                  <span className="mr-1 text-sm">ریال</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start justify-center pt-3">
            <Link href={`/course/${course?.id}`} className="w-full rounded border-b-4 bg-gradient-to-r from-pink-500 to-purple-600 py-3 text-center text-xs font-bold text-white hover:border-purple-300 hover:bg-purple-400">
              شرکت در این دوره آموزشی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
