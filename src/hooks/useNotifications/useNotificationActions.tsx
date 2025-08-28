'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { markReadAllNotificationRequest } from '@/API/Notification';

export function useNotificationActions() {
  const queryClient = useQueryClient();

  // Mutation for marking all notifications as read
  const markAllNotificationsReadMutation = useMutation({
    mutationFn: markReadAllNotificationRequest,

    onMutate: async () => {
      // Optimistically update the notifications
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousNotifications = queryClient.getQueryData(['notifications']);

      // Update the cached data to mark all as read
      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          results: old.results.map((notification: any) => ({
            ...notification,
            read_at: new Date().toISOString(),
          })),
        };
      });

      return { previousNotifications };
    },

    onSuccess: () => {
      // Refetch notifications to ensure latest state
      queryClient.invalidateQueries({ queryKey: ['notifications'] });

      // Show success toast
      toast.success('تمام اطلاع‌رسانی‌ها خوانده شدند');
    },

    onError: (error, variables, context) => {
      // Rollback to previous state if mutation fails
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }

      // Show error toast
      toast.error('خطا در علامت‌گذاری اطلاع‌رسانی‌ها');

      console.error('Mark all notifications read error:', error);
    },
  });

  return {
    markAllNotificationsReadMutation,
  };
}
