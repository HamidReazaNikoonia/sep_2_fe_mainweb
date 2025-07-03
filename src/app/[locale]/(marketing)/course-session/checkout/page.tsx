'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpiner';
import useAuth from '@/hooks/useAuth';

export default function CourseSessionCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, userProfileData, isLoading, isUserCompleteProfile } = useAuth();

  // Get query parameters
  const programId = searchParams.get('programId');
  const packageIds = searchParams.get('packageIds')?.split(',');

  useEffect(() => {
    // console.log('programId', userProfileData);
    // Validate query parameters
    if (!programId || !packageIds?.length) {
      toast.error('مشکلی پیش اومده');
      router.push('/');
      return;
    }

    if (!isLoading) {
      // Check authentication
      if (!isAuthenticated) {
        toast.error('شما باید لاگین کنید');
        router.push('/sign-in');
        return;
      }

      if (!isUserCompleteProfile) {
        toast.error('لطفا پروفایل خود را کامل کنید');
        router.push('/dashboard/user-profile');
      }
    }

    // Check user profile completion
  }, [isAuthenticated, userProfileData, programId, isUserCompleteProfile, packageIds, router, isLoading]);

  // If all validations pass, render the checkout content
  return (
    <div className="min-h-screen w-full overflow-hidden bg-black pt-20 text-white" dir="rtl">
      {isLoading && <LoadingSpinner />}
      test aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
  );
}
