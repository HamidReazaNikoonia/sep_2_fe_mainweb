'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllCourseSessionRequest } from '@/API/courseSession';

type CourseFilters = {
  q?: string;
  price_from?: number;
  price_to?: number;
  is_fire_sale?: boolean;
  course_category?: string;
  page?: number;
  limit?: number;
};

export const useCoursesSessionInfinite = (filters: CourseFilters) => {
  return useInfiniteQuery({
    queryKey: ['courses-infinite', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams: CourseFilters = {
        ...filters,
        page: pageParam,
        limit: filters.limit || 10,
      };

      // Remove undefined/null values
      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) =>
          value !== undefined && value !== null && value !== '',
        ),
      );

      const response = await getAllCourseSessionRequest(cleanParams);

      return {
        data: response.results || [],
        page: response.page || pageParam,
        limit: response.limit || 10,
        totalPages: response.totalPages || 1,
        totalResults: response.totalResults || 0,
        hasMore: pageParam < (response.totalPages || 1),
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
  });
};
