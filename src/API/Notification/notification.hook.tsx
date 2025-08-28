"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserNotificationRequest } from '@/API/Notification';
import type { NotificationResponse } from '@/types/Notification';

type UseNotificationsProps = {
  initialPage?: number;
  limit?: number;
}

export function useNotifications({ initialPage = 1, limit = 10 }: UseNotificationsProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<NotificationResponse>({
    queryKey: ['notifications', currentPage, limit],
    queryFn: () => getUserNotificationRequest({
      page: currentPage,
      limit: limit,
    }),
    staleTime: 30000, // 30 seconds
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= (data?.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < (data?.totalPages || 1)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    notifications: data?.results || [],
    currentPage,
    totalPages: data?.totalPages || 0,
    totalResults: data?.totalResults || 0,
    isLoading,
    isError,
    error,
    refetch,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < (data?.totalPages || 0),
    hasPrevPage: currentPage > 1,
  };
}