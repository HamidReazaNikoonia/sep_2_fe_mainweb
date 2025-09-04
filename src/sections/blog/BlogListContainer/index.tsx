/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import type { BlogFilterParams, BlogResponse } from '@/API/blog/index';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { getAllBlogsRequest } from '@/API/blog';
import Button from '@/components/LoadingButton';
import product_placeholder from '@/public/assets/images/product_placeholder.png';
import { toPersianDigits, truncateDescription } from '@/utils/Helpers';

// You might want to create a separate BlogCard component
// const BlogCard = ({ blog }: { blog: any }) => (
//   <div className="blog-card border rounded-lg p-4 mb-4">
//     <h2 className="text-xl font-bold">{blog.title}</h2>
//     <p className="text-gray-600 mt-2">{blog.excerpt || blog.content.slice(0, 150)}...</p>
//     {/* Add more blog details as needed */}
//   </div>
// );
const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

// News Card Component
const BlogCard: React.FC<{ blog: any }> = ({ blog }) => {
  const thumbnail = blog?.thumbnail ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${blog?.thumbnail?.file_name}` : product_placeholder;

  return (
    <div className="group relative flex h-full min-h-[400px] cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <Image
          src={thumbnail}
          alt={blog?.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        {blog.tags[0] && (
          <div className="absolute right-3 top-3">
            <span className="pink-gradient-bg rounded-full px-3 py-1 text-xs font-medium text-white">
              {blog.tags[0]}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex h-full flex-1 flex-col p-4">
        <div className="flex-1">
          {/* Title */}
          <h3 className="mb-3 text-base font-bold leading-6 text-gray-900 transition-colors duration-200 group-hover:text-green-600">
            {blog?.title}
          </h3>

          {/* Description - Using truncateDescription for exactly 5 lines */}
          <p className="mb-4 line-clamp-5 text-xs leading-relaxed text-gray-600">
            {truncateDescription(blog?.sub_title, 200)}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          {/* Read Time */}
          {blog?.readingTime && (
            <span className="text-xs text-gray-500">
              مطالعه
              {' '}
              {blog?.readingTime ? toPersianDigits(blog?.readingTime) : 0}
              {' '}
              دقیقه
            </span>
          )}

          {/* Read More Button */}
          <Button
            className="border-pink-500 text-xs text-pink-600 transition-all duration-200 hover:bg-pink-500 hover:text-white"
          >
            مطالعه خبر
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function BlogListContainer() {
  const [blogData, setBlogData] = useState<BlogResponse>({
    results: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    totalResults: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination and filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch blog data
  const fetchBlogs = useCallback(async (params: BlogFilterParams = {}) => {
    try {
      setIsLoading(true);
      const response = await getAllBlogsRequest({
        page: currentPage,
        limit: 10,
        sortBy,
        sortOrder,
        ...params,
      });
      setBlogData(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortBy, sortOrder]);

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchBlogs();
  };

  // Sort handlers
  const handleSortChange = (newSortBy: string) => {
    // Toggle sort order if same column is clicked
    setSortOrder(prevOrder =>
      newSortBy === sortBy
        ? (prevOrder === 'asc' ? 'desc' : 'asc')
        : 'desc',
    );
    setSortBy(newSortBy);
    fetchBlogs();
  };

  // Initial data fetch
  React.useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Render loading state
  if (isLoading) {
    return <div>Loading blog posts...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="blog-list-container">
      {/* Sorting options */}
      {/* <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="border rounded p-2"
        >
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>
      </div> */}

      {/* Blog List */}
      <div className="mt-8 grid gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        {blogData.results.map(blog => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <BlogCard blog={blog} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="join">
          {Array.from({ length: blogData.totalPages }, (_, i) => i + 1).map(page => (
            <button
              type="button"
              key={page}
              className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="mt-4 text-center text-xs text-gray-600">
        نتیجه
        {' '}
        {blogData.results.length}
        {' '}
        از
        {blogData.totalResults}
        {' '}
        پست بلاگ
      </div>
    </div>
  );
}
