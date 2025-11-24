/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
const iranCity = require('iran-city');
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasket, MapPinHouse, ChevronRight, CircleCheckBig, Ban } from 'lucide-react';
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
import { toast } from "react-hot-toast";

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

  const { slug } = useParams<{ slug: string }>()
  console.log({ slug });

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
    ;

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
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        مشکلی پیش آمده لطفا صفحه رو دوباره رفرش کنید
      </div>
    )
  }

  const paymentStatus = data?.data?.paymentStatus || false;

  return (
    <div>
      {/* Order Details Section */}
      <div dir="rtl" className="mx-auto w-full overflow-hidden rounded-lg bg-white  shadow-lg">

        <div className="mb-4 mr-4 mt-2" dir="rtl">
          <Link href="/dashboard/orders">
            <Button variant="secondary">
              <span className="inline-flex items-center">
                <ChevronRight className="ml-2" size={18} />
                بازگشت به لیست سفارش ها
              </span>
            </Button>
          </Link>
        </div>

        <div className="pink-gradient-bg  bg-gradient-to-r p-6 text-white">

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
            <h3 className="text-xl font-bold">کد پیگیری سفارش</h3>
            <h2 className="text-2xl font-normal md:text-3xl">{data?.data?.reference && data?.data?.reference}</h2>
          </div>
        </div>

        {/* Payment Status Section */}
        <div className="mb-6 mt-1 w-full overflow-hidden bg-white shadow-lg">
          <div
            className={clsx(
              'p-6 text-center',
              paymentStatus === 'paid' ? 'green-gradient-bg text-white' : 'bg-red-700 text-white',
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
                    <p className="mt-2 text-sm font-thin">لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.</p>

                    <h3 className="mt-1 text-xs font-thin">
                      مبلغ پرداخت شده بعد از ۷۲ ساعت به حساب شما برگشت داده میشود, در غیر این صورت با پشتیبانی تماس بگیرید
                    </h3>
                  </>
                )}
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
                      {orderStatusMap[data?.data.status].title}
                    </div>

                    <div className="mt-2 text-xs leading-6">
                      {orderStatusMap[data?.data.status].describe}
                    </div>
                  </div>
                  <OrderStatusSteps withShipping={!!data?.data?.shippingAddress} orderStatus={orderStatus} />
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
                  <tr className="md:text-md bg-gray-100 text-right text-xs text-gray-700">
                    <th className="px-4 py-3">کالا</th>
                    <th className="px-2 py-3 md:px-4">تعداد</th>
                    <th className="hidden px-4 py-3 md:table-cell">قیمت</th>
                    <th className="px-4 py-3">مجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-xs transition hover:bg-gray-50 md:text-sm"
                    >
                      {item?.product && (
                        <td className="px-4 py-3"> محصول  {item.product.title || ''}</td>
                      )}

                      {item?.course && (
                        <td className="px-4 py-3"> دوره {item.course.title || ''}</td>
                      )}

                      <td className="px-4 py-3">{parseInt(item.quantity).toLocaleString('fa')}</td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        {item.price.toLocaleString('fa')} ریال
                      </td>
                      <td className="px-4 py-3">
                        {(item.price * item.quantity).toLocaleString('fa')} ریال
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

            <div className="mt-8  flex w-full justify-center">
              <Link href="/dashboard/orders">
                <button
                  type="button"
                  className={clsx(
                    'px-12 py-3 rounded-md font-semibold text-white',
                    'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
