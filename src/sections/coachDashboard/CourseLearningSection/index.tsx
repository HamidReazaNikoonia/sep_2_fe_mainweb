'use client';

import { getCoachCourseProgramRequest } from '@/API/coach';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CourseDetails from './CourseDetails';

// This would typically come from an API call
const mockCourseData = {
  _id: '67ff3b3a5431a208e1a20e05',
  amount: 1000000,
  is_have_penalty: true,
  penalty_fee: 5001,
  title: 'سطح اول',
  description:
    'توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول توضیحات سطح اول',
  course_subject_count: 1,
  createdAt: '2025-04-16T05:08:10.155Z',
  updatedAt: '2025-04-16T05:08:10.155Z',
  course_object_titles: ['سرفصل اول'],
};

export default function CourseLearningSection({ slug }: { slug: string }) {
  const [courseData, setCourseData] = useState();
  const [loading, setLoading] = useState(true);

  const {
    data: coachCourseProgram,
    isLoading: coachCourseProgramIsLoading,
    isSuccess: coachCourseProgramIsSuccess,
    isError: coachCourseProgramIsError,
    error: coachCourseProgramError,
  } = useQuery({
    queryKey: ['coachCourseProgram'],
    queryFn: () => getCoachCourseProgramRequest(),
  });

  useEffect(() => {
    console.log('coachCourseProgram', coachCourseProgram);
    if (Array.isArray(coachCourseProgram) && coachCourseProgram.length > 0) {
      const selectedCourse = coachCourseProgram.find(course => course._id === slug);
      setCourseData(selectedCourse);
      setLoading(false);
    }
  }, [coachCourseProgram]);

  useEffect(() => {
    // In a real application, you would fetch the course data here
    // Example:
    // const fetchCourseData = async () => {
    //   try {
    //     const response = await fetch(`/api/courses/${params.id}`)
    //     const data = await response.json()
    //     setCourseData(data)
    //   } catch (error) {
    //     console.error('Error fetching course data:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    //
    // fetchCourseData()

    // For demo purposes, we'll just use the mock data
    // setCourseData(mockCourseData)
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      {courseData && <CourseDetails courseData={courseData} />}
    </div>
  );
}
