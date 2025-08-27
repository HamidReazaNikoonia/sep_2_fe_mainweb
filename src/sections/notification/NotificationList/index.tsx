/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import type { Notification } from '@/API/Notification/types';
import { AlertTriangle, Bell, BellRing, CheckCircle, ChevronLeft, ChevronRight, Clock, Settings, User, UserCheck, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useNotifications } from '@/API/Notification/notification.hook';
import NotificationModal from '@/sections/notification/NotificationModal';

const getNotificationTypeColor = (type: string) => {
  switch (type) {
    case 'payment_success':
    case 'course_completion':
    case 'success_create_reference':
    case 'course_enrollment':
    case 'account_verification':
      return 'border-l-green-500 bg-green-50';
    case 'payment_failed':
    case 'payment_fail_create_reference':
    case 'session_cancelled':
      return 'border-l-red-500 bg-red-50';
    case 'session_reminder':
    case 'promotional':
    case 'announcement':
      return 'border-l-blue-500 bg-blue-50';
    case 'system_maintenance':
    case 'coupon_expiry':
      return 'border-l-yellow-500 bg-yellow-50';
    default:
      return 'border-l-gray-500 bg-gray-50';
  }
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
      return <Bell className="size-5 text-gray-500" />;
  }
};

const renderSender = (sender: Notification['sender']) => {
  if (sender.type === 'system') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
          <Settings className="size-4 text-blue-600" />
        </div>
        <span className="text-xs text-gray-600">سیستم</span>
      </div>
    );
  }

  if (sender.user_id) {
    const avatarUrl = sender.user_id.avatar?.file_name
      ? `${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${sender.user_id.avatar.file_name}`
      : null;

    return (
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          {avatarUrl
            ? (
                <img src={avatarUrl} alt="Avatar" className="size-full object-cover" />
              )
            : (
                <UserCheck className="size-4 text-gray-600" />
              )}
        </div>
        <span className="text-xs text-gray-600">
          {sender.user_id.first_name}
          {' '}
          {sender.user_id.last_name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-full bg-gray-100">
        <User className="size-4 text-gray-600" />
      </div>
      <span className="text-xs text-gray-600">{sender.name || 'نامشخص'}</span>
    </div>
  );
};

export default function NotificationList() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    notifications,
    currentPage,
    totalPages,
    totalResults,
    isLoading,
    isError,
    error,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = useNotifications({ limit: 10 });

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return '';
    }

    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="rounded-lg border-l-4 border-gray-300 bg-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                  <div className="h-3 w-1/2 rounded bg-gray-300"></div>
                </div>
                <div className="size-6 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 text-red-500">
          <XCircle className="mx-auto size-12" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">خطا در بارگذاری اطلاع‌رسانی‌ها</h3>
        <p className="text-gray-500">
          {error instanceof Error ? error.message : 'خطای نامشخص رخ داده است'}
        </p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 text-gray-400">
          <Bell className="mx-auto size-12" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">اطلاع‌رسانی جدیدی وجود ندارد</h3>
        <p className="text-gray-500">هنوز هیچ اطلاع‌رسانی‌ای دریافت نکرده‌اید</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between" dir="rtl">
        <h2 className="text-2xl font-bold text-gray-900">اطلاع‌رسانی‌ها</h2>
        <div className="text-sm text-gray-500">
          مجموع:
          {' '}
          {totalResults}
          {' '}
          اطلاع‌رسانی
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3 bg-stone-200 px-4 py-8">
        {notifications.map((notification: Notification) => (
          <div
            key={notification._id}
            onClick={() => handleNotificationClick(notification)}
            className={`
              min-w-0 max-w-full cursor-pointer break-words rounded-lg border-l-4 p-4 transition-all duration-200 hover:shadow-md
              ${getNotificationTypeColor(notification.notification_type)}
              ${notification.read_at ? 'opacity-75' : 'shadow-sm'}
            `}
            dir="rtl"
          >
            <div className="flex items-start justify-between">
              <div className="flex w-full flex-col items-start gap-3 md:flex-row">

                <div>
                  {getNotificationTypeIcon(notification.notification_type)}
                </div>
                <div className="flex w-full items-start">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900 md:text-base ">
                        {notification.title}
                      </h3>
                      {!notification.read_at && (
                        <div className="size-2 shrink-0 rounded-full bg-blue-500"></div>
                      )}
                    </div>

                    <p className="mb-3 mt-2 text-xs text-gray-600 md:text-sm">
                      {notification.message}
                    </p>

                    <div className="flex flex-col items-start justify-between text-xs md:flex-row md:items-center">
                      {renderSender(notification.sender)}

                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 md:mt-0">
                        {notification?.read_at
                          ? (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="size-3" />
                                <span>خوانده شده</span>
                                <span>•</span>
                                <span>{formatDate(notification.read_at)}</span>
                              </div>
                            )
                          : (
                              <div className="flex items-center gap-1">
                                <BellRing className="size-3" />
                                <span>جدید</span>
                              </div>
                            )}
                        <span>•</span>
                        <span>{formatDate(notification.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-row-reverse items-center justify-between border-t pt-6" dir="rtl">
          <div className="text-sm text-gray-500">
            صفحه
            {' '}
            {currentPage}
            {' '}
            از
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

      {/* Modal */}
      <NotificationModal
        notification={selectedNotification}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
