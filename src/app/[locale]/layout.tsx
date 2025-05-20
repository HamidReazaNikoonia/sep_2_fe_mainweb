import type { Metadata } from 'next';
// import { DemoBadge } from '@/components/DemoBadge';
import { routing } from '@/libs/i18nNavigation';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local'

import { Toaster } from "react-hot-toast";



// Provider
import ReactQueryProvider from '@/provider/ReactQueryProvider';

import '@/styles/global.css';
import 'react-range-slider-input/dist/style.css';


// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../../../public/assets/fonts/IRANSans-web.woff' });

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Using internationalization in Client Components
  const messages = await getMessages();

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.

  return (
    <html lang={locale}>
      <body className={myFont.className} suppressHydrationWarning>
        <ReactQueryProvider>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
        <Toaster position="bottom-center" />
          {props.children}

          {/* <DemoBadge /> */}

         
        </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
