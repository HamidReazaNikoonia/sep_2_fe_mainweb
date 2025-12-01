'use client';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { BadgeCheck, Ban, CircleCheckBig, Clock, Flag, Truck, Undo2 } from 'lucide-react';

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

  const { data, isLoading, isError, error, isSuccess } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrdersRequest,
  });

  useEffect(() => {
    if (data && Array.isArray(data?.data)) {
      setorderData(data?.data);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4 text-center">در حال دریافت اطلاعات...</div>
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
        <div dir="rtl" className="overflow-x-auto">
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
              {(orderData && orderData?.length > 0) && orderData?.map((order: Order) => (
                <TableRow key={order._id}>
                  <TableCell className="text-xs">{order.createdAt && moment(order?.createdAt).format('jYYYY jMMMM jD')}</TableCell>
                  <TableCell className="text-xs">
                    {order.totalAmount && filterPriceNumber(order.totalAmount)}
                    {' '}
                    تومان
                  </TableCell>
                  <TableCell className={clsx('flex items-center justify-start text-xs leading-8', statusMap[order.status].color)}>
                    {statusMap[order.status] && statusMap[order.status].label }
                    {' '}
                    {statusMap[order.status] && statusMap[order.status].icon }
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
          {orderData?.length === 0 && (
            <div className="mt-4 py-4 text-center">هیچ سفارشی یافت نشد</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
