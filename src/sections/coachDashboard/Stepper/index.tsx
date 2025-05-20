import clsx from 'clsx';
import React from 'react';

export default function Stepper({ activeStep = 0 }) {
  return (
    <div className="w-full">
      {/* Steper */}
      <div className="container mx-auto">
        <ol className="w-full items-center justify-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
          <li className={clsx(
            'flex items-center space-x-2.5 rtl:space-x-reverse',
            {
              'text-blue-600 font-semibold': activeStep === 0,
              'text-gray-500 font-medium': activeStep !== 0,
            },
          )}
          >
            <span className={clsx(
              'flex size-8 shrink-0 items-center justify-center rounded-full border',
              {
                'bg-blue-600 text-white': activeStep === 0,
                'border-gray-400 bg-transparent text-gray-500': activeStep !== 0,
              },
            )}
            >
              1
            </span>
            <span>
              <h3 className=" leading-8">اطلاعات مربی</h3>
              <p className="text-xs font-medium">لطفا اطلاعات را کامل کنید</p>
            </span>
          </li>

          <li className={clsx(
            'flex items-center space-x-2.5 rtl:space-x-reverse',
            {
              'text-blue-600 font-semibold': activeStep === 1,
              'text-gray-500 font-medium': activeStep !== 1,
            },
          )}
          >
            <span className={clsx(
              'flex size-8 shrink-0 items-center justify-center rounded-full border',
              {
                'bg-blue-600 text-white': activeStep === 1,
                'border-gray-400 bg-transparent text-gray-400': activeStep !== 1,
              },
            )}
            >
              2
            </span>
            <span>
              <h3 className=" leading-8">در خواست سطح</h3>
              <p className="text-xs font-medium">شما میتوانید سطح  خود را بالا ببرید</p>
            </span>
          </li>

          <li className={clsx(
            'flex items-center space-x-2.5 rtl:space-x-reverse',
            {
              'text-blue-600 font-semibold': activeStep === 2,
              'text-gray-500 font-medium': activeStep !== 2,
            },
          )}
          >
            <span className={clsx(
              'flex size-8 shrink-0 items-center justify-center rounded-full border',
              {
                'bg-blue-600 text-white': activeStep === 2,
                'border-gray-400 bg-transparent text-gray-500': activeStep !== 2,
              },
            )}
            >
              3
            </span>
            <span>
              <h3 className=" leading-8">دریافت گواهینامه</h3>
              <p className="text-xs font-medium">دریافت گواهینامه معتبر</p>
            </span>
          </li>
        </ol>

      </div>
    </div>
  );
}
