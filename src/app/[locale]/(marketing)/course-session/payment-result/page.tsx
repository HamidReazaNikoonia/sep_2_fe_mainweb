'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getOrderByIdRequest } from '@/API/order/courseSession';
import LoadingSpinner from '@/components/LoadingSpiner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type PaymentStatus = 'paid' | 'unpaid' | 'false';

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const [paymentStatusState, setPaymentStatusState] = useState<PaymentStatus>('unpaid');

  // Get query parameters
  const orderId = searchParams.get('order_id');
  // const paymentStatusParam = searchParams.get('payment_status') as PaymentStatus;

  // Fetch order details
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () => getOrderByIdRequest(orderId!),
    enabled: !!orderId,
  });

  useEffect(() => {
    if (data && isSuccess) {
      if (data?.paymentStatus) {
        setPaymentStatusState(data?.paymentStatus);
      }
    }
  }, [data, isSuccess]);

  // Extract required data from response
  // const paymentStatus = data?.paymentStatus;
  // const classProgramId = data?.classProgramId;
  const reference = data?.reference;
  const transactionId = data?.transactionId;

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-12">
        <Card className="mx-4 w-full max-w-lg md:max-w-full">
          <CardContent className="p-6 text-center">
            <XCircle size={60} className="mx-auto mb-4 text-red-500" />
            <h2 className="mb-2 text-lg font-semibold text-red-600">خطا در دریافت اطلاعات</h2>
            <p className="text-gray-600">لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Determine if payment was successful
  const isPaymentSuccess = paymentStatusState === 'paid';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-600 pb-0 pt-16 md:pb-12 md:pt-28" dir="rtl">
      <Card className={clsx(
        'mx-0 w-full max-w-full overflow-hidden rounded-xl pb-8 md:mx-4 md:max-w-lg',
        isPaymentSuccess ? 'border-green-500' : 'border-red-500',
      )}
      >
        {/* Header with icon and status */}
        <CardHeader className={clsx(
          'p-8 text-center',
          isPaymentSuccess ? 'bg-green-500' : 'bg-red-500',
        )}
        >
          {isPaymentSuccess
            ? (
                <>
                  <CheckCircle2 size={64} className="mx-auto mb-4 text-white" />
                  <h2 className="mb-2 text-xl font-bold text-white">پرداخت موفق</h2>
                  <p className="text-green-100">سفارش شما با موفقیت ثبت شد</p>
                </>
              )
            : (
                <>
                  <XCircle size={64} className="mx-auto mb-4 text-white" />
                  <h2 className="mb-2 text-xl font-bold text-white">پرداخت ناموفق</h2>
                  <p className="text-red-100">پرداخت شما با مشکل مواجه شد</p>
                </>
              )}
        </CardHeader>

        {/* Content with order details */}
        <CardContent className="space-y-4 p-6">
          {reference && (
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-1 text-sm font-medium text-gray-600">کد رهگیری سفارش</h3>
              <p className="text-lg font-semibold text-gray-900" style={{ letterSpacing: '1px' }}>
                {reference}
              </p>
            </div>
          )}

          {transactionId?.payment_reference_id && (
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-1 text-sm font-medium text-gray-600">کد پرداخت</h3>
              <p className="text-lg font-semibold text-gray-900" style={{ letterSpacing: '1px' }}>
                {transactionId.payment_reference_id}
              </p>
            </div>
          )}

          {/* Additional order information */}
          {isSuccess && data && (
            <div className="space-y-3 border-t pt-4">
              {/* {classProgramId && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">شناسه برنامه:</span>
                  <span className="font-medium">{classProgramId}</span>
                </div>
              )} */}

              {orderId && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 md:text-base">شناسه سفارش:</span>
                  <span className="text-xs font-medium md:text-base" style={{ letterSpacing: '1px' }}>{orderId}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-6">
                <span className="text-gray-600">وضعیت پرداخت:</span>
                <span className={clsx(
                  'rounded-full px-3 py-1 text-sm font-bold',
                  isPaymentSuccess
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                )}
                >
                  {isPaymentSuccess ? 'پرداخت شده' : 'پرداخت نشده'}
                </span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3 pt-4">
            {isPaymentSuccess
              ? (
                  <button
                    type="button"
                    className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
                    onClick={() => window.location.href = '/dashboard/courses'}
                  >
                    مشاهده دوره‌های من
                  </button>
                )
              : (
                  <button
                    type="button"
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                    onClick={() => window.history.back()}
                  >
                    تلاش مجدد
                  </button>
                )}

            <button
              type="button"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => window.location.href = '/'}
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentResultPage;
