/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';

import type { Ticket } from '@/API/ticket/types';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  Paperclip,
  Send,
  User,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMarkTicketAsRead, useReplyToTicket, useTicket } from '@/API/ticket/ticket.hook';
import { convertDateToPersian } from '@/utils/Helpers';

// Status configuration
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

// Priority configuration
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

// Category labels
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

type TicketDetailProps = {
  ticketId: string;
};

export default function TicketDetail({ ticketId }: TicketDetailProps) {
  const router = useRouter();
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);

  // Hooks
  const { data: ticketData, isLoading, isError, error } = useTicket(ticketId);
  const replyMutation = useReplyToTicket();
  const markAsReadMutation = useMarkTicketAsRead();

  const ticket = ticketData;

  // Mark as read when ticket is loaded and not read by user
  React.useEffect(() => {
    if (ticket && !ticket.is_read_by_user) {
      markAsReadMutation.mutate(ticketId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket, ticketId]);

  React.useEffect(() => {
    if (isError) {
      toast.error('خطا در بارگذاری تیکت');
      console.error(error);
    }
  }, [ticketData, isError, error]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      toast.error('لطفاً متن پاسخ را وارد کنید');
      return;
    }

    try {
      await replyMutation.mutateAsync({
        ticketId,
        data: {
          message: replyMessage.trim(),
        },
      });
      setReplyMessage('');
      setIsReplyFormVisible(false);
      toast.success('پاسخ شما با موفقیت ارسال شد');
    } catch (err) {
      toast.error('خطا در ارسال پاسخ');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-lg text-gray-600">در حال بارگذاری تیکت...</p>
        </div>
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-center">
        <div>
          <div className="mb-4 text-6xl">⚠️</div>
          <h3 className="mb-2 text-xl font-semibold text-red-600">خطا در بارگذاری تیکت</h3>
          <p className="mb-4 text-gray-500">تیکت مورد نظر یافت نشد یا خطایی رخ داده است</p>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(ticket.status);
  const priorityConfig = getPriorityConfig(ticket.priority);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="mx-auto max-w-5xl space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="mt-1 text-lg font-bold text-gray-900">جزئیات تیکت</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          <ArrowLeft className="size-4" />
          بازگشت
        </button>
      </div>

      {/* Ticket Info Card */}
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="mb-2 text-base font-semibold text-gray-900 md:text-lg">{ticket.title}</h2>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusConfig.color}`}>
                <StatusIcon className="size-3" />
                {statusConfig.label}
              </span>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${priorityConfig.color}`}>
                {priorityConfig.label}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                {getCategoryLabel(ticket.category)}
              </span>
            </div>
          </div>
          {!ticket.is_read_by_user && <div className="size-3 rounded-full bg-blue-500"></div>}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2 text-xs text-gray-600 md:text-sm">
            <p>
              <span className="font-medium">ایجاد شده در:</span>
              {' '}
              {convertDateToPersian(ticket.created_at)}
            </p>
            <p>
              <span className="font-medium">آخرین فعالیت:</span>
              {' '}
              {convertDateToPersian(ticket.last_reply_at)}
            </p>
            {ticket.resolved_at && (
              <p>
                <span className="font-medium">تاریخ حل:</span>
                {' '}
                {convertDateToPersian(ticket.resolved_at)}
              </p>
            )}
          </div>
          <div className="space-y-2 text-xs text-gray-600 md:text-sm">
            <p>
              <span className="font-medium">تعداد پاسخ‌ها:</span>
              {' '}
              {ticket?.replies?.length || 0}
            </p>
            <p>
              <span className="font-medium">آخرین پاسخ از:</span>
              {' '}
              {ticket?.last_reply_by === 'user' ? 'شما' : 'پشتیبانی'}
            </p>
            {ticket?.assigned_to && (
              <p>
                <span className="font-medium">اختصاص داده شده به:</span>
                {' '}
                {ticket?.assigned_to?.first_name}
                {' '}
                {ticket?.assigned_to?.last_name}
              </p>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-2 text-sm font-medium text-gray-900 md:text-base">توضیحات اولیه:</h3>
          <p className="whitespace-pre-wrap text-xs text-gray-700 md:text-sm">{ticket.description}</p>
        </div>

        {/* Initial Attachments */}
        {ticket?.attachments?.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <h3 className="mb-2 font-medium text-gray-900">فایل‌های ضمیمه:</h3>
            <div className="flex flex-wrap gap-2">
              {ticket?.attachments?.map((attachment: any) => (
                <a
                  key={attachment._id}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-blue-600 hover:bg-gray-50"
                >
                  <Paperclip className="size-4" />
                  {attachment.original_name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">پاسخ‌ها</h3>

        {ticket?.replies?.length === 0
          ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                <MessageCircle className="mx-auto mb-2 size-8 text-gray-400" />
                <p className="text-gray-500">هنوز پاسخی برای این تیکت ثبت نشده است</p>
              </div>
            )
          : (
              ticket?.replies?.map(reply => (
                <div
                  key={reply._id}
                  className={`rounded-lg border p-4 ${
                    reply.sender_type === 'user'
                      ? 'ml-8 border-blue-200 bg-blue-50'
                      : 'mr-8 border-gray-200 bg-white'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full p-2 ${
                        reply.sender_type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                      >
                        <User className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900 md:text-sm">
                          {reply.sender_type !== 'admin' && `${reply?.sender?.first_name} ${reply?.sender?.last_name}`}
                          {reply.sender_type === 'admin' && 'پشتیبانی'}
                          {reply.sender_type === 'user' && 'شما'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {convertDateToPersian(reply.createdAt)}
                        </p>
                      </div>
                    </div>
                    {reply.is_read && <Eye className="size-4 text-gray-400" />}
                  </div>

                  <p className="mb-3 whitespace-pre-wrap text-xs text-gray-700 md:text-sm">{reply.message}</p>

                  {reply?.attachments?.length > 0 && (
                    <div className="border-t pt-3">
                      <div className="flex flex-wrap gap-2">
                        {reply?.attachments?.map(attachment => (
                          <a
                            key={attachment._id}
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1 text-xs text-blue-600 hover:bg-gray-50"
                          >
                            <Paperclip className="size-3" />
                            {attachment.original_name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
      </div>

      {/* Reply Form */}
      {ticket?.status !== 'closed' && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          {!isReplyFormVisible
            ? (
                <button
                  type="button"
                  onClick={() => setIsReplyFormVisible(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-600 transition-colors hover:border-blue-400 hover:text-blue-600"
                >
                  <MessageCircle className="size-5" />
                  افزودن پاسخ جدید
                </button>
              )
            : (
                <form onSubmit={handleReplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">پاسخ شما:</label>
                    <textarea
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="پاسخ خود را اینجا بنویسید..."
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={replyMutation.isPending || !replyMessage.trim()}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {replyMutation.isPending
                        ? (
                            <>
                              <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              در حال ارسال...
                            </>
                          )
                        : (
                            <>
                              <Send className="size-4" />
                              ارسال پاسخ
                            </>
                          )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsReplyFormVisible(false);
                        setReplyMessage('');
                      }}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              )}
        </div>
      )}

      {/* Resolution Info */}
      {ticket?.status === 'resolved' && ticket?.resolution_notes && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle className="size-5 text-green-600" />
            <h3 className="font-medium text-green-800">نتیجه حل مسئله</h3>
          </div>
          <p className="text-green-700">{ticket.resolution_notes}</p>
          {ticket?.resolved_by && (
            <p className="mt-2 text-sm text-green-600">
              حل شده توسط:
              {' '}
              {ticket?.resolved_by?.first_name}
              {' '}
              {ticket?.resolved_by?.last_name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
