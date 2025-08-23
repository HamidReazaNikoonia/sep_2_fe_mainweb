/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable style/multiline-ternary */
// @ts-nocheck
// @ts-nocheck
'use client'

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { X, Search, ShoppingBasket, Menu, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

import { useCartStore } from '@/_store/Cart';
import { getUserCartRequest } from "@/API/cart";

import useAuth from "@/hooks/useAuth";
import UserAvatar from "@/components/UserAvatar";
import useResponsiveEvent from "@/hooks/useResponsiveEvent";
import { toPersianDigits } from '@/utils/Helpers';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productCountBadge, setproductCountBadge] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // New states for courses dropdown
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);

  const { isAuthenticated, user, logout } = useAuth();


  const isMobileScreen = useResponsiveEvent(768, 200);
  // Sample categories data (you can replace this with your actual data)
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
            { title: 'Angular', query: 'angular' }
          ]
        },
        {
          title: 'بک اند',
          query: 'backend',
          children: [
            { title: 'Node.js', query: 'nodejs' },
            { title: 'Python', query: 'python' },
            { title: 'PHP', query: 'php' }
          ]
        }
      ]
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
            { title: 'Adobe XD', query: 'adobe-xd' }
          ]
        }
      ]
    },
    {
      title: 'مدیریت کسب و کار',
      query: 'business',
      children: []
    }
  ];

  const { data } = useQuery({
    queryFn: async () => getUserCartRequest(),
    queryKey: ["cart"],
  });

  const cart = useCartStore(state => state.cart);

  useEffect(() => {
    if (data?.cartItem) {
      setproductCountBadge(data?.cartItem?.length || 0);
    } else if (data?.length === 0) {
      setproductCountBadge(0);
    } else if (data?.code === 404) {
      setproductCountBadge(0)
    } else if (cart) {
      if (Array.isArray(cart) && cart.length !== 0) {
        setproductCountBadge(cart.length ? cart.length : 0);
      }
    }
  }, [data]);

  let dropdownTimeout;
  let coursesDropdownTimeout;

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleCoursesMouseEnter = () => {
    clearTimeout(coursesDropdownTimeout);
    setCoursesDropdownOpen(true);
  };

  const handleCoursesMouseLeave = () => {
    coursesDropdownTimeout = setTimeout(() => {
      setCoursesDropdownOpen(false);
      setHoveredCategory(null);
      setHoveredSubCategory(null);
    }, 200);
  };

  const handleCategoryHover = (category, index) => {
    setHoveredCategory(index);
    setHoveredSubCategory(null);
  };

  const handleSubCategoryHover = (subCategory, index) => {
    setHoveredSubCategory(index);
  };

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
  };

  return (
    <nav className="fixed z-20 w-dvw border-b border-gray-200 bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        {/* Search Mode */}
        {isSearching ? (
          <div className="flex w-full animate-fade-in-down items-center justify-between">
            <button
              className="rounded-lg border border-white/50 bg-white/30 px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/50"
              onClick={handleSearchToggle}
            >
              <Search strokeWidth={1} size={isMobileScreen ? 16 : 24} />
            </button>
            {/* <input
              type="text"
              placeholder="جستجو کنید"
              className="flex-grow rounded bg-gray-700 px-4 py-2 text-white focus:outline-none"
            /> */}

            <input
              autoFocus
              type="text"
              placeholder="جستجو کنید"
              className="w-full rounded-lg border border-white bg-white/70 px-4 py-2 text-right text-sm shadow-sm backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              className="ml-2 text-gray-700"
              onClick={handleSearchToggle}
            >
              <span className=""><X size={isMobileScreen ? 16 : 24} /></span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {/* Left Side: Buttons */}
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <button
                className="rounded-lg border border-white/50 bg-white/30 px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/50"
                onClick={handleSearchToggle}
              >
                <Search strokeWidth={1} size={isMobileScreen ? 16 : 24} />
              </button>

              <div className="relative inline-flex">
                <Link href='/cart' alt="go to cart items">
                  <button className="rounded-lg border border-white/50 bg-white/30 px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/50"
                  >
                    <ShoppingBasket strokeWidth={1} size={isMobileScreen ? 16 : 24} />
                  </button>
                </Link>
                {(productCountBadge > 0) && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-red-500 text-[11px] md:text-xs text-white shadow-sm" >
                    {toPersianDigits(productCountBadge)}
                  </span>
                )}
              </div>

              {!isAuthenticated ? (
                <>
                  <UserAvatar user={user} logOut={logout} />
                </>
              ) : (
                <Link href='/sign-in'>
                  <button className="ml-0 md:ml-3 rounded-lg border border-white/50 bg-white/30 px-4 py-2 shadow-sm backdrop-blur-sm text-[10px] md:text-xs transition-all duration-200 hover:bg-white/50" >
                    ورود | ثبت‌نام
                  </button>
                </Link>
              )}
            </div>

            {/* Right Side: Logo and Menu */}
            <div className="flex items-center">
              {/* Desktop Menu */}
              <ul className="relative hidden space-x-6 text-sm md:flex">
                <li className="hover:text-gray-300">تماس با ما</li>

                {/* Courses Dropdown */}
                <li 
                  className="relative hover:text-gray-300"
                  onMouseEnter={handleCoursesMouseEnter}
                  onMouseLeave={handleCoursesMouseLeave}
                >
                  <span className="flex cursor-pointer items-center">
                    <ChevronDown className="mr-1 h-3 w-3" />
                    دوره ها
                  </span>

                  {/* Multi-level Dropdown - RTL Layout */}
                  {coursesDropdownOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                      {/* RTL Flex Container */}
                      <div className="flex flex-row text-xs">
                        {/* Third Level Categories Column (Leftmost in RTL) */}
                        {hoveredCategory !== null && 
                         hoveredSubCategory !== null &&
                         categories[hoveredCategory]?.children?.[hoveredSubCategory]?.children &&
                         categories[hoveredCategory].children[hoveredSubCategory].children.length > 0 && (
                          <div className="w-56 border-r border-gray-200 bg-gray-100">
                            {categories[hoveredCategory].children[hoveredSubCategory].children.map((thirdCategory, thirdIndex) => (
                              <div
                                key={thirdIndex}
                                className="cursor-pointer border-b border-gray-200 px-4 py-3 text-right text-gray-700 last:border-b-0 hover:bg-gray-200"
                              >
                                <Link href={`/course-session?${thirdCategory.query}=true`}>
                                  {thirdCategory.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Sub Categories Column (Middle in RTL) */}
                        {hoveredCategory !== null && 
                         categories[hoveredCategory]?.children && 
                         categories[hoveredCategory].children.length > 0 && (
                          <div className="w-56 border-r border-gray-200 bg-gray-50">
                            {categories[hoveredCategory].children.map((subCategory, subIndex) => (
                              <div
                                key={subIndex}
                                className={`flex cursor-pointer items-center justify-between border-b border-gray-200 px-4 py-3 text-gray-700 last:border-b-0 hover:bg-gray-100 ${
                                  hoveredSubCategory === subIndex ? 'bg-gray-100' : ''
                                }`}
                                onMouseEnter={() => handleSubCategoryHover(subCategory, subIndex)}
                              >
                                {subCategory.children && subCategory.children.length > 0 && (
                                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                                )}
                                <Link 
                                  href={`/course-session?${subCategory.query}=true`}
                                  className="flex-1 text-right"
                                >
                                  {subCategory.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Main Categories Column (Rightmost in RTL) */}
                        <div className="w-56 bg-white">
                          {categories.map((category, index) => (
                            <div
                              key={index}
                              className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 text-gray-700 last:border-b-0 hover:bg-gray-50 ${
                                hoveredCategory === index ? 'bg-gray-50' : ''
                              }`}
                              onMouseEnter={() => handleCategoryHover(category, index)}
                            >
                              {category.children && category.children.length > 0 && (
                                <ChevronLeft className="h-4 w-4 text-gray-400" />
                              )}
                              <Link 
                                href={`/course-session?${category.query}=true`}
                                className="flex-1 text-right"
                              >
                                {category.title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                <Link href="/course">
                  <li className="hover:text-gray-300">فیلم آموزشی</li>
                </Link>                
                
                <Link href="/">
                  <li className="hover:text-gray-300">خانه</li>
                </Link>
              </ul>

              {/* Logo */}
              <div className="ml-20 hidden md:flex">
                <h1 className="text-lg font-bold">LOGO</h1>
              </div>

              {/* Hamburger Icon */}
              <button
                className="ml-4 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="material-icons">
                  <Menu size={isMobileScreen ? 20 : 24} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {!isSearching && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {!isSearching && (
        <div
          className={`fixed right-0 top-0 h-full w-64 transform bg-gray-800 text-white ${isOpen ? "translate-x-0" : "translate-x-full"
          } z-50 transition-transform duration-300`}
        >
          <button
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <span className=""><X /></span>
          </button>
          <ul className="mt-12 space-y-6 px-6 pt-9 text-right text-sm">
            <li className="hover:text-gray-300">خانه</li>
            
            <li className="hover:text-gray-300">
              <Link href="/course-session">
                دوره ها
              </Link>
            </li>

            <li className="hover:text-gray-300">
              <Link href="/course">
                فیلم آموزشی
              </Link>
            </li>    
            <li className="hover:text-gray-300">آکادمی آموزشی</li>
            <li className="hover:text-gray-300">تماس با ما</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
