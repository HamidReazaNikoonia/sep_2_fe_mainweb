/* eslint-disable react-dom/no-dangerously-set-innerhtml */
/* eslint-disable @next/next/no-img-element */
'use client';

import he from 'he';
import React from 'react';
import { useBlog } from '@/API/blog/blog.hook';
import LoadingSpiner from '@/components/LoadingSpiner';
import product_placeholder from '@/public/assets/images/product_placeholder.png';

type BlogDetailsContainerProps = {
  blogId: string;
};

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || product_placeholder;

export default function BlogDetailsContainer({ blogId }: BlogDetailsContainerProps) {
  const { data: blog, isLoading, isError, error } = useBlog(blogId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpiner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 text-lg text-red-500">
          خطا در بارگذاری مقاله
        </div>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'مقاله مورد نظر یافت نشد'}
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          بازگشت
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-8 text-center">
        <div className="text-lg text-gray-500">
          مقاله یافت نشد
        </div>
      </div>
    );
  }

  const thumbnail = blog.thumbnail?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${blog.thumbnail?.file_name}` : product_placeholder;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Right Section - Main Content */}
        <div className="lg:col-span-2">
          <article className="rounded-lg bg-white p-6 shadow-lg">
            {/* Title */}
            <h1 className="mb-1 text-2xl font-bold text-gray-900 md:mb-2 md:text-3xl">
              {blog.title}
            </h1>

            {/* Sub Title */}
            {blog.sub_title && (
              <h2 className="mb-4 text-xs text-gray-600 md:mb-6 md:text-sm">
                {blog.sub_title}
              </h2>
            )}

            {/* Thumbnail */}
            {thumbnail && (
              <div className="mb-4 md:mb-6">
                <img
                  src={thumbnail}
                  alt={blog.title}
                  className="h-auto w-full rounded-lg object-cover shadow-md md:h-[500px]"
                />
              </div>
            )}

            {/* Reading Time */}
            {blog.readingTime && (
              <div className="mb-6 flex items-center gap-2 text-xs text-gray-500 md:text-sm">
                <svg
                  className="size-3 md:size-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  زمان مطالعه:
                  {' '}
                  {blog.readingTime}
                  {' '}
                  دقیقه
                </span>
              </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: he.decode(blog.content || '') }}
                className="text-sm leading-7 text-gray-700"
              />
            </div>

            {/* Navigation */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full rounded border border-pink-500 px-6 py-2 text-pink-600 transition-colors hover:bg-pink-500 hover:text-white md:w-auto"
              >
                بازگشت به فهرست مقالات
              </button>
            </div>
          </article>
        </div>

        {/* Left Section - Sidebar */}
        <div className="space-y-2">

          {/* Author Information Card */}
          {blog.author && (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">نویسنده</h3>
              <div className="flex items-center gap-4">
                {/* Author Avatar */}
                {blog.author.avatar?.file_name
                  ? (
                      <img
                        src={blog.author.avatar.file_name}
                        alt={`${blog.author.first_name} ${blog.author.last_name}`}
                        className="size-16 rounded-full object-cover"
                      />
                    )
                  : (
                      <div className="flex size-16 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                        <svg className="size-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                {/* Author Name */}
                <div>
                  <p className="font-medium text-gray-800">
                    {blog.author.first_name} 
                    {' '}
                    {blog.author.last_name}
                  </p>
                  <p className="text-sm text-gray-500">نویسنده مقاله</p>
                </div>
              </div>
            </div>
          )}

          {/* Tags Card */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">برچسب‌ها</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dates Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">تاریخ‌ها</h3>
            <div className="space-y-3">
              {/* Created Date */}
              {blog.createdAt && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="size-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">تاریخ انتشار:</span>
                  <time className="font-medium text-gray-800">
                    {new Date(blog.createdAt).toLocaleDateString('fa-IR')}
                  </time>
                </div>
              )}

              {/* Updated Date */}
              {blog.updatedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="size-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">آخرین بروزرسانی:</span>
                  <time className="font-medium text-gray-800">
                    {new Date(blog.updatedAt).toLocaleDateString('fa-IR')}
                  </time>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
