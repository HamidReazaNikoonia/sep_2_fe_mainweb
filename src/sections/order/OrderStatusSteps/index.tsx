import { BadgeCheck, Ban, CheckCircle2, Clock, Flag, Truck, Undo2 } from 'lucide-react';
import React from 'react';

type OrderStatus = 'waiting' | 'confirmed' | 'delivered' | 'finish' | 'cancelled' | 'returned' | 'shipped';
type OrderStatusStepsProps = {
  orderStatus: OrderStatus;
  withShipping?: boolean;
};

const steps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: 'waiting', label: 'بررسی', icon: <Clock className="size-6" /> },
  { status: 'confirmed', label: 'تایید', icon: <CheckCircle2 className="size-6" /> },
  { status: 'shipped', label: 'ارسال', icon: <Truck className="size-6" /> },
  { status: 'delivered', label: 'دریافت', icon: <Flag className="size-6" /> },

];

const OrderStatusSteps: React.FC<OrderStatusStepsProps> = ({ orderStatus, withShipping = false }) => {
  // Filter out "delivered" status when withShipping is true
  // console.log({ withShipping });
  const filteredSteps = !withShipping
    ? steps.filter(step => step.status !== 'shipped')
    : steps;

  const currentStepIndex = filteredSteps.findIndex(step => step.status === orderStatus);

  if (orderStatus === 'cancelled' || orderStatus === 'returned' || orderStatus === 'finish') {
    return (
      <div className="relative mx-auto flex w-full max-w-3xl items-center justify-between">
        <div className="flex flex-1 flex-col items-center">
          <div className="relative">
            <div className={`flex size-12 items-center justify-center rounded-full border-2 ${orderStatus === 'returned' ? 'border-red-500 bg-red-500 text-white' : orderStatus === 'cancelled' ? 'border-red-500 bg-red-500 text-white' : 'border-green-500 bg-green-500 text-white'}`}>
              {orderStatus === 'returned' && <Undo2 className="size-6" />}
              {orderStatus === 'cancelled' && <Ban className="size-6" />}
              {orderStatus === 'finish' && <BadgeCheck className="size-6" />}
            </div>
          </div>
          <span className="mt-2 text-xs font-medium text-red-500">
            {orderStatus === 'returned' && 'برگشت داده شده'}
            {orderStatus === 'cancelled' && 'لغو شده سفارش شما'}
            {orderStatus === 'finish' && 'اتمام سفارش شما'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-3xl items-center justify-between">
      {filteredSteps.map((step, index) => {
        const isCompleted = index <= currentStepIndex;
        const isActive = index === currentStepIndex;

        return (
          <React.Fragment key={step.status}>
            <div className="flex flex-1 flex-col items-center">
              <div className="relative">
                <div
                  className={`flex size-12 items-center justify-center rounded-full border-2 ${
                    isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-white text-gray-500'
                  } ${isActive ? 'ring-4 ring-green-200' : ''} relative z-10`}
                >
                  {step.icon}
                </div>
              </div>
              <span className={`mt-2 text-xs font-medium ${isCompleted ? 'text-green-500' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {/* {index < filteredSteps.length - 1 && (
              <div className="absolute top-6 left-0 right-0 flex items-center justify-center z-0">
                <div className="w-full h-0.5">
                  <div className={`h-full ${index < currentStepIndex ? "bg-green-500" : "bg-gray-300"}`} />
                </div>
              </div>
            )} */}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatusSteps;
