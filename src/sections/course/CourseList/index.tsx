'use client';
import { useQuery } from '@tanstack/react-query';
import { Clapperboard } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// API
import { getCoursesRequest } from '@/API/course';

// Types
import type { ICourseTypes } from '@/types/Course';

import CourseCardItem from '@/components/CourseItem';
// components
// import CourseItem from '@/components/CourseItem';
// import CourseCardItem from '@/components/Card/CourseCard';
import CourseListFilter from '@/sections/course/CourseListFilter';
// import { getProductsRequest } from '@/API/product';

// const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';
// const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || '';

type FilterParams = {
  keyword?: string;
  sort?: string;
  category?: string;
  brand?: string;
  price_from?: number;
  price_to?: number;
};

export default function CourseList({ data }: { data: { courses: ICourseTypes[]; count: number } }) {
  const [filteredCourses, setFilteredCourses] = useState(data?.courses);
  const [filterParams, setFilterParams] = useState<FilterParams | null>(null);

  const { data: courseDataFromQuery, isLoading, isError, isSuccess } = useQuery({
    queryFn: async () => await getCoursesRequest(filterParams || {}),
    enabled: filterParams !== null,
    queryKey: ['course', filterParams], // Array according to Documentation
  });

  // const product_sortType = useProductsStore((state) => state.product_sortType);

  useEffect(() => {
    console.log({ dataInUseEffect: courseDataFromQuery });
    if (courseDataFromQuery?.data?.courses && isSuccess) {
      setFilteredCourses(courseDataFromQuery?.data?.courses);
    }
  }, [courseDataFromQuery, isSuccess]);

  // useEffect(() => {

  //   if (!isEmpty(product_sortType)) {
  //     setFilterParams({ ...filterParams, sort: product_sortType });
  //   }

  // }, [product_sortType])

  const filterHandler = (options) => {
    const queryOptionsReq = {};

    console.log(options);
    setFilterParams(options);
  };

  console.log(data);

  return (
    <>

      <div className="mx-8 mb-8 flex justify-between">

        {/* Filter Modal */}
        <CourseListFilter filterHandler={(d: any) => filterHandler(d)} />

        <div className="flex">
          <h3 className=" mr-3 text-right text-xl font-bold">فیلم های آموزشی</h3>
          <Clapperboard />
        </div>

      </div>
      <div dir='rtl' className="grid w-full grid-cols-1 gap-3 px-4 md:grid-cols-3 md:px-0">

        {filteredCourses.length === 0 && (
          <div className="w-full items-center justify-center py-12 text-center text-lg font-semibold text-black">
            موردی یافت نشد
          </div>
        )}

        {/* {filteredCourses && filteredCourses.map(course => (
          <CourseCardItem data={course} key={course._id} isLikedByUser />
        ))} */}

        {filteredCourses && filteredCourses.map(course => (
          <CourseCardItem course={course} key={course?.id} isLikedByUser />
        ))}

      </div>
    </>
  );
}
