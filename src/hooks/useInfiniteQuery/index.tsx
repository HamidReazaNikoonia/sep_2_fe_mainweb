'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

interface UseInfiniteDataProps {
  queryKey: string[];
  queryFn: (params: { pageParam?: number; filters: Record<string, any> }) => Promise<any>;
  filters: Record<string, any>;
  enabled?: boolean;
  getNextPageParam?: (lastPage: any, allPages: any[]) => number | undefined;
  initialPageParam?: number;
}

export const useInfiniteData = ({
  queryKey,
  queryFn,
  filters,
  enabled = true,
  getNextPageParam = (lastPage, allPages) => {
    // Default pagination logic - adjust based on your API response structure
    if (lastPage?.hasMore || lastPage?.has_next) {
      return allPages.length + 1;
    }
    return undefined;
  },
  initialPageParam = 1,
}: UseInfiniteDataProps) => {
  return useInfiniteQuery({
    queryKey: [...queryKey, filters],
    queryFn: ({ pageParam = initialPageParam }) => 
      queryFn({ pageParam, filters: { ...filters, page: pageParam } }),
    enabled,
    getNextPageParam,
    initialPageParam,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Helper hook for course sessions
export const useCourseSessionsInfinite = (filters: Record<string, any>) => {
  return useInfiniteData({
    queryKey: ['course-sessions'],
    queryFn: async ({ filters }) => {
      // Replace with your actual API call
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.set(key, value.toString());
        }
      });
      
      const response = await fetch(`/api/course-sessions?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    filters,
  });
};

// Helper hook for products
export const useProductsInfinite = (filters: Record<string, any>) => {
  return useInfiniteData({
    queryKey: ['products'],
    queryFn: async ({ filters }) => {
      // Replace with your actual API call
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.set(key, value.toString());
        }
      });
      
      const response = await fetch(`/api/products?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    filters,
  });
};