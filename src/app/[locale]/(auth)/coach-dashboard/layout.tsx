/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import type React from 'react';
import LoadingSpinner from '@/components/LoadingSpiner';
import { Button } from '@/components/ui/button';

import useAuth from '@/hooks/useAuth';
import CoachNavbar from '@/sections/coachDashboard/CoachNavbar';
import { House, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: "داشبورد کاربر",
//   description: "داشبورد کاربر برای پلتفرم تجارت الکترونیک",
// }

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'sepah';

export default function CoachDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  const router = useRouter();

  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // Redirect to login page if the user is not authenticated
  useEffect(() => {
    // Check if the user is authenticated
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-isAuthenticated`) : false;
    const authToken = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-access`) : false;

    if (!authToken || !storedAuth) {
      // Redirect to login page if the user is not authenticated
      router.push('/sign-in');
    } else {
      // If authenticated, set loading to false
      setIsLoading(false);
    }
  }, [router]);

  // Extract the tab name from the URL
  // const getDefaultTab = () => {
  //   if (pathname === '/dashboard' || pathname === '/dashboard/overview') {
  //     return 'overview';
  //   } else {
  //     return pathname.match(/\/([^/]+)\/?$/)?.[1];
  //   }
  //   // Add more conditions for other tabs if needed
  // };

  // const defaultTab = getDefaultTab();

  // Show a loading spinner or nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // eslint-disable-next-line no-console
  console.log('user', user);

  return (
    <div className="flex-1 pt-6">
      <div className="flex flex-col space-y-2 px-4 pb-4 pt-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="destructive" size="sm" className="flex w-full md:w-auto">
            <span>خروج</span>
            <LogOut size={18} />
          </Button>

          <Link href="/">
            <Button variant="ghost" size="sm" className="flex w-full md:w-auto">
              <span>بازگشت به خانه</span>
              <House size={18} />
            </Button>
          </Link>
        </div>

        <h2 className="pt-4 text-right text-sm font-bold tracking-tight text-gray-700 md:pt-0 md:text-xl">
          <span> پنل کاربری : </span>
          <span className="text-primary-500">
            {' '}
            {user?.first_name}
            {' '}
          </span>
          <span className="text-primary-500">
            {' '}
            {user?.last_name}
            {' '}
          </span>

        </h2>


      </div>
      <div className="w-full border-t">
        <CoachNavbar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
