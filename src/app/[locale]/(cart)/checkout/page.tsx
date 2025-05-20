'use client';
const iranCity = require('iran-city');

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CircleCheckBig, Ban, ShoppingBasket, MapPinHouse } from 'lucide-react';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
}

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<"waiting" | "order_accepted" | "delivered" | "finish">("waiting")
  const paymentStatus = searchParams.get('payment_status'); // Get the payment status query
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>();


  // const queryClient = useQueryClient();

  const orderId = searchParams.get('order_id');



  useEffect(() => {
    if (!orderId) {
      toast.error('مشکلی از سمت سرور به وجود آمده')
    }

  }, [])


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
    queryKey: ["order"], //Array according to Documentation
  });


  // Simulate order data fetching
  useEffect(() => {
    if (data?.data && isSuccess) {
      if (Array.isArray(data?.data?.products) && data?.data?.products?.length !== 0) {
        console.log(data.data.products)
        setCartItems(data.data.products);
      }

      if (data?.data?.shippingAddress) {
        setSelectedAddress(data?.data?.shippingAddress)
      }

      setOrderStatus(data?.data?.status)
    }
    console.log({ cos: data });
    // Mock data (replace with actual API call)

  }, [data, isSuccess]);


  const findCityName = (cityId) => {
    if (cityId) {
      console.log({ azadeh: iranCity.cityById(parseInt(cityId)) })
      return iranCity.cityById(parseInt(cityId));
    }

    return '';

  }


  const orderStatusMap = {
    waiting: {
      title: 'وضعیت سفارش : در انتظار تایید',
      describe: 'سفارش شما در سیستم  ثبت شده است, همکاران ما بعد از بررسی سفارش و تایید سفارش اقدام به ارسال محصولات شما میکنند'
    },
    confirmed: {
      title: 'وضعیت سفارش : سفارش شما ثبت شده',
      describe: 'سفارش شما بعد از بررسی تایید شده و همکاران ما در حال آماده سازی سفارش هستند'
    },
    delivered: {
      title: 'وضعیت سفارش : سفارش شما ارسال شده',
      describe: 'سفارش شما تحویل پست داده شده و منتظر ارسال آن باشید'
    },
    finish: {
      title: '',
      describe: ''
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6" dir="rtl">
      {/* Payment Status Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <div
          className={clsx(
            'p-6 text-center',
            paymentStatus === 'paid' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
          )}
        >
          {paymentStatus === 'paid' ? (
            <>
              <CircleCheckBig size={60} className=" mx-auto mb-2" />
              <h2 className="text-lg font-semibold mb-1">پرداخت با موفقیت انجام شد</h2>
              <p>سفارش شما با موفقیت ثبت شد.</p>
            </>
          ) : (
            <>
              <Ban size={60} className="text-4xl mx-auto mb-2" />
              <h2 className="text-lg font-semibold">پرداخت ناموفق بود</h2>
              <p>لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.</p>
            </>
          )}
        </div>
      </div>

      {/* Order Details Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">

          <div className='text-center space-y-2'>
            <h3>کد پیگیری سفارش</h3>
            <h2 className='font-bold text-md' >{data?.data?.reference && data?.data?.reference}</h2>
          </div>
        </div>






        {/* Cart Items Section */}
        <section className="p-6">

          {/* API LOADING */}

          {isLoading && (
            <div className="w-full flex items-center justify-center py-28">
              <div className="w-5 h-5 border-2 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}


          {data && (

            <>


              {paymentStatus === 'paid' && (
                <section className='py-6 px-0 md:px-6'>
                  <div className='text-sm text-right mb-12 text-gray-500'>
                    <div className='font-semibold'>
                      {orderStatusMap[data?.data.status].title}
                    </div>

                    <div className='mt-2 text-xs leading-6'>
                      {orderStatusMap[data?.data.status].describe}
                    </div>
                  </div>
                  <OrderStatusSteps orderStatus={orderStatus} />
                </section>
              )}


              <h2 className="text-lg flex font-semibold text-gray-700 mb-4">
                <span className='ml-2'>
                  <ShoppingBasket size={25} />
                </span>
                سبد خرید

              </h2>
              <table className="w-full border border-gray-200 rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-right text-xs md:text-md">
                    <th className="px-4 py-3">کالا</th>
                    <th className="px-2 md:px-4 py-3">تعداد</th>
                    <th className="px-4 py-3 hidden md:table-cell">قیمت</th>
                    <th className="px-4 py-3">مجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t text-xs md:text-sm border-gray-200 hover:bg-gray-50 transition"
                    >
                      {item?.product && (
                        <td className="px-4 py-3"> محصول  {item.product.title || ''}</td>
                      )}

                      {item?.course && (
                        <td className="px-4 py-3"> دوره {item.course.title || ''}</td>
                      )}

                      <td className="px-4 py-3">{parseInt(item.quantity).toLocaleString('fa')}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {item.price.toLocaleString('fa')} تومان
                      </td>
                      <td className="px-4 py-3">
                        {(item.price * item.quantity).toLocaleString('fa')} تومان
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
          <section className="p-6 border-t border-gray-200 ">
            <h2 className="text-lg flex font-semibold text-gray-700 mb-4">
              <span className='ml-2'>
                <MapPinHouse size={25} />
              </span>

              آدرس انتخاب شده

            </h2>
            <div className="p-4 text-xs bg-gray-50 border leading-7 border-gray-200 rounded-md text-gray-600">
              <div className='text-xs mb-2 font-semibold'>
                {`${findCityName(selectedAddress?.billingAddress.state).name} - ${findCityName(selectedAddress?.billingAddress.state).province_name}`}
              </div>

              <div className='pl-4'>
                {selectedAddress?.billingAddress?.addressLine1}
              </div>

              <p className="text-[11px] text-gray-600">{`کد پستی: ${selectedAddress?.billingAddress?.postalCode}`}</p>

            </div>
          </section>
        )}

        {/* Order Total and Actions */}
        {data && (
          <section className="p-6 border-t border-gray-200 flex flex-col items-end">
            <div className="flex justify-between w-full text-gray-700 text-lg mb-4">
              <span className="font-semibold">مجموع:</span>
              <span className="font-bold">
                {data?.data?.totalAmount && filterPriceNumber(data?.data?.totalAmount)}
                &nbsp; تومان&nbsp;
              </span>
            </div>


            <div className='w-full  mt-8 flex justify-center'>
              <Link href='/' >
                <button
                  className={clsx(
                    'px-12 py-3 rounded-md font-semibold text-white',
                    'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  )}
                >
                  بازگشت
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
