/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';

import type { Ticket, TicketFilterParams } from '@/API/ticket/types';
// import { format } from 'date-fns';
// import { fa } from 'date-fns/locale';
import { CheckCircle, ChevronLeft, ChevronRight, Clock, MessageCircle, X, Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTickets } from '@/API/ticket/ticket.hook';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Status colors and icons
const getStatusConfig = (status: Ticket['status']) => {
  switch (status) {
    case 'open':
      return { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'باز' };
    case 'in_progress':
      return { color: 'bg-yellow-100 text-yellow-800', icon: MessageCircle, label: 'در حال بررسی' };
    case 'resolved':
      return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'حل شده' };
    case 'closed':
      return { color: 'bg-gray-100 text-gray-800', icon: X, label: 'بسته شده' };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: status };
  }
};

// Priority colors
const getPriorityConfig = (priority: Ticket['priority']) => {
  switch (priority) {
    case 'low':
      return { color: 'bg-gray-100 text-gray-800', label: 'پایین' };
    case 'medium':
      return { color: 'bg-blue-100 text-blue-800', label: 'متوسط' };
    case 'high':
      return { color: 'bg-orange-100 text-orange-800', label: 'بالا' };
    case 'urgent':
      return { color: 'bg-red-100 text-red-800', label: 'فوری' };
    default:
      return { color: 'bg-gray-100 text-gray-800', label: priority };
  }
};

// Category labels (Persian)
const getCategoryLabel = (category: Ticket['category']) => {
  const categoryLabels: Record<Ticket['category'], string> = {
    technical_support: 'پشتیبانی فنی',
    course_content: 'محتوای دوره',
    payment_issue: 'مسئله پرداخت',
    access_problem: 'مشکل دسترسی',
    general_inquiry: 'سوال عمومی',
    bug_report: 'گزارش باگ',
    feature_request: 'درخواست ویژگی',
    other: 'سایر',
  };
  return categoryLabels[category] || category;
};

type TicketListProps = {
  onTicketSelect?: (ticket: Ticket) => void;
  filters?: TicketFilterParams;
};

// eslint-disable-next-line react/no-unstable-default-props
export default function TicketList({ onTicketSelect, filters = {} }: TicketListProps) {
  const [selectedFilters, setSelectedFilters] = useState<TicketFilterParams>(filters);

  const {
    tickets,
    currentPage,
    totalPages,
    totalResults,
    isLoading,
    isError,
    error,
    refetch,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = useTickets({
    initialPage: 1,
    limit: 10,
    filters: selectedFilters,
  });

  React.useEffect(() => {
    if (isError) {
      toast.error('خطا در بارگذاری تیکت‌ها');
      console.error(error);
    }
  }, [isError, error]);

  // console.log({ tickets });

  const handleFilterChange = (newFilters: Partial<TicketFilterParams>) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };

      // Remove keys with 'all' value
      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key as keyof TicketFilterParams] === 'all') {
          delete updatedFilters[key as keyof TicketFilterParams];
        }
      });

      return updatedFilters;
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-600">در حال بارگذاری تیکت‌ها...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-center">
        <div>
          <div className="mb-4 text-6xl">⚠️</div>
          <h3 className="mb-2 text-lg font-semibold text-red-600">خطا در بارگذاری تیکت‌ها</h3>
          <p className="mb-4 text-gray-500">لطفاً دوباره تلاش کنید یا صفحه را بروزرسانی کنید</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between px-2 md:px-6">
        <h2 className="text-base font-bold text-gray-900 md:text-xl">لیست تیکت‌ها</h2>
        <div className="text-sm text-gray-500">
          {totalResults}
          {' '}
          تیکت یافت شد
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <label className="min-w-[60px] text-xs font-medium text-gray-700 md:min-w-0 md:text-sm">وضعیت:</label>
          <Select
            dir="rtl"
            value={selectedFilters.status || ''}
            onValueChange={value => handleFilterChange({ status: value as any || undefined })}
          >
            <SelectTrigger className="w-48 border border-gray-300 text-xs focus:border-blue-500">
              <SelectValue placeholder="همه" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="open">باز</SelectItem>
              <SelectItem value="in_progress">در حال بررسی</SelectItem>
              <SelectItem value="resolved">حل شده</SelectItem>
              <SelectItem value="closed">بسته شده</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="min-w-[60px] text-xs font-medium text-gray-700 md:min-w-0 md:text-sm">اولویت:</label>
          <Select
            dir="rtl"
            value={selectedFilters.priority || ''}
            onValueChange={value => handleFilterChange({ priority: value as any || undefined })}
          >
            <SelectTrigger className="w-48 border border-gray-300 text-xs focus:border-blue-500 ">
              <SelectValue placeholder="همه" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="low">پایین</SelectItem>
              <SelectItem value="medium">متوسط</SelectItem>
              <SelectItem value="high">بالا</SelectItem>
              <SelectItem value="urgent">فوری</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="min-w-[60px] text-xs font-medium text-gray-700 md:min-w-0 md:text-sm">دسته‌بندی:</label>
          <Select
            dir="rtl"
            value={selectedFilters.category || ''}
            onValueChange={value => handleFilterChange({ category: value as any || undefined })}
          >
            <SelectTrigger className="w-48 border border-gray-300 text-xs focus:border-blue-500 ">
              <SelectValue placeholder="همه" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="technical_support">پشتیبانی فنی</SelectItem>
              <SelectItem value="course_content">محتوای دوره</SelectItem>
              <SelectItem value="payment_issue">مسئله پرداخت</SelectItem>
              <SelectItem value="access_problem">مشکل دسترسی</SelectItem>
              <SelectItem value="general_inquiry">سوال عمومی</SelectItem>
              <SelectItem value="bug_report">گزارش باگ</SelectItem>
              <SelectItem value="feature_request">درخواست ویژگی</SelectItem>
              <SelectItem value="other">سایر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <div className="flex justify-center md:justify-start">
        <Link href="/dashboard/ticket/create">
          <div className="rounded-lg border bg-blue-500 px-4 py-2 text-sm text-white">  
            <div className="flex items-center gap-2">
              <Plus className="size-4" />
              <span>ارسال پیام جدید</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Tickets List */}
      <div className="flex flex-col gap-y-2">

        <div className="flex flex-col gap-4">
          {tickets.length === 0 && (
            <div className="flex min-h-[400px] items-center justify-center text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 text-6xl">📝</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-600">هیچ تیکتی یافت نشد</h3>
              </div>
            </div>
          )}
        </div>
        {tickets.map((ticket) => {
          const statusConfig = getStatusConfig(ticket.status);
          const priorityConfig = getPriorityConfig(ticket.priority);
          const StatusIcon = statusConfig.icon;

          return (
            <Link href={`/dashboard/ticket/${ticket.id}`} key={ticket.id}>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onTicketSelect?.(ticket);
                  }
                }}
                className={`cursor-pointer rounded-lg border  p-6 shadow-sm transition-shadow hover:shadow-md ${!ticket.is_read_by_user ? 'border-2 border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`}
                onClick={() => onTicketSelect?.(ticket)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center">
                      <h3 className="flex-1 text-sm font-semibold text-gray-900 ">{ticket.title}</h3>

                      <div className="ml-auto mt-2 flex items-center gap-2 md:ml-8 md:mt-0">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium md:text-xs ${statusConfig.color}`}>
                          <StatusIcon className="size-3" />
                          {statusConfig.label}
                        </span>
                        <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium md:text-xs ${priorityConfig.color}`}>
                          {priorityConfig.label}
                        </span>
                      </div>
                    </div>

                    <p className="mb-3 line-clamp-2 text-xs text-gray-600 md:text-sm">{ticket.description}</p>

                    <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500 md:flex-row md:items-center md:gap-4 ">
                      <div className="mb-2 flex items-center gap-2 md:mb-0 md:gap-4">
                        <span>
                          آخرین فعالیت:
                          {' '}
                          {new Date(ticket.last_reply_at).toLocaleString('fa-IR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span>
                          پاسخ‌ها:
                          {' '}
                          {ticket.replies.length}
                        </span>
                      </div>
                      <span className="rounded-2xl border border-gray-200 px-4 py-2 font-medium">
                        <span className="flex flex-row  items-center gap-2">
                          <MessageCircle className="size-4" />
                          <div>
                            دسته‌بندی
                          </div>
                          <span className="font-medium text-gray-700">{getCategoryLabel(ticket.category)}</span>
                        </span>
                        {' '}

                      </span>

                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!ticket.is_read_by_user && (
                      <div className="size-3 rounded-full bg-blue-500"></div>
                    )}
                    <ChevronLeft className="size-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-row-reverse items-center justify-between border-t pt-6">
          <div className="text-sm text-gray-500">
            صفحه
            {' '}
            {currentPage}
            {' '}
            از
            {' '}
            {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevPage}
              disabled={!hasPrevPage}
              className="rounded-md border border-gray-300 p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="size-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = Math.max(1, currentPage - 2) + i;
                if (page > totalPages) {
                  return null;
                }

                return (
                  <button
                    type="button"
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`rounded-md px-3 py-1 text-sm ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextPage}
              disabled={!hasNextPage}
              className="rounded-md border border-gray-300 p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
