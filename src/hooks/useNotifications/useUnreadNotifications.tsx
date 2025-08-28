'use client';

import { useQuery } from '@tanstack/react-query';
import { getUnreadNotificationCountRequest } from '@/API/Notification';

export function useUnreadNotifications() {
  const {
    data: unreadCount,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: getUnreadNotificationCountRequest,
    // Refetch every 5 minutes
    staleTime: 5 * 60 * 1000,
    // Refetch in the background when the component is not in focus
    refetchOnWindowFocus: true,
    // Initial data while loading
    placeholderData: { unreadCount: 0 },
  });

  return {
    unreadCount: unreadCount?.unreadCount || 0,
    isLoading,
    isError,
    error,
    refetch,
  };
}
