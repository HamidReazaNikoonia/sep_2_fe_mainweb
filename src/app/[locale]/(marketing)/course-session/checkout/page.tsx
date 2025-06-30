'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function CourseSessionCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, userProfileData } = useAuth();

  // Get query parameters
  const programId = searchParams.get('programId');
  const packageIds = searchParams.get('packageIds')?.split(',');

  useEffect(() => {
    // Validate query parameters
    if (!programId || !packageIds?.length) {
      toast.error('مشکلی پیش اومده');
      router.push('/');
      return;
    }

    // Check authentication
    if (!isAuthenticated) {
      toast.error('شما باید لاگین کنید');
      router.push('/sign-in');
      return;
    }

    // Check user profile completion
    if (!userProfileData) {
      toast.error('لطفا پروفایل خود را کامل کنید');
      router.push('/dashboard/user-profile');
    }
  }, [isAuthenticated, userProfileData, programId, packageIds, router]);

  // If all validations pass, render the checkout content
  return (
    <div>
      {/* Your checkout page content goes here */}
      test
    </div>
  );
}
