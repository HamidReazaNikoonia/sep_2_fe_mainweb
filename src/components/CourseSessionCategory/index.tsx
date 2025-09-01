/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

// Define the category type
type CategoryItem = {
  id: number;
  title: string;
  icon: string;
  color?: string;
  featured?: boolean;
  images: ProductCard[];
};

// Define product card type for the right section
type ProductCard = {
  id: number;
  title: string;
  image: string;
  category: string;
  link: string; // Added link property
};

// Predefined categories with their specific images
const CATEGORIES: CategoryItem[] = [
  {
    id: 1,
    title: 'عمومی و اداری',
    icon: 'https://www.aryatehran.com/wp-content/uploads/2024/12/book-1.png',
    color: 'bg-gray-100',
    images: [
      {
        id: 1,
        title: 'دوره مدیریت اداری',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        category: 'عمومی و اداری',
        link: '/courses/management',
      },
      {
        id: 2,
        title: 'آموزش نویسندگی',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
        category: 'عمومی و اداری',
        link: '/courses/writing',
      },
      {
        id: 3,
        title: 'مهارت های اداری',
        image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=400&h=300&fit=crop',
        category: 'عمومی و اداری',
        link: '/courses/admin-skills',
      },
    ],
  },
  {
    id: 2,
    title: 'ویژه بازار کار',
    icon: 'https://www.aryatehran.com/wp-content/uploads/2024/12/work-from-home.png',
    color: 'bg-yellow-800',
    featured: true,
    images: [
      {
        id: 4,
        title: 'مهارت های شغلی',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        category: 'بازار کار',
        link: '/courses/job-skills',
      },
      {
        id: 5,
        title: 'توسعه حرفه ای',
        image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
        category: 'بازار کار',
        link: '/courses/professional-development',
      },
      {
        id: 6,
        title: 'مصاحبه شغلی',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        category: 'بازار کار',
        link: '/courses/job-interview',
      },
    ],
  },
  {
    id: 3,
    title: 'طراحی سایت',
    icon: 'https://www.aryatehran.com/wp-content/uploads/2024/12/analytics.png',
    color: 'bg-blue-100',
    images: [
      {
        id: 7,
        title: 'طراحی UI/UX',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        category: 'طراحی سایت',
        link: '/courses/ui-ux',
      },
      {
        id: 8,
        title: 'برنامه نویسی وب',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        category: 'طراحی سایت',
        link: '/courses/web-programming',
      },
      {
        id: 9,
        title: 'توسعه فرانت اند',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
        category: 'طراحی سایت',
        link: '/courses/frontend',
      },
    ],
  },
  {
    id: 4,
    title: 'حسابداری',
    icon: 'https://www.aryatehran.com/wp-content/uploads/2024/12/increase.png',
    color: 'bg-green-100',
    images: [
      {
        id: 10,
        title: 'حسابداری مقدماتی',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        category: 'حسابداری',
        link: '/courses/basic-accounting',
      },
      {
        id: 11,
        title: 'مالیات و عوارض',
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
        category: 'حسابداری',
        link: '/courses/tax',
      },
      {
        id: 12,
        title: 'نرم افزار حسابداری',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        category: 'حسابداری',
        link: '/courses/accounting-software',
      },
    ],
  },
  {
    id: 5,
    title: 'گرافیک',
    icon: 'https://www.aryatehran.com/wp-content/uploads/2024/12/design-software.png',
    color: 'bg-purple-100',
    images: [
      {
        id: 13,
        title: 'فتوشاپ پیشرفته',
        image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
        category: 'گرافیک',
        link: '/courses/photoshop',
      },
      {
        id: 14,
        title: 'ایلوستریتور',
        image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
        category: 'گرافیک',
        link: '/courses/illustrator',
      },
      {
        id: 15,
        title: 'طراحی لوگو',
        image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop',
        category: 'گرافیک',
        link: '/courses/logo-design',
      },
    ],
  },
  {
    id: 6,
    title: 'فنی و مهندسی',
    icon: 'https://www.aryatehran.com/wp-content/uploads/2024/12/project-management.png',
    color: 'bg-orange-100',
    images: [
      {
        id: 16,
        title: 'اتوکد مقدماتی',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
        category: 'فنی و مهندسی',
        link: '/courses/autocad',
      },
      {
        id: 17,
        title: 'مدیریت پروژه',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        category: 'فنی و مهندسی',
        link: '/courses/project-management',
      },
      {
        id: 18,
        title: '3D مدلینگ',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
        category: 'فنی و مهندسی',
        link: '/courses/3d-modeling',
      },
    ],
  },
  {
    id: 7,
    title: 'فنی و مهندسی',
    icon: 'https://www.aryatehran.com/wp-content/uploads/2024/12/project-management.png',
    color: 'bg-red-100',
    images: [
      {
        id: 16,
        title: 'اتوکد مقدماتی',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
        category: 'فنی و مهندسی',
        link: '/courses/autocad',
      },
      {
        id: 17,
        title: 'مدیریت پروژه',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        category: 'فنی و مهندسی',
        link: '/courses/project-management',
      },
      {
        id: 18,
        title: '3D مدلینگ',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
        category: 'فنی و مهندسی',
        link: '/courses/3d-modeling',
      },
    ],
  },
];

export default function CourseSessionCategory() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>(CATEGORIES[1]);

  const handleCategoryClick = (category: CategoryItem) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (link: string) => {
    // You can use Next.js router here if needed
    // router.push(link);
    window.location.href = link;
  };

  return (
    <section className="blue-gradient-bg py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800 md:text-xl">دسته بندی دوره ها</h2>
          </div>
          {/* <button className="text-gray-600 hover:text-gray-800 underline text-xs md:text-sm">
            مشاهده همه
          </button> */}
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Right Section: Image Grid (Now on right for RTL) */}
          <div dir="rtl" className="order-2 grid grid-cols-2 gap-3 md:gap-4">
            {/* Large card - spans 2 columns */}
            <div
              onClick={() => handleImageClick(selectedCategory.images[0]?.link)}
              className="group relative col-span-2 h-40 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 transition-all duration-500 ease-in-out md:h-48"
            >
              <img
                src={selectedCategory.images[0]?.image}
                alt={selectedCategory.images[0]?.title}
                className="absolute inset-0 size-full object-cover transition-all duration-500 ease-in-out"
              />
              {/* Black overlay with hover effect */}
              <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-3 right-3 z-10 text-white md:bottom-4 md:right-4">
                <h3 className="text-sm font-bold md:text-lg">{selectedCategory.images[0]?.title}</h3>
                <p className="text-xs opacity-90 md:text-sm">{selectedCategory.images[0]?.category}</p>
              </div>
            </div>

            {/* Small cards */}
            {selectedCategory.images.slice(1, 3).map((card, index) => (
              <div
                key={`${selectedCategory.id}-${card.id}`}
                onClick={() => handleImageClick(card.link)}
                className="group relative h-32 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-200 to-yellow-300 transition-all duration-500 ease-in-out md:h-40"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 size-full object-cover transition-all duration-500 ease-in-out"
                />
                {/* Black overlay with hover effect */}
                <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-2 right-2 z-10 text-white md:bottom-3 md:right-3">
                  <h4 className="text-xs font-semibold md:text-sm">{card.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Left Section: Categories (Now on left for RTL) */}
          <div className="order-1 space-y-3 md:space-y-4 ">
            {/* Featured Category */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleCategoryClick(CATEGORIES.find(cat => cat.featured) || CATEGORIES[1])}
              className="mb-4 cursor-pointer rounded-xl bg-yellow-200 p-4 transition-all duration-300 ease-in-out hover:scale-105 md:mb-6 md:rounded-2xl md:p-6"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="rounded-full bg-white p-2 md:p-3">
                  <img
                    src={CATEGORIES.find(cat => cat.featured)?.icon}
                    alt=""
                    className="size-6 md:size-8"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 md:text-base">{CATEGORIES.find(cat => cat.featured)?.title}</h3>
                  <p className="text-xs text-gray-600 md:text-sm">دوره های تخصصی</p>
                </div>
              </div>
            </div>

            {/* Regular Categories Grid - Mobile: smaller gap and padding */}
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {CATEGORIES.filter(cat => !cat.featured).map(category => (
                <div
                  role="button"
                  tabIndex={0}
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    ${category.color} cursor-pointer rounded-lg p-2 transition-all duration-300 
                    ease-in-out hover:scale-105 md:rounded-xl md:p-4
                    ${selectedCategory.id === category.id ? 'shadow-lg ring-2 ring-blue-500' : ''}
                  `}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="rounded-md bg-white p-1.5 md:rounded-lg md:p-2">
                      <img
                        src={category.icon}
                        alt=""
                        className="size-4 md:size-6"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium leading-tight text-gray-800 md:text-sm">
                        {category.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
