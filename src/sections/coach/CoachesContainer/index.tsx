/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-nested-components */
'use client';

import { CheckCircle2, Filter, Loader2, Search, User } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCoaches } from '@/API/coach/coach.hook';
import CustomImage from '@/components/CustomImage';
import { Badge } from '@/components/ui/badge';
// import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Types
type Coach = {
  _id: string;
  first_name: string;
  last_name: string;
  avatar?: { file_name: string };
  description?: string;
  group_name?: string;
  specialties?: string[];
};

// Coach Card Component
const CoachCard: React.FC<{ coach: Coach }> = ({ coach }) => {
  const fullName = `${coach.first_name} ${coach.last_name}`;

  return (
    <div className="group relative flex h-full min-h-[300px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Avatar Container */}
      <div className="relative flex flex-1 items-center justify-center p-6 pb-4">
        <div className="relative size-20 overflow-hidden rounded-full ring-4 ring-gray-100 transition-all duration-300 group-hover:ring-8 group-hover:ring-green-200">
          {coach.avatar?.file_name
            ? (
                <CustomImage
                  fileName={coach.avatar.file_name}
                  alt={fullName}
                  className="rounded-full transition-transform duration-300 group-hover:scale-110"
                  containerClassName="w-full h-full"
                />
              )
            : (
                <div className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                  <User className="size-10 text-gray-500" />
                </div>
              )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center p-4 pt-2">
        {/* Name */}
        <h3 className="mb-2 text-center text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-pink-600">
          {fullName}
        </h3>

        {/* Group Name / Specialty */}
        {coach.group_name && (
          <div className="mb-3">
            <span className="inline-flex rounded-full bg-gradient-to-r from-green-50 to-blue-50 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-green-200">
              {coach.group_name}
            </span>
          </div>
        )}

        {/* Description */}
        {coach.description && (
          <p className="mb-4 line-clamp-2 text-center text-xs text-gray-600">
            {coach.description}
          </p>
        )}

        {/* View Profile Button */}
        <Button
          variant="outline"
          size="sm"
          className="mt-auto w-full border-pink-500 bg-white text-pink-600 transition-all duration-200 hover:bg-pink-500 hover:text-white group-hover:border-pink-600"
        >
          مشاهده پروفایل
        </Button>
      </div>

      {/* Decorative gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
    </div>
  );
};

// Loading Component
const LoadingGrid = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="flex h-[300px] animate-pulse flex-col items-center justify-center rounded-2xl bg-gray-200"
      >
        <div className="mb-4 size-20 rounded-full bg-gray-300" />
        <div className="mb-2 h-4 w-32 rounded bg-gray-300" />
        <div className="mb-4 h-3 w-24 rounded bg-gray-300" />
        <div className="h-8 w-full max-w-32 rounded bg-gray-300" />
      </div>
    ))}
  </div>
);

// Main Container Component
const CoachesContainer: React.FC = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [hasActiveCourse, setHasActiveCourse] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Refs for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch coaches
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useCoaches({
    filters: {
      search: debouncedSearch,
      hasActiveCourse,
    },
  });

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Get all coaches from pages - Updated to match new data structure
  const allCoaches = data?.pages?.flatMap(page => page.results) || [];
  const totalCoaches = data?.pages?.[0]?.totalResults || 0;

  // Filter handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleActiveCourseChange = useCallback((checked: boolean) => {
    setHasActiveCourse(checked);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setHasActiveCourse(false);
  }, []);

  // Sidebar Component
  const FilterSidebar = ({ className = '' }: { className?: string }) => (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">جستجو</label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="نام استاد یا تخصص..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pr-10 text-sm"
          />
        </div>
      </div>

      {/* Active Course Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">فیلتر دوره‌ها</label>
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="checkbox"
            id="activeCourse"
            checked={hasActiveCourse}
            onChange={e => handleActiveCourseChange(e.target.checked)}
            className="size-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label
            htmlFor="activeCourse"
            className="cursor-pointer text-xs text-gray-600"
          >
            اساتیدی که دوره فعال دارند
          </label>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery || hasActiveCourse) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">فیلترهای فعال</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              پاک کردن همه
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                جستجو:
                {' '}
                {searchQuery}
              </Badge>
            )}
            {hasActiveCourse && (
              <Badge variant="secondary" className="text-xs">
                دوره فعال
                <CheckCircle2 className="mr-1 size-3" />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">{totalCoaches}</span>
        {' '}
        استاد یافت شد
      </div>

      {/* Pagination Info */}
      {data?.pages && data.pages.length > 0 && (
        <div className="text-xs text-gray-500">
          صفحه
          {' '}
          {data.pages[data.pages.length - 1].page}
          {' '}
          از
          {' '}
          {data.pages[0].totalPages}
        </div>
      )}
    </div>
  );

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-red-500">خطا در بارگذاری اطلاعات</div>
          <Button onClick={() => window.location.reload()}>تلاش مجدد</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-0 px-4 py-8 md:mt-8" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-lg font-bold text-gray-900 md:text-2xl">لیست بهترین اساتید آوانو</h1>
        <p className="mx-auto px-4 text-xs leading-6 text-gray-600 md:text-sm">
          با بهترین مربیان و اساتید آوانو آشنا شوید و مسیر ورزشی خود را با راهنمایی آن‌ها طی کنید
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="mb-6 flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="size-4" />
          فیلترها
        </Button>
        {(searchQuery || hasActiveCourse) && (
          <Badge variant="secondary">
            {(searchQuery ? 1 : 0) + (hasActiveCourse ? 1 : 0)}
            {' '}
            فیلتر فعال
          </Badge>
        )}
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="mb-6 rounded-lg border bg-white p-4 lg:hidden">
          <FilterSidebar />
        </div>
      )}

      {/* Main Layout */}
      <div className="flex gap-4">
        {/* Desktop Sidebar */}
        <div className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-24 rounded-lg border bg-white p-6 shadow-sm">
            <FilterSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Loading State */}
          {isLoading && <LoadingGrid />}

          {/* Content */}
          {!isLoading && (
            <>
              {/* Coaches Grid */}
              {allCoaches.length > 0
                ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[...allCoaches, ...allCoaches, ...allCoaches, ...allCoaches, ...allCoaches, ...allCoaches, ...allCoaches].map((coach, index) => (
                        <CoachCard key={`${coach._id}-${index}`} coach={coach} />
                      ))}
                    </div>
                  )
                : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <User className="mb-4 size-16 text-gray-300" />
                      <h3 className="mb-2 text-lg font-medium text-gray-900">
                        هیچ استادی یافت نشد
                      </h3>
                      <p className="mb-4 text-gray-600">
                        لطفاً فیلترهای خود را تغییر دهید یا دوباره تلاش کنید
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  )}

              {/* Load More Trigger */}
              {hasNextPage && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="size-4 animate-spin" />
                      بارگذاری...
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachesContainer;
