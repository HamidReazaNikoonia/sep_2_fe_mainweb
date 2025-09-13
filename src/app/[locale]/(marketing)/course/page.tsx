import { SERVER_API_URL } from '@/API/config';
// import CourseList from '@/sections/course/CourseList';
// import { getTranslations, setRequestLocale } from 'next-intl/server';

import HeroSwiperSection from '@/sections/course/HeroSwiperSection';
import CourseDescriptionSection2 from '@/sections/course/v2/CourseDescriptionSection2';
import CourseListPage from '@/sections/course/v2/CourseList';

// type IPortfolioProps = {
//   params: Promise<{ locale: string }>;
// };

// export async function generateMetadata(props: IPortfolioProps) {
//   const { locale } = await props.params;
//   const t = await getTranslations({
//     locale,
//     namespace: 'Portfolio',
//   });

//   return {
//     title: t('meta_title'),
//     description: t('meta_description'),
//   };
// }

const fetchRepo = async () => {
  const res = await fetch(`${SERVER_API_URL}/course`, {
    next: { revalidate: 60 }, // Enables ISR (Incremental Static Regeneration)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export default async function Portfolio() {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Portfolio',
  // });

  const coursesData = await fetchRepo();
  // eslint-disable-next-line no-console
  console.log({ coursesData: coursesData.courses });

  return (
    <div className="min-h-screen overflow-hidden pt-16 text-black">
      {/* <div className="container mx-auto pt-20">
        <CourseListHeader />
      </div> */}

      <div className="">
        <HeroSwiperSection />
      </div>

      <div className='w-full'>
        <CourseDescriptionSection2 />
      </div>

      {/* <div className=' container mx-auto my-28'>
        <CourseCategoryCardSection />
      </div> */}

      <div className="w-full">

        <CourseListPage />

      </div>
    </div>
  );
};
