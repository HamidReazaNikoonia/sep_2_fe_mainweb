'use client';

import clsx from 'clsx';
import { AlertCircle, Check, CirclePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

type ValidCoupon = {
  couponId: string;
  discountAmount: number;
  code: string;
};

type InvalidCoupon = {
  code: string;
  reason?: string;
};

type CouponResult = {
  valid: ValidCoupon[];
  invalid: InvalidCoupon[];
};

type CouponInputProps = {
  onApplyCoupon: (code: string) => Promise<boolean>;
  couponResult?: CouponResult;
};

type CouponState = {
  id: string;
  code: string;
  status: 'idle' | 'success' | 'error';
  discountAmount?: number;
};

export default function CouponInput({ onApplyCoupon, couponResult }: CouponInputProps) {
  const [coupons, setCoupons] = useState<CouponState[]>([
    { id: '1', code: '', status: 'idle' },
  ]);

  const isLessThan300Screen = useResponsiveEvent(350, 0);

  // Update coupon states based on server response
  useEffect(() => {
    if (couponResult) {
      setCoupons(prev => prev.map((coupon) => {
        // Check if this coupon is in the valid list
        const validCoupon = couponResult.valid?.find(v => v.code === coupon.code);
        if (validCoupon) {
          return {
            ...coupon,
            status: 'success' as const,
            discountAmount: validCoupon.discountAmount,
          };
        }

        // Check if this coupon is in the invalid list
        const invalidCoupon = couponResult.invalid?.find(i => i.code === coupon.code);
        if (invalidCoupon) {
          return { ...coupon, status: 'error' as const };
        }

        return coupon;
      }));
    }
  }, [couponResult]);

  const handleInputChange = (id: string, value: string) => {
    setCoupons(prev => prev.map(coupon =>
      coupon.id === id
        ? { ...coupon, code: value, status: 'idle' }
        : coupon,
    ));
  };

  const handleApplyCoupon = async (id: string) => {
    const coupon = coupons.find(c => c.id === id);
    if (!coupon || !coupon.code.trim()) {
      return;
    }

    try {
      await onApplyCoupon(coupon.code);
      // Note: The status will be updated via the useEffect when couponResult changes
    } catch {
      setCoupons(prev => prev.map(c =>
        c.id === id
          ? { ...c, status: 'error' }
          : c,
      ));
    }
  };

  // const addNewCouponInput = () => {
  //   const newId = (coupons.length + 1).toString();
  //   setCoupons(prev => [...prev, { id: newId, code: '', status: 'idle' }]);
  // };

  const removeCouponInput = (id: string) => {
    if (coupons.length > 1) {
      setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    }
  };

  // Check if there are any applied coupons to display
  const hasAppliedCoupons = couponResult
    && (couponResult.valid?.length > 0 || couponResult.invalid?.length > 0);

  return (
    <div className="pb-4">
      <h3 className="mb-4 text-lg font-medium">کد تخفیف</h3>

      {/* Applied Coupons Display Section */}
      {hasAppliedCoupons && (
        <div className="mb-6">
          <h4 className="mb-3 text-xs md:text-sm font-medium text-gray-800">کدهای تخفیف اعمال شده</h4>
          <div className="space-y-2">
            {/* Valid Coupons */}
            {couponResult?.valid?.map(validCoupon => (
              <div
                key={validCoupon.couponId}
                className="relative flex items-center justify-between rounded-lg border border-green-600/10 bg-green-700/20 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Check className="size-4 text-green-800 md:size-6" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-green-800 md:text-base" style={{ letterSpacing: '1px' }}>
                      {validCoupon.code}
                    </span>
                    <span className="text-xs text-green-700 md:text-base">
                      تخفیف:
                      {' '}
                      {validCoupon.discountAmount.toLocaleString('fa-IR')}
                      {' '}
                      ریال
                    </span>
                  </div>
                </div>
                <span className=" absolute left-[-10px]  top-[-10px]  rounded-full bg-green-600/80 px-3 py-1 text-[10px] font-medium text-green-300 md:static md:text-base">
                  معتبر
                </span>
              </div>
            ))}

            {/* Invalid Coupons */}
            {couponResult?.invalid?.map((invalidCoupon, index) => (
              <div
                key={`invalid-${invalidCoupon.code}-${index}`}
                className="flex items-center justify-between rounded-lg border border-red-600/30 bg-red-600/20 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="size-5 text-red-400" />
                  <div className="flex flex-col">
                    <span className="font-medium text-red-300" style={{ letterSpacing: '1px' }}>
                      {invalidCoupon.code}
                    </span>
                    {invalidCoupon.reason && (
                      <span className="text-sm text-red-400">
                        {invalidCoupon.reason}
                      </span>
                    )}
                  </div>
                </div>
                <span className="rounded-full bg-red-600/30 px-3 py-1 text-xs font-medium text-red-300">
                  نامعتبر
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coupon Input Form Section */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <CirclePlus className="size-5 text-gray-600" />
          <span>افزودن کد تخفیف جدید</span>
        </h4>

        {coupons.map(coupon => (
          <div key={coupon.id} className="mb-4 flex items-center gap-2">
            <div className="flex flex-1 items-center">
              <input
                type="text"
                value={coupon.code}
                onChange={e => handleInputChange(coupon.id, e.target.value)}
                placeholder="کد تخفیف را وارد کنید"
                className={clsx(
                  'max-w-[60%] rounded-r-lg border bg-gray-100 px-3 py-2 text-gray-800 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 sm:flex-1',
                  {
                    'border-red-500': coupon.status === 'error',
                    'border-green-500': coupon.status === 'success',
                    'border-gray-600': coupon.status === 'idle',
                    'text-[12px]': isLessThan300Screen,
                    'w-full max-w-full': !isLessThan300Screen,
                  },
                )}
                disabled={coupon.status === 'success'}
              />

              {coupon.status === 'success'
                ? (
                  <div className="flex items-center gap-2 rounded-r-lg border border-l-0 border-green-500 bg-gray-800 px-3 py-2">
                    <Check className="size-5 text-green-500" />
                    <div className="flex flex-col text-sm text-green-500">
                      <span>اعمال شد</span>
                      {coupon.discountAmount && (
                        <span className="text-xs">
                          تخفیف:
                          {' '}
                          {coupon.discountAmount.toLocaleString('fa-IR')}
                          {' '}
                          ریال
                        </span>
                      )}
                    </div>
                  </div>
                )
                : (
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon(coupon.id)}
                    disabled={!coupon.code.trim()}
                    className={clsx(
                      'rounded-l-lg border border-r-0 px-4 py-2 text-white hover:bg-purple-700',
                      'disabled:cursor-not-allowed disabled:bg-gray-500',
                      {
                        'border-red-500 bg-blue-600': coupon.status === 'error',
                        'border-gray-600 bg-purple-600': coupon.status !== 'error',
                        'text-[12px]': isLessThan300Screen,
                      },
                    )}
                  >
                    اعمال
                  </button>
                )}
            </div>

            {coupons.length > 1 && (
              <button
                type="button"
                onClick={() => removeCouponInput(coupon.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        ))}

        {/* <button
          type="button"
          onClick={addNewCouponInput}
          className="mt-2 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <Plus className="size-4" />
          افزودن کد تخفیف دیگر
        </button> */}
      </div>
    </div>
  );
}
