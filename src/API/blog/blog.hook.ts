'use client';

import type { BlogFilterParams, BlogResponse, SingleBlogResponse } from '@/API/blog';
import { useQuery } from '@tanstack/react-query';
import { getAllBlogsRequest, getBlogByIdRequest } from '@/API/blog';

// Hook for single blog
export function useBlog(blogId: string) {
  return useQuery<SingleBlogResponse>({
    queryKey: ['blog', blogId],
    queryFn: () => getBlogByIdRequest(blogId),
    enabled: !!blogId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}

// Hook for all blogs with pagination
export function useBlogs(params: BlogFilterParams = {}) {
  return useQuery<BlogResponse>({
    queryKey: ['blogs', params],
    queryFn: () => getAllBlogsRequest(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
}
