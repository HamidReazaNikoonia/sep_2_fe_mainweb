'use client';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { getTransactionByIdRequest } from '@/API/transaction';

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'failed'>('failed');

  // Get query parameters
  const transactionId = searchParams.get('transactionId');
  const statusParam = searchParams.get('payment_status');

  // Fetch transaction details
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransactionByIdRequest(transactionId!),
    enabled: !!transactionId,
  });

  useEffect(() => {
    if (statusParam === 'true') {
      setPaymentStatus('paid');
    } else {
      setPaymentStatus('failed');
    }
  }, [statusParam]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">در حال دریافت اطلاعات پرداخت...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-red-600">خطا در دریافت اطلاعات پرداخت</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6" dir="rtl">
      {/* Payment Status Section */}
      <div className="mb-6 w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div
          className={clsx(
            'p-6 text-center',
            paymentStatus === 'paid'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white',
          )}
        >
          {paymentStatus === 'paid'
            ? (
                <>
                  <CheckCircle2 size={60} className="mx-auto mb-2" />
                  <h2 className="mb-1 text-lg font-semibold">پرداخت با موفقیت انجام شد</h2>
                  <p>سفارش شما با موفقیت ثبت شد.</p>
                </>
              )
            : (
                <>
                  <XCircle size={60} className="mx-auto mb-2" />
                  <h2 className="text-lg font-semibold">پرداخت ناموفق بود</h2>
                  <p>لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.</p>
                </>
              )}
        </div>
      </div>

      {/* Order Details Section */}
      {data?.data && (
        <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
            <div className="space-y-2 text-center">
              <h3>کد پیگیری سفارش</h3>
              <h2 className="font-bold">
                {data?.data?._id || '---'}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function PaymentResultPage(props: any) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentResult {...props} />
    </Suspense>
  );
}

export default PaymentResultPage;
