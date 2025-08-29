'use client';

import type {
  CreateTicketRequest,
  ReplyTicketRequest,
  TicketFilterParams,
  TicketResponse,
} from '@/API/ticket/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createTicketRequest,
  getTicketByIdRequest,
  getUserTicketsRequest,
  markTicketAsReadRequest,
  replyToTicketRequest,
} from '@/API/ticket';

type UseTicketsProps = {
  initialPage?: number;
  limit?: number;
  filters?: TicketFilterParams;
};

export function useTickets({ initialPage = 1, limit = 10, filters = {} }: UseTicketsProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  // const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<TicketResponse>({
    queryKey: ['tickets', currentPage, limit, filters],
    queryFn: () => getUserTicketsRequest({
      page: currentPage,
      limit,
      ...filters,
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
    tickets: data?.results || [],
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

// Hook for single ticket
export function useTicket(ticketId: string) {
  return useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicketByIdRequest(ticketId),
    enabled: !!ticketId,
    staleTime: 30000,
  });
}

// Mutation hooks
export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) => createTicketRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
}

export function useReplyToTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, data }: { ticketId: string; data: ReplyTicketRequest }) =>
      replyToTicketRequest(ticketId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticket', variables.ticketId] });
    },
  });
}

export function useMarkTicketAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketId: string) => markTicketAsReadRequest(ticketId),
    onSuccess: (_, ticketId) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
    },
  });
}
