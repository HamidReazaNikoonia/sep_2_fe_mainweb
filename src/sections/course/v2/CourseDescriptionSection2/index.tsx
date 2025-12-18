/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable tailwindcss/no-custom-classname */

'use client';
import React, { useEffect, useState } from 'react';

// Define types for our data
type Skill = {
  id: number;
  name: string;
  category: string;
  icon: React.ReactNode;
};

type Stat = {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
};

const CourseDescriptionSection2: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    courses: 0,
    students: 0,
    experiences: 0,
  });

  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);

    // Animate stats
    const timer1 = setTimeout(() => {
      setAnimatedStats(prev => ({ ...prev, courses: 3406 }));
    }, 500);

    const timer2 = setTimeout(() => {
      setAnimatedStats(prev => ({ ...prev, students: 45000 }));
    }, 800);

    const timer3 = setTimeout(() => {
      setAnimatedStats(prev => ({ ...prev, experiences: 15 }));
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Skills data
  const skills: Skill[] = [
    {
      id: 1,
      name: 'برنامه نویسی',
      category: 'آموزش برنامه نویسی',
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" fill="#3572A5" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" fill="#FFD400" />
        </svg>
      ),
    },
    {
      id: 2,
      name: 'طراحی سایت',
      category: 'آموزش طراحی سایت',
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" fill="#F7DF1A" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" fill="#333333" />
        </svg>
      ),
    },
    {
      id: 3,
      name: 'فتوشاپ',
      category: 'آموزش فتوشاپ',
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#3B78E7" />
          <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 4,
      name: 'اتوکد',
      category: 'آموزش اتوکد',
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#E34C26" />
          <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Stats data
  const stats: Stat[] = [
    {
      id: 1,
      value: `+${animatedStats.courses.toLocaleString('fa-IR')}`,
      label: 'دوره',
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" fill="#3572A5" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" fill="#FFD400" />
        </svg>
      ),
    },
    {
      id: 2,
      value: `+${animatedStats.students.toLocaleString('fa-IR')}`,
      label: 'کاربر فعال',
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#3B78E7" />
          <path d="M12 7V12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 3,
      value: `+${animatedStats.experiences.toLocaleString('fa-IR')}`,
      label: 'تجربه',
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" fill="#3572A5" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" fill="#FFD400" />
        </svg>
      ),
    },
  ];

  // Mock profile images (replace with actual images)
  const profileImages = [
    'https://randomuser.me/api/portraits/women/45.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/men/64.jpg',
    'https://randomuser.me/api/portraits/men/34.jpg',
    'https://randomuser.me/api/portraits/men/36.jpg',
    'https://randomuser.me/api/portraits/men/38.jpg',


  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 size-80 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute right-20 top-1/2 size-96 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 size-64 rounded-full bg-green-400 blur-3xl"></div>
      </div>

      {/* Animated circular background */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="size-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </svg>
      </div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">

          {/* Left side - Skills and Stats */}
          <div className="relative flex-1">
            {/* Skills section */}
            <div className="relative mb-8 md:mb-16">
              <div className="flex flex-col items-center space-y-8">
                {/* Centered counter */}
                <div className="text-center">
                  <span className="animate-pulse text-4xl font-bold text-gray-900">
                    +
                    {animatedStats.courses && animatedStats.courses.toLocaleString('fa-IR')}
                  </span>
                  <p className="mt-1 text-sm text-gray-600">دوره مختلف</p>
                </div>

                {/* Skills around the circle */}
                <div dir="rtl" className="grid grid-cols-2 gap-2 text-right md:gap-3">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 rounded-lg bg-white p-2.5 shadow-md transition-all duration-300 hover:scale-105 md:p-3 md:pl-8"
                    >
                      <div className="rounded-lg bg-white p-1 shadow-sm md:p-2">
                        {skill.icon}
                      </div>
                      <div className="space-y-1 text-right">
                        <h4 className="text-xs font-medium text-gray-900 md:text-sm">{skill.name}</h4>
                        <p className=" text-[9px] text-gray-600 md:text-xs">{skill.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile avatars */}
              <div className="animate-slow-bounce-scale absolute left-[50px] top-[-25px] block opacity-50 delay-500 md:hidden">
                <img
                  src={profileImages[0]}
                  alt="Profile"
                  className="size-10 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="animate-slow-bounce-scale absolute right-[30px] top-[40px] block opacity-50 md:hidden">
                <img
                  src={profileImages[1]}
                  alt="Profile"
                  className="size-10 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="animate-slow-bounce-scale absolute left-[18px] top-[42px] block -translate-x-1/2 opacity-50 md:hidden">
                <img
                  src={profileImages[2]}
                  alt="Profile"
                  className="size-10 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="animate-slow-bounce-scale absolute right-[6px] top-[-27px] block opacity-50 md:hidden">
                <img
                  src={profileImages[3]}
                  alt="Profile"
                  className="size-10 rounded-full border-2 border-white shadow-md"
                />
              </div>

              {/* Smaller */}
              <div className="animate-slow-bounce-scale absolute right-[65px] top-[-6px] block opacity-50 md:hidden">
                <img
                  src={profileImages[4]}
                  alt="Profile"
                  className="size-8 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="animate-slow-bounce-scale absolute left-[4px] top-[-8px] block opacity-50 md:hidden">
                <img
                  src={profileImages[5]}
                  alt="Profile"
                  className="size-8 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="animate-slow-bounce-scale absolute left-[76px] top-[39px] block opacity-50 md:hidden">
                <img
                  src={profileImages[6]}
                  alt="Profile"
                  className="size-8 rounded-full border-2 border-white shadow-md"
                />
              </div>
            </div>

            {/* Stats section */}
            <div className="rounded-2xl bg-white p-3 md:p-6 shadow-xl backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {stats.map(stat => (
                  <div
                    key={stat.id}
                    className="rounded-lg bg-gray-50 p-4 text-center transition-colors duration-300 hover:bg-gray-100"
                  >
                    <div className="mb-2 flex items-center justify-center">
                      <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-900 md:text-2xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div dir="rtl" className="flex-1 text-center md:text-right">
            <h1 className={`mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all duration-1000 ease-out`}>
              یادگیری آفلاین
            </h1>
            <p className={`mb-4 md:mb-8 text-xl text-gray-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all delay-200 duration-1000 ease-out`}>
              کشف کن، تجربه کن، پیشرفت کن!
            </p>
            <p className={`mx-auto mb-8 max-w-lg px-2 text-xs leading-6 text-gray-600 md:mx-0 md:px-0 md:text-base ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-400 transition-all duration-1000 ease-out`}>
              روش‌های قدیمی رو کنار بذار! با یادگیری تعاملی، مفاهیم رو عمیقتر درک کن و مهارت‌هات رو تقویت کن.
            </p>
            <div className="mx-4 flex flex-col justify-center gap-2 sm:flex-row md:mx-0 md:justify-start md:gap-4">
              <button className={`rounded-full bg-white px-6 py-3 font-medium text-gray-900 shadow-md transition-shadow duration-300 hover:shadow-lg ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-600 transition-all duration-1000 ease-out`}>
                مشاوره
              </button>
              <button className={`pink-gradient-bg rounded-full px-6 py-3 font-medium text-white shadow-md transition-shadow duration-300 hover:shadow-lg ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-800 transition-all duration-1000 ease-out`}>
                مشاهده دوره‌ها
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Graduation cap decoration */}
      <div className="absolute bottom-16 right-16 hidden md:block">
        <svg className="size-12 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" />
          <path d="M12 24L12 22" />
          <path d="M12 22L10 20" />
          <path d="M12 22L14 20" />
        </svg>
      </div>
    </div>
  );
};

export default CourseDescriptionSection2;
