/* eslint-disable react-dom/no-missing-button-type */
'use client';

import type { ICourseTypes } from '@/types/Course';
import React from 'react';
import { useCoursesInfinite } from '@/API/course/course.hook';
import CourseCardItem from '@/components/CourseItem';
import ListWithFiltersAndPagination from '@/components/List/GeneralList';

const CourseListPage = () => {
  // Custom hook for fetching courses with infinite scroll
  const useCoursesData = (filters: Record<string, any>) => {
    return useCoursesInfinite(filters);
  };

  // Filter configuration
  const filterConfig = {
    search: {
      placeholder: 'جستجو در دوره‌ها...',
      label: 'جستجو',
    },
    priceRange: {
      min: 0,
      max: 50000000, // 50 million tomans
      step: 100000, // 100k tomans steps
      label: 'محدوده قیمت',
    },
    customFilters: [
      {
        key: 'is_fire_sale',
        label: 'دوره‌های تخفیف‌دار',
        type: 'checkbox' as const,
        options: [
          { value: 'true', label: 'فقط دوره‌های دارای تخفیف' },
        ],
      },
      {
        key: 'course_category',
        label: 'دسته‌بندی دوره',
        type: 'select' as const,
        // This will be rendered as a custom component
        options: [],
      },
    ],
  };

  // Render individual course card
  const renderCourseItem = (course: ICourseTypes, index: number) => (
    <CourseCardItem course={course} key={course?.id} isLikedByUser />
  );

  // Custom loading component
  const loadingComponent = (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-b-2 border-pink-500"></div>
        <p className="text-lg text-gray-600">در حال بارگذاری دوره‌ها...</p>
      </div>
    </div>
  );

  // Custom empty component
  const emptyComponent = (
    <div className="flex min-h-[400px] items-center justify-center text-center">
      <div>
        <div className="mb-4 text-6xl">📚</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-700">
          هیچ دوره‌ای یافت نشد
        </h3>
        <p className="text-gray-500">
          لطفاً فیلترهای خود را تغییر دهید یا دوباره جستجو کنید
        </p>
      </div>
    </div>
  );

  // Custom error component
  const errorComponent = (
    <div className="flex min-h-[400px] items-center justify-center text-center">
      <div>
        <div className="mb-4 text-6xl">⚠️</div>
        <h3 className="mb-2 text-xl font-semibold text-red-600">
          خطا در بارگذاری دوره‌ها
        </h3>
        <p className="mb-4 text-gray-500">
          لطفاً دوباره تلاش کنید یا صفحه را بروزرسانی کنید
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors hover:bg-pink-600"
        >
          بروزرسانی صفحه
        </button>
      </div>
    </div>
  );

  return (
    <ListWithFiltersAndPagination
      useDataHook={useCoursesData}
      renderItem={renderCourseItem}
      filterConfig={filterConfig}
      title="فهرست دوره‌های آموزشی"
      queryKey="courses-list"
      className="bg-gray-50"
      itemClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      showFiltersOnMobile
      loadingComponent={loadingComponent}
      errorComponent={errorComponent}
      emptyComponent={emptyComponent}
      initialFilters={{
        limit: 12, // Show 12 courses per page
      }}
    />
  );
};

export default CourseListPage;
