'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getCoachListRequest } from '@/API/coach';

type CoachFilters = {
  search?: string;
  hasActiveCourse?: boolean;
  page?: number;
  limit?: number;
};

type UseCoachesProps = {
  filters?: CoachFilters;
  enabled?: boolean;
};

const defaultFilters: CoachFilters = {
  limit: 12,
};

export function useCoaches({ filters = {}, enabled = true }: UseCoachesProps = {}) {
  const mergedFilters = { ...defaultFilters, ...filters };

  return useInfiniteQuery({
    queryKey: ['coaches', mergedFilters],
    queryFn: async ({ pageParam = 1 }) => {
      // For now, we'll use the existing API and filter client-side
      // In a real app, you'd pass these filters to the API
      const response = await getCoachListRequest();

      // The API returns: { totalPages, totalResults, results, limit, page }
      const { search, hasActiveCourse, limit = 12 } = mergedFilters;
      let coaches = response?.results || [];

      // Apply search filter
      if (search) {
        coaches = coaches.filter((coach: any) =>
          `${coach.first_name} ${coach.last_name}`.toLowerCase().includes(search.toLowerCase())
          || coach.group_name?.toLowerCase().includes(search.toLowerCase()),
        );
      }

      // Apply active course filter
      if (hasActiveCourse) {
        // For now, we'll randomly filter some coaches as having active courses
        // In a real app, this would be handled by the API
        coaches = coaches.filter((_: any, index: number) => index % 2 === 0);
      }

      // Mock pagination for filtered results
      const startIndex = (pageParam - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCoaches = coaches.slice(startIndex, endIndex);

      return {
        totalPages: Math.ceil(coaches.length / limit),
        totalResults: coaches.length,
        results: paginatedCoaches,
        limit,
        page: pageParam,
        hasNext: endIndex < coaches.length,
      };
    },
    enabled,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
