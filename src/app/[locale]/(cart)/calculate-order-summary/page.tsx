'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ShoppingBag, Package, Receipt, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// API
import { calculateOrderSummaryRequest } from '@/API/order/payment';

// Components
import LoadingSpinner from '@/components/LoadingSpiner';
import LoadingButton from '@/components/LoadingButton';
import OrderCoupon from '@/components/OrderCoupon';

// Utils
import { filterPriceNumber } from '@/utils/Helpers';

type Product = {
  course?: string;
  product?: string;
  quantity: number;
  price: number;
  title: string;
};

type CouponInfo = {
  validCoupons: Array<{
    id: string;
    code: string;
    discount_type: 'PERCENTAGE' | 'FIXED_AMOUNT';
    discount_value: number;
  }>;
  invalidCoupons: Array<{
    couponId: string;
    code: string;
    reason: string;
  }>;
  totalDiscount: number;
};

type OrderSummaryResponse = {
  products: Product[];
  total: number;
  tax: number;
  totalAmount: number;
  shippingAmount: number;
  totalAmountBeforeDiscount: number;  // Add this line
  couponInfo?: CouponInfo;
};

export default function CalculateOrderSummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get cartId from route params
  const cartId = searchParams.get('cartId');
  
  // State for coupon codes
  const [couponCodes, setCouponCodes] = useState<string[]>([]);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Fetch order summary with React Query
  const {
    data: orderSummaryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<OrderSummaryResponse>({
    queryKey: ['calculate-order-summary', cartId, couponCodes],
    queryFn: () => calculateOrderSummaryRequest({ 
      cartId: cartId as string, 
      couponCodes: couponCodes.length > 0 ? couponCodes : undefined 
    }),
    enabled: !!cartId,
    staleTime: 0, // Always refetch when query key changes
  });

  // Validate cartId on mount
  useEffect(() => {
    if (!cartId) {
      toast.error('شناسه سبد خرید یافت نشد');
      router.push('/cart');
    }
  }, [cartId, router]);

  // Handle error states
  useEffect(() => {
    if (isError) {
      toast.error('خطا در دریافت اطلاعات سفارش');
      console.error('Order summary error:', error);
    }
  }, [isError, error]);

  // Handle coupon application
  const handleApplyCoupon = async (newCouponCode: string) => {
    if (!newCouponCode.trim()) {
      return;
    }

    // Check if coupon already exists in the list
    if (couponCodes.includes(newCouponCode)) {
      toast.error('این کد تخفیف قبلا اعمال شده است');
      return;
    }

    setIsApplyingCoupon(true);
    
    // Add new coupon to the list
    const updatedCoupons = [...couponCodes, newCouponCode];
    setCouponCodes(updatedCoupons);

    // Refetch will happen automatically due to query key change
    setTimeout(() => {
      setIsApplyingCoupon(false);
    }, 500);
  };

  // Calculate final amount after discounts
  const calculateFinalAmount = () => {
    if (!orderSummaryData) return 0;
    
    const baseAmount = orderSummaryData.total + orderSummaryData.shippingAmount;
    const discount = orderSummaryData.couponInfo?.totalDiscount || 0;
    
    return Math.max(baseAmount - discount, 0);
  };

  const handleProceedToCheckout = () => {
    // Navigate to payment or checkout page
    toast.success('در حال انتقال به صفحه پرداخت');
    // You can add your checkout logic here
    // router.push(`/checkout?cartId=${cartId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center primary-gradient-bg">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (!orderSummaryData) {
    return (
      <div className="flex min-h-screen items-center justify-center primary-gradient-bg">
        <div className="rounded-xl bg-white p-8 shadow-lg text-center">
          <p className="mb-4 text-xl text-red-600">خطا در بارگذاری اطلاعات</p>
          <button
            onClick={() => router.push('/cart')}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            بازگشت به سبد خرید
          </button>
        </div>
      </div>
    );
  }

  const finalAmount = calculateFinalAmount();
  
  // Calculate order price with tax and shipping
  const orderPriceWithTaxAndShipping = orderSummaryData.total + orderSummaryData.tax + orderSummaryData.shippingAmount;

  return (
    <div dir="rtl" className="min-h-screen primary-gradient-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/cart">
            <button className="flex items-center gap-2 text-white hover:text-gray-200">
              <ArrowRight size={20} />
              <span>بازگشت به سبد خرید</span>
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">خلاصه سفارش</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Products List and Coupon */}
          <div className="space-y-6 lg:col-span-2">
            {/* Products List */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2 text-right">
                <Package className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">لیست محصولات</h2>
              </div>
              
              <div className="space-y-3">
                {orderSummaryData.products.map((product, index) => (
                  <div
                    key={`${product.course || product.product}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <ShoppingBag className="text-blue-600" size={20} />
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold text-gray-800">
                          {product.title || 'محصول'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          تعداد: {product.quantity.toLocaleString('fa-IR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-800">
                        {filterPriceNumber(product.price * product.quantity)}
                        <span className="mr-1 text-sm">ریال</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {filterPriceNumber(product.price)} × {product.quantity.toLocaleString('fa-IR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <OrderCoupon
              couponInfo={orderSummaryData.couponInfo}
              onApplyCoupon={handleApplyCoupon}
              isApplying={isApplyingCoupon || isLoading}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2 text-right">
                <Receipt className="text-green-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">فاکتور نهایی</h2>
              </div>

              <div className="space-y-3 pb-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-right">
                  <span className="font-semibold text-gray-800">
                    {filterPriceNumber(orderSummaryData.total)}
                    <span className="mr-1 text-sm">ریال</span>
                  </span>
                  <span className="text-gray-600">جمع کل محصولات</span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between text-right">
                  <span className="font-semibold text-gray-800">
                    {filterPriceNumber(orderSummaryData.tax)}
                    <span className="mr-1 text-sm">ریال</span>
                  </span>
                  <span className="text-gray-600">مالیات</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between text-right">
                  <span className="font-semibold text-gray-800">
                    {orderSummaryData.shippingAmount === 0 
                      ? 'رایگان'
                      : `${filterPriceNumber(orderSummaryData.shippingAmount)} ریال`
                    }
                  </span>
                  <span className="text-gray-600">هزینه ارسال</span>
                </div>

                {/* Dashed Border and Total Before Discount */}
                <div className="border-t-2 border-dashed border-gray-300 pt-3">
                  <div className="flex items-center justify-between text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {filterPriceNumber(orderSummaryData?.totalAmountBeforeDiscount || orderPriceWithTaxAndShipping)}
                      <span className="mr-1 text-sm">ریال</span>
                    </span>
                    <span className="font-semibold text-gray-700">جمع کل (قبل از تخفیف)</span>
                  </div>
                </div>

                {/* Discount */}
                {orderSummaryData.couponInfo?.totalDiscount > 0 && (
                  <div className="flex items-center justify-between rounded-lg bg-green-50 p-2 text-right border-t border-gray-200 mt-3 pt-3">
                    <span className="font-semibold text-green-600">
                      - {filterPriceNumber(orderSummaryData.couponInfo.totalDiscount)}
                      <span className="mr-1 text-sm">ریال</span>
                    </span>
                    <span className="text-green-700">تخفیف</span>
                  </div>
                )}
              </div>

              {/* Final Total */}
              <div className="mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <div className="flex items-center justify-between text-white">
                  <span className="text-2xl font-bold">
                    {filterPriceNumber(finalAmount)}
                    <span className="mr-1 text-base">ریال</span>
                  </span>
                  <span className="text-lg">مبلغ قابل پرداخت</span>
                </div>
              </div>

              {/* Checkout Button */}
              <LoadingButton
                onClick={handleProceedToCheckout}
                isLoading={false}
                className="mt-6 w-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <Receipt size={20} />
                  <span>تکمیل خرید و پرداخت</span>
                </div>
              </LoadingButton>

              {/* Back to Cart Link */}
              <Link href="/cart">
                <button className="mt-3 w-full rounded-lg border-2 border-gray-300 bg-white py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                  بازگشت به سبد خرید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}