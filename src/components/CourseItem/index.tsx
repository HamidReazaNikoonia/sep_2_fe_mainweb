'use client'
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBasket, Users, MapIcon as City, UserRound, Heart, Star } from 'lucide-react'

import {useCartStore} from '@/_store/Cart';

// Utils
import {filterPriceNumber} from '@/utils/Helpers';

import "./styles.css";
import { ICourseTypes } from '@/types/Course';
import toast from 'react-hot-toast';

// const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || '';


type CourseItem = {
  title: string;
  linkHref: string;
  imageSrc?: string;
  courseType: string;
  score: number;
  teacher: {
    name: string;
    user_id: string;
    family: string;
    _id: string;
    "__V": string;
  };
  participantsCounts: number;
  price: number;
  isLikedByUser?: boolean;
  course: ICourseTypes
}

const courseTypeMap: {
  HOZORI: string;
  OFFLINE: string;
} = {
  HOZORI: 'حضوری',
  OFFLINE : 'آنلاین'
}

export default function CourseItem({ course, title, linkHref, imageSrc, courseType, score, teacher, participantsCounts, price, isLikedByUser = false }: CourseItem) {

  const [isLikedByUserState, setIsLikedByUserState] = useState(isLikedByUser);

  const addToCart = useCartStore(state => state.addToCart)


  const addToCartHandler = (course) => {
    addToCart(course);
    toast.success('محصول به سبد خرید شما اضافه شد'); // Displays a success message

  }

  return (
    <div dir="rtl" className=" w-full md:w-3/6 lg:w-2/6 mb-6 px-4 mb-7.5 font-[Yekan_Bakh] course-item">
      <div className="bg-[#f8f8f8] dark:bg-[#141414] border border-[#e5e5e5] rounded-md shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
        <div className="relative flex items-center justify-center">
          <Link href={linkHref} className="w-full">
            <Image
              src={imageSrc || ''}
              alt={title}
              width={600}
              height={338}
              className="w-full rounded-t-md border-b border-[#e5e5e5]"
            />
          </Link>
          <div
            onClick={() => addToCartHandler(course)}
            className="absolute -bottom-[18px] left-5 bg-[#4CAF50] text-white p-2 rounded-full border-4 border-white "
          >
            <ShoppingBasket className="w-5 h-5 text-left" />
          </div>
          <div className=' absolute bottom-5 right-4 w-14'>
            <button onClick={() => setIsLikedByUserState(!isLikedByUserState)} className='translate-y-full opacity-0 text-white rounded-lg duration-700 transition ease-in-out py-2 px-3 mt-8 like-button'>
              <Heart fill={isLikedByUserState ? 'red' : 'none'} strokeWidth={isLikedByUserState ? 0 : 2} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h4 className="text-[15px] font-bold mb-2 leading-normal">
              <Link href={linkHref} className="text-black hover:text-primary">
                {title}
              </Link>
            </h4>
            <div className="inline-block bg-primary text-white text-sm px-2 py-1 rounded">
              {courseTypeMap[courseType] || courseTypeMap["HOZORI"]}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex flex-col items-start  transform translate-y-[7px]">
              {/* <div className="text-yellow-400">★★★★★</div> */}
              <div style={{ display: "flex", gap: "2px", flexDirection: 'row-reverse' }}>
                {Array.from({ length: 5 }, (_, index) => {
                  const starIndex = index + 1;
                  return (
                    <Star
                      key={starIndex}
                      strokeWidth={1}
                      size={18}
                      fill={starIndex <= score ? "#facc15" : "gray"} // Fill based on selection
                      stroke="none"
                    />
                  );
                })}
              </div>
              <span className="text-black text-xs mt-3">بدون امتیاز ({score} رای)</span>
            </div>
            <div className="border bg-[#6E0072] hover:opacity-85 text-white px-4 py-1.5 rounded-lg">
              <Link href={`teacher/teacher.user_id`} className="flex items-center text-xs">
                <UserRound className="w-4 h-4 ml-1" />
                {/* {`${teacher.name} ${teacher.family}`} */}
                مریم صفدری
              </Link>
            </div>
          </div>

          <div className="border-t border-[#6e0072] py-2.5 flex items-center justify-between">
            <div className="flex items-center text-white text-sm text-center w-full justify-center">
              <City className="w-4 h-4 ml-1" />
              <span>دوره آموزش {courseTypeMap[courseType] || courseTypeMap["HOZORI"]}</span>
            </div>
          </div>

          <div className=" py-2 flex items-center justify-between">
            <div
              className="flex items-center text-sm text-[#6c757d] bg-[#6E0072] px-2 py-1 rounded relative group"
              aria-label="تعداد شرکت کننده"
            >
              <Users className="w-4 h-4 ml-2" />
              <span>{participantsCounts}</span>
              <div className="absolute bottom-full right-1/2 transform translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 mb-1">
                <div className="bg-[#383838] text-black text-xs py-2 px-2.5 rounded whitespace-nowrap relative">
                  تعداد شرکت کننده
                  <div className="absolute top-full right-1/2 transform translate-x-1/2 border-8 border-transparent border-t-[#383838]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-base font-bold text-black">
              {filterPriceNumber(price)}<span className="text-sm mr-1">تومان</span>
            </div>
          </div>

          <div className='flex pt-3 items-start justify-center'>
            <Link href={linkHref} className="bg-green-500 w-full text-xs text-center hover:bg-green-400 text-white font-bold py-3 border-b-4 border-green-700 hover:border-green-500 rounded">
              شرکت در این دوره آموزشی
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}