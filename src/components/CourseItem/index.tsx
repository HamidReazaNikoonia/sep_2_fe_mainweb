/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
'use client';
import type { ICourseTypes } from '@/types/Course';
// import { useCartStore } from '@/_store/Cart';
import sampleImage from '@/public/assets/images/product_placeholder.png';
import { MapIcon as City, Heart, ShoppingBasket, Star, UserRound, Users } from 'lucide-react';

import Image from 'next/image';

import Link from 'next/link';

import { useState } from 'react';
// Utils
import { filterPriceNumber } from '@/utils/Helpers';
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
    <div dir="rtl" className=" mb-7.5  course-item mb-6 w-full px-2 font-[Yekan_Bakh]">
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
          <div
            className="absolute -bottom-[18px] left-5 rounded-full border-4 border-white bg-[#cf741e] p-2 text-sm text-white "
          >
            {/* <ShoppingBasket className="size-5 text-left" /> */}
            تخفیف ویژه
          </div>
          <div className=" absolute bottom-5 right-4 w-14">
            <button type="button" onClick={() => setIsLikedByUserState(!isLikedByUserState)} className="like-button mt-8 translate-y-full rounded-lg px-3 py-2 text-white opacity-0 transition duration-700 ease-in-out">
              <Heart fill={isLikedByUserState ? 'red' : 'none'} strokeWidth={isLikedByUserState ? 0 : 2} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h4 className="mb-2 text-[15px] font-bold leading-normal">
              <Link href={`/course/${course?.id}`} className="text-black hover:text-primary">
                {course?.title}
              </Link>
            </h4>
            <div className="inline-block rounded bg-[#e1dfe2] px-2 py-1 text-xs text-black">
              {courseTypeMap[course?.course_type] || courseTypeMap.HOZORI}
            </div>
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
            <div className="rounded-lg border bg-[#6E0072] px-4 py-1.5 text-white hover:opacity-85">
              <Link href="teacher/teacher.user_id" className="flex items-center text-xs">
                <UserRound className="ml-1 size-4" />
                {/* {`${teacher.name} ${teacher.family}`} */}
                مریم صفدری
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#e1dfe2] py-2.5">
            <div className="flex w-full items-center justify-center text-center text-sm text-black">
              <City className="ml-1 size-4" />
              <span>
               &nbsp; دوره آموزش&nbsp;
                {courseTypeMap[course?.course_type] || courseTypeMap.HOZORI}
              </span>
            </div>
          </div>

          <div className=" flex items-center justify-between py-2">
            <div
              className="group relative flex items-center rounded bg-[#d8e9e9] px-2 py-1 text-sm text-black"
              aria-label="تعداد شرکت کننده"
            >
              <Users color="black" className="ml-2 size-4" />
              <span>
                {course?.member?.length || 0}
                {' '}
                /
                {' '}
                {course?.max_member_accept}
              </span>
              <span className="mr-2 text-xs">
                تعداد شرکت کننده
              </span>
              {/* <div className="absolute bottom-full z-30 right-8 transform translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 mb-1">
                <div className="bg-[#383838] text-white text-xs py-2 px-2.5 rounded whitespace-nowrap relative">
                  تعداد شرکت کننده
                  <div className="absolute top-full right-1/2 transform translate-x-1/2 border-8 border-transparent border-t-[#383838]"></div>
                </div>
              </div> */}
            </div>
            <div className="flex items-center text-base font-bold text-black">
              {filterPriceNumber(course?.price)}
              <span className="mr-1 text-sm">تومان</span>
            </div>
          </div>

          <div className="flex items-start justify-center pt-3">
            <Link href={`/course/${course?.id}`} className="w-full rounded border-b-4 border-green-700 bg-green-500 py-3 text-center text-xs font-bold text-white hover:border-green-500 hover:bg-green-400">
              شرکت در این دوره آموزشی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
