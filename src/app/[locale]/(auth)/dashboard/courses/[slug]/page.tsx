/* eslint-disable react/no-array-index-key */
'use client';
import { useQuery } from '@tanstack/react-query';
import { Star, Layers } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getSpecificUserCourseFromProfileRequest } from '@/API/course';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useAuth from '@/hooks/useAuth';
import product_placeholder from '@/public/assets/images/product_placeholder.png';
import { ShowSubjectCourse } from '@/sections/dashboard/course/ShowCourseSubject';
import CourseSubjectLessonsList from '@/components/CourseSubjectLessonsList';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

const courseTypeMap: {
  HOZORI: string;
  OFFLINE: string;
} = {
  HOZORI: 'حضوری',
  OFFLINE: 'آنلاین',
};

export default function CoursePage() {
  const { user } = useAuth();

  const [courseState, setcourseState] = useState();

  const { slug } = useParams<{ slug: string }>();
  // console.log({ user, slug });

  if (!slug) {
    notFound();
  }

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ['course', slug],
    queryFn: slug ? () => getSpecificUserCourseFromProfileRequest({ userId: user?.id, courseId: slug }) : undefined,
    enabled: !!slug && !!user,

  });

  // Simulate order data fetching
  useEffect(() => {
    if (data && isSuccess) {
      if (data?.course) {
        setcourseState(data?.course);
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('خطا در دریافت اطلاعات دوره');
      // eslint-disable-next-line no-console
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  if (isError) {
    <div dir="rtl" className="flex w-full items-center justify-center">
      <h3 className="text-sm text-red-600">
        مشکلی در دریافت اطلاعات دوره به وجود آمده است
      </h3>
    </div>;
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div dir="rtl" className=" py-4 text-right">در حال دریافت اطلاعات</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div dir="rtl">
      {courseState && (
        <Card className="mx-auto w-full max-w-none md:max-w-7xl">
          <CardHeader>
            <CardTitle className="text-base md:text-xl">{courseState?.title}</CardTitle>
            <CardDescription className="mt-2  pb-2 text-xs md:text-sm">{courseState?.sub_title}</CardDescription>
            <div className="flex flex-col-reverse justify-center border-t md:flex-row  md:justify-around">
              <div className="mt-4  w-full pt-2 md:w-1/2">

                {/* Score */}
                <div className="mt-1">
                  <div dir="rtl" className="flex w-1/5 flex-row-reverse justify-between">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        strokeWidth={1}
                        size={18}
                        fill={index < (courseState?.score || 0) ? '#facc15' : 'gray'}
                        stroke="none"
                      />
                    ))}
                  </div>
                </div>

                {/* Course Category Badge */}
                <div className="mt-4 text-sm md:text-base">
                  دسته بندی دوره :
                  <span className="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {courseState?.course_category && courseState?.course_category?.name}
                  </span>
                </div>

                {/* Couch Badge */}
                <div className="mt-4 text-sm md:text-base">
                  استاد دوره :
                  <span className="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {courseState?.coach_id && (`${courseState?.coach_id?.name} ${courseState?.coach_id?.family}`)}
                  </span>
                </div>

                {/* course_duration Badge */}
                <div className="mt-4 text-sm md:text-base">
                  زمان دوره :
                  <span className="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {courseState?.course_duration && (`${courseState.course_duration} دقیقه`)}
                  </span>
                </div>

                {/* course course_subject_header Badge */}
                <div className="mt-4 text-sm md:text-base">
                  تعداد سرفصل ها :
                  <span className="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {courseState?.course_subject_header && (`${courseState.course_subject_header} فصل`)}
                  </span>
                </div>

                {/* course course_type Badge */}
                <div className="mt-4 text-sm md:text-base">
                  نوع دوره :
                  <span className="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {courseState?.course_type && (`${courseTypeMap[courseState.course_type]} `)}
                  </span>
                </div>

                {/* course is_have_licence Badge */}
                <div className="mt-4 text-sm md:text-base">
                  گواهی پایان دوره :
                  <span className="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {(courseState?.is_have_licence ? 'دارد' : 'ندارد')}
                  </span>
                </div>
              </div>

              {/* Course Image */}
              <div className="mt-4 w-full md:w-1/2">
                <Image
                  alt={courseState?.tumbnail_image?.file_name || 'Course Image'}
                  // Importing an image will
                  // automatically set the width and height
                  src={courseState?.tumbnail_image?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${courseState?.tumbnail_image?.file_name}` : product_placeholder}

                  width={300}
                  height={300}
                  // Make the image display full width
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                  }}
                />

                <Link href={`/course/${courseState?.id}`}>
                  <Button className="mt-5 flex w-full justify-center" variant="secondary">
                    <h2 className=" text-xs">نمایش صفحه ی دوره برای اطلاعات بیشتر</h2>
                    <Layers className="size-4" />

                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-8 p-2 md:p-4">

            {/* <ShowSubjectCourse course_objects={courseState?.course_objects} /> */}
            <CourseSubjectLessonsList userPermission course_objects={courseState?.course_objects} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
