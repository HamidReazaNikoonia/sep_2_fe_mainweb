'use client';
import { Clock, CircleCheckBig, Truck, Flag } from "lucide-react"
import { useEffect, useState } from "react";
import moment from 'moment-jalaali';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getOrdersRequest } from "@/API/order";
import { Order } from "@/types/Order";
import clsx from "clsx";
import { filterPriceNumber } from "@/utils/Helpers";


type OrderStatus = "waiting" | "confirmed" | "delivered" | "finish"


const statusMap = {
  waiting: { status: "waiting", label: "بررسی", color: "text-blue-800", icon: <Clock className="mr-2" color="blue"  size={16} /> },
  confirmed: { status: "confirmed", label: "تایید", color: "text-green-800", icon: <CircleCheckBig  className="mr-2" color="green"  size={16} /> },
  delivered: { status: "delivered", label: "ارسال", icon: <Truck className="mr-2" color="blue"  size={16} /> },
  finish: { status: "finish", label: "دریافت", icon: <Flag className="mr-2" color="blue"  size={16} /> },
}

moment.loadPersian({ usePersianDigits: true });


export default function OrdersPage() {

  const [orderData, setorderData] = useState([])


  const { data, isLoading, isError, error, isSuccess } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrdersRequest
  })


  useEffect(() => {
    // @ts-expect-error
    if (data && Array.isArray(data?.data)) {
    // @ts-expect-error
      setorderData(data?.data)
    }
  }, [isSuccess, data])
  

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">در حال دریافت اطلاعات...</div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">
            خطا در دریافت اطلاعات: {error?.message}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-2 md:mx-8 mb-12">
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
                  <TableCell className="text-xs" >{order.totalAmount && filterPriceNumber(order.totalAmount)} تومان</TableCell>
                  <TableCell className={clsx("flex items-center justify-start leading-8",  statusMap[order.status].color )} >{statusMap[order.status] &&  statusMap[order.status].label }  {statusMap[order.status] &&  statusMap[order.status].icon }</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/dashboard/orders/${order._id}`} >
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
            <div className="text-center py-4 mt-4">هیچ سفارشی یافت نشد</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}