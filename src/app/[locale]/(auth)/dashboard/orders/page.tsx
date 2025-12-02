/* eslint-disable react/no-array-index-key */
'use client';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { ArrowRight, BadgeCheck, Ban, BookOpenCheck, CircleCheckBig, Clock, Flag, Loader2, ShoppingBag, Truck, Undo2, Wallet } from 'lucide-react';

import moment from 'moment-jalaali';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getOrdersRequest } from '@/API/order';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// eslint-disable-next-line ts/consistent-type-imports
import { Order } from '@/types/Order';
import { filterPriceNumber } from '@/utils/Helpers';

// type OrderStatus = 'waiting' | 'confirmed' | 'shipped' | 'finish' | 'cancelled' | 'returned' | 'delivered';

const statusMap = {
  waiting: { status: 'waiting', label: 'در انتظار تایید', color: 'text-blue-800', icon: <Clock className="mr-2" color="blue" size={16} /> },
  confirmed: { status: 'confirmed', label: 'تایید', color: 'text-green-800', icon: <CircleCheckBig className="mr-2" color="green" size={16} /> },
  delivered: { status: 'delivered', label: 'دریافت', color: 'text-green-800', icon: <Flag className="mr-2" color="green" size={16} /> },
  shipped: { status: 'shipped', label: 'ارسال', color: 'text-green-800', icon: <Truck className="mr-2" color="green" size={16} /> },
  finish: { status: 'finish', label: 'اتمام سفارش', color: 'text-green-800', icon: <BadgeCheck className="mr-2" color="green" size={16} /> },
  cancelled: { status: 'cancelled', label: 'لغو شده', color: 'text-red-800', icon: <Ban className="mr-2" color="red" size={16} /> },
  returned: { status: 'returned', label: 'برگشت داده شده', color: 'text-red-800', icon: <Undo2 className="mr-2" color="red" size={16} /> },
};

moment.loadPersian({ usePersianDigits: true });

export default function OrdersPage() {
  const [orderData, setorderData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data, isLoading, isError, error, isSuccess } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrdersRequest,
  });

  useEffect(() => {
    if (data && Array.isArray(data?.data)) {
      setorderData(data?.data);
    }
  }, [isSuccess, data]);

  // Filter orders based on selected category
  const filteredOrders = orderData.filter((order: Order) => {
    if (selectedCategory === 'all') {
      return true;
    }
    return order.status === selectedCategory;
  });

  // Category buttons configuration
  const categories = [
    { key: 'all', label: 'همه', mobile: true, desktop: true },
    { key: 'waiting', label: 'در انتظار', mobile: true, desktop: true },
    { key: 'confirmed', label: 'تایید شده', mobile: true, desktop: true },
    { key: 'shipped', label: 'ارسال شده', mobile: true, desktop: true },
    { key: 'finish', label: 'اتمام یافته', mobile: false, desktop: true },
    { key: 'cancelled', label: 'لغو شده', mobile: false, desktop: true },
    { key: 'returned', label: 'برگشت داده', mobile: false, desktop: true },
  ];

  if (isLoading) {
    return (
      <Card className="min-h-svh">
        <CardHeader>
          <CardTitle>سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4 text-center">در حال دریافت اطلاعات...</div>
          <Loader2 className="mx-auto size-10 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4 text-center text-red-500">
            خطا در دریافت اطلاعات:
            {' '}
            {error?.message}
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="mx-2 mb-12 md:mx-8">
      <CardHeader>
        <CardTitle dir="rtl">سفارشات</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Category Filter Buttons */}
        <div className="mb-6" dir="rtl">
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {categories.map(category => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                size="sm"
                className={clsx(
                  'text-xs transition-all duration-200',
                  selectedCategory === category.key
                    ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                    : 'hover:bg-gray-50',
                  // Hide desktop-only categories on mobile
                  !category.mobile && 'hidden lg:inline-flex',
                  // Hide mobile categories on desktop if specified
                  !category.desktop && 'lg:hidden',
                )}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
                {selectedCategory === category.key && (
                  <span className="mr-1 text-xs">
                    (
                    {filteredOrders.filter((order: Order) =>
                      category.key === 'all' ? true : order.status === category.key,
                    ).length}
                    )
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
        {/* Table View - Hidden on mobile, visible on lg and above */}
        <div dir="rtl" className="hidden overflow-x-auto lg:block">
          <Table className="text-right">
            <TableHeader>
              <TableRow>
                <TableHead>تاریخ</TableHead>
                <TableHead>مجموع</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="text-center">جزئیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredOrders && filteredOrders?.length > 0) && filteredOrders?.map((order: Order) => (
                <TableRow key={order._id}>
                  <TableCell className="text-xs">{order.createdAt && moment(order?.createdAt).format('jYYYY jMMMM jD')}</TableCell>
                  <TableCell className="text-xs">
                    {order.totalAmount && filterPriceNumber(order.totalAmount)}
                    {' '}
                    تومان
                  </TableCell>
                  <TableCell className={clsx('flex items-center justify-start text-xs leading-8', statusMap[order.status as keyof typeof statusMap]?.color)}>
                    {statusMap[order.status as keyof typeof statusMap] && statusMap[order.status as keyof typeof statusMap].label }
                    {' '}
                    {statusMap[order.status as keyof typeof statusMap] && statusMap[order.status as keyof typeof statusMap].icon }
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/dashboard/orders/${order._id}`}>
                      <Button variant="outline" className="text-xs ">
                        مشاهده جزئیات
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Card View - Visible on mobile, hidden on lg and above */}
        <div className="space-y-4 lg:hidden" dir="rtl">
          {(filteredOrders && filteredOrders?.length > 0) && filteredOrders?.map((order: Order) => (
            <Card key={order._id} className="border border-pink-300 shadow-sm">
              <CardContent className="p-4">
                {/* Reference at top center */}
                <div className="mb-4 text-center">
                  <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800">
                    کد پیگیری:
                    {' '}
                    {order.reference}
                  </div>
                </div>

                {/* Header with date and animated status */}
                <div className="mb-3 flex items-start justify-between">
                  <div className="text-sm text-gray-600">
                    {order.createdAt && moment(order?.createdAt).format('jYYYY jMMMM jD')}
                  </div>
                  <div className={clsx(
                    'flex items-center rounded-full px-2 py-1 text-sm',
                    statusMap[order.status as keyof typeof statusMap]?.color,
                    (order.status === 'waiting' || order.status === 'confirmed' || order.status === 'shipped') && 'animate-pulse bg-blue-50',
                  )}
                  >
                    {statusMap[order.status as keyof typeof statusMap]?.icon}
                    &nbsp;
                    {statusMap[order.status as keyof typeof statusMap]?.label}
                  </div>
                </div>

                {/* Order details */}
                <div className="mb-4 space-y-2 rounded-lg border border-dashed border-gray-400 px-1.5 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">جمع محصولات:</span>
                    <span className="text-sm font-medium">
                      {order.total && filterPriceNumber(order.total)}
                      {' '}
                      ریال
                    </span>
                  </div>
                  {order?.shippingAddress && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">هزینه ارسال:</span>
                      <span className="text-sm font-medium">
                        {order.deliveryFees && filterPriceNumber(order.deliveryFees)}
                        {' '}
                        ریال
                      </span>
                    </div>
                  )}
                  {order?.taxes && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">مالیات:</span>
                      <span className="text-sm font-medium">
                        {order.taxes && filterPriceNumber(order.taxes)}
                        {' '}
                        ریال
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">مبلغ پرداختی:</span>
                    <span className="text-sm font-medium">
                      {order.totalAmount && filterPriceNumber(order.totalAmount)}
                      {' '}
                      ریال
                    </span>
                  </div>
                </div>

                {/* Products section */}
                {order.products && order.products.length > 0 && (
                  <div className="mb-4 mt-6">
                    <h4 className="mb-2 text-center text-sm font-medium text-gray-700">محصولات سفارش:</h4>
                    <div className="space-y-2">
                      {order.products.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                          <div className="flex items-center gap-2">
                            {item.product && (
                              <>
                                <span className="inline-flex items-center gap-1.5 text-xs">
                                  <ShoppingBag className="size-3.5 text-purple-500" />
                                  {item.product.title}

                                </span>
                                {item.quantity && (
                                  <span className="text-xs text-gray-500">
                                    ×
                                    {item.quantity}
                                  </span>
                                )}
                              </>
                            )}
                            {item.course && (
                              <span className="inline-flex items-center gap-1.5 text-xs">
                                <BookOpenCheck className="size-3.5 text-purple-500" />
                                {item.course.title}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {item.product && (
                              <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-[10px] text-purple-800">
                                محصول
                              </span>
                            )}
                            {item.course && (
                              <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-[10px] text-purple-800">
                                دوره
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {order.shippingAddress && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      <Truck className="size-4" />
                      <span className="">
                        مرسوله پستی
                      </span>
                    </div>
                  )}
                  {!!order?.used_wallet_amount && Number(order?.used_wallet_amount) > 0 && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      <Wallet className="size-4" />
                      <span className="">
                        پرداخت از کیف پول
                      </span>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="flex justify-center">
                  <Link href={`/dashboard/orders/${order._id}`} className="w-full">
                    <button
                      type="button"
                      className="pink-gradient-bg flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-50"
                    >
                      <ArrowRight className="size-4" />
                      <span>مشاهده جزئیات</span>
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredOrders?.length === 0 && (
          <div className="mt-4 py-4 text-center text-xs text-gray-500 md:text-sm">
            {selectedCategory === 'all' ? 'هیچ سفارشی یافت نشد' : `هیچ سفارشی با وضعیت "${categories.find(c => c.key === selectedCategory)?.label}" یافت نشد`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
