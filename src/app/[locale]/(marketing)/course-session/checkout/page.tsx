/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable style/jsx-one-expression-per-line */
'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Book, BookOpenCheck, Calendar, Coins, Package, Plus, ReceiptText, User, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { calculateOrderSummaryRequest, createOrderRequest } from '@/API/order/courseSession';
import CouponInput from '@/components/CouponInput';
import LoadingButton from '@/components/LoadingButton';
import LoadingSpinner from '@/components/LoadingSpiner';
import useAuth from '@/hooks/useAuth';
import { CourseSessioonProgramHelper } from '@/utils/CourseSession';
import { convertDateToPersian, filterPriceNumber } from '@/utils/Helpers';

function CourseSessionCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFetched = useRef(false);
  const { isAuthenticated, userProfileData, isLoading, isUserCompleteProfile, fetchUserFromServer, user } = useAuth();

  // Add this useState hook
  const [useWallet, setUseWallet] = useState(false);

  const [isProgramAlreadyEnrolled, setIsProgramAlreadyEnrolled] = useState(false);

  const [showPaidStatusModal, setShowPaidStatusModal] = useState(false);

  // Get query parameters
  const programId = searchParams.get('programId');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const packageIds = searchParams.get('packageIds')?.split(',') || [];

  // State for applied coupon codes
  const [appliedCouponCodes, setAppliedCouponCodes] = useState<string[]>([]);

  const { data: orderSummaryData, isLoading: isOrderSummaryLoading, isSuccess: isOrderSummarySuccess, refetch } = useQuery({
    queryKey: ['orderSummary', programId, useWallet],
    queryFn: () => calculateOrderSummaryRequest({
      classProgramId: programId as string,
      packages: packageIds,
      couponCodes: appliedCouponCodes,
      useUserWallet: useWallet,
    }),
    enabled: !!programId,
    staleTime: 0,
  });

  const { mutate: createOrder, isPending: isCreatingOrderPending } = useMutation({
    mutationFn: () => createOrderRequest({
      classProgramId: programId as string,
      packages: packageIds,
      couponCodes: appliedCouponCodes,
      useUserWallet: useWallet,
    }),
    onSuccess: (data) => {
      // Handle successful order creation
      toast.success('سفارش با موفقیت ثبت شد');
      // eslint-disable-next-line no-console
      console.log('data', data);
      // validate Response data
      if (data?.payment) {
        // redirect to payment page
        if (data?.payment?.url) {
          toast.success('در حال انتقال به صفحه پرداخت');
          window.location.href = data?.payment?.url;
        } else {
          toast.error('خطا در انتقال به صفحه پرداخت');
        }
      } else if (!data.payment && data.order) {
        if (data.order.paymentStatus === 'paid') {
          toast.success('سفارش با موفقیت ثبت شد');
          setShowPaidStatusModal(true);
          setTimeout(() => {
            router.push(`/dashboard/course-session?program_id=${data.order.classProgramId}`);
          }, 4000);
          toast.loading('در حال انتقال به دوره خریداری شده');
          // router.push(`/dashboard/course-session?program_id=${data.order.classProgramId}`);
        } else {
          toast.error('خطا در ثبت سفارش');
        }
      }
      else {
        toast.error('خطا در ثبت سفارش');
      }
      // You may want to redirect to a success page or order details page
    },
    onError: (error) => {
      toast.error('خطا در ثبت سفارش');
      console.error('Order creation error:', error);
    },
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

  useEffect(() => {
    if (user && programId) {
      if (user?.course_session_program_enrollments && user?.course_session_program_enrollments?.length > 0) {
        // check if this program is already enrolled
        const isEnrolled = user?.course_session_program_enrollments?.some((enrollment: any) => enrollment?.program === programId);
        if (isEnrolled) {
          setIsProgramAlreadyEnrolled(true);
          toast.error('این دوره قبلاً ثبت نام کرده اید');
        }
      }
    }
  }, [user, programId]);

  useEffect(() => {
    if (!isLoading && user && !hasFetched.current) {
      hasFetched.current = true;
      fetchUserFromServer();
    }
  }, [isLoading, user, fetchUserFromServer]);

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

    // classProgramId
    // couponCodes
    // packages
    console.log({ programId, packageIds, appliedCouponCodes });
    createOrder({ programId, packageIds, appliedCouponCodes });
    // we should navigate user to thhe bank
  };

  const handleWalletRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== 'full-payment') {
      setUseWallet(true);
    } else {
      setUseWallet(false);
    }
    // Refetch order summary whenever radio state changes
    // refetch();
  };

  const userWalletAmount = user?.wallet_amount || 0;

  // Add these logic variables
  const shouldShowWalletSection = userWalletAmount > 0;
  const isWalletLessThanTotal = userWalletAmount < orderSummaryData?.summary?.finalAmount;
  // If all validations pass, render the checkout content
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-r from-violet-500 to-purple-500  pt-20 text-white" dir="rtl">
      {(isLoading || isOrderSummaryLoading) && <LoadingSpinner />}
      {isOrderSummarySuccess && orderSummaryData?.program && (
        <div className="mx-auto my-1 max-w-4xl  px-3 py-2 md:my-8 md:px-6">
          <div className="rounded-lg bg-gradient-to-r from-fuchsia-50 to-gray-50 px-4 py-6 shadow-lg md:px-6">
            <div className="mb-10 flex flex-col items-center justify-center">
              <div className="mb-2 flex items-center justify-center gap-3">
                <ReceiptText className="size-7 text-purple-800 md:size-10" />
                <h2 className="text-center text-2xl font-extrabold tracking-tight text-purple-900 drop-shadow-sm md:text-3xl">
                  فاکتور سفارش
                </h2>
              </div>
              <p className="text-xs font-medium text-purple-700 md:text-base">
                لطفا جزییات سفارش خود را بررسی کنید
              </p>
            </div>

            {/* Course Information */}
            <div className="mb-6 border-b border-green-600/20 pb-4 text-purple-600">
              <h3 className="mb-6 flex items-center gap-2 text-base font-semibold md:text-xl">
                <Book className="size-6 text-purple-600 md:size-7" />
                اطلاعات دوره
              </h3>
              {courseProgramData?.course
                ? (
                    <>
                      <p className="mb-1 text-lg text-gray-800">{courseProgramData?.course?.title}</p>
                      <p className="text-sm text-gray-800">{courseProgramData?.course?.sub_title}</p>
                    </>
                  )
                : (
                    <p className="text-gray-800">اطلاعات دوره موجود نیست</p>
                  )}
            </div>

            {/* First Session Date */}
            {firstSessionDate && (
              <div className="mb-6 border-b border-green-600/20 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-purple-600 md:text-lg">
                    <Calendar className="size-6 text-purple-600 md:size-7" />
                    شروع دوره از
                  </h3>
                  <span style={{ letterSpacing: '2px' }} className="rounded-2xl border border-green-600/20 px-4 py-2 text-sm font-medium text-gray-800 md:text-lg">
                    {convertDateToPersian(firstSessionDate)}
                  </span>
                </div>
              </div>
            )}

            {/* Coach Information */}
            <div className="mb-6 border-b border-green-600/20 pb-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-purple-600 md:text-lg">
                <User className="size-6 text-purple-600 md:size-7" />
                مدرس
              </h3>
              <p className="text-sm text-gray-800 md:text-base">{`${courseProgramData?.coach?.first_name} ${courseProgramData?.coach?.last_name}`}</p>
            </div>

            {/* Price Information */}
            <div className="mb-6 border-b border-green-600/20 pb-4 text-purple-600">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold md:text-lg">
                <Coins className="size-6 text-purple-600 md:size-7" />
                قیمت دوره
              </h3>
              <div className="flex items-center justify-between text-gray-800">
                <span className="text-sm md:text-base">قیمت اصلی</span>
                <span className={clsx(courseProgramData?.price_discounted ? 'text-gray-400 line-through' : '', 'text-sm font-semibold md:text-lg')}>
                  {courseProgramData?.price_real.toLocaleString('fa-IR')}
                  {' '}
                  ریال
                </span>
              </div>
              {courseProgramData?.price_discounted && (
                <div className="mt-2 flex items-center justify-between text-green-400">
                  <span className="text-sm md:text-lg">قیمت با تخفیف:</span>
                  <span className="text-base font-semibold md:text-lg" style={{ letterSpacing: '1px' }}>
                    {courseProgramData?.price_discounted.toLocaleString('fa-IR')}
                    ریال
                  </span>
                </div>
              )}
            </div>

            {/* Packages Information */}
            {orderSummaryData?.packages && orderSummaryData?.packages.length > 0 && (
              <div className="mb-4 pb-2 text-gray-800">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold md:text-lg">
                  <Package size={20} className="size-5 text-purple-600 md:size-6" />
                  پکیج‌های انتخاب شده
                </h3>
                {orderSummaryData?.packages.map((pkg: any) => (
                  <div key={pkg._id} className="mb-2 flex items-center justify-between text-sm md:text-base">
                    <span>* {pkg.title}</span>
                    <span className="text-sm font-semibold" style={{ letterSpacing: '1px' }}>
                      {pkg.price.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon Input Section */}
            <div className="my-6 rounded-xl border border-green-300/10 bg-white px-6 py-4 text-gray-700 shadow-md md:px-6">
              <CouponInput
                onApplyCoupon={applyCouponCodeHandler}
                couponResult={orderSummaryData?.coupons}
                isLoading={isOrderSummaryLoading}
              />
            </div>

            {/* Total Price */}
            <div className="mt-6">
              <div className="flex flex-col items-center justify-between text-base font-normal md:text-xl">
                <div className="mb-4 flex w-full flex-col gap-2">
                  <div className="flex items-center justify-between text-sm text-gray-800">
                    <span>قیمت نهایی دوره</span>
                    <span className="font-semibold" style={{ letterSpacing: '1px' }}>
                      {orderSummaryData.summary?.ProgramOriginalAmount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  {orderSummaryData.summary?.totalPackagePrice > 0 && (
                    <div className="flex items-center justify-between border-t border-dashed border-gray-600 pb-2 pt-4 text-sm text-gray-800">
                      <span>  جمع پکیج ها</span>
                      <span className="font-semibold" style={{ letterSpacing: '1px' }}>
                        {orderSummaryData.summary?.totalPackagePrice.toLocaleString('fa-IR')}
                        {' '}
                        ریال
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-dashed border-gray-600 pb-2 pt-4 text-sm text-gray-800">
                    <span>جمع تخفیف‌ها</span>
                    <span className="font-semibold" style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.totalDiscount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-dashed border-gray-600 pt-4 text-sm text-gray-800">
                    <span>مالیات</span>
                    <span className="font-semibold" style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.tax.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-dashed border-gray-600 pt-4 text-base font-medium text-green-900 md:text-lg">
                    <span>جمع کل</span>
                    <span className="font-semibold" style={{ letterSpacing: '1px' }}>
                      {orderSummaryData?.summary?.finalAmount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex w-full flex-col items-center justify-between  space-y-4 border-t border-gray-300 pt-6 font-semibold ">
                  <span className="text-lg text-gray-800 md:text-xl">مجموع قابل پرداخت </span>
                  <span style={{ letterSpacing: '1px' }} className="green-gradient-bg min-w-[80%] rounded-2xl   px-4 py-2 text-center text-lg font-semibold md:text-xl">
                    {orderSummaryData?.summary?.finalAmount.toLocaleString('fa-IR')}
                    {' '}
                    ریال
                  </span>
                </div>

                {shouldShowWalletSection && (
                  <div className="mt-6 w-full rounded-xl bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center gap-2 text-right">
                      <Wallet className="text-purple-600" size={25} />
                      <h2 className="text-lg font-normal text-purple-600">پرداخت با کیف پول</h2>
                    </div>

                    <div className="space-y-3">
                      {/* Wallet Balance Display */}
                      <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">موجودی کیف پول شما:</span>
                          <span className="text-lg font-bold text-purple-600">
                            {userWalletAmount && filterPriceNumber(userWalletAmount || 0)}
                            <span className="mr-1 text-sm">ریال</span>
                          </span>
                        </div>
                      </div>

                      {/* Radio Buttons - Only show if wallet < total */}
                      {isWalletLessThanTotal && (
                        <div className="space-y-2">
                          <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:bg-gray-50">
                            <input
                              type="radio"
                              name="walletPayment"
                              value="full-payment"
                              checked={!useWallet}
                              onChange={(e) => handleWalletRadioChange(e)}
                              className="size-5 cursor-pointer accent-blue-600"
                            />
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-800">پرداخت کامل با درگاه</div>
                              <div className="mt-2 text-xs text-gray-600 md:text-sm">پرداخت کل مبلغ از طریق درگاه بانکی</div>
                            </div>
                          </label>

                          <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-purple-300 bg-purple-50 p-4 transition-all hover:bg-purple-100">
                            <input
                              type="radio"
                              name="walletPayment"
                              checked={useWallet}
                              onChange={e => handleWalletRadioChange(e)}
                              className="size-5 cursor-pointer accent-purple-600"
                            />
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-800">استفاده از کیف پول + درگاه</div>
                              <div className="mt-2 text-xs leading-5 text-gray-600 md:text-sm">
                                ابتدا
                                {' '}
                                {userWalletAmount && filterPriceNumber(userWalletAmount || 0)}
                                {' '}
                                ریال از کیف پول کسر می‌شود و مابقی از درگاه
                              </div>
                            </div>
                          </label>
                        </div>
                      )}

                      {/* If wallet >= total, show full payment option */}
                      {!isWalletLessThanTotal && (
                        <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4">
                          <div className="flex items-center gap-2">
                            <div style={{ minWidth: '24px', minHeight: '24px' }} className="flex size-6 items-center justify-center rounded-full bg-green-600 md:size-8">
                              <svg className="size-4 text-white md:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-green-800">امکان پرداخت کامل با کیف پول</div>
                              <div className="mt-1 text-xs leading-5 text-green-700 md:text-sm">موجودی کیف پول شما برای پرداخت این سفارش کافی است</div>
                            </div>
                          </div>

                          <label className="mt-3 flex cursor-pointer items-center gap-3">
                            <input
                              type="checkbox"
                              checked={useWallet}
                              onChange={e => setUseWallet(e.target.checked)}
                              className="size-5 cursor-pointer accent-green-600 md:size-6"
                            />
                            <span className="text-sm font-semibold text-purple-600 md:text-base">پرداخت از طریق کیف پول</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Checkout Button */}
            {/* <button
              type="button"
              className="mt-12 w-full rounded-lg bg-purple-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
              onClick={submitOrderAndNavigateToPayment}
            >
              ادامه فرآیند پرداخت
            </button> */}
            <LoadingButton
              isLoading={isCreatingOrderPending}
              className="mt-12 w-full rounded-lg bg-purple-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
              onClick={submitOrderAndNavigateToPayment}
            >
              ادامه فرآیند پرداخت
            </LoadingButton>
          </div>
        </div>
      )}

      {showPaidStatusModal && (
        <div className="fixed inset-0 z-[200] flex min-h-full w-screen items-center justify-center bg-black/80">
          <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-none bg-white px-8 py-12 shadow-xl md:rounded-2xl">
            {/* Success SVG */}
            <div className="mb-6 flex items-center justify-center rounded-full bg-green-100 p-4">
              <div className="flex justify-around">
                <div>
                  <svg
                    className="size-16 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <circle cx="24" cy="24" r="22" strokeWidth="3" stroke="currentColor" fill="#dcfce7" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M15 25l7 7 13-13"
                      stroke="#22c55e"
                      fill="none"
                    />
                  </svg>
                </div>

                <div>
                  <Plus className="size-12 text-green-400" />
                </div>

                <div>
                  <BookOpenCheck className="size-16 text-green-600" />
                </div>

              </div>
            </div>
            {/* Success Text */}
            <div className="mb-6 text-center">
              <div className="text-lg font-semibold text-green-700">
                {`دوره (${courseProgramData?.course?.title}) با مدرس ${courseProgramData?.coach?.first_name} ${courseProgramData?.coach?.last_name} `}
              </div>
              <div className="mt-2 text-sm text-gray-700 md:text-base">
                به پروفایل شما قسمت کلاس ها اضافه شد به همراه ساعت دقیق کلاس و جزییات بیشتر
              </div>
            </div>
            {/* Animation & Inform Text */}
            <div className="my-8 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-purple-600 md:text-sm">
                شما در حال انتقال به صفحه کلاس ها هستید
              </span>
              {/* Loading Animation */}
              <svg className="mt-1 size-7 animate-spin text-purple-600" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                </circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                >
                </path>
              </svg>
            </div>
            {/* Manual Link */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400 md:text-sm">در صورت عدم انتقال
                <span className="px-1 font-bold text-purple-800"> اینجا </span>
                را کلیک کنید
              </span>
              <Link
                href={`/dashboard/course-session?program_id=${programId}`}
                className="rounded-xl bg-purple-800 px-5 py-2 font-semibold text-white transition hover:bg-purple-700"
              >
                <>
                  <span className="flex items-center gap-2">
                    رفتن به صفحه کلاس ها
                    <BookOpenCheck className="inline-block size-5 text-white" />
                  </span>
                </>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* When this program exists in enrolled programs */}
      {isProgramAlreadyEnrolled && (
        <div
          style={{ boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.2)', minHeight: '56px' }}
          className="blue-gradient-bg fixed  inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 px-4 py-3"
        >
          <BookOpenCheck className="size-5 text-purple-800" />
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-800">
            این کلاس آموزشی قبلا ثبت نام شده
          </div>

        </div>
      )}
    </div>
  );
}

export default function CourseSessionCheckoutPage(props: any) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CourseSessionCheckout {...props} />
    </Suspense>
  );
}
