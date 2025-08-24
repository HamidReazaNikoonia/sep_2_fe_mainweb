import useAuth from '@/hooks/useAuth';

/* eslint-disable react/no-array-index-key */
/* eslint-disable react-dom/no-missing-button-type */
import { toPersianDigits } from '@/utils/Helpers';

import { GraduationCap, LayoutDashboard, LogOut, Logs, UserRound, Layers2 } from 'lucide-react';

import React, { useEffect, useRef, useState } from 'react';

// Define types for the props
type User = {
  first_name: string;
  last_name: string;
  mobile: string;
  role?: string;
};

type UserAvatarProps = {
  userName: string;
  user: User;
  isMobile: boolean;
};

type DropdownItem = {
  title: string;
  link: string;
  icon?: JSX.Element;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user, isMobile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { logout } = useAuth();

  // console.log('user', user);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dropdown items
  const items: DropdownItem[] = [
    { title: 'داشبورد', link: '/dashboard', icon: <LayoutDashboard size={16} color="rgb(55, 65, 81)" /> },
    { title: 'سفارش ها', link: '/dashboard/orders', icon: <Logs size={16} color="rgb(55, 65, 81)" /> },
    { title: 'دوره ها', link: '/dashboard/course-sessions', icon: <GraduationCap size={16} color="rgb(55, 65, 81)" /> },
    { title: 'آموزش ها', link: '/dashboard/course', icon: <Layers2 size={16} color="rgb(55, 65, 81)" /> },

    ...(user?.role === 'coach'
      ? [
          { title: 'پنل مربی', link: '/coach-dashboard', icon: <GraduationCap size={16} color="rgb(55, 65, 81)" /> },
        ]
      : []),
  ];

  const logoutHandler = () => {
    setIsDropdownOpen(false);
    logout();
    setTimeout(() => {
      // router.refresh();
      if (window) {
        window.location.reload();
      }
    }, 1500);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="ml-3 flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white hover:bg-gray-100 focus:outline-none md:size-10"
      >

        <span className="font-semibold text-gray-500">
          <UserRound strokeWidth={1} size={isMobile ? 20 : 26} />
        </span>

      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white pb-2 text-right shadow-lg">
          <div className="w-full border-b pb-1">
            <div className="mr-3 py-2 text-xs text-gray-700 md:text-sm">
              {user.first_name}
              {' '}
              {user.last_name}
            </div>

            <div className="mr-3 pb-1 text-xs text-gray-400">
              {user.mobile && toPersianDigits(user.mobile)}
              {' '}
              موبایل
            </div>
          </div>
          <ul className="pt-1">
            {items.map((item, index) => (
              <li className="" key={index}>
                <a
                  href={item.link}
                  className="flex items-center justify-end rounded-lg px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 md:text-sm"
                >
                  <div className="mr-2">
                    {item.title}
                  </div>

                  <div>
                    {item.icon}
                  </div>
                </a>

              </li>
            ))}
            <li className="mt-4 flex w-full justify-end">
              <button
                onClick={logoutHandler}
                className="mr-2 flex items-center justify-end rounded-lg bg-red-600 px-4 py-2 text-xs text-gray-100 hover:bg-red-700 md:text-sm"
              >
                <div className="mr-2">
                  خروج
                </div>

                <div>
                  <LogOut size={16} color="white" />
                </div>
              </button>

            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
