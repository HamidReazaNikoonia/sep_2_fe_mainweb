'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { calculateOrderSummaryRequest } from '@/API/order/courseSession';
import LoadingSpinner from '@/components/LoadingSpiner';
import useAuth from '@/hooks/useAuth';
import { CourseSessioonProgramHelper } from '@/utils/CourseSession';
import { convertDateToPersian } from '@/utils/Helpers';

export default function CourseSessionCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, userProfileData, isLoading, isUserCompleteProfile } = useAuth();

  // Get query parameters
  const programId = searchParams.get('programId');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const packageIds = searchParams.get('packageIds')?.split(',') || [];

  // Using useQuery directly in the component
  // const { data, isLoading: isProgramLoading, isError: isProgramError, error: programError, isSuccess } = useQuery({
  //   queryKey: ['courseSessionProgram', programId],
  //   queryFn: programId ? () => getCourseSessionProgramByIdRequest({ programId }) : undefined,
  //   enabled: !!programId,
  // });

  const { data: orderSummaryData, isLoading: isOrderSummaryLoading, isSuccess: isOrderSummarySuccess } = useQuery({
    queryKey: ['orderSummary', programId],
    queryFn: () => calculateOrderSummaryRequest({
      classProgramId: programId as string,
      packages: packageIds,
    }),
    enabled: !!programId,
    staleTime: 0,
  });

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

  // API API
  // useEffect(() => {
  //   if (isProgramError) {
  //     toast.error('خطا در دریافت اطلاعات برنامه');
  //     // eslint-disable-next-line no-console
  //     console.log('programError', programError);
  //   }

  //   if (isSuccess) {
  //     // eslint-disable-next-line no-console
  //     console.log('data', data);
  //   }
  // }, [isProgramError, isSuccess, data, programError]);

  // Calculate total price including packages
  const calculateTotalPrice = (basePrice: number, selectedPackages: Array<{ price: number }>) => {
    const packagesTotal = selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
    return basePrice + packagesTotal;
  };

  // Get first session date
  const firstSessionDate = orderSummaryData?.program ? CourseSessioonProgramHelper(orderSummaryData?.program).getFirstSessionDate() : null;

  const courseProgramData = orderSummaryData?.program;

  const submitOrderAndNavigateToPayment = () => {
    // eslint-disable-next-line no-console
    console.log('submitOrderAndNavigateToPayment');

    // we should navigate user to thhe bank
  };

  // If all validations pass, render the checkout content
  return (
    <div className="min-h-screen w-full overflow-hidden bg-black pt-20 text-white" dir="rtl">
      {(isLoading || isOrderSummaryLoading) && <LoadingSpinner />}
      {isOrderSummarySuccess && orderSummaryData?.program && (
        <div className="mx-auto my-8 max-w-2xl p-6">
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-400">* *  فاکتور سفارش * *</h2>

            {/* Course Information */}
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h3 className="mb-12 text-xl font-semibold">اطلاعات دوره</h3>
              {courseProgramData?.course
                ? (
                    <>
                      <p className="mb-1 text-lg text-gray-300">{courseProgramData?.course?.title}</p>
                      <p className="text-sm text-gray-400">{courseProgramData?.course?.sub_title}</p>
                    </>
                  )
                : (
                    <p className="text-yellow-500">اطلاعات دوره موجود نیست</p>
                  )}
            </div>

            {/* First Session Date */}
            {firstSessionDate && (
              <div className="mb-6 border-b border-gray-600 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-300">شروع دوره از:</h3>
                  <span style={{ letterSpacing: '2px' }} className="rounded-2xl border border-green-600/20 px-4 py-2 text-lg font-medium text-white">
                    {convertDateToPersian(firstSessionDate)}
                  </span>
                </div>
              </div>
            )}

            {/* Coach Information */}
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h3 className="mb-2 text-lg font-medium">مدرس</h3>
              <p className="text-base text-gray-300">{`${courseProgramData?.coach?.first_name} ${courseProgramData?.coach?.last_name}`}</p>
            </div>

            {/* Price Information */}
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h3 className="mb-4 text-lg font-medium">قیمت دوره</h3>
              <div className="flex items-center justify-between">
                <span>قیمت اصلی:</span>
                <span className={courseProgramData?.price_discounted ? 'text-gray-400 line-through' : ''}>
                  {courseProgramData?.price_real.toLocaleString('fa-IR')}
                  {' '}
                  ریال
                </span>
              </div>
              {courseProgramData?.price_discounted && (
                <div className="mt-2 flex items-center justify-between text-green-400">
                  <span>قیمت با تخفیف:</span>
                  <span style={{ letterSpacing: '1px' }}>
                    {courseProgramData?.price_discounted.toLocaleString('fa-IR')}
                    ریال
                  </span>
                </div>
              )}
            </div>

            {/* Packages Information */}
            {courseProgramData?.packages && courseProgramData?.packages.length > 0 && (
              <div className="mb-6 border-b border-gray-600 pb-4">
                <h3 className="mb-4 text-xl font-medium">پکیج‌های انتخاب شده</h3>
                {courseProgramData?.packages.map((pkg: any) => (
                  <div key={pkg._id} className="mb-2 flex items-center justify-between text-sm md:text-base">
                    <span>{pkg.title}</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {pkg.price.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price */}
            <div className="mt-6">
              <div className="flex flex-col items-center justify-between text-base font-normal md:text-xl">
                <div className="mb-4 flex w-full flex-col gap-2">
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>قیمت نهایی دوره:</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {orderSummaryData.summary?.originalAmount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  {orderSummaryData.summary?.totalPackagePrice > 0 && (
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>  جمع پکیج ها:</span>
                      <span style={{ letterSpacing: '1px' }}>
                        {orderSummaryData.summary?.totalPackagePrice.toLocaleString('fa-IR')}
                        {' '}
                        ریال
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-red-400">
                    <span>جمع تخفیف‌ها:</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.totalDiscount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>مالیات:</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.tax.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-base font-medium text-green-400">
                    <span>جمع کل:</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.finalAmount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex w-full items-center justify-between border-t border-gray-600 pt-6 text-base font-semibold md:text-xl">
                  <span>مجموع قابل پرداخت : </span>
                  <span style={{ letterSpacing: '1px' }} className="rounded-2xl  bg-green-600/20 px-4 py-2">
                    {orderSummaryData?.summary?.finalAmount.toLocaleString('fa-IR')}
                    {' '}
                    ریال
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              className="mt-12 w-full rounded-lg bg-purple-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
              onClick={submitOrderAndNavigateToPayment}
            >
              ادامه فرآیند پرداخت
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
