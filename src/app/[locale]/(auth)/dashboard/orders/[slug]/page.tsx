'use client';
const iranCity = require('iran-city');
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasket, MapPinHouse } from 'lucide-react';
import { notFound, useParams } from "next/navigation";
import Link from "next/link";

import OrderStatusSteps from "@/sections/order/OrderStatusSteps";
import { Button } from "@/components/ui/button";

// utils
import { filterPriceNumber } from "@/utils/Helpers";


// Types
import { Order } from "@/types/Order";


// API
import { getSpecificOrderByIdRequest } from "@/API/order";


interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product?: any;
  course?: any;
}


type IpropOrderPage = {
  data: Order
}


export default function OrderPage() {


  const {slug} = useParams<{ slug: string }>()
  console.log({slug});

  if (!slug) {
    notFound()
  }

  const [orderStatus, setOrderStatus] = useState<"waiting" | "order_accepted" | "delivered" | "finish">("waiting")
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>();





  const { data, isLoading, isError, error, isSuccess } = useQuery<IpropOrderPage>({
    queryKey: ['orders', slug],
    queryFn: slug ? () => getSpecificOrderByIdRequest({ orderId: slug }) : undefined,
    enabled: !!slug,

  })

  // Simulate order data fetching
  useEffect(() => {
    if (data?.data && isSuccess) {
      if (Array.isArray(data?.data?.products) && data?.data?.products?.length !== 0) {
        console.log(data.data.products)
         // @ts-expect-error
        setCartItems(data.data.products);
      }

      if (data?.data?.shippingAddress) {
        setSelectedAddress(data?.data?.shippingAddress)
      }

      // @ts-expect-error
      setOrderStatus(data?.data?.status)
    }
    console.log({ cos: data });
    // Mock data (replace with actual API call)

  }, [data, isSuccess]);



  const findCityName = (cityId: any) => {
    if (cityId) {
      console.log({ azadeh: iranCity.cityById(parseInt(cityId)) })
      return iranCity.cityById(parseInt(cityId));
    }

    return '';

  }


  const orderStatusMap: { [key: string]: any } = {
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

  if (isError) {
    console.log(error);
    return (
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        مشکلی پیش آمده لطفا صفحه رو دوباره رفرش کنید
      </div>
    )
  }

  return (
    <div>
      {/* Order Details Section */}
      <div dir="rtl" className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="mb-4" dir="ltr">
        <Link href='/dashboard/orders' >
          <Button variant="secondary">
            بازگشت به لیست سفارش ها
          </Button>
        </Link>
        </div>

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


              {true && (
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
              <Link href='/dashboard/orders' >
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
  )
}

