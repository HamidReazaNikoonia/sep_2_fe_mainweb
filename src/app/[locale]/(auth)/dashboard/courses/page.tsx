'use client';
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { ICourseTypes } from "@/types/Course";

// API
import {getUserProfileRequest} from "@/API/auth";


// const courses = [
//   {
//     id: "1",
//     title: "مبانی توسعه وب",
//     description: "یادگیری اصول HTML، CSS و JavaScript",
//     progress: 75,
//   },
//   {
//     id: "2",
//     title: "تکنیک‌های پیشرفته React",
//     description: "تسلط بر مفاهیم پیشرفته در توسعه React",
//     progress: 30,
//   },
//   {
//     id: "3",
//     title: "تسلط بر Node.js و Express",
//     description: "ساخت برنامه‌های قدرتمند سمت سرور با Node.js و Express",
//     progress: 0,
//   },
// ]

// const isClient = typeof window !== 'undefined';

export default function CoursesPage() {

  const [courses, setCourses] = useState([])

  const { user } = useAuth();

  console.log({userL: user})

  const { data: profileData, isLoading: profileIsLoading, isError: profileIsError, error: profileError, isSuccess: profileIsSuccess } = useQuery({
    // @ts-expect-error
    queryKey: ['profile', user?.id],
    // @ts-expect-error
    queryFn: user ? () => getUserProfileRequest({ userId: user.id }) : undefined,
    enabled: !!user  // Prevents query execution when user is null
  })


  useEffect(() => {
    console.log('profileData---->', user)
    if (profileData && profileData?.courses) {
      console.log(profileData.courses)

      setCourses(profileData.courses);
    }
  }, [profileIsSuccess, profileData])



  if (profileIsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>دوره ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">در حال دریافت اطلاعات...</div>
        </CardContent>
      </Card>
    )
  }

  if (profileIsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">
            خطا در دریافت اطلاعات: {profileError?.message}
          </div>
        </CardContent>
      </Card>
    )
  }


  return (
    <div dir="rtl" className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 md:px-8 pb-12">
      {courses?.length > 0 && courses.map((course: ICourseTypes) => (
        <Card key={course._id} className="flex flex-col p-0">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.sub_title}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${30}%` }}></div>
              </div>
              <span className="text-sm pr-2 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                ٪{30}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/dashboard/courses/${course._id}`}>مشاهده دوره</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

