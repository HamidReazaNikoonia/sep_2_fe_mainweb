'use client';

import { Filter, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import CourseSessionProgramCardItem from '@/components/v2/CourseSessionProgramCardItem';

// Mock data for demonstration - replace with your actual data
const courseCategories = [
  'تقویم گرافیک',
  'تقویم کودک و نوجوان',
  'برنامه نویسی و سایت',
  'تقویم فنی و مهندسی',
  'تقویم حسابداری',
  'تقویم عمومی و اداری',
];

const coursesData = [
  {
    id: 1,
    title: 'دوره ایلوستریتور',
    score: 4.8,
    description: 'توضیحات: نرم افزار ایلوستریتور نیازی اساسی در طراحی گرافیکی می باشد، به کمک نرم افزار',
    startDate: '۲۱ تیر ۱۴۰۳',
    price: 6000000,
    duration: '۱.۵ ماه',
    isPresential: true,
    imageUrl: 'https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg',
  },
  {
    id: 2,
    title: 'دوره آموزش مربی مهد کودک',
    score: 4.6,
    description: 'توضیحات: دوره‌دهنده آموزش مدیر مهد کودک و مدیریگری مهد کودک در آریا تهران که بهترین',
    startDate: '۲۱ تیر ۱۴۰۳',
    price: 2000000,
    duration: '۱ ماه',
    isPresential: false,
    imageUrl: 'https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg',
  },
];

const CourseSessionV2Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    // Implement category filter logic here
  };

  const applyFilters = () => {
    // Implement filter application logic here
    console.log('Applying filters...');
  };

  return (
    <div className="min-h-screen bg-gray-200" dir="rtl">
      {/* Header Section */}
      <div className="border-b bg-white shadow-sm ">
        <div className="container mx-auto px-4 py-12">
          {/* Main Title */}
          <h1 className="mb-4 mt-16 text-center text-lg font-bold text-gray-800 md:text-2xl">
            دوره ها بر اساس تقویم آموزشی
          </h1>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-start gap-2 py-2 md:gap-3">
            <Button
              variant="default"
              className="min-w-[148px] bg-pink-500 text-[11px] text-white hover:bg-pink-600 md:text-xs"
            >
              مشاهده همه
            </Button>
            {courseCategories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="min-w-[148px] border-pink-500 text-[11px] text-pink-500 hover:bg-pink-50 md:text-xs"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">

          {/* Sidebar Filters */}
          <div className="h-fit rounded-lg border bg-white p-6 shadow-sm lg:w-80">
            <div className="mb-6 flex items-center gap-2">
              <Filter className="size-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">جستجوی پیشرفته</h2>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="فیلتر براساس نوع برگزاری"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                  value={searchQuery}
                  onChange={e => handleSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 size-4 text-gray-400" />
              </div>
            </div>

            {/* Filters Accordion */}
            <Accordion type="multiple" className="w-full">

              {/* Date Range Filter */}
              <AccordionItem value="date-range">
                <AccordionTrigger className="text-right hover:no-underline">
                  <span>فیلتر براساس تاریخ شروع</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="current-week" className="rounded" />
                      <label htmlFor="current-week" className="text-sm text-gray-600">هفته جاری</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="current-month" className="rounded" />
                      <label htmlFor="current-month" className="text-sm text-gray-600">ماه جاری</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="next-month" className="rounded" />
                      <label htmlFor="next-month" className="text-sm text-gray-600">ماه آینده</label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Duration Filter */}
              <AccordionItem value="duration">
                <AccordionTrigger className="text-right hover:no-underline">
                  <span>فیلتر براساس مدت دوره</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="short-duration" className="rounded" />
                      <label htmlFor="short-duration" className="text-sm text-gray-600">کمتر از 1 ماه</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="medium-duration" className="rounded" />
                      <label htmlFor="medium-duration" className="text-sm text-gray-600">1 تا 3 ماه</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="long-duration" className="rounded" />
                      <label htmlFor="long-duration" className="text-sm text-gray-600">بیشتر از 3 ماه</label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Duration in Hours Filter */}
              <AccordionItem value="hours-duration">
                <AccordionTrigger className="text-right hover:no-underline">
                  <span>فیلتر براساس  روز های هفته</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 ">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="short-hours" className="rounded" />
                      <label htmlFor="short-hours" className="text-sm text-gray-600">شنبه</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="medium-hours" className="rounded" />
                      <label htmlFor="medium-hours" className="text-sm text-gray-600">یکشنبه</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="long-hours" className="rounded" />
                      <label htmlFor="long-hours" className="text-sm text-gray-600">دوشنبه</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="long-hours" className="rounded" />
                      <label htmlFor="long-hours" className="text-sm text-gray-600">سه شنبه</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="long-hours" className="rounded" />
                      <label htmlFor="long-hours" className="text-sm text-gray-600">چهارشنبه</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="long-hours" className="rounded" />
                      <label htmlFor="long-hours" className="text-sm text-gray-600">جمعه</label>
                    </div>
                  </div>

                </AccordionContent>
              </AccordionItem>

            </Accordion>

            {/* Apply Filters Button */}
            <Button
              onClick={applyFilters}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-xs text-white hover:bg-blue-600 hover:from-pink-600 hover:to-purple-700"
            >
              اعمال فیلترها
            </Button>
          </div>

          {/* Course Cards */}
          <div className="flex-1">
            <div className="space-y-4">
              {filteredCourses.map(course => (
                <CourseSessionProgramCardItem
                  key={course.id}
                  title={course.title}
                  score={course.score}
                  description={course.description}
                  startDate={course.startDate}
                  price={course.price}
                  duration={course.duration}
                  isPresential={course.isPresential}
                  imageUrl={course.imageUrl}
                  onRegister={() => console.log(`Register for course: ${course.title}`)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseSessionV2Page;
