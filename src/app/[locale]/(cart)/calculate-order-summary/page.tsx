/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import type { Address, AddressResponse } from '@/types/Product';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowRight, Coins, MapPinHouse, Package, Receipt, ShoppingBag, TvMinimalPlay, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getUserAddressRequest, submitAddresRequest } from '@/API/order/address';

// API
import { calculateOrderSummaryRequest } from '@/API/order/payment';
import LoadingButton from '@/components/LoadingButton';
// Components
import LoadingSpinner from '@/components/LoadingSpiner';
import OrderCoupon from '@/components/OrderCoupon';

import useAuth from '@/hooks/useAuth';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';
import AddressSelector from '@/sections/cart/AddressSelector';
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
  userWalletAmount: number;
  products: Product[];
  total: number;
  tax: number;
  totalAmount: number;
  shippingAmount: number;
  totalAmountBeforeDiscount: number; // Add this line
  couponInfo?: CouponInfo;
};

export default function CalculateOrderSummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, fetchUserFromServer } = useAuth();

  // Get cartId from route params
  const cartId = searchParams.get('cartId');
  const selectedShippingAddress = searchParams.get('AddressId');

  // State for coupon codes
  const [couponCodes, setCouponCodes] = useState<string[]>([]);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // State for wallet inclusion
  const [includeWalletAmount, setIncludeWalletAmount] = useState(false);
  const [userWalletAmount, setUserWalletAmount] = useState(0);
  // State for selected address
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse | null>(null);
  const [editSelectedAddressToggle, setEditSelectedAddressToggle] = useState(false);

  const isMobileScreen = useResponsiveEvent(768, 200);

  // Get wallet amount from user
  // const walletAmount = user?.wallet_amount || 0;
  useEffect(() => {
    if (user) {
      setUserWalletAmount(user?.wallet_amount || 0);
    }
  }, [user]);

  // Fetch order summary with React Query
  const {
    data: orderSummaryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<OrderSummaryResponse>({
    queryKey: ['calculate-order-summary', cartId, couponCodes, includeWalletAmount],
    queryFn: () => calculateOrderSummaryRequest({
      cartId: cartId as string,
      couponCodes: couponCodes.length > 0 ? couponCodes : undefined,
      useUserWallet: includeWalletAmount,
    }),
    enabled: !!cartId,
    staleTime: 0, // Always refetch when query key changes
  });

  // Get User Address From API
  const { data: addressData, isLoading: addressIsLoading, isError: addressIsError, isSuccess: addressIsSuccess } = useQuery({
    queryFn: async () => getUserAddressRequest(),
    queryKey: ['order::address'], // Array according to Documentation
  });

  const submitAddressMutation = useMutation({
    mutationFn: submitAddresRequest,
    onSuccess: (res) => {
      // @ts-expect-error
      queryClient.invalidateQueries('order::address');
      if (res && res.billingAddress) {
        toast.success('آدرس شما ثبت شد');

        setSelectedAddress(res || addressData[0]);
      }
      console.log({ response: res });
    },
  });

  // select Address Effect
  useEffect(() => {
    if (addressIsSuccess && addressData && Array.isArray(addressData)) {
      if (selectedShippingAddress && !selectedAddress) {
        setSelectedAddress(addressData?.find((address: AddressResponse) => address._id === selectedShippingAddress));
      } else if (!selectedAddress) {
        setSelectedAddress(addressData[0]);
      }
    }
  }, [selectedShippingAddress, addressData, addressIsSuccess]);

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

  useEffect(() => {
    fetchUserFromServer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Handle wallet amount toggle
  const handleIncludeWalletToggle = (include: boolean) => {
    setIncludeWalletAmount(include);
  };

  const submitAddressFormHandler = (address: Address) => {
    // Submit API
    submitAddressMutation.mutate({
      addressLine1: address.address,
      state: address.state,
      city: address.city,
      postalCode: address.postalCode,
      title: address.title,
    });

    console.log({ es: address });
  };

  // Calculate final amount after discounts
  // const calculateFinalAmount = () => {
  //   if (!orderSummaryData) {
  //     return 0;
  //   }

  //   const baseAmount = orderSummaryData.total + orderSummaryData.shippingAmount;
  //   const discount = orderSummaryData.couponInfo?.totalDiscount || 0;

  //   return Math.max(baseAmount - discount, 0);
  // };

  const handleProceedToCheckout = () => {
    const validCoupons = orderSummaryData?.couponInfo?.validCoupons?.map(coupon => coupon.code);

    console.log({ kir: validCoupons });
    console.log({ couponCodes, cartId });
    console.log({ selectedAddress });
    // Navigate to payment or checkout page
    toast.success('در حال انتقال به صفحه پرداخت');
    // You can add your checkout logic here
    // router.push(`/checkout?cartId=${cartId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="primary-gradient-bg flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (!orderSummaryData) {
    return (
      <div className="primary-gradient-bg flex min-h-screen items-center justify-center">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <p className="mb-4 text-xl text-red-600">خطا در بارگذاری اطلاعات</p>
          <button
            type="button"
            onClick={() => router.push('/cart')}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            بازگشت به سبد خرید
          </button>
        </div>
      </div>
    );
  }

  const finalAmount = orderSummaryData.totalAmount;
  const isAddressDataExist = addressIsSuccess && addressData && Array.isArray(addressData);
  const hasProductItemProperty = orderSummaryData.products.some(item => 'product' in item);

  // Calculate order price with tax and shipping
  // const orderPriceWithTaxAndShipping = orderSummaryData.total + orderSummaryData.tax + orderSummaryData.shippingAmount;

  // Determine if we should show wallet section
  const shouldShowWalletSection = userWalletAmount > 0;
  const isWalletLessThanTotal = userWalletAmount < orderSummaryData.totalAmount;

  return (
    <div dir="rtl" className="primary-gradient-bg min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div dir="rtl" className="mb-6 flex-col items-center justify-between">
          <Link href="/cart">
            <button type="button" className="flex items-center gap-2 text-gray-500 hover:text-gray-200">
              <ArrowRight size={20} />
              <span>بازگشت به سبد خرید</span>
            </button>
          </Link>
          {/* <h1 className="mt-8 flex items-center justify-center gap-2 text-center text-2xl font-bold text-gray-800">
            <FileText size={25} className="ml-2 text-gray-800" />
            <div>
              آماده سازی سفارش ...
            </div>
          </h1> */}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left Column - Products List, Wallet, and Coupon */}
          <div className="space-y-3 lg:col-span-2">
            {/* Products List */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2 text-right">
                <Package className="text-blue-600" size={25} />
                <h2 className="text-lg font-normal text-gray-800">لیست محصولات</h2>
              </div>

              <div className="space-y-3">
                {orderSummaryData?.products?.map((product, index) => (
                  <div
                    key={`${product?.course || product?.product}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 md:size-14">
                        {product?.product ? <ShoppingBag className="text-blue-600" size={isMobileScreen ? 18 : 24} /> : <TvMinimalPlay className="text-blue-600" size={isMobileScreen ? 18 : 24} />}
                      </div>
                      <div className="text-right">
                        <h3 className="max-w-[120px] flex-1 text-xs font-normal text-gray-800 md:max-w-none md:text-sm">
                          {product?.title || 'محصول'}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 md:text-sm">
                          تعداد:
                          {' '}
                          {product?.quantity?.toLocaleString('fa-IR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-gray-800 md:text-sm">
                        {filterPriceNumber(product?.price * product?.quantity)}
                        <span className="mr-1 text-xs md:text-sm">ریال</span>
                      </p>
                      <p className="mt-1 text-[11px] text-gray-500 md:text-xs">
                        {filterPriceNumber(product?.price)}
                        {' '}
                        ×
                        {' '}
                        {product?.quantity?.toLocaleString('fa-IR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Selector */}
            {isAddressDataExist && hasProductItemProperty && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-right">
                      <MapPinHouse className="text-purple-600" size={25} />
                      <h2 className="text-lg font-normal text-gray-800">آدرس  انتخاب شده</h2>
                    </div>
                  </div>

                  <div className="mt-4">
                    <AddressSelector
                      isAddressDataExist={isAddressDataExist}
                      addresses={addressData}
                      onSubmitAddressForm={submitAddressFormHandler}
                      selectedAddress={selectedAddress}
                      onSelectAddress={setSelectedAddress}
                      isShowModeCase
                    />
                  </div>
                </div>

              </div>
            ) }

            {/* Wallet Section - Only show if wallet amount > 0 */}
            {shouldShowWalletSection && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-2 text-right">
                  <Wallet className="text-purple-600" size={25} />
                  <h2 className="text-lg font-normal text-gray-800">پرداخت با کیف پول</h2>
                </div>

                <div className="space-y-3">
                  {/* Wallet Balance Display */}
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">موجودی کیف پول شما:</span>
                      <span className="text-lg font-bold text-purple-600">
                        {filterPriceNumber(userWalletAmount)}
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
                          checked={!includeWalletAmount}
                          onChange={() => handleIncludeWalletToggle(false)}
                          className="size-5 cursor-pointer accent-blue-600"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800">پرداخت کامل با درگاه</div>
                          <div className="mt-1 text-xs text-gray-600 md:text-sm">پرداخت کل مبلغ از طریق درگاه بانکی</div>
                        </div>
                      </label>

                      <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-purple-300 bg-purple-50 p-4 transition-all hover:bg-purple-100">
                        <input
                          type="radio"
                          name="walletPayment"
                          checked={includeWalletAmount}
                          onChange={() => handleIncludeWalletToggle(true)}
                          className="size-5 cursor-pointer accent-purple-600"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800">استفاده از کیف پول + درگاه</div>
                          <div className="mt-1 text-xs text-gray-600 md:text-sm">
                            ابتدا
                            {' '}
                            {filterPriceNumber(userWalletAmount)}
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
                          checked={includeWalletAmount}
                          onChange={e => handleIncludeWalletToggle(e.target.checked)}
                          className="size-5 cursor-pointer accent-green-600 md:size-6"
                        />
                        <span className="text-sm font-semibold text-purple-600 md:text-base">پرداخت با کیف پول</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

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
              <div className="mb-8 flex items-center gap-2 text-right">
                <Coins className="text-green-600" size={28} />
                <h2 className="text-xl font-semibold text-gray-800">فاکتور نهایی</h2>
              </div>

              <div className="space-y-3 pb-4">
                {/* Subtotal */}
                <div className="flex flex-row-reverse items-center justify-between text-right">
                  <span className="font-semibold text-gray-800">
                    {filterPriceNumber(orderSummaryData.total)}
                    <span className="mr-1 text-sm">ریال</span>
                  </span>
                  <span className="text-gray-600">جمع کل محصولات</span>
                </div>

                {/* Tax */}
                <div className="flex flex-row-reverse items-center justify-between text-right">
                  <span className="font-semibold text-gray-800">
                    {filterPriceNumber(orderSummaryData.tax)}
                    <span className="mr-1 text-sm">ریال</span>
                  </span>
                  <span className="text-gray-600">مالیات</span>
                </div>

                {/* Shipping */}
                <div className="flex flex-row-reverse items-center justify-between text-right">
                  <span className="font-semibold text-gray-800">
                    {orderSummaryData.shippingAmount === 0
                      ? 'رایگان'
                      : `${filterPriceNumber(orderSummaryData.shippingAmount)} ریال`}
                  </span>
                  <span className="text-gray-600">هزینه ارسال</span>
                </div>

                {/* Dashed Border and Total Before Discount */}
                <div className="border-t-2 border-dashed border-gray-300 pt-3">
                  <div className="flex flex-row-reverse items-center justify-between text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {orderSummaryData?.totalAmountBeforeDiscount && filterPriceNumber(orderSummaryData?.totalAmountBeforeDiscount)}
                      <span className="mr-1 text-sm">ریال</span>
                    </span>
                    <span className="text-xs font-semibold text-gray-700 md:text-sm">جمع کل (قبل از تخفیف)</span>
                  </div>
                </div>

                {/* Wallet Deduction - Show if wallet is included */}
                {includeWalletAmount && userWalletAmount > 0 && (
                  <div className="flex flex-row-reverse items-center justify-between rounded-lg border-t border-gray-200 bg-purple-50 p-2 pt-3 text-right">
                    <span className="font-semibold text-purple-600">
                      -
                      {' '}
                      {orderSummaryData?.userWalletAmount && filterPriceNumber(orderSummaryData?.userWalletAmount)}
                      <span className="mr-1 text-sm">ریال</span>
                    </span>
                    <span className="text-purple-700">کسر از کیف پول</span>
                  </div>
                )}

                {/* Discount */}
                {orderSummaryData?.couponInfo?.totalDiscount && orderSummaryData?.couponInfo?.totalDiscount > 0 && (
                  <div className="mt-3 flex flex-row-reverse items-center justify-between rounded-lg border-t border-gray-200 bg-green-50 p-2 pt-3 text-right">
                    <span className="font-semibold text-green-600">
                      -
                      {' '}
                      {filterPriceNumber(orderSummaryData.couponInfo.totalDiscount)}
                      <span className="mr-1 text-sm">ریال</span>
                    </span>
                    <span className="text-green-700">تخفیف</span>
                  </div>
                )}
              </div>

              {/* Final Total */}
              <div onClick={handleProceedToCheckout} role="button" tabIndex={0} className="mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <div className="flex flex-col items-center justify-between text-white">
                  <span className="text-2xl font-bold">
                    {filterPriceNumber(orderSummaryData?.totalAmount)}
                    <span className="mr-1 text-base">ریال</span>
                  </span>
                  <span className="mt-1.5 text-lg">مبلغ قابل پرداخت</span>
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
                <button type="button" className="mt-3 w-full rounded-lg border-2 border-gray-300 bg-white py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
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
