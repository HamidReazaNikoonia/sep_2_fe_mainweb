/* eslint-disable @next/next/no-img-element */
'use client';

import type React from 'react';
import { BarChart2, BookOpenCheck, Calendar, GraduationCap, Heart, Home, House, LogOut, Menu, ShoppingBag, User, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Drawer from '@/components/Drawer';
import LoadingSpinner from '@/components/LoadingSpiner';
import useAuth from '@/hooks/useAuth';
import { useDrawer } from '@/hooks/useDrawer';

// export const metadata: Metadata = {
//   title: "داشبورد کاربر",
//   description: "داشبورد کاربر برای پلتفرم تجارت الکترونیک",
// }

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'sepah';

const SidebarLink = ({ href, icon: Icon, children, isActive, onClick }: {
  href: string;
  icon: any;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <Link href={href} onClick={onClick}>
    <div className={`flex w-full cursor-pointer items-center space-x-3 rounded-lg px-4 py-3 transition-colors
      ${isActive ? 'bg-[#E6E6FF] text-[#4338CA]' : 'hover:bg-gray-100'}`}
    >
      <Icon size={20} className={isActive ? 'text-[#4338CA]' : 'text-gray-600'} />
      <span className={`${isActive ? 'text-[#4338CA]' : 'text-gray-600'} font-medium pr-2`}>{children}</span>
    </div>
  </Link>
);

const SidebarContent = ({ user, pathname, onLinkClick }: {
  user: any;
  pathname: string;
  onLinkClick?: () => void;
}) => (
  <div className="flex h-full flex-col bg-white/70 backdrop-blur-sm border border-gray-200 shadow-md">
    <div className="flex-1 p-4">
      <div className="mb-8 flex items-center gap-3 p-2">
        {user?.avatar?.file_name
          ? (
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${user?.avatar?.file_name}`}
                alt={`${user?.first_name} ${user?.last_name}`}
                className="size-16 rounded-full object-cover"
              />
            )
          : (
              <div className="flex size-12 items-center justify-center rounded-full bg-[#E6E6FF]">
                <User size={24} className="text-[#4338CA]" />
              </div>
            )}
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-900">
            {user?.first_name}
            {' '}
            {user?.last_name}
          </h2>
          <p className="text-right text-sm text-gray-500">خوش آمدید</p>
        </div>
      </div>

      <nav className="space-y-1">
        <SidebarLink href="/dashboard" icon={Home} isActive={pathname === '/dashboard'} onClick={onLinkClick}>
          خانه
        </SidebarLink>
        <SidebarLink href="/dashboard/favorites" icon={Heart} isActive={pathname === '/dashboard/favorites'} onClick={onLinkClick}>
          علاقه‌مندی‌ها
        </SidebarLink>
        <SidebarLink href="/dashboard/orders" icon={ShoppingBag} isActive={pathname === '/dashboard/orders'} onClick={onLinkClick}>
          سفارشات
        </SidebarLink>
        <SidebarLink href="/dashboard/courses" icon={GraduationCap} isActive={pathname === '/dashboard/courses'} onClick={onLinkClick}>
          دوره‌ها
        </SidebarLink>
        <SidebarLink href="/dashboard/course-session" icon={BookOpenCheck} isActive={pathname === '/dashboard/course-session'} onClick={onLinkClick}>
          کلاس ها
        </SidebarLink>
        <SidebarLink href="/dashboard/statistics" icon={BarChart2} isActive={pathname === '/dashboard/statistics'} onClick={onLinkClick}>
          آمار
        </SidebarLink>
        <SidebarLink href="/dashboard/calendar" icon={Calendar} isActive={pathname === '/dashboard/calendar'} onClick={onLinkClick}>
          تقویم
        </SidebarLink>
        <SidebarLink href="/dashboard/team" icon={Users} isActive={pathname === '/dashboard/team'} onClick={onLinkClick}>
          تیم
        </SidebarLink>
      </nav>
    </div>

    <div className="border-t p-4">
      <div className="flex items-center">
        {/* <div className="flex size-10 items-center justify-center rounded-full bg-gray-200">
          {user?.first_name?.[0]}
        </div> */}
        {/* <div>
          <p className="text-sm font-medium text-gray-900">
            {user?.first_name}
            {' '}
            {user?.last_name}
          </p>
          <p className="text-sm text-gray-500">کاربر</p>
        </div> */}
        <div className="mt-2 flex w-full flex-col items-center justify-center">
          <span className="pb-2 text-sm text-gray-500">موجودی کیف پول شما</span>
          <span className="w-full border-t pt-2 text-center text-sm font-medium text-gray-900">
            {user?.wallet?.amount ? user?.wallet?.amount?.toLocaleString('fa-IR') : (0).toLocaleString('fa-IR')}
            {' '}
            تومان
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen: isDrawerOpen, openDrawer, closeDrawer } = useDrawer();

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

  const logoutUserHandler = () => {
    logout();
    toast.success('خروج با موفقیت انجام شد');
    router.push('/sign-in');
  };

  return (
    <div dir='rtl' className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden w-64 border-r bg-white shadow-sm lg:block">
        <SidebarContent user={user} pathname={pathname} />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="منو"
        width="w-80"
      >
        <SidebarContent user={user} pathname={pathname} onLinkClick={closeDrawer} />
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 lg:px-6">
            <div className="flex items-center space-x-4">
              {/* Mobile Hamburger Menu */}
              <button
                type="button"
                onClick={openDrawer}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <House size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => router.push('/dashboard/user-profile')}
                type="button"
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <User size={20} className="text-gray-600" />
              </button>
              <button
                type="button"
                onClick={logoutUserHandler}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <LogOut size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
