/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable style/multiline-ternary */
'use client';
const iranCity = require('iran-city');

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CircleCheckBig, Ban, ShoppingBasket, MapPinHouse, ArrowRight, Logs } from 'lucide-react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { getUserCartRequest } from '@/API/cart';
import { filterPriceNumber } from '@/utils/Helpers';
import { getSpecificOrderByIdRequest } from '@/API/order';
import toast from 'react-hot-toast';
import Link from 'next/link';
import OrderStatusSteps from '@/sections/order/OrderStatusSteps';

// import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product?: any;
  course?: any;
}

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CheckoutPage />
    </Suspense>
  );
};

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<'waiting' | 'order_accepted' | 'delivered' | 'finish'>('waiting');
  const paymentStatus = searchParams.get('payment_status'); // Get the payment status query
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>();

  // const queryClient = useQueryClient();

  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (!orderId) {
      toast.error('مشکلی از سمت سرور به وجود آمده');
    }
  }, []);

  // get order_id from URL query
  // then send API request for getting order 
  // retrive list of products
  // selected address for this order
  // payment_status

  // Get Cartd Items from API
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    // @ts-expect-error
    queryFn: async () => getSpecificOrderByIdRequest({ orderId }),
    enabled: !!orderId,
    queryKey: ['order'], //Array according to Documentation
  });

  // Simulate order data fetching
  useEffect(() => {
    if (data?.data && isSuccess) {
      if (Array.isArray(data?.data?.products) && data?.data?.products?.length !== 0) {
        console.log(data.data.products);
        setCartItems(data.data.products);
      }

      if (data?.data?.shippingAddress) {
        setSelectedAddress(data?.data?.shippingAddress);
      }

      setOrderStatus(data?.data?.status);
    }
    console.log({ cos: data });
    // Mock data (replace with actual API call)
  }, [data, isSuccess]);

  const findCityName = (cityId) => {
    if (cityId) {
      console.log({ azadeh: iranCity.cityById(Number.parseInt(cityId)) });
      return iranCity.cityById(Number.parseInt(cityId));
    }

    return '';
  };

  const orderStatusMap = {
    waiting: {
      title: 'وضعیت سفارش : در انتظار تایید',
      describe: 'سفارش شما در سیستم  ثبت شده است, همکاران ما بعد از بررسی سفارش و تایید سفارش اقدام به ارسال محصولات شما میکنند',
    },
    confirmed: {
      title: 'وضعیت سفارش : سفارش شما ثبت شده',
      describe: 'سفارش شما بعد از بررسی تایید شده و همکاران ما در حال آماده سازی سفارش هستند',
    },
    delivered: {
      title: 'وضعیت سفارش : سفارش شما ارسال شده',
      describe: 'سفارش شما تحویل پست داده شده و منتظر ارسال آن باشید',
    },
    finish: {
      title: '',
      describe: '',
    },
  };

  const orderHaveShiping = data?.data?.shippingAddress;
  // console.log({ orderHaveShiping });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6" dir="rtl">
      {/* Payment Status Section */}
      <div className="mb-6 w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div
          className={clsx(
            'p-6 text-center',
            paymentStatus === 'paid' ? 'bg-green-700 text-white' : 'bg-red-700 text-white',
          )}
        >
          {paymentStatus === 'paid' ? (
            <>
              <CircleCheckBig size={60} className=" mx-auto mb-2" />
              <h2 className="mb-1 text-lg font-semibold">پرداخت با موفقیت انجام شد</h2>
              <p>سفارش شما با موفقیت ثبت شد.</p>
            </>
          )
            : (
                <>
                  <Ban size={60} className="mx-auto mb-2 text-4xl" />
                  <h2 className="text-lg font-semibold">پرداخت ناموفق بود</h2>
                  <p>لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.</p>
                </>
              )}
        </div>
      </div>

      {/* Order Details Section */}
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="pink-gradient-bg bg-gradient-to-r p-6 text-white">

          <div
            className="cursor-pointer select-none space-y-2 text-center active:opacity-80"
            onClick={() => {
              if (data?.data?.reference) {
                navigator.clipboard.writeText(data.data.reference);
                toast.success('کد پیگیری کپی شد');
              }
            }}
            title={data?.data?.reference ? 'کپی کد پیگیری سفارش' : ''}
          >
            <h3>کد پیگیری سفارش</h3>
            <h2 className="text-base font-bold md:text-xl">{data?.data?.reference && data?.data?.reference}</h2>
          </div>
        </div>

        {/* Cart Items Section */}
        <section className="p-6">

          {/* API LOADING */}

          {isLoading && (
            <div className="flex w-full items-center justify-center py-28">
              <div className="size-5 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></div>
            </div>
          )}

          {data && (

            <>

              {paymentStatus === 'paid' && (
                <section className="px-0 py-6 md:px-6">
                  <div className="mb-12 text-right text-sm text-gray-500">
                    <div className="font-semibold">
                      {orderStatusMap[data?.data.status as keyof typeof orderStatusMap].title}
                    </div>

                    <div className="mt-2 text-xs leading-6">
                      {orderStatusMap[data?.data.status as keyof typeof orderStatusMap].describe}
                    </div>
                  </div>
                  <OrderStatusSteps withShipping={!!orderHaveShiping} orderStatus={orderStatus} />
                </section>
              )}

              <h2 className="mb-4 flex text-lg font-semibold text-gray-700">
                <span className="ml-2">
                  <ShoppingBasket size={25} />
                </span>
                سبد خرید

              </h2>
              <table className="w-full overflow-hidden rounded-md border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-right text-xs text-gray-700 md:text-base">
                    <th className="px-4 py-3">کالا</th>
                    <th className="px-2 py-3 md:px-4">تعداد</th>
                    <th className="hidden px-4 py-3 md:table-cell">قیمت</th>
                    <th className="px-4 py-3">مجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems && cartItems.length > 0 && cartItems.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-xs transition hover:bg-gray-50 md:text-sm"
                    >
                      {item?.product && (
                        <td className="px-4 py-3 text-[10px] md:text-sm">
                          {' '}
                          محصول
                          {' '}
                          {item.product.title || ''}
                        </td>
                      )}

                      {item?.course && (
                        <td className="px-4 py-3 text-[10px] md:text-sm">
                          {' '}
                          دوره
                          {' '}
                          {item.course.title || ''}
                        </td>
                      )}

                      <td className="px-4 py-3">{Number.parseInt(item.quantity).toLocaleString('fa')}</td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        {item.price.toLocaleString('fa')}
                        {' '}
                        ریال
                      </td>
                      <td className="px-4 py-3 text-[10px] md:text-sm">
                        {(item.price * item.quantity).toLocaleString('fa')}
                        {' '}
                        ریال
                        <div className="mt-1 text-[9px] text-gray-400 md:text-xs">
                          {item.price.toLocaleString('fa')}
                          {' '}
                          <span className="mx-1">×</span>
                          {' '}
                          {Number.parseInt(item.quantity).toLocaleString('fa')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>

        {/* Selected Address Section */}
        {data && selectedAddress && (
          <section className="border-t border-gray-200 p-6 ">
            <h2 className="mb-4 flex text-lg font-semibold text-gray-700">
              <span className="ml-2">
                <MapPinHouse size={25} />
              </span>

              آدرس انتخاب شده

            </h2>
            <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-xs leading-7 text-gray-600">
              <div className="mb-2 text-xs font-semibold">
                {`${findCityName(selectedAddress?.billingAddress.state).name} - ${findCityName(selectedAddress?.billingAddress.state).province_name}`}
              </div>

              <div className="pl-4">
                {selectedAddress?.billingAddress?.addressLine1}
              </div>

              <p className="text-[11px] text-gray-600">{`کد پستی: ${selectedAddress?.billingAddress?.postalCode}`}</p>

            </div>
          </section>
        )}

        {/* Order Total and Actions */}
        {data && (
          <section className="flex flex-col items-end border-t border-gray-200 p-6">
            <div className="mb-4 flex w-full justify-between text-lg text-gray-700">
              <span className="font-semibold">مجموع:</span>
              <span className="font-bold">
                {data?.data?.totalAmount && filterPriceNumber(data?.data?.totalAmount)}
                &nbsp; تومان&nbsp;
              </span>
            </div>

            <div className="mt-8 gap-4  flex w-full justify-center">
              <Link href="/" >
                <button
                  type="button"
                  className={clsx(
                    'rounded-md flex items-center justify-center gap-2 text-xs md:text-base px-6 py-2 font-semibold text-white',
                    'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  )}
                >
                  <ArrowRight size={20} />
                  بازگشت
                </button>
              </Link>


              <Link href={`/dashboard/orders/${data?.data?._id}`} >
                <button
                  type="button"
                  className={clsx(
                    'rounded-md flex items-center justify-center gap-2 text-xs md:text-base px-6 py-2 font-semibold text-white',
                    'pink-gradient-bg hover:bg-primary/90',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  )}
                >
                  <Logs size={20} />
                  جزئیات سفارش
                </button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Page;
