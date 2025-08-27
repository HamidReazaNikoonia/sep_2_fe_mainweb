/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import type { Notification } from '@/API/Notification/types';
import { AlertTriangle, CheckCircle, Clock, Settings, User, UserCheck, X, XCircle } from 'lucide-react';
import React from 'react';

type NotificationModalProps = {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
};

const getNotificationTypeIcon = (type: string) => {
  switch (type) {
    case 'payment_success':
    case 'course_completion':
    case 'success_create_reference':
      return <CheckCircle className="size-5 text-green-500" />;
    case 'payment_failed':
    case 'payment_fail_create_reference':
    case 'session_cancelled':
      return <XCircle className="size-5 text-red-500" />;
    case 'session_reminder':
      return <Clock className="size-5 text-blue-500" />;
    case 'system_maintenance':
      return <AlertTriangle className="size-5 text-yellow-500" />;
    default:
      return <User className="size-5 text-gray-500" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'text-red-600 bg-red-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'text-green-600 bg-green-100';
    case 'sent':
      return 'text-blue-600 bg-blue-100';
    case 'failed':
      return 'text-red-600 bg-red-100';
    case 'cancelled':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-yellow-600 bg-yellow-100';
  }
};

export default function NotificationModal({ notification, isOpen, onClose }: NotificationModalProps) {
  if (!isOpen || !notification) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return 'نامشخص';
    }
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const renderSenderInfo = () => {
    const { sender } = notification;

    if (sender.type === 'system') {
      return (
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
            <Settings className="size-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">سیستم</p>
            <p className="mt-1 text-xs text-gray-500">اطلاع‌رسانی خودکار</p>
          </div>
        </div>
      );
    }

    if (sender.user_id) {
      const avatarUrl = sender.user_id.avatar?.file_name
        ? `${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${sender.user_id.avatar.file_name}`
        : null;

      return (
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            {avatarUrl
              ? (
                  <img src={avatarUrl} alt="Avatar" className="size-full object-cover" />
                )
              : (
                  <UserCheck className="size-5 text-gray-600" />
                )}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {sender.user_id.first_name}
              {' '}
              {sender.user_id.last_name}
            </p>
            <p className="text-sm text-gray-500">
              {sender.type === 'admin' ? 'مدیر' : sender.type === 'coach' ? 'مربی' : sender.type}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
          <User className="size-5 text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{sender.name || 'نامشخص'}</p>
          <p className="text-sm text-gray-500">{sender.type}</p>
        </div>
      </div>
    );
  };

  const notificationCategoryTitleMap = (type: string) => {
    switch (type) {
      case 'success_create_reference':
        return 'ایجاد موفق مرجع';
      case 'payment_fail_create_reference':
        return 'ایجاد مرجع با شکست پرداخت';
      case 'from_admin':
        return 'پیام از مدیر';
      case 'course_enrollment':
        return 'ثبت‌نام دوره';
      case 'course_completion':
        return 'تکمیل دوره';
      case 'session_reminder':
        return 'یادآوری جلسه';
      case 'session_cancelled':
        return 'لغو جلسه';
      case 'payment_success':
        return 'پرداخت موفق';
      case 'payment_failed':
        return 'پرداخت ناموفق';
      case 'coupon_expiry':
        return 'انقضای کوپن';
      case 'account_verification':
        return 'تأیید حساب';
      case 'password_reset':
        return 'بازنشانی رمز عبور';
      case 'profile_update':
        return 'به‌روزرسانی پروفایل';
      case 'system_maintenance':
        return 'نگهداری سیستم';
      case 'promotional':
        return 'تبلیغاتی';
      case 'announcement':
        return 'اطلاعیه';
      default:
        return type;
    }
  };

  const notificationPriorityTitleMap = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'فوری';
      case 'high':
        return 'بالا';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'کم';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen min-w-fit items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

        <div className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-lg   bg-white   shadow-xl md:max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              {getNotificationTypeIcon(notification.notification_type)}
              <h2 className="text-base font-semibold text-gray-900 md:text-lg">{notification.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 p-6" dir="rtl">
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="text-xs md:text-sm">
                <h3 className="mb-4 text-base font-medium text-gray-900">اطلاعات کلی</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">نوع اطلاع‌رسانی:</span>
                    <span className="font-medium">{notificationCategoryTitleMap(notification.notification_type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">اولویت:</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                      {notificationPriorityTitleMap(notification.priority)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">وضعیت:</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تاریخ ایجاد:</span>
                    <span className="font-medium">{formatDate(notification.created_at)}</span>
                  </div>
                  {notification.read_at && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">تاریخ مطالعه:</span>
                      <span className="font-medium">{formatDate(notification.read_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pr-0 pt-4 md:border-r md:border-t-0 md:pr-6">
                <h3 className="mb-4 text-base font-medium text-gray-900">فرستنده</h3>
                {renderSenderInfo()}
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="mb-3 text-base font-medium text-gray-900">پیام</h3>
              <div className="rounded-lg bg-gray-200 p-4">
                <p className="text-sm leading-relaxed text-gray-800 md:text-base">{notification.message}</p>
              </div>
            </div>

            {/* Content */}
            {notification.content && (
              <div>
                <h3 className="mb-3 text-base font-medium text-gray-900">محتوای اضافی</h3>
                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  {notification.content.short_text && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 md:text-sm">متن کوتاه:</span>
                      <p className="mt-1 text-xs text-gray-700 md:text-sm">{notification.content.short_text}</p>
                    </div>
                  )}
                  {notification.content.action_url && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 md:text-sm">لینک عملیات:</span>
                      <a
                        href={notification.content.action_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-xs text-blue-600 underline hover:text-blue-800 md:text-sm"
                      >
                        {notification.content.action_url}
                      </a>
                    </div>
                  )}
                  {notification.content.image_url && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">تصویر:</span>
                      <img
                        src={notification.content.image_url}
                        alt="Notification"
                        className="mt-2 h-auto max-w-full rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            {notification.actions && notification.actions.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">عملیات‌ها</h3>
                <div className="flex flex-wrap gap-3">
                  {notification.actions.map(action => (
                    <a
                      key={action.id}
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors md:text-sm ${
                        action.style === 'primary'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : action.style === 'danger'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : action.style === 'success'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-600 text-white hover:bg-gray-700'
                      }`}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Status */}
            {notification?.delivery_status && (
              <div>
                <h3 className="mb-3 text-base font-medium text-gray-900">وضعیت تحویل</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Object.entries(notification?.delivery_status).map(([channel, status]) => (
                    <div key={channel} className="rounded-lg bg-gray-50 p-3">
                      <h4 className="mb-2 text-sm font-medium text-gray-700 md:text-base">
                        {channel === 'in_app' ? 'درون برنامه' : channel === 'email' ? 'ایمیل' : channel === 'sms' ? 'پیامک' : channel}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500 md:text-sm">وضعیت:</span>
                          <span className={`rounded px-2 py-1 text-xs ${getStatusColor(status.status)}`}>
                            {status.status}
                          </span>
                        </div>
                        {status?.sent_at && (
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 md:text-sm">زمان ارسال:</span>
                            <span className="text-xs font-medium text-gray-700 md:text-sm">{formatDate(status.sent_at)}</span>
                          </div>
                        )}
                        {status?.delivered_at && (
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 md:text-sm">زمان تحویل:</span>
                            <span className="text-xs font-medium text-gray-700 md:text-sm">{formatDate(status.delivered_at)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
