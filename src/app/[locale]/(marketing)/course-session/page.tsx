// import { SERVER_API_URL } from '@/API/config';
// import CourseList from '@/sections/course/CourseList';
// import { getTranslations, setRequestLocale } from 'next-intl/server';

import HeroSwiperSection from '@/sections/course/HeroSwiperSection';
// import CourseSessionList from '@/sections/courseSession/CourseSessionList';
// import CourseSessionsSection from '@/sections/courseSession/CourseSessionList';
// import CourseSessionListContainer from '@/sections/courseSession/CourseSessionListContainer';
import CourseSessionListPage from '@/sections/courseSession/v2/CourseSessionList';
import CourseSessionSwiperRow from '@/sections/home/v2/CourseSessionSwiperRow';

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

// const fetchRepo = async () => {
//   const res = await fetch(`${SERVER_API_URL}/course-session`, {
//     next: { revalidate: 60 }, // Enables ISR (Incremental Static Regeneration)
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// };

export default async function Portfolio() {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Portfolio',
  // });

  // const coursesData = await fetchRepo();
  // // eslint-disable-next-line no-console
  // console.log({ coursesData: coursesData });

  return (
    <div className="primary-gradient-bg min-h-screen overflow-hidden pt-16 text-black">
      {/* <div className="container mx-auto pt-20">
        <CourseListHeader />
      </div> */}

      <div className="">
        <HeroSwiperSection />
      </div>

      {/* <div className=' container mx-auto my-28'>
        <CourseCategoryCardSection />
      </div> */}
      <div className="container mx-auto mb-12 mt-14">
        <CourseSessionSwiperRow />
      </div>

      <div className="mb-24">

        {/* <CourseList data={coursesData.data} /> */}
        <div>
          {/* <CourseSessionsSection courseSessions={coursesData.data.courses} /> */}
          <main className="mt-16 py-8">
            <CourseSessionListPage />
          </main>
        </div>
      </div>
    </div>
  );
};
