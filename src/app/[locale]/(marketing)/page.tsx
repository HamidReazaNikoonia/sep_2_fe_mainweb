import ServiceCardItem from '@/components/Card/ServiceCardItem';
import MainSwiper from '@/components/swiper/MainSwiper';

// import { Sponsors } from '@/components/Sponsors';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// sections
import CoursesCardSection from '../../../sections/home/CoursesCardSection';
import FAQSection from '../../../sections/home/FAQ';
import MultimediaTabsPortfolio from '../../../sections/home/MultimediaTabsPortfolio';
import ServiceSwiper from '../../../sections/home/ServiceCardSection';
import ThumbsSwiperImageGallery from '../../../sections/home/ThumbsSwiperImageGallery';

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
      <div className="flex">
        <MainSwiper />
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

      {/* Service Card Swiper */}
      <div className=" py-20">
        <ServiceSwiper />
      </div>

      {/* Courses Card Section */}
      <div className="container mx-auto py-20">
        <CoursesCardSection />
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
