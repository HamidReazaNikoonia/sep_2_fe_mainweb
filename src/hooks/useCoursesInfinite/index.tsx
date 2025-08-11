'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCoursesRequest } from '@/API/course';

interface CourseFilters {
  q?: string;
  price_from?: number;
  price_to?: number;
  is_fire_sale?: boolean;
  course_category?: string;
  page?: number;
  limit?: number;
}

export const useCoursesInfinite = (filters: CourseFilters) => {
  // Memoize the filter params to prevent unnecessary refetches
  const memoizedFilters = useMemo(() => {
    const cleanParams: Record<string, any> = {};
    
    // Only include filters that have actual values
    if (filters.q && filters.q.trim()) cleanParams.q = filters.q.trim();
    if (filters.price_from !== undefined && filters.price_from > 0) cleanParams.price_from = filters.price_from;
    if (filters.price_to !== undefined && filters.price_to > 0) cleanParams.price_to = filters.price_to;
    if (filters.is_fire_sale === true) cleanParams.is_fire_sale = true;
    if (filters.course_category && filters.course_category !== '') cleanParams.course_category = filters.course_category;
    if (filters.limit) cleanParams.limit = filters.limit;
    
    return cleanParams;
  }, [
    filters.q,
    filters.price_from, 
    filters.price_to,
    filters.is_fire_sale,
    filters.course_category,
    filters.limit
  ]);

  return useInfiniteQuery({
    queryKey: ['courses-infinite', memoizedFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...memoizedFilters,
        page: pageParam,
        limit: memoizedFilters.limit || 10,
      };

      console.log('Fetching courses with params:', queryParams);
      
      const response = await getCoursesRequest(queryParams);
      
      return {
        data: response.results || [],
        page: response.page || pageParam,
        limit: response.limit || 10,
        totalPages: response.totalPages || 1,
        totalResults: response.totalResults || 0,
        hasMore: pageParam < (response.totalPages || 1)
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}; 