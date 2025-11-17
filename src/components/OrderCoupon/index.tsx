'use client';

import clsx from 'clsx';
import { AlertCircle, Check, Loader2, Tag, X } from 'lucide-react';
import { useState } from 'react';

type ValidCoupon = {
  id: string;
  code: string;
  discount_type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discount_value: number;
};

type InvalidCoupon = {
  couponId: string;
  code: string;
  reason: string;
};

type CouponInfo = {
  validCoupons: ValidCoupon[];
  invalidCoupons: InvalidCoupon[];
  totalDiscount: number;
};

type OrderCouponProps = {
  couponInfo?: CouponInfo;
  onApplyCoupon: (code: string) => void;
  isApplying?: boolean;
};

export default function OrderCoupon({ couponInfo, onApplyCoupon, isApplying = false }: OrderCouponProps) {
  const [couponCode, setCouponCode] = useState('');
  const [inputError, setInputError] = useState('');

  const handleApplyCoupon = () => {
    // Validate input
    if (!couponCode.trim()) {
      setInputError('لطفا کد تخفیف را وارد کنید');
      return;
    }

    // Check if coupon is already applied
    const isAlreadyApplied = couponInfo?.validCoupons?.some(
      c => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (isAlreadyApplied) {
      setInputError('این کد تخفیف قبلا اعمال شده است');
      return;
    }

    setInputError('');
    onApplyCoupon(couponCode.trim());
    setCouponCode('');
  };

  const handleInputChange = (value: string) => {
    setCouponCode(value);
    if (inputError) {
      setInputError('');
    }
  };

  const formatDiscount = (coupon: ValidCoupon) => {
    if (coupon.discount_type === 'PERCENTAGE') {
      return `${coupon.discount_value}٪ تخفیف`;
    }
    return `${coupon.discount_value.toLocaleString('fa-IR')} ریال تخفیف`;
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-2 text-right">
        <Tag className="text-purple-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">کد تخفیف</h3>
      </div>

      {/* Coupon Input Section */}
      <div className="mb-6">
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleApplyCoupon();
              }
            }}
            placeholder="کد تخفیف را وارد کنید"
            className={clsx(
              'flex-1 rounded-lg border px-4 py-2.5 text-right outline-none transition-colors focus:ring-2',
              {
                'border-red-500 focus:ring-red-200': inputError,
                'border-gray-300 focus:border-purple-500 focus:ring-purple-200': !inputError,
              }
            )}
            disabled={isApplying}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || isApplying}
            className={clsx(
              'flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-white transition-colors',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'bg-purple-600 hover:bg-purple-700'
            )}
          >
            {isApplying ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>در حال بررسی...</span>
              </>
            ) : (
              <span>اعمال کد</span>
            )}
          </button>
        </div>
        {inputError && (
          <p className="mt-2 text-sm text-red-500 text-right">{inputError}</p>
        )}
      </div>

      {/* Applied Coupons Display */}
      {(couponInfo?.validCoupons && couponInfo.validCoupons.length > 0) || 
       (couponInfo?.invalidCoupons && couponInfo.invalidCoupons.length > 0) ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 text-right">کدهای اعمال شده:</h4>

          {/* Valid Coupons */}
          {couponInfo?.validCoupons?.map((coupon) => (
            <div
              key={coupon.id}
              className="flex items-center justify-between rounded-lg border-2 border-green-500 bg-green-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500 p-1">
                  <Check className="text-white" size={16} />
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-800" style={{ letterSpacing: '1px' }}>
                    {coupon.code}
                  </p>
                  <p className="text-sm text-green-600">
                    {formatDiscount(coupon)}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                معتبر
              </span>
            </div>
          ))}

          {/* Invalid Coupons */}
          {couponInfo?.invalidCoupons?.map((coupon, index) => (
            <div
              key={`${coupon.couponId}-${index}`}
              className="flex items-center justify-between rounded-lg border-2 border-red-500 bg-red-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-500 p-1">
                  <AlertCircle className="text-white" size={16} />
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-800" style={{ letterSpacing: '1px' }}>
                    {coupon.code}
                  </p>
                  <p className="text-sm text-red-600">
                    {coupon.reason || 'کد تخفیف نامعتبر است'}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
                نامعتبر
              </span>
            </div>
          ))}

          {/* Total Discount Display */}
          {couponInfo?.totalDiscount > 0 && (
            <div className="mt-4 rounded-lg bg-purple-50 p-4 border-2 border-purple-300">
              <div className="flex items-center justify-between text-right">
                <span className="text-lg font-bold text-purple-800">
                  {couponInfo.totalDiscount.toLocaleString('fa-IR')} ریال
                </span>
                <span className="text-sm font-medium text-purple-700">
                  مجموع تخفیف:
                </span>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}