'use client';

import { Check, Plus, X } from 'lucide-react';
import { useState } from 'react';

type CouponInputProps = {
  onApplyCoupon: (code: string) => Promise<boolean>;
};

type CouponState = {
  id: string;
  code: string;
  status: 'idle' | 'success' | 'error';
};

export default function CouponInput({ onApplyCoupon }: CouponInputProps) {
  const [coupons, setCoupons] = useState<CouponState[]>([
    { id: '1', code: '', status: 'idle' },
  ]);

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
      const success = await onApplyCoupon(coupon.code);
      setCoupons(prev => prev.map(c =>
        c.id === id
          ? { ...c, status: success ? 'success' : 'error' }
          : c,
      ));
    } catch {
      setCoupons(prev => prev.map(c =>
        c.id === id
          ? { ...c, status: 'error' }
          : c,
      ));
    }
  };

  const addNewCouponInput = () => {
    const newId = (coupons.length + 1).toString();
    setCoupons(prev => [...prev, { id: newId, code: '', status: 'idle' }]);
  };

  const removeCouponInput = (id: string) => {
    if (coupons.length > 1) {
      setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    }
  };

  return (
    <div className="mb-6 border-b border-gray-600 pb-4">
      <h3 className="mb-4 text-lg font-medium">کد تخفیف</h3>

      {coupons.map(coupon => (
        <div key={coupon.id} className="mb-4 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              value={coupon.code}
              onChange={e => handleInputChange(coupon.id, e.target.value)}
              placeholder="کد تخفیف را وارد کنید"
              className={`flex-1 rounded-lg border px-3 py-2 text-black ${
                coupon.status === 'error'
                  ? 'border-red-500'
                  : coupon.status === 'success'
                    ? 'border-green-500'
                    : 'border-gray-300'
              }`}
              disabled={coupon.status === 'success'}
            />

            {coupon.status === 'success'
              ? (
                  <div className="flex items-center gap-2">
                    <Check className="size-5 text-green-500" />
                    <span className="text-sm text-green-500">اعمال شد</span>
                  </div>
                )
              : (
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon(coupon.id)}
                    disabled={!coupon.code.trim()}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
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

      <button
        type="button"
        onClick={addNewCouponInput}
        className="mt-2 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
      >
        <Plus className="size-4" />
        افزودن کد تخفیف دیگر
      </button>
    </div>
  );
}
