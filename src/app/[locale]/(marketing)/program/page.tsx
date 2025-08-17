// import { SERVER_API_URL } from '@/API/config';
// import CourseList from '@/sections/course/CourseList';
// import { getTranslations, setRequestLocale } from 'next-intl/server';

// import CourseSessionList from '@/sections/courseSession/CourseSessionList';
// import CourseSessionsSection from '@/sections/courseSession/CourseSessionList';
// import CourseSessionListContainer from '@/sections/courseSession/CourseSessionListContainer';
import ProgramListContainer from '@/sections/courseSession/v2/ProgramListContainer';

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

export default async function ProgramPage() {
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
    <div className="min-h-screen overflow-hidden bg-gray-200 pt-16 text-black">

      <div className="mb-0">

        {/* <CourseList data={coursesData.data} /> */}
        <div>
          {/* <CourseSessionsSection courseSessions={coursesData.data.courses} /> */}
          <main className="mt-0 py-2">
            <ProgramListContainer />
          </main>
        </div>
      </div>
    </div>
  );
};
