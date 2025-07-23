// import { Sponsors } from '@/components/Sponsors';
import { getTranslations } from 'next-intl/server';
import ServiceCardItem from '@/components/Card/ServiceCardItem';

import CourseSessionCategory from '@/components/CourseSessionCategory';

import MainSwiper from '@/components/swiper/MainSwiper';
// import MultimediaTabsPortfolio from '../../../sections/home/MultimediaTabsPortfolio';
// import ServiceSwiper from '../../../sections/home/ServiceCardSection';

// import CourseHotBanner from '@/sections/home/CourseHotBanner';

// import ToturialsSwiperCardSection from '@/sections/home/ToturialsSwiperCardSection';
// import ThumbsSwiperImageGallery from '../../../sections/home/ThumbsSwiperImageGallery';
import ServicesNavBar from '@/sections/home/ServicesNavBar';
// import CategoriesBannerSlider from '../../../components/CategoriesBannerSlider';
// sections
// import CoursesCardSection from '../../../sections/home/CoursesCardSection';
import FAQSection from '../../../sections/home/FAQ';
import CourseSessionSwiperRow from '@/sections/home/v2/CourseSessionSwiperRow';
import CourseSessionProgramCategorySection from '@/sections/home/CourseSessionProgramCategorySection';
// import CourseSessionProgramCardItem from '@/components/v2/CourseSessionProgramCardItem';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index() {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Index',
  // });

  return (
    <div className=" overflow-hidden bg-gray-200 pt-16">

      {/* Main Slider In md Screen */}
      <div className=" flex-col">
        <MainSwiper />
      </div>

      <section>
        <ServicesNavBar />
      </section>

      <section className="w-full">
        <CourseSessionCategory />
      </section>

      {/* Service Card Item */}
      {/* <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <ServiceCardItem
            title="پژوهشکده هوش مصنوعی"
            subtitle="دنیایی از تکنولوژی های جدید"
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

          <ServiceCardItem
            title="آکادمی آموزشی"
            subtitle="دوره های آموزش تخصصی "
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

          <ServiceCardItem
            title="استدیو تخصصی"
            subtitle="تولید محتوای دیجیتال"
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

          <ServiceCardItem
            title="مجم.عه دختران"
            subtitle="ویژه دختران و بانوان"
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

        </div>
      </div> */}


      <div className='w-full md:container md:mx-auto border px-0 md:px-4 py-12'>
        <CourseSessionSwiperRow />
      </div>

        <div>
        <CourseSessionProgramCategorySection />
        </div>
    

      {/* <div className='py-12 bg-white'>
        <CategoriesBannerSlider />
      </div> */}

      {/* Service Card Swiper */}
      {/* <div className=" bg-gradient-to-r from-blue-800 to-indigo-900 py-20">
        <div className="flex w-full flex-col">
          <div className="mb-20">
            <ServiceSwiper rowTitle="محصولات فرهنگی" />
          </div>

          <div className='mb-20'>
            <ServiceSwiper rowTitle='فیلم و سریال' />
          </div>

          <div className='mb-2'>
            <ServiceSwiper rowTitle='نویسندگی' />
          </div>
        </div>
      </div> */}

      {/* Courses Card Section */}
      {/* <div className="container mx-auto py-20">
        <CoursesCardSection />
      </div> */}

      {/* Toturials */}
      {/* <div className="py-20">
        <ToturialsSwiperCardSection />
      </div> */}

      {/* <div className="w-full py-20">
        <CourseHotBanner />
      </div> */}

      {/* Image Gallery Section */}
      {/* <div className="container mx-auto py-20">
        <ThumbsSwiperImageGallery />
      </div> */}

      {/* Multimedia Video Tabs Section */}
      {/* <div className="container mx-auto py-20">
        <MultimediaTabsPortfolio />
      </div> */}

      {/* FAQs Section */}
      <div className="container mx-auto py-20">
        <FAQSection />
      </div>
    </div>
  );
};
