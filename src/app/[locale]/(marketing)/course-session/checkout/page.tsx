/* eslint-disable style/jsx-one-expression-per-line */
'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Book, Calendar, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { calculateOrderSummaryRequest } from '@/API/order/courseSession';
import CouponInput from '@/components/CouponInput';
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

  // State for applied coupon codes
  const [appliedCouponCodes, setAppliedCouponCodes] = useState<string[]>([]);

  const { data: orderSummaryData, isLoading: isOrderSummaryLoading, isSuccess: isOrderSummarySuccess, refetch } = useQuery({
    queryKey: ['orderSummary', programId, appliedCouponCodes],
    queryFn: () => calculateOrderSummaryRequest({
      classProgramId: programId as string,
      packages: packageIds,
      couponCodes: appliedCouponCodes,
    }),
    enabled: !!programId,
    staleTime: 0,
  });

  useEffect(() => {
    // Validate query parameters
    if (!programId) {
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
  }, [isAuthenticated, userProfileData, programId, isUserCompleteProfile, packageIds, router, isLoading]);

  // Get first session date
  const firstSessionDate = orderSummaryData?.program ? CourseSessioonProgramHelper(orderSummaryData?.program).getFirstSessionDate() : null;

  const courseProgramData = orderSummaryData?.program;

  // Validate coupon code format (English letters, numbers, and hyphens)
  const validateCouponFormat = (code: string): boolean => {
    // eslint-disable-next-line regexp/use-ignore-case
    const englishFormatRegex = /^[A-Za-z0-9-]+$/;
    return englishFormatRegex.test(code);
  };

  const applyCouponCodeHandler = async (code: string): Promise<boolean> => {
    try {
      // Validate coupon code format
      if (!validateCouponFormat(code)) {
        toast.error('کد تخفیف باید شامل حروف انگلیسی، اعداد و خط تیره باشد');
        return false;
      }

      // Check if coupon is already applied
      if (appliedCouponCodes.includes(code)) {
        toast.error('این کد تخفیف قبلاً اعمال شده است');
        return false;
      }

      // eslint-disable-next-line no-console
      console.log('Applying coupon code:', code);

      // Add coupon code to applied codes and trigger refetch
      setAppliedCouponCodes(prev => [...prev, code]);

      // Wait a bit for the state to update and then refetch
      const refetchResult = await new Promise<boolean>((resolve) => {
        setTimeout(async () => {
          const result = await refetch();
          // eslint-disable-next-line no-console
          console.log('result', result);
          const coupons = result?.data?.coupons;
          // Check if the coupon was valid based on server response
          const isValid = coupons?.valid?.some((validCoupon: any) => validCoupon.code === code);
          const isInvalid = coupons?.invalid?.some((invalidCoupon: any) => invalidCoupon.code === code);
          // console.log('isValid', isValid);
          // console.log('isInvalid', isInvalid);
          if (isValid) {
            toast.success('کد تخفیف با موفقیت اعمال شد');
            resolve(true);
          } else if (isInvalid) {
            toast.error('کد تخفیف نامعتبر است');
            // Remove the invalid coupon from applied codes
            setAppliedCouponCodes(prev => prev.filter(c => c !== code));
            resolve(false);
          } else {
            // Fallback for unexpected cases
            toast.error('خطا در اعمال کد تخفیف');
            setAppliedCouponCodes(prev => prev.filter(c => c !== code));
            resolve(false);
          }
        }, 100);
      });

      return refetchResult;
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('خطا در اعمال کد تخفیف');
      // Remove the coupon from applied codes on error
      setAppliedCouponCodes(prev => prev.filter(c => c !== code));
      return false;
    }
  };

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
        <div className="mx-auto my-8 max-w-4xl px-3 py-2 md:px-6">
          <div className="rounded-lg bg-gray-800 px-4 py-6 shadow-lg md:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-400">* *  فاکتور سفارش * *</h2>

            {/* Course Information */}
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h3 className="mb-12 flex items-center gap-2 text-xl font-semibold">
                <Book className="size-6" />
                اطلاعات دوره
              </h3>
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
                  <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 md:text-lg">
                    <Calendar className="size-5 md:size-6" />
                    شروع دوره از:
                  </h3>
                  <span style={{ letterSpacing: '2px' }} className="rounded-2xl border border-green-600/20 px-4 py-2 text-sm font-medium text-white md:text-lg">
                    {convertDateToPersian(firstSessionDate)}
                  </span>
                </div>
              </div>
            )}

            {/* Coach Information */}
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h3 className="mb-2 flex items-center gap-2 text-base font-medium md:text-lg">
                <User className="size-5 md:size-6" />
                مدرس
              </h3>
              <p className="text-sm text-gray-300 md:text-base">{`${courseProgramData?.coach?.first_name} ${courseProgramData?.coach?.last_name}`}</p>
            </div>

            {/* Price Information */}
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h3 className="mb-4 text-sm font-medium md:text-lg">قیمت دوره</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base">قیمت اصلی:</span>
                <span className={clsx(courseProgramData?.price_discounted ? 'text-gray-400 line-through' : '', 'text-sm md:text-lg')}>
                  {courseProgramData?.price_real.toLocaleString('fa-IR')}
                  {' '}
                  ریال
                </span>
              </div>
              {courseProgramData?.price_discounted && (
                <div className="mt-2 flex items-center justify-between text-green-400">
                  <span className="text-sm md:text-lg">قیمت با تخفیف:</span>
                  <span className="text-base md:text-lg" style={{ letterSpacing: '1px' }}>
                    {courseProgramData?.price_discounted.toLocaleString('fa-IR')}
                    ریال
                  </span>
                </div>
              )}
            </div>

            {/* Packages Information */}
            {orderSummaryData?.packages && orderSummaryData?.packages.length > 0 && (
              <div className="mb-6 border-b border-gray-600 pb-4">
                <h3 className="mb-4 text-xl font-medium">پکیج‌های انتخاب شده</h3>
                {orderSummaryData?.packages.map((pkg: any) => (
                  <div key={pkg._id} className="mb-2 flex items-center justify-between text-sm md:text-base">
                    <span>* {pkg.title}</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {pkg.price.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon Input Section */}
            <div className="my-6 rounded-lg border border-gray-700 px-6 py-4 md:px-6">
              <CouponInput
                onApplyCoupon={applyCouponCodeHandler}
                couponResult={orderSummaryData?.coupons}
              />
            </div>

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
                    <div className="flex items-center justify-between border-t border-dashed border-gray-600 pb-2 pt-4 text-sm text-gray-300">
                      <span>  جمع پکیج ها:</span>
                      <span style={{ letterSpacing: '1px' }}>
                        {orderSummaryData.summary?.totalPackagePrice.toLocaleString('fa-IR')}
                        {' '}
                        ریال
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-dashed border-gray-600 pb-2 pt-4 text-sm text-red-400">
                    <span>جمع تخفیف‌ها:</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.totalDiscount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-dashed border-gray-600 pt-4 text-sm text-gray-300">
                    <span>مالیات:</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.tax.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-dashed border-gray-600 pt-4 text-base font-medium text-green-400 md:text-lg">
                    <span>جمع کل:</span>
                    <span style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.finalAmount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex w-full flex-col items-center justify-between  space-y-4 border-t border-gray-600 pt-6 font-semibold md:flex-row md:space-y-0">
                  <span className="text-lg md:text-xl">مجموع قابل پرداخت : </span>
                  <span style={{ letterSpacing: '1px' }} className="rounded-2xl  bg-green-600/20 px-4 py-2 text-lg md:text-xl">
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
