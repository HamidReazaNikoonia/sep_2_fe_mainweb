/* eslint-disable react-dom/no-missing-button-type */
'use client';

import type { ICourseTypes } from '@/types/Course';
import { useQuery } from '@tanstack/react-query';

import React from 'react';
import { getCoachListRequest } from '@/API/coach';
import { useClassProgramInfinite } from '@/API/courseSession/program.hook';
import ProgramListWithFiltersAndPagination from '@/components/List/ProgramList';
import ProgramSpecificCardItem from '@/components/v2/ProgramSpecificCardItem';

const sampleProduct = {
  id: 'number',
  title: 'دوره مقدماتی وردپرس',
  subtitle: 'توضیحات محصول در این قسمت قرار میگیرد',
  meta_title: '',
  meta_description: '',
  slug: 'string',
  description: 'توضیحات',
  brand: 'string',
  average_rating: 3,
  countInStock: 20,
  is_available: true,
  status: true,
  qr_code: 'string',
  price: 50000,
};

const ProgramListContainer = () => {
  // Custom hook for fetching courses with infinite scroll
  const useProgramData = (filters: Record<string, any>) => {
    return useClassProgramInfinite(filters);
  };

  const { data: coachList, isLoading: isCoachListLoading, isSuccess: isCoachListSuccess } = useQuery({
    queryKey: ['coach-list'],
    queryFn: getCoachListRequest,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
  });

  // console.log('💻 coachList', coachList);

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
        key: 'program_type',
        label: 'دوره حضوری و آنلاین',
        type: 'checkbox' as const,
        options: [
          { value: 'ON-SITE', label: 'فقط دوره‌های حضوری' },
          { value: 'ONLINE', label: 'فقط دوره‌های آنلاین' },
        ],
      },
      {
        key: 'date_begin',
        label: 'فیلتر براساس تاریخ شروع',
        type: 'checkbox' as const,
        options: [
          { value: 'this_week', label: 'هفته جاری' },
          { value: 'next_week', label: 'هفته آینده' },
          { value: 'this_month', label: 'ماه جاری' },
          { value: 'next_month', label: 'ماه آینده' },
        ],
      },
      {
        key: 'selected_day',
        label: 'فیلتر براساس روز های هفته',
        type: 'checkbox' as const,
        options: [
          { value: 'saturday', label: 'شنبه' },
          { value: 'sunday', label: 'یکشنبه' },
          { value: 'monday', label: 'دوشنبه' },
          { value: 'tuesday', label: 'سه شنبه' },
          { value: 'wednesday', label: 'چهارشنبه' },
          { value: 'thursday', label: 'پنجشنبه' },
          { value: 'friday', label: 'جمعه' },
        ],
      },
      {
        key: 'course_category',
        label: 'دسته‌بندی دوره',
        type: 'checkbox' as const,
        options: [],
      },
      {
        key: 'coach_id',
        label: 'انتخاب مربی',
        type: 'select' as const,
        // CategorySelector component will automatically fetch and use categories
        // No need to pass options here as it's handled by the CategorySelector
        options: [
          ...(coachList
            ? coachList.results.map((coach: any) => ({
                value: coach.id,
                label: `${coach.first_name} ${coach.last_name}`,
              }))
            : []),
        ],
      },
    ],
  };

  // Render individual course card - fix linter error by prefixing unused param with underscore
  const renderCourseItem = (course: ICourseTypes, _index: number) => (
    <ProgramSpecificCardItem
      key={course.id}
      programData={course}
      onRegister={() => console.log(`Register for course: ${course.title}`)}
    />
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
    <>
      <ProgramListWithFiltersAndPagination
        useDataHook={useProgramData}
        renderItem={renderCourseItem}
        filterConfig={filterConfig}
        title="فهرست کلاس‌ های آموزشی"
        queryKey="courses-list"
        className="bg-gray-200"
        itemClassName="grid grid-cols-1 gap-x-4 gap-y-3 md:gap-y-6"
        showFiltersOnMobile
        loadingComponent={loadingComponent}
        errorComponent={errorComponent}
        emptyComponent={emptyComponent}
        initialFilters={{
          limit: 12, // Show 12 courses per page
        }}
      />
    </>
  );
};

export default ProgramListContainer;
