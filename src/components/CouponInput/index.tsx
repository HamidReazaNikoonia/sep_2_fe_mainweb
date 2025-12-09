'use client';

import clsx from 'clsx';
import { AlertCircle, Check, CirclePlus, Loader2 } from 'lucide-react';
import { useState, type Key } from 'react';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

type ValidCoupon = {
  id: Key | null | undefined;
  discount_type: string;
  discount_value: any;
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
  isLoading?: boolean;
};

export default function CouponInput({ onApplyCoupon, couponResult, isLoading = false }: CouponInputProps) {
  const [code, setCode] = useState('');

  const isLessThan300Screen = useResponsiveEvent(350, 0);

  const handleApplyCoupon = async () => {
    if (!code.trim()) {
      return;
    }

    try {
      await onApplyCoupon(code);
      // Reset the input after successful submission
      setCode('');
    } catch {
      // Handle error if needed, but don't reset the input
      // so user can correct the code
    }
  };

  // Check if there are any applied coupons to display
  const hasAppliedCoupons = couponResult
    && (couponResult.valid?.length > 0 || couponResult.invalid?.length > 0);

  return (
    <div className="pb-4">
      <h3 className="mb-1 text-lg font-medium"> کد تخفیف</h3>
      <p className="mb-4 text-xs text-gray-500">
        کد تخفیف یا کد معرف را میتوانید اعمال کنید.
      </p>

      {/* Applied Coupons Display Section */}
      {hasAppliedCoupons && (
        <div className="mb-6 mt-1">
          <h4 className="mb-3 text-xs font-medium text-gray-800 md:text-sm">کدهای تخفیف اعمال شده</h4>
          <div className="space-y-2">
            {/* Valid Coupons */}
            {couponResult?.valid?.map(validCoupon => (
              <div
                key={validCoupon?.id}
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
                      {validCoupon.discount_type === 'FIXED_AMOUNT'
                        ? (
                            <>
                              {validCoupon?.discount_value?.toLocaleString('fa-IR')}
                              {' '}
                              ریال
                            </>
                          )
                        : validCoupon.discount_type === 'PERCENTAGE'
                          ? (
                              <>
                                {validCoupon?.discount_value}
                                ٪
                              </>
                            )
                          : (
                              null
                            )}
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
                className="flex items-center justify-between rounded-lg border border-red-600/30 bg-red-600/40 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="size-5 text-red-900" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-red-900 md:text-base" style={{ letterSpacing: '1px' }}>
                      {invalidCoupon.code}
                    </span>
                    {invalidCoupon.reason && (
                      <span className="text-xs text-red-800 md:text-sm">
                        {invalidCoupon.reason}
                      </span>
                    )}
                  </div>
                </div>
                <span className="rounded-full bg-red-600/80 px-3 py-1 text-xs font-medium text-white">
                  نامعتبر
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coupon Input Form Section */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-normal text-gray-900">
          <CirclePlus className="size-5 text-gray-600" />
          <span>افزودن کد تخفیف (کد معرف)</span>
        </h4>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex flex-1 items-center">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && code.trim() && !isLoading) {
                  handleApplyCoupon();
                }
              }}
              placeholder="کد تخفیف را وارد کنید"
              className={clsx(
                'max-w-[60%] rounded-r-lg border border-gray-600 bg-gray-100 px-3 py-2 text-gray-800 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 sm:flex-1',
                {
                  'text-[12px]': isLessThan300Screen,
                  'w-full max-w-full': !isLessThan300Screen,
                },
              )}
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={!code.trim() || isLoading}
              className={clsx(
                'rounded-l-lg border border-r-0 border-gray-600 bg-purple-600 px-4 py-2 text-white hover:bg-purple-700',
                'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500',
                {
                  'text-[12px]': isLessThan300Screen,
                },
              )}
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'اعمال'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}