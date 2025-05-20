'use client';
import LoadingSpinner from "@/components/LoadingSpiner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { Heart, Logs, GraduationCap } from 'lucide-react';

// API
import { getUserProfileRequest } from "@/API/auth";
import { toPersianDigits } from "@/utils/Helpers";

export default function DashboardPage() {

  const { user } = useAuth();

  const [profileDataState, setProfileData] = useState({
    courseCount: 0,
    orderCount: 0,
    favorites: 0
  })

  const { data: profileData, isLoading: profileIsLoading, isError: profileIsError, error: profileError, isSuccess: profileIsSuccess } = useQuery({
    // @ts-expect-error
    queryKey: ['profile', user?.id],
    // @ts-expect-error
    queryFn: user ? () => getUserProfileRequest({ userId: user.id }) : undefined,
    enabled: !!user  // Prevents query execution when user is null
  })


  useEffect(() => {

    if (profileData && profileData?.profile) {

      setProfileData({
        courseCount: Array.isArray(profileData.courses) ? profileData.courses.length : 0,
        orderCount: Array.isArray(profileData.orders) ? profileData.orders.length : 0,
        favorites: 0
      })
    }
  }, [profileIsSuccess, profileData])




  // Show a loading spinner or nothing while checking authentication
  if (profileIsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div dir="rtl" className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 pb-12 md:px-8">
      
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">کل سفارشات</CardTitle>
          <Logs size={18} color="gray" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {profileDataState.orderCount && toPersianDigits(profileDataState.orderCount.toString())}
          </div>
          {/* <p className="text-xs text-muted-foreground">۲+ از ماه گذشته</p> */}
        </CardContent>
      </Card>
      
      
    {/* Courses */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">دوره‌های ثبت‌نام شده</CardTitle>
          <GraduationCap size={18} color="gray" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
          {profileDataState.courseCount && toPersianDigits(profileDataState.courseCount.toString())}
          </div>
          {/* <p className="text-xs text-muted-foreground">۱+ از ماه گذشته</p> */}
        </CardContent>
      </Card>


        {/* FAV */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">علاقه‌مندی‌ها</CardTitle>
          <Heart size={18} color="gray" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
          {profileDataState.favorites && toPersianDigits(profileDataState.favorites.toString())}
          </div>
          {/* <p className="text-xs text-muted-foreground">۳+ از هفته گذشته</p> */}
        </CardContent>
      </Card>
    </div>
  )
}

