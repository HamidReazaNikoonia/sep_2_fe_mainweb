/* eslint-disable tailwindcss/classnames-order */
import type { ICourseTypes } from '@/types/Course';
// import { AppConfig } from '@/utils/AppConfig';
import { Clapperboard } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
// import Image from 'next/image';
import { SERVER_API_URL } from '@/API/config';

import CommentLayout from '@/components/Comment';
import CourseSubjectLessonsList from '@/components/CourseSubjectLessonsList';

import CoursePageHeader from '@/sections/course/CoursePageHeader';
import StickySidebarWraper from '@/sections/course/StickySidebarWraper';

type IPortfolioDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

// export function generateStaticParams() {
//   return AppConfig.locales
//     .map(locale =>
//       Array.from(Array.from({ length: 6 }).keys()).map(elt => ({
//         slug: `${elt}`,
//         locale,
//       })),
//     )
//     .flat(1);
// }

export async function generateMetadata(props: IPortfolioDetailProps) {
  const { locale, slug } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'PortfolioSlug',
  });

  return {
    title: t('meta_title', { slug }),
    description: t('meta_description', { slug }),
  };
}

const fetchRepo = async ({ courseId }: { courseId: string }): Promise<ICourseTypes> => {
  const res = await fetch(`${SERVER_API_URL}/course/${courseId}/`, {
    next: { revalidate: 60 }, // Enables ISR (Incremental Static Regeneration)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export default async function SpecificCoursePage(props: IPortfolioDetailProps) {
  // const { locale, slug } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'PortfolioSlug',
  // });

  const params = await props.params;
  const productsData = await fetchRepo({ courseId: params.slug });
  console.log({ nn: productsData });

  // Sample data matching the provided structure
  const sampleCourseObjects = [
    {
      subject_title: 'مقدمه‌ای بر برنامه‌نویسی',
      description: 'آشنایی با مفاهیم پایه برنامه‌نویسی',
      order: 1,
      duration: 120, // 2 hours
      files: {
        _id: 'file1',
        file_name: 'introduction-slides.pdf',
      },
      lessons: [
        {
          title: 'تاریخچه برنامه‌نویسی',
          description: 'نگاهی به تاریخ و تکامل برنامه‌نویسی',
          order: 1,
          status: 'PUBLIC' as const,
          duration: 30,
          file: {
            _id: 'lesson-file1',
            file_name: 'history-of-programming.mp4',
          },
        },
        {
          title: 'زبان‌های برنامه‌نویسی',
          description: 'آشنایی با انواع زبان‌های برنامه‌نویسی',
          order: 2,
          status: 'PUBLIC' as const,
          duration: 45,
          file: {
            _id: 'lesson-file2',
            file_name: 'programming-languages.mp4',
          },
        },
        {
          title: 'محیط‌های توسعه',
          description: 'نصب و راه‌اندازی IDE',
          order: 3,
          status: 'PRIVATE' as const,
          duration: 45,
          file: {
            _id: 'lesson-file3',
            file_name: 'ide-setup.mp4',
          },
        },
      ],
    },
    {
      subject_title: 'متغیرها و انواع داده',
      description: 'یادگیری متغیرها و انواع مختلف داده‌ها',
      order: 2,
      duration: 180, // 3 hours
      files: {
        _id: 'file2',
        file_name: 'variables-data-types.pdf',
      },
      lessons: [
        {
          title: 'تعریف متغیر',
          description: 'نحوه تعریف و استفاده از متغیرها',
          order: 1,
          status: 'PUBLIC' as const,
          duration: 60,
          file: {
            _id: 'lesson-file4',
            file_name: 'variables.mp4',
          },
        },
        {
          title: 'انواع داده‌ها',
          description: 'آشنایی با انواع مختلف داده‌ها',
          order: 2,
          status: 'PRIVATE' as const,
          duration: 90,
          file: {
            _id: 'lesson-file5',
            file_name: 'data-types.mp4',
          },
        },
        {
          title: 'تبدیل نوع داده',
          description: 'نحوه تبدیل بین انواع مختلف داده‌ها',
          order: 3,
          status: 'PRIVATE' as const,
          duration: 30,
          file: {
            _id: 'lesson-file6',
            file_name: 'type-conversion.mp4',
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="overflow-hidden blue-gradient-bg text-white pt-16 min-h-screen">

        {/* heaser title */}
        <div>
          <CoursePageHeader courseCategory={productsData.course_category[0]?.name || ''} title={productsData.title} />
        </div>

        <div className="" id="StickySidebarWraper">
          <StickySidebarWraper dataFromServer={productsData} />
        </div>

        <div className="w-full pink-gradient-bg pb-14 pt-10 px-4 md:px-12">
          <h2 className="flex items-center justify-end text-right mr-2 text-lg md:text-2xl font-bold mb-6">
            فهرست درس ها
            <Clapperboard size={28} className="ml-2" />
          </h2>
          <CourseSubjectLessonsList courseId={productsData.id || productsData._id} course_objects={productsData.course_objects} />
        </div>

        {/* Comment Section */}
        <CommentLayout type="product" productId={productsData.id} />
      </div>
    </>
  );
};

export const dynamicParams = false;
