// import { AppConfig } from '@/utils/AppConfig';


export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // const { locale } = await props.params;
  // let clerkLocale = enUS;
  // let signInUrl = '/sign-in';
  // let signUpUrl = '/sign-up';
  // let dashboardUrl = '/dashboard';
  // let afterSignOutUrl = '/';

  // if (locale === 'fr') {
  //   clerkLocale = frFR;
  // }

  // if (locale !== AppConfig.defaultLocale) {
  //   signInUrl = `/${locale}${signInUrl}`;
  //   signUpUrl = `/${locale}${signUpUrl}`;
  //   dashboardUrl = `/${locale}${dashboardUrl}`;
  //   afterSignOutUrl = `/${locale}${afterSignOutUrl}`;
  // }


  return (
    <div
     
    >
      {props.children}
    </div>
  );
}
