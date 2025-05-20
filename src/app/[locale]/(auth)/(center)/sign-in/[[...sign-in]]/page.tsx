import AuthSection from '@/sections/auth/AuthForm';

// import { getTranslations } from 'next-intl/server';

// type ISignInPageProps = {
//   params: Promise<{ locale: string }>;
// };

// export async function generateMetadata(props: ISignInPageProps) {
//   const { locale } = await props.params;
//   const t = await getTranslations({
//     locale,
//     namespace: 'SignIn',
//   });

//   return {
//     title: t('meta_title'),
//     description: t('meta_description'),
//   };
// }

export default async function SignInPage() {
  return (
    <AuthSection />
  );
};
