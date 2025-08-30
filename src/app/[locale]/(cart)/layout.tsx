'use client';
// import { DemoBanner } from '@/components/DemoBanner';
// import { LocaleSwitcher } from '@/components/LocaleSwitcher';
// import Link from 'next/link';
// import { getTranslations, setRequestLocale } from 'next-intl/server';
import TopNavBar from '@/components/TopNavBar';
// import { BaseTemplate } from '@/templates/BaseTemplate';
// components
// import Footer from '@/templates/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'RootLayout',
  // });

  return (
    <>
      {/* <DemoBanner /> */}
      <TopNavBar />
      <div className="pt-16">{children}</div>
      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
}
