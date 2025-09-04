import { getAuthToken, SERVER_API_URL } from '../config';

// Types for Blog API
export type BlogFilterParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type BlogResponse = {
  results: any[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export type SingleBlogResponse = {
  // Define the structure of a single blog post
  id: string;
  title: string;
  content: string;
  // Add other relevant fields
};

// 1. Get all Blog Posts with Filters
async function getAllBlogs(params: BlogFilterParams = {}): Promise<BlogResponse> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  // Only include non-empty parameters in the request
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== ''),
  );

  // eslint-disable-next-line no-console
  console.log({ filteredParams });

  const response = await fetch(
    `${SERVER_API_URL}/blog?${new URLSearchParams(filteredParams as Record<string, string>)}`,
    options,
  )
    .then(response => response.json())
    .catch((err) => {
      console.error('Error fetching blog posts:', err);
      throw err;
    });

  return response;
}

// 2. Get Specific Blog by ID
async function getBlogById(blogId: string): Promise<SingleBlogResponse> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = await fetch(
    `${SERVER_API_URL}/blog/${blogId}`,
    options,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Blog not found');
      }
      return response.json();
    })
    .catch((err) => {
      console.error('Error fetching blog post:', err);
      throw err;
    });

  return response;
}

// Request wrappers for easier usage
export async function getAllBlogsRequest(params: BlogFilterParams = {}) {
  return await getAllBlogs(params);
}

export async function getBlogByIdRequest(blogId: string) {
  return await getBlogById(blogId);
}

export default {
  getAllBlogs,
  getBlogById,
  getAllBlogsRequest,
  getBlogByIdRequest,
};
