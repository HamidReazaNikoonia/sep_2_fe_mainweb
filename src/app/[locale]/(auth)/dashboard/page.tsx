'use client';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, Heart, Logs, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
// API
import { getUserProfileRequest } from '@/API/auth';
import LoadingSpinner from '@/components/LoadingSpiner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import useAuth from '@/hooks/useAuth';
import { toPersianDigits } from '@/utils/Helpers';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

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

      {/* Referal Code */}
      <div className="mb-4 flex items-center justify-end space-x-3 rounded-lg bg-gray-100 p-4">
        <div className="flex flex-col items-end">
          <h1 className="text-base font-medium">کد معرف شما</h1>
          <p className="text-sm font-semibold text-gray-500">{ user?.referral_code }</p>
        </div>
        <Button variant="outline" onClick={copyReferalCodeToClipboard}>
          <Copy className="size-3" />
        </Button>
      </div>

      <div dir="rtl" className="grid grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">

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

        {/* Courses Session Program */}

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
    </div>
  );
}
