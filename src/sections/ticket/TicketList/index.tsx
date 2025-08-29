"use client";

import type { Ticket, TicketFilterParams } from '@/API/ticket/types';
// import { format } from 'date-fns';
// import { fa } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, MessageCircle, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import React, { useState } from 'react';
import { useTickets } from '@/API/ticket/ticket.hook';

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
    other: 'سایر'
  };
  return categoryLabels[category] || category;
};

type TicketListProps = {
  onTicketSelect?: (ticket: Ticket) => void;
  filters?: TicketFilterParams;
};

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

  console.log({tickets});

  const handleFilterChange = (newFilters: Partial<TicketFilterParams>) => {
    setSelectedFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-lg text-gray-600">در حال بارگذاری تیکت‌ها...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-center">
        <div>
          <div className="mb-4 text-6xl">⚠️</div>
          <h3 className="mb-2 text-xl font-semibold text-red-600">خطا در بارگذاری تیکت‌ها</h3>
          <p className="mb-4 text-gray-500">لطفاً دوباره تلاش کنید یا صفحه را بروزرسانی کنید</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-center">
        <div>
          <div className="mb-4 text-6xl">📝</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-600">هیچ تیکتی یافت نشد</h3>
          <p className="text-gray-500">شما هنوز هیچ تیکتی ایجاد نکرده‌اید</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">لیست تیکت‌ها</h2>
        <div className="text-sm text-gray-500">
          {totalResults} تیکت یافت شد
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">وضعیت:</label>
          <select
            value={selectedFilters.status || ''}
            onChange={(e) => handleFilterChange({ status: e.target.value as any || undefined })}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">همه</option>
            <option value="open">باز</option>
            <option value="in_progress">در حال بررسی</option>
            <option value="resolved">حل شده</option>
            <option value="closed">بسته شده</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">اولویت:</label>
          <select
            value={selectedFilters.priority || ''}
            onChange={(e) => handleFilterChange({ priority: e.target.value as any || undefined })}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">همه</option>
            <option value="low">پایین</option>
            <option value="medium">متوسط</option>
            <option value="high">بالا</option>
            <option value="urgent">فوری</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">دسته‌بندی:</label>
          <select
            value={selectedFilters.category || ''}
            onChange={(e) => handleFilterChange({ category: e.target.value as any || undefined })}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">همه</option>
            <option value="technical_support">پشتیبانی فنی</option>
            <option value="course_content">محتوای دوره</option>
            <option value="payment_issue">مسئله پرداخت</option>
            <option value="access_problem">مشکل دسترسی</option>
            <option value="general_inquiry">سوال عمومی</option>
            <option value="bug_report">گزارش باگ</option>
            <option value="feature_request">درخواست ویژگی</option>
            <option value="other">سایر</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => {
          const statusConfig = getStatusConfig(ticket.status);
          const priorityConfig = getPriorityConfig(ticket.priority);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={ticket._id}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              onClick={() => onTicketSelect?.(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusConfig.color}`}>
                      <StatusIcon className="size-3" />
                      {statusConfig.label}
                    </span>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${priorityConfig.color}`}>
                      {priorityConfig.label}
                    </span>
                  </div>
                  
                  <p className="mb-3 text-gray-600 line-clamp-2">{ticket.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>دسته‌بندی: {getCategoryLabel(ticket.category)}</span>
                    <span>پاسخ‌ها: {ticket.replies.length}</span>
                    <span>
                      آخرین فعالیت: {new Date(ticket.last_reply_at).toLocaleString('fa-IR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {/* {format(new Date(ticket.last_reply_at), 'yyyy/MM/dd HH:mm', { locale: fa })} */}
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
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-6">
          <div className="text-sm text-gray-500">
            صفحه {currentPage} از {totalPages}
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