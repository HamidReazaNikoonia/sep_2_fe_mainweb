'use client';

import type React from 'react';
import LoadingSpinner from '@/components/LoadingSpiner';
import useAuth from '@/hooks/useAuth';
import { BarChart2, Calendar, GraduationCap, Heart, Home, LogOut, Settings, ShoppingBag, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: "داشبورد کاربر",
//   description: "داشبورد کاربر برای پلتفرم تجارت الکترونیک",
// }

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'sepah';

const SidebarLink = ({ href, icon: Icon, children, isActive }: {
  href: string;
  icon: any;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <Link href={href}>
    <div className={`flex cursor-pointer items-center space-x-3 rounded-lg px-4 py-3 transition-colors
      ${isActive ? 'bg-[#E6E6FF] text-[#4338CA]' : 'hover:bg-gray-100'}`}
    >
      <Icon size={20} className={isActive ? 'text-[#4338CA]' : 'text-gray-600'} />
      <span className={`${isActive ? 'text-[#4338CA]' : 'text-gray-600'} font-medium`}>{children}</span>
    </div>
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-isAuthenticated`) : false;
    const authToken = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-access`) : false;

    if (!authToken || !storedAuth) {
      router.push('/sign-in');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white shadow-sm">
        <div className="p-4">
          <h1 className="mb-8 text-2xl font-bold text-[#4338CA]">Teamsy.</h1>

          <nav className="space-y-1">
            <SidebarLink href="/dashboard" icon={Home} isActive={pathname === '/dashboard'}>
              خانه
            </SidebarLink>
            <SidebarLink href="/dashboard/favorites" icon={Heart} isActive={pathname === '/dashboard/favorites'}>
              علاقه‌مندی‌ها
            </SidebarLink>
            <SidebarLink href="/dashboard/orders" icon={ShoppingBag} isActive={pathname === '/dashboard/orders'}>
              سفارشات
            </SidebarLink>
            <SidebarLink href="/dashboard/courses" icon={GraduationCap} isActive={pathname === '/dashboard/courses'}>
              دوره‌ها
            </SidebarLink>
            <SidebarLink href="/dashboard/statistics" icon={BarChart2} isActive={pathname === '/dashboard/statistics'}>
              آمار
            </SidebarLink>
            <SidebarLink href="/dashboard/calendar" icon={Calendar} isActive={pathname === '/dashboard/calendar'}>
              تقویم
            </SidebarLink>
            <SidebarLink href="/dashboard/team" icon={Users} isActive={pathname === '/dashboard/team'}>
              تیم
            </SidebarLink>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gray-200">
              {user?.first_name?.[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {user?.first_name}
                {' '}
                {user?.last_name}
              </p>
              <p className="text-sm text-gray-500">کاربر</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <input
                type="search"
                placeholder="جستجو..."
                className="w-64 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button type='button' className="rounded-lg p-2 hover:bg-gray-100">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => router.push('/sign-in')}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <LogOut size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
