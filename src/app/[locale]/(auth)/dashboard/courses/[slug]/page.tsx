'use client';
import { notFound, useParams } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'

import { Heart, ShoppingBasket, Users, Languages, Timer, Cast, Copy, BookAudio, Scroll, Calendar, Star, FolderClosed } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSpecificUserCourseRequest } from "@/API/course";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpiner";

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';


import product_placeholder from "@/public/assets/images/product_placeholder.png";
import {Button} from "@/components/ui/button";
import { ShowSubjectCourse } from "@/sections/dashboard/course/ShowCourseSubject";


const courseTypeMap: {
  HOZORI: string;
  OFFLINE: string;
} = {
  HOZORI: 'حضوری',
  OFFLINE: 'آنلاین'
}

export default function CoursePage() {


  const [courseState, setcourseState] = useState();




  const { slug } = useParams<{ slug: string }>()
  console.log({ slug });

  if (!slug) {
    notFound()
  }


  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ['course', slug],
    queryFn: slug ? () => getSpecificUserCourseRequest({ courseId: slug }) : undefined,
    enabled: !!slug,

  })

  // Simulate order data fetching
  useEffect(() => {
    if (data && isSuccess) {
      if (data?._id) {
        setcourseState(data);
      }


    }


  }, [data, isSuccess]);



  useEffect(() => {
    if (isError) {
      toast.error('خطا در دریافت اطلاعات دوره');
      console.log(error);
    }
  }, [isError]);



  if (isError) {
    <div dir="rtl" className="flex justify-center items-center w-full">
      <h3 className="text-sm text-red-600">
        مشکلی در دریافت اطلاعات دوره به وجود آمده است
      </h3>
    </div>
  }


  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div dir="rtl" className=" text-right py-4" >در حال دریافت اطلاعات</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div dir="rtl">
      {courseState && (
        <Card className="w-full max-w-none md:max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{courseState?.title}</CardTitle>
            <CardDescription className="text-sm  md:text-base mt-2 pb-2">{courseState?.sub_title}</CardDescription>
            <div className="flex flex-col-reverse md:flex-row border-t justify-center  md:justify-around">
              <div className="mt-4  pt-2 w-full md:w-1/2">

                {/* Score */}
                <div className="mt-1">
                  <div dir="rtl" className='flex flex-row-reverse justify-between w-1/5'>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        strokeWidth={1}
                        size={18}
                        fill={index < (courseState?.score || 0) ? "#facc15" : "gray"}
                        stroke="none"
                      />
                    ))}
                  </div>
                </div>


                {/* Course Category Badge */}
                <div className="text-sm md:text-base mt-4">
                  دسته بندی دوره :
                  <span className="inline-flex items-center mr-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {courseState?.course_category && courseState?.course_category?.name}
                  </span>
                </div>


                {/* Couch Badge */}
                <div className="text-sm md:text-base mt-4">
                  استاد دوره :
                  <span className="inline-flex items-center mr-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {courseState?.coach_id && (`${courseState?.coach_id?.name} ${courseState?.coach_id?.family}`)}
                  </span>
                </div>


                {/* course_duration Badge */}
                <div className="text-sm md:text-base mt-4">
                  زمان دوره :
                  <span className="inline-flex items-center mr-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {courseState?.course_duration && (`${courseState.course_duration} دقیقه`)}
                  </span>
                </div>


                {/* course course_subject_header Badge */}
                <div className="text-sm md:text-base mt-4">
                  تعداد سرفصل ها :
                  <span className="inline-flex items-center mr-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {courseState?.course_subject_header && (`${courseState.course_subject_header} فصل`)}
                  </span>
                </div>


                {/* course course_type Badge */}
                <div className="text-sm md:text-base mt-4">
                  نوع دوره :
                  <span className="inline-flex items-center mr-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {courseState?.course_type && (`${courseTypeMap[courseState.course_type]} `)}
                  </span>
                </div>


                {/* course is_have_licence Badge */}
                <div className="text-sm md:text-base mt-4">
                  گواهی پایان دوره :
                  <span className="inline-flex items-center mr-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {(courseState?.is_have_licence ? 'دارد' : 'ندارد')}
                  </span>
                </div>


              </div>


              {/* Course Image */}
              <div className="mt-4 w-full md:w-1/2">
                <Image
                  alt="Mountains"
                  // Importing an image will
                  // automatically set the width and height
                  src={courseState?.tumbnail_image?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${courseState?.tumbnail_image?.file_name}` : product_placeholder}

                  width={300}
                  height={300}
                  // Make the image display full width
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: "20px"
                  }}
                />

                
                <Link href={`/course/${courseState?._id}`}>
                <Button className="flex justify-center w-full mt-5" variant="secondary">
                <h2 className=" text-xs">نمایش صفحه ی دوره برای اطلاعات بیشتر</h2>

                </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-8 p-2 md:p-4">

                  <ShowSubjectCourse course_objects={courseState?.course_objects} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

