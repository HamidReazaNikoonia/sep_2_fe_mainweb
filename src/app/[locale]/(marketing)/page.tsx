import ServiceCardItem from '@/components/Card/ServiceCardItem';
import MainSwiper from '@/components/swiper/MainSwiper';

// import { Sponsors } from '@/components/Sponsors';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import CategoriesBannerSlider from '../../../components/CategoriesBannerSlider';
// sections
import CoursesCardSection from '../../../sections/home/CoursesCardSection';
import FAQSection from '../../../sections/home/FAQ';
import MultimediaTabsPortfolio from '../../../sections/home/MultimediaTabsPortfolio';
import ServiceSwiper from '../../../sections/home/ServiceCardSection';

import ThumbsSwiperImageGallery from '../../../sections/home/ThumbsSwiperImageGallery';
import CourseCardItem from '@/components/Card/CourseCard';
import ToturialsSwiperCardSection from '@/sections/home/ToturialsSwiperCardSection';
import HSwiper from '@/components/swiper/HSwiper';
import CourseHotBanner from '@/sections/home/CourseHotBanner';

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

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return (
    <div className=" overflow-hidden bg-black pt-16">

      {/* Main Slider In md Screen */}
      <div className="mt-6 flex flex-col px-4 md:mt-0 md:px-0">
        <div className=" mt-4 block px-4 pb-3 text-right text-sm text-white md:hidden">
          پرفروش ترین ها
        </div>
        <MainSwiper />
      </div>

      <div className="mt-6 flex flex-col px-4 md:hidden">
        <div className="flex flex-col">
          <div className=" px-4 pb-3 text-right text-sm text-white">
            پرفروش ترین ها
          </div>
          <MainSwiper />
        </div>

        <div className="mt-6 flex flex-col">
          <div className=" px-4 pb-3 text-right text-sm text-white">
            پرفروش ترین ها
          </div>
          <MainSwiper />
        </div>

      </div>

      {/* Service Card Item */}
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <ServiceCardItem
            title="پژوهشکده هوش مصنوعی"
            subtitle="دنیایی از تکنولوژی های جدید"
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

          <ServiceCardItem
            title="پژوهشکده هوش مصنوعی"
            subtitle="دنیایی از تکنولوژی های جدید"
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

          <ServiceCardItem
            title="پژوهشکده هوش مصنوعی"
            subtitle="دنیایی از تکنولوژی های جدید"
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

          <ServiceCardItem
            title="پژوهشکده هوش مصنوعی"
            subtitle="دنیایی از تکنولوژی های جدید"
            backgroundImage="https://aisun-ci.ir/wp-content/uploads/2024/08/photography5.jpg"
            buttonText="ورود به این بخش"
            buttonLink="/"
          />

        </div>
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
      <div className="container mx-auto py-20">
        <CoursesCardSection />
      </div>

      {/* Toturials */}
      <div className='py-20'>
        <ToturialsSwiperCardSection />
      </div>


        <div className='w-full py-20'>
          <CourseHotBanner />
        </div>

      {/* Image Gallery Section */}
      <div className="container mx-auto py-20">
        <ThumbsSwiperImageGallery />
      </div>

      {/* Multimedia Video Tabs Section */}
      <div className="container mx-auto py-20">
        <MultimediaTabsPortfolio />
      </div>

      {/* FAQs Section */}
      <div className="container mx-auto py-20">
        <FAQSection />
      </div>
    </div>
  );
};
