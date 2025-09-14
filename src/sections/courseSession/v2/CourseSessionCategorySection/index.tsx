/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-dom/no-missing-button-type */
import React from 'react';

// Define types for our data
type CourseCardProps = {
  title: string;
  description: string[];
  icon: React.ReactNode;
  stats: {
    courses: number;
    students: number;
    instructors: number;
  };
  image: string;
};

const CourseSessionCategorySection: React.FC = () => {
  // Mock data for the course cards
  const courseCards: CourseCardProps[] = [
    {
      title: 'علوم رایانه',
      description: [
        'مهاجم پایایی داد و پایگاههای داد',
        'تجسم داد (Data Visualization)',
        'دسته بندی کاربردی دیگر',
      ],
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" fill="#3B78E7" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" fill="#FFD400" />
        </svg>
      ),
      stats: {
        courses: 317,
        students: 56,
        instructors: 6,
      },
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230426115225/computer-image-660.jpg',
    },
    {
      title: 'تحلیل داده',
      description: [
        'مهاجم پایایی داد و پایگاههای داد',
        'تجسم داد (Data Visualization)',
        'دسته بندی کاربردی دیگر',
      ],
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" fill="#3B78E7" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" fill="#FFD400" />
        </svg>
      ),
      stats: {
        courses: 317,
        students: 56,
        instructors: 6,
      },
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230426115225/computer-image-660.jpg',
    },
    {
      title: 'رياضی و آمار',
      description: [
        'مهاجم کلیدی امار',
        'عملیات پایه ای رياضی',
        'دسته بندی کاربردی دیگر',
      ],
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L18 7.5L12 13L6 7.5L12 2Z" fill="#3B78E7" />
          <path d="M12 13L18 18.5L12 24L6 18.5L12 13Z" fill="#FFD400" />
        </svg>
      ),
      stats: {
        courses: 317,
        students: 56,
        instructors: 6,
      },
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230426115225/computer-image-660.jpg',
    },
  ];

  return (
    <div dir="rtl" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 size-80 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute right-20 top-1/2 size-96 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 size-64 rounded-full bg-green-400 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        {/* Header section */}
        <div className="mb-12 flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="px-4 text-right md:px-0">
            <h1 className="mb-4 text-xl font-bold text-gray-900 md:text-4xl">
              دنیال چه دوره‌ها هستی؟
            </h1>
            <p className="max-w-lg text-sm leading-6 text-gray-700 md:text-[16px] md:leading-8">
              ينقرم آموزشی ما با دوهرهای متخصص، تعاملی و یادگیری هوشمند، راهی سریع و موثر برای ارتقای مهارت‌هایتان است!
            </p>
          </div>

          <button className="pink-gradient-bg hidden rounded-full px-6 py-3 font-medium text-white shadow-md transition-shadow duration-300 hover:shadow-lg md:block">
            مشاهده همه دوره‌ها
          </button>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {courseCards.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Card header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                </div>
                <span className="text-xs text-gray-500">
                  {card.stats.courses}
                  + اموزش مختلف
                </span>
              </div>

              {/* Description */}
              <ul className="mb-6 space-y-2">
                {card.description.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="size-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Image */}
              <div className="mb-6 flex w-full justify-end">
                <img
                  src={card.image}
                  alt={card.title}
                  className="max-w-60 rounded-lg object-cover"
                />
              </div>

              {/* Instructors */}
              <div className="mb-4 flex">
                {Array.from({ length: 3 }).map((_, i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/women/${i + 1}.jpg`}
                    alt="Instructor"
                    className="size-10 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>

              {/* CTA Button */}
              <button className="pink-gradient-bg w-full rounded-full px-6 py-3 font-medium text-white shadow-md transition-colors duration-300 hover:bg-green-800">
                مشاهده دوره‌ها
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSessionCategorySection;
