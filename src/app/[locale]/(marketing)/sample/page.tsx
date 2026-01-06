'use client';

import React, { useState } from 'react';




import type { ICourseTypes } from '@/types/Course';

import {ChevronLeft, ChevronRight, ChevronUp, Search, ChevronDown, Grid, List, SlidersHorizontal } from 'lucide-react';
import { toPersianDigits } from '@/utils/Helpers';
import CourseItem from '@/components/CourseItem';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface CoursePageProps {
  initialCourses?: ICourseTypes[];
  categories?: Array<{ id: string; name: string; slug: string }>;
}


interface CoursePageHeaderProps {
  title: string;
  totalCourses: number;
  filters: any;
  onFilterChange: (filters: any) => void;
}

interface CourseFilterSidebarProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  categories?: Array<{ id: string; name: string; slug: string }>;
}


interface CourseGridProps {
  courses: ICourseTypes[];
}


interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


interface CourseCategoryTabsProps {
  categories?: Array<{ id: string; name: string; slug: string }>;
}

// This would be your page component
export default async function CourseListPage() {
  // Fetch courses from API
  const courses: ICourseTypes[] = []; // Your course data here
  
  const categories = [
    { id: '1', name: 'برنامه‌نویسی', slug: 'programming' },
    { id: '2', name: 'طراحی', slug: 'design' },
    { id: '3', name: 'بازاریابی', slug: 'marketing' },
    // ... more categories
  ];

  return <CoursePage initialCourses={courses} categories={categories} />;
}

function CourseCategoryTabs({ categories = [] }: CourseCategoryTabsProps) {
  const defaultCategories = [
    { id: '1', name: 'اصل', slug: 'main' },
    { id: '2', name: 'پایتون', slug: 'python' },
    { id: '3', name: 'CCNA', slug: 'ccna' },
    { id: '4', name: 'هک', slug: 'hacking' },
    { id: '5', name: 'المپس', slug: 'olympus' },
    { id: '6', name: 'ICDL', slug: 'icdl' },
    { id: '7', name: 'مسترینگ', slug: 'mastering' },
    { id: '8', name: 'شبکه‌ریک', slug: 'network' },
    { id: '9', name: 'Docker', slug: 'docker' },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="mt-12 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">موضوعات پرطرفدار</h2>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView="auto"
        navigation
        className="category-tabs-swiper"
      >
        {displayCategories.map((category) => (
          <SwiperSlide key={category.id} style={{ width: 'auto' }}>
            <button
              type="button"
              className="whitespace-nowrap rounded-lg border-2 border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700"
            >
              {category.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function CoursePagination({
  currentPage,
  totalPages,
  onPageChange,
}: CoursePaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="size-4" />
        قبلی
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`min-w-[40px] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {toPersianDigits(page as number)}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        بعدی
        <ChevronLeft className="size-4" />
      </button>
    </div>
  );
}

function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-white p-8 text-center">
        <div>
          <div className="mb-4 text-6xl">📚</div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">دوره‌ای یافت نشد</h3>
          <p className="text-gray-600">لطفاً فیلترهای دیگری را امتحان کنید</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
}

function CourseFilterSidebar({
  filters,
  onFilterChange,
  categories = [],
}: CourseFilterSidebarProps) {
  const [expandedSections, setExpandedSections] = React.useState({
    price: true,
    duration: true,
    level: true,
    category: true,
    topics: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const durationOptions = [
    { value: '0-2', label: 'کمتر از ۲ ساعت' },
    { value: '2-5', label: '۲ تا ۵ ساعت' },
    { value: '5-10', label: '۵ تا ۱۰ ساعت' },
    { value: '10-15', label: '۱۰ تا ۱۵ ساعت' },
    { value: '15+', label: 'بیشتر از ۱۵ ساعت' },
  ];

  const levelOptions = [
    { value: 'beginner', label: 'مبتدی' },
    { value: 'intermediate', label: 'متوسط' },
    { value: 'advanced', label: 'پیشرفته' },
  ];

  const topicOptions = [
    { value: 'programming', label: 'برنامه‌نویسی' },
    { value: 'design', label: 'طراحی' },
    { value: 'marketing', label: 'بازاریابی' },
    { value: 'business', label: 'کسب و کار' },
    { value: 'ai', label: 'هوش مصنوعی' },
    { value: 'data', label: 'داده‌کاوی' },
  ];

  return (
    <div className="sticky top-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">فیلترها</h3>
        <button
          type="button"
          onClick={() => onFilterChange({
            search: '',
            sortBy: 'newest',
            priceRange: [0, 10000000],
            duration: [],
            level: [],
            category: '',
            hasDiscount: false,
          })}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          پاک کردن همه
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو در دوره‌ها..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b pb-6">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="mb-4 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
        >
          محدوده قیمت
          {expandedSections.price ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: [0, Number.parseInt(e.target.value)],
              })}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{toPersianDigits(0)} ریال</span>
              <span>{toPersianDigits(filters.priceRange[1])} ریال</span>
            </div>
          </div>
        )}
      </div>

      {/* Duration */}
      <div className="mb-6 border-b pb-6">
        <button
          type="button"
          onClick={() => toggleSection('duration')}
          className="mb-4 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
        >
          مدت زمان دوره
          {expandedSections.duration ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {expandedSections.duration && (
          <div className="space-y-2">
            {durationOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.duration.includes(option.value)}
                  onChange={(e) => {
                    const newDuration = e.target.checked
                      ? [...filters.duration, option.value]
                      : filters.duration.filter((d: string) => d !== option.value);
                    onFilterChange({ ...filters, duration: newDuration });
                  }}
                  className="size-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-200"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Level */}
      <div className="mb-6 border-b pb-6">
        <button
          type="button"
          onClick={() => toggleSection('level')}
          className="mb-4 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
        >
          سطح دوره
          {expandedSections.level ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {expandedSections.level && (
          <div className="space-y-2">
            {levelOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.level.includes(option.value)}
                  onChange={(e) => {
                    const newLevel = e.target.checked
                      ? [...filters.level, option.value]
                      : filters.level.filter((l: string) => l !== option.value);
                    onFilterChange({ ...filters, level: newLevel });
                  }}
                  className="size-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-200"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Topics */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => toggleSection('topics')}
          className="mb-4 flex w-full items-center justify-between text-sm font-semibold text-gray-900"
        >
          موضوعات
          {expandedSections.topics ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {expandedSections.topics && (
          <div className="space-y-2">
            {topicOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-200"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Special Offers */}
      <div className="rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 p-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={filters.hasDiscount}
            onChange={(e) => onFilterChange({ ...filters, hasDiscount: e.target.checked })}
            className="size-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-200"
          />
          <span className="text-sm font-semibold text-purple-900">فقط دوره‌های تخفیف‌دار</span>
        </label>
      </div>
    </div>
  );
}

function CoursePageHeader({
  title,
  totalCourses,
  filters,
  onFilterChange,
}: CoursePageHeaderProps) {
  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'price_low', label: 'ارزان‌ترین' },
    { value: 'price_high', label: 'گران‌ترین' },
    { value: 'rating', label: 'بیشترین امتیاز' },
  ];

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <span className="hover:text-primary cursor-pointer">خانه</span>
          <span>/</span>
          <span className="text-gray-900">دوره‌ها</span>
        </div>

        {/* Title and Count */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              {title}
            </h1>
            <p className="text-sm text-gray-600">
              {toPersianDigits(totalCourses)} دوره آموزشی
            </p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
                className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 pr-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* View Toggle */}
            <div className="hidden items-center gap-2 rounded-lg border border-gray-300 p-1 md:flex">
              <button
                type="button"
                className="rounded p-2 hover:bg-gray-100"
                aria-label="Grid View"
              >
                <Grid className="size-4" />
              </button>
              <button
                type="button"
                className="rounded p-2 hover:bg-gray-100"
                aria-label="List View"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50 lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}

function CoursePage({ initialCourses = [], categories = [] }: CoursePageProps) {
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'newest',
    priceRange: [0, 10000000],
    duration: [],
    level: [],
    category: '',
    hasDiscount: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  // Filter logic would go here
  const filteredCourses = initialCourses;

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header with title and sort/filter options */}
      <CoursePageHeader
        title="همه دوره‌های آنلاین و نرم‌افزار"
        totalCourses={filteredCourses.length}
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <CourseFilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
            />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <CourseGrid courses={currentCourses} />
            
            {/* Pagination */}
            <CoursePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Category Tabs Section */}
        <CourseCategoryTabs categories={categories} />
      </div>
    </div>
  );
}