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
    <nav className="bg-gradient-to-r from-blue-400 to-blue-500 text-white fixed z-20 w-dvw">
      <div className="container mx-auto py-4 px-6">
        {/* Search Mode */}
        {isSearching ? (
          <div className="flex items-center justify-between w-full animate-fade-in-down">
            <button className="bg-purple-800 hover:bg-blue-600 px-4 py-2 rounded mr-2 text-sm">
              <Search />
            </button>
            <input
              type="text"
              placeholder="جستجو کنید"
              className="flex-grow bg-gray-700 text-white px-4 py-2 rounded focus:outline-none"
            />
            <button
              className="text-white ml-2"
              onClick={handleSearchToggle}
            >
              <span className=""><X /></span>
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            {/* Left Side: Buttons */}
            <div className="flex space-x-4">
              <button
                className="bg-purple-800 hover:bg-blue-600 px-4 py-2 rounded text-sm"
                onClick={handleSearchToggle}
              >
                <Search />
              </button>

              <div className="relative inline-flex">
                <Link href='/cart' alt="go to cart items">
                  <button className="bg-purple-800 hover:bg-blue-600 px-4 py-2 rounded text-sm">
                    <ShoppingBasket />
                  </button>
                </Link>
                {(productCountBadge > 0) && (
                  <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white">
                    {productCountBadge}
                  </span>
                )}
              </div>

              {isAuthenticated ? (
                <>
                  <UserAvatar user={user} logOut={logout} />
                </>
              ) : (
                <Link href='/sign-in'>
                  <button className="bg-purple-800 hover:bg-blue-600 px-4 py-2 rounded text-sm">
                    ورود | ثبت‌نام
                  </button>
                </Link>
              )}
            </div>

            {/* Right Side: Logo and Menu */}
            <div className="flex items-center">
              {/* Desktop Menu */}
              <ul className="hidden md:flex space-x-6 relative text-sm">
                <li className="hover:text-gray-300">تماس با ما</li>

                {/* Courses Dropdown */}
                <li 
                  className="hover:text-gray-300 relative"
                  onMouseEnter={handleCoursesMouseEnter}
                  onMouseLeave={handleCoursesMouseLeave}
                >
                  <span className="flex items-center cursor-pointer">
                    <ChevronDown className="w-3 h-3 mr-1" />
                    دوره ها
                  </span>

                  {/* Multi-level Dropdown - RTL Layout */}
                  {coursesDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                      {/* RTL Flex Container */}
                      <div className="flex flex-row text-xs">
                        {/* Third Level Categories Column (Leftmost in RTL) */}
                        {hoveredCategory !== null && 
                         hoveredSubCategory !== null &&
                         categories[hoveredCategory]?.children?.[hoveredSubCategory]?.children &&
                         categories[hoveredCategory].children[hoveredSubCategory].children.length > 0 && (
                          <div className="w-56 bg-gray-100 border-r border-gray-200">
                            {categories[hoveredCategory].children[hoveredSubCategory].children.map((thirdCategory, thirdIndex) => (
                              <div
                                key={thirdIndex}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-200 cursor-pointer border-b border-gray-200 last:border-b-0 text-right"
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
                          <div className="w-56 bg-gray-50 border-r border-gray-200">
                            {categories[hoveredCategory].children.map((subCategory, subIndex) => (
                              <div
                                key={subIndex}
                                className={`px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0 flex items-center justify-between ${
                                  hoveredSubCategory === subIndex ? 'bg-gray-100' : ''
                                }`}
                                onMouseEnter={() => handleSubCategoryHover(subCategory, subIndex)}
                              >
                                {subCategory.children && subCategory.children.length > 0 && (
                                  <ChevronLeft className="w-4 h-4 text-gray-400" />
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
                              className={`px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between ${
                                hoveredCategory === index ? 'bg-gray-50' : ''
                              }`}
                              onMouseEnter={() => handleCategoryHover(category, index)}
                            >
                              {category.children && category.children.length > 0 && (
                                <ChevronLeft className="w-4 h-4 text-gray-400" />
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
                className="md:hidden ml-4"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="material-icons">
                  <Menu />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {!isSearching && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {!isSearching && (
        <div
          className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-64 transform ${isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 z-50`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <span className=""><X /></span>
          </button>
          <ul className="mt-12 space-y-6 px-6 pt-9 text-sm text-right">
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
