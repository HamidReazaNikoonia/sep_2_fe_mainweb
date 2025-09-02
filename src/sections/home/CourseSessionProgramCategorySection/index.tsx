/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChevronsLeft } from 'lucide-react';
import { ClipboardList } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CourseSessionProgramCardItem from '@/components/v2/CourseSessionProgramCardItem';

export default function CourseSessionProgramCategorySection() {
  return (
    <>

      <div className="container mx-auto w-full px-3 md:px-0">

        {/* Header */}
        <div className="flex w-full justify-between gap-y-12 px-1 pb-1">

          <Link href="/course">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-transparent px-1 py-2 text-xs font-medium  text-gray-500 md:px-4 md:text-sm"
            >
              <ChevronsLeft className="mr-1 size-4 md:size-5" />
              مشاهده همه
            </button>
          </Link>
          <div className="inline-flex items-center py-2 text-sm  font-semibold text-black md:text-lg">

            دوره های استخدام
            <ClipboardList className="ml-3" />
          </div>
        </div>

        <CourseSessionProgramCardItem
          title="دوره ایلوستریتور"
          startDate="21 آذر 1404"
          endDate="15 دی 17"
          price={2600000}
          duration="1.5 ماه"
          isPresential
          imageUrl="https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg"
        />
      </div>

      <div className="container mx-auto flex w-full flex-row flex-wrap justify-between gap-1 gap-y-3 px-3 py-6 md:px-0">
        <div className="w-full md:w-[calc(50%-5px)]">
          <CourseSessionProgramCardItem
            title="دوره ایلوستریتور"
            startDate="21 آذر 1404"
            endDate="15 دی 17"
            price={2600000}
            duration="1.5 ماه"
            isPresential
            imageUrl="https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg"
          />
        </div>

        <div className="w-full md:w-[calc(50%-5px)]">
          <CourseSessionProgramCardItem
            title="دوره ایلوستریتور"
            startDate="21 آذر 1404"
            endDate="15 دی 17"
            price={2600000}
            duration="1.5 ماه"
            isPresential
            imageUrl="https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg"
          />
        </div>

        <div className="w-full md:w-[calc(50%-5px)]">
          <CourseSessionProgramCardItem
            title="دوره ایلوستریتور"
            startDate="21 آذر 1404"
            endDate="15 دی 17"
            price={2600000}
            duration="1.5 ماه"
            isPresential
            imageUrl="https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg"
          />
        </div>

        <div className="w-full md:w-[calc(50%-5px)]">
          <CourseSessionProgramCardItem
            title="دوره ایلوستریتور"
            startDate="21 آذر 1404"
            endDate="15 دی 17"
            price={2600000}
            duration="1.5 ماه"
            isPresential
            imageUrl="https://www.aryatehran.com/wp-content/uploads/2019/08/Comprehensive-ICDL.jpg"
          />
        </div>

        {/* Banner */}
        <div>
          <section dir="rtl" id="for-wrok" className="mt-10 md:mt-8">
            <div className="container-my">
              <div className="cat-slit flex flex-wrap">
                <a href="" className="mb-3 w-full p-0 md:mb-0 md:w-1/2 md:pb-3 md:pl-3">
                  <img decoding="async" className="entered lazyloaded rounded shadow" src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-19.jpg" alt="" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-19.jpg" data-ll-status="loaded" />
                </a>
                <a href="" className="mb-3 w-full p-0 md:mb-0 md:w-1/2 md:pb-3 md:pr-3">
                  <img decoding="async" className="entered lazyloaded rounded shadow" src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-16.jpg" alt="" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-16.jpg" data-ll-status="loaded" />
                </a>

                <a href="" className="mb-3 w-full p-0 md:mb-0 md:w-1/2 md:pl-3 md:pt-3">
                  <img decoding="async" class="entered lazyloaded rounded shadow" src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-13.jpg" alt="" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-13.jpg" data-ll-status="loaded" />
                </a>

                <a href="" className="w-full p-0 md:w-1/2  md:pr-3 md:pt-3">
                  <img decoding="async" class="entered lazyloaded rounded shadow" src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-5.jpg" alt="" data-lazy-src="https://www.aryatehran.com/wp-content/uploads/2023/09/banner-5.jpg" data-ll-status="loaded" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
