/* eslint-disable react/no-useless-fragment */
/* eslint-disable style/indent */
/* eslint-disable tailwindcss/classnames-order */
import { AppConfig } from '@/utils/AppConfig';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import StickySidebarWraper from '@/sections/course/StickySidebarWraper';
import CoursePageHeader from '@/sections/course/CoursePageHeader';

import { ICourseTypes } from '@/types/Course';
import CommentLayout from '@/components/Comment';

import {SERVER_API_URL} from '@/API/config';

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
  console.log({ nn: productsData })

  return (
    <>
      <div className="overflow-hidden bg-[#242525] text-white pt-16 min-h-screen">

        {/* heaser title */}
        <div>
          <CoursePageHeader courseCategory={productsData.course_category[0]?.name || ''} title={productsData.title} />
        </div>

        <div className="container mx-auto" id="StickySidebarWraper">
          <StickySidebarWraper dataFromServer={productsData} />
        </div>

         {/* Comment Section */}
        <CommentLayout type="product" productId={`672f3b105a9ecf2eb7dc1eb4`} />
      </div>
    </>
  );
};

export const dynamicParams = false;
