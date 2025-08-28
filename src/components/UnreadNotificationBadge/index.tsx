'use client';

import clsx from 'clsx';
import React from 'react';
import { useUnreadNotifications } from '@/hooks/useNotifications/useUnreadNotifications';
import { toPersianDigits } from '@/utils/Helpers';

type UnreadNotificationBadgeProps = {
  className?: string;
};

export default function UnreadNotificationBadge({
  className = '',
}: UnreadNotificationBadgeProps) {
  const { unreadCount, isLoading } = useUnreadNotifications();

  if (isLoading) {
    return null; // Or a small loading indicator
  }

  if (unreadCount === 0) {
    return null;
  }

  return (
    <span
      className={clsx(
        'absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white',
        className,
      )}
    >
      <div style={{ lineHeight: 'normal' }} className="flex items-center justify-center">
        {unreadCount > 99 ? '99+' : toPersianDigits(unreadCount)}
      </div>
    </span>
  );
}
