// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CenteredLayout(props: { children: React.ReactNode }) {
  // const { userId } = await auth();

  // if (userId) {
  //   redirect('/dashboard');
  // }

  return (
    <div className="w-full">
      {props.children}
    </div>
  );
}
