import { DemoBanner } from '@/components/DemoBanner';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import TopNavBar from '@/components/TopNavBar';
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
        <div className="pt-16">{props.children}</div>
         {/* Footer */}
         {/* <Footer /> */}
    </>
  );
}
