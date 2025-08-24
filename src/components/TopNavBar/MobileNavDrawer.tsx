/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';

// Import the categories from the existing file
const categories = [
  {
    title: 'برنامه نویسی',
    query: 'programming',
    children: [
      {
        title: 'فرانت اند',
        query: 'frontend',
        children: [
          { title: 'React', query: 'react' },
          { title: 'Vue.js', query: 'vue' },
          { title: 'Angular', query: 'angular' },
        ],
      },
      {
        title: 'بک اند',
        query: 'backend',
        children: [
          { title: 'Node.js', query: 'nodejs' },
          { title: 'Python', query: 'python' },
          { title: 'PHP', query: 'php' },
        ],
      },
    ],
  },
  {
    title: 'طراحی سایت',
    query: 'web-design',
    children: [
      {
        title: 'UI/UX',
        query: 'uiux',
        children: [
          { title: 'Figma', query: 'figma' },
          { title: 'Adobe XD', query: 'adobe-xd' },
        ],
      },
    ],
  },
  {
    title: 'مدیریت کسب و کار',
    query: 'business',
    children: [],
  },
];

// Define the type for navigation state
type NavigationState = {
  level: 'main' | 'category' | 'subcategory' | 'third-level';
  mainItems?: any[];
  categoryItems?: any[];
  subcategoryItems?: any[];
  thirdLevelItems?: any[];
  selectedCategory?: number;
  selectedSubcategory?: number;
};

const mainNavItems = [
  { title: 'خانه', href: '/' },
  { title: 'دوره ها', type: 'category' },
  { title: 'فیلم آموزشی', href: '/course' },
  { title: 'آکادمی آموزشی', href: '/academy' },
  { title: 'تماس با ما', href: '/contact' },
];

const MobileNavDrawer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [navigation, setNavigation] = useState<NavigationState>({
    level: 'main',
    mainItems: [
      { title: 'خانه', href: '/' },
      { title: 'دوره ها', type: 'category' },
      { title: 'فیلم آموزشی', href: '/course' },
      { title: 'آکادمی آموزشی', href: '/academy' },
      { title: 'تماس با ما', href: '/contact' },
    ],
  });

  const handleBack = () => {
    switch (navigation.level) {
      case 'category':
        setNavigation({ level: 'main', mainItems: mainNavItems });
        break;
      case 'subcategory':
        setNavigation({
          level: 'category',
          categoryItems: categories,
          selectedCategory: navigation.selectedCategory,
        });
        break;
      case 'third-level':
        setNavigation({
          level: 'subcategory',
          categoryItems: categories,
          subcategoryItems: categories[navigation.selectedCategory!].children,
          selectedCategory: navigation.selectedCategory,
          selectedSubcategory: navigation.selectedSubcategory,
        });
        break;
    }
  };

  const handleNavigation = (item: any) => {
    if (item.type === 'category') {
      // Navigate to categories
      setNavigation({
        level: 'category',
        categoryItems: categories,
      });
    } else if (item.children) {
      // If the category has children, drill down
      if (navigation.level === 'category') {
        setNavigation({
          level: 'subcategory',
          categoryItems: categories,
          subcategoryItems: item.children,
          selectedCategory: categories.indexOf(item),
        });
      } else if (navigation.level === 'subcategory') {
        setNavigation({
          level: 'third-level',
          categoryItems: categories,
          subcategoryItems: navigation.subcategoryItems,
          thirdLevelItems: item.children,
          selectedCategory: navigation.selectedCategory,
          selectedSubcategory: navigation.subcategoryItems?.indexOf(item),
        });
      }
    } else if (item.href) {
      // Direct navigation
      window.location.href = item.href;
      setIsOpen(false);
    } else {
      // For leaf categories, navigate to course session with query
      window.location.href = `/course-session?${item.query}=true`;
      setIsOpen(false);
    }
  };

  const renderNavigation = () => {
    switch (navigation.level) {
      case 'main':
        return navigation.mainItems?.map((item, index) => (
          <div
            dir="rtl"
            key={index}
            className="flex items-center justify-between border-b border-gray-100 px-4 py-3 text-right "
            onClick={() => handleNavigation(item)}
          >
            {item.title}
            {item.type === 'category' && <ChevronLeft className="float-left text-gray-400" />}
          </div>
        ));

      case 'category':
        return categories.map((category, index) => (
          <div
            dir="rtl"
            key={index}
            className="flex items-center justify-between border-b border-gray-100 px-4 py-3 text-right "
            onClick={() => handleNavigation(category)}
          >
            {category.title}
            {category.children && category.children.length > 0 && (
              <ChevronLeft className="text-gray-400" />
            )}
          </div>
        ));

      case 'subcategory':
        return navigation.subcategoryItems?.map((subcategory, index) => (
          <div
            dir="rtl"
            key={index}
            className="flex items-center justify-between border-b border-gray-100 px-4 py-3 text-right"
            onClick={() => handleNavigation(subcategory)}
          >
            {subcategory.title}
            {subcategory.children && subcategory.children.length > 0 && (
              <ChevronLeft className="text-gray-400" />
            )}
          </div>
        ));

      case 'third-level':
        return navigation.thirdLevelItems?.map((thirdLevel, index) => (
          <div
            dir="rtl"
            key={index}
            className="border-b border-gray-100 px-4 py-3 text-right "
            onClick={() => handleNavigation(thirdLevel)}
          >
            {thirdLevel.title}
          </div>
        ));
    }
  };

  const renderHeader = () => {
    switch (navigation.level) {
      case 'main':
        return 'منو';
      case 'category':
        return 'دسته بندی ها';
      case 'subcategory':
        return categories[navigation.selectedCategory!].title;
      case 'third-level':
        return categories[navigation.selectedCategory!].children[navigation.selectedSubcategory!].title;
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
        </div>
      )}

      {isOpen && (
        <div
          className="fixed right-0 top-0 z-50 h-full w-64 translate-x-0 bg-white text-black transition-transform duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-300 p-4">
            <h2 className="text-xs font-medium">{renderHeader()}</h2>

            {navigation.level !== 'main'
              ? (
                  <button onClick={handleBack} className="flex items-center text-[11px]">

                    بازگشت
                    <ChevronRight size={16} className="ml-2" />
                  </button>
                )
              : (
                  <button onClick={() => setIsOpen(false)}>
                    <X />
                  </button>
                )}
          </div>

          {/* Navigation Items */}
          <div className="mt-2 text-xs">
            {renderNavigation()}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavDrawer;
