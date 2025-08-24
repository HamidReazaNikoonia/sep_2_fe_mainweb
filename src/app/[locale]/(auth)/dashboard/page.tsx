/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import { useQuery } from '@tanstack/react-query';
import { CircleUserRound, Copy, GraduationCap, Heart, Logs, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// API
import { getUserProfileRequest } from '@/API/auth';

import LoadingSpinner from '@/components/LoadingSpiner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import { toPersianDigits } from '@/utils/Helpers';

export default function DashboardPage() {
  const { user } = useAuth();

  const [profileDataState, setProfileData] = useState({
    courseCount: 0,
    courseSessionCount: 0,
    orderCount: 0,
    favorites: 0,
  });

  const { data: profileData, isLoading: profileIsLoading, isError: profileIsError, error: profileError, isSuccess: profileIsSuccess } = useQuery({
    // @ts-expect-error
    queryKey: ['profile', user?.id],
    // @ts-expect-error
    queryFn: user ? () => getUserProfileRequest({ userId: user.id }) : undefined,
    enabled: !!user, // Prevents query execution when user is null
  });

  useEffect(() => {
    console.log(profileData, 'profileData');

    if (profileData && profileData?.profile) {
      setProfileData({
        courseCount: Array.isArray(profileData.courses) ? profileData.courses.length : 0,
        courseSessionCount: Array.isArray(profileData?.profile?.course_session_program_enrollments) ? profileData.profile.course_session_program_enrollments.length : 0,
        orderCount: Array.isArray(profileData.orders) ? profileData.orders.length : 0,
        favorites: 0,
      });
    }
  }, [profileIsSuccess, profileData]);

  const copyReferalCodeToClipboard = () => {
    navigator.clipboard.writeText(user?.referral_code || '');
    toast.success('کد معرف شما کپی شد');
  };

  // Show a loading spinner or nothing while checking authentication
  if (profileIsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="w-full">

      {/* Header Information section */}
      <div className="mb-4 flex flex-col-reverse items-start justify-between space-x-3 rounded-lg bg-gray-100 p-4 md:flex-row-reverse md:items-center">
        {/* Referal Code */}
        <div className="mt-6 flex items-center gap-2 text-right md:mt-0">
          <Button className="size-8" variant="outline" onClick={copyReferalCodeToClipboard}>
            <Copy className="size-2" />
          </Button>
          <div className="items-strat flex flex-col">
            <h1 className="text-[11px] font-medium md:text-xs">کد معرف شما</h1>
            <p className="text-[11px] font-semibold text-gray-500 md:text-xs">{ user?.referral_code }</p>
          </div>
        </div>

        {/* Student Status & Wallet balance */}
        <div className="flex items-center gap-2 text-right md:gap-6">
          <div className="flex flex-col items-start gap-2 text-right ">
            <div className="flex items-center gap-2">
              <GraduationCap size={17} color="#545454" />
              <h1 className="text-[11px] font-medium md:text-xs">شماره دانشجویی</h1>
            </div>
            <p className="text-[11px] font-medium text-gray-500 md:text-sm">{ user?.student_id ? toPersianDigits(user?.student_id.toString()) : 'ندارد' }</p>
          </div>

          <div className="flex flex-col items-start gap-2 border-r border-gray-300 pr-2 text-right md:pr-4">
            <div className="flex items-center gap-2">
              <Wallet size={16} color="#545454" />
              <h1 className="text-[11px] font-medium md:text-xs">موجودی کیف پول</h1>
            </div>
            <span className="text-rigth w-full text-[11px] font-medium text-gray-500 md:text-xs">
              {user?.wallet?.amount ? user?.wallet?.amount?.toLocaleString('fa-IR') : (0).toLocaleString('fa-IR')}
              {' '}
              تومان
            </span>
          </div>
        </div>

      </div>
      <div className="mb-6 mt-4 flex gap-4">

        <Link href="/dashboard/user-profile" className="w-full">
          <div className="flex w-full cursor-pointer flex-row gap-2 rounded-xl border border-white/10 bg-white p-4 backdrop-blur-sm md:gap-3">
            <CircleUserRound size={40} className="text-gray-400" />
            <div className="flex flex-col gap-2">
              <h1 className="text-xs font-bold md:text-sm">مشاهده پروفایل کاربری</h1>
              <p className="text-[10px] text-gray-500 md:text-xs">ثبت مشخصات کاربری و ارسال مدارک هویتی</p>
            </div>

          </div>
        </Link>

      </div>

      <div dir="rtl" className="grid grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">

        <Link href="/dashboard/orders" className="w-full">
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
        </Link>

        {/* Courses */}

        <Link href="/dashboard/courses" className="w-full">
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
        </Link>

        {/* Courses Session Program */}

        <Link href="/dashboard/course-session" className="w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">کلاس های ثبت‌نام شده</CardTitle>
              <GraduationCap size={18} color="gray" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profileDataState.courseSessionCount && toPersianDigits(profileDataState.courseSessionCount.toString())}
              </div>
              {/* <p className="text-xs text-muted-foreground">۱+ از ماه گذشته</p> */}
            </CardContent>
          </Card>
        </Link>

        {/* FAV */}
        <Link href="/dashboard/favorites" className="w-full">
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
        </Link>
      </div>
    </div>
  );
}
