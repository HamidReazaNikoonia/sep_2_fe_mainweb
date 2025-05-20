// import SubHeader from '@/components/SubHeader';
import TopNavBar from '@/components/TopNavBar';
import { getTranslations, setRequestLocale } from 'next-intl/server';
// components
import Footer from '@/templates/Footer';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  });

  return (
    <>
      {/* <DemoBanner /> */}
      <TopNavBar />
      {/* <SubHeader /> */}
      <div className="">{props.children}</div>
      {/* Footer */}
      <Footer />
    </>
  );
}
