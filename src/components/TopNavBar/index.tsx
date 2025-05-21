// @ts-nocheck
'use client'

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { X, Search, ShoppingBasket, Menu, ChevronDown } from 'lucide-react';


import { useCartStore } from '@/_store/Cart';
import { getUserCartRequest } from "@/API/cart";


import useAuth from "@/hooks/useAuth";
import UserAvatar from "@/components/UserAvatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productCountBadge, setproductCountBadge] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();



  const { data } = useQuery({
    queryFn: async () => getUserCartRequest(),
    queryKey: ["cart"], //Array according to Documentation
  });




  const cart = useCartStore(state => state.cart);


  useEffect(() => {
    if (data?.cartItem) {
      setproductCountBadge(data?.cartItem?.length || 0);
    } else if (data?.length === 0) {
      setproductCountBadge(0);
    } else if (cart) {
      if (Array.isArray(cart) && cart.length !== 0) {
        // @ts-ignore
        setproductCountBadge(cart.length ? cart.length : 0);
      }
    }
  }, [data]);


  /**
   * @type {string | number | NodeJS.Timeout | undefined}
   */
  let dropdownTimeout;

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
  };

  return (
    <nav className="bg-gray-800 text-white fixed z-20 w-dvw">
      <div className="container mx-auto py-4 px-6">
        {/* Search Mode */}
        {isSearching ? (
          <div className="flex items-center justify-between w-full animate-fade-in-down">
            {/* Search Button */}
            <button className="bg-purple-800 hover:bg-blue-600 px-4 py-2 rounded mr-2 text-sm">
              <Search />
            </button>
            {/* Search Input */}
            <input
              type="text"
              placeholder="جستجو کنید"
              className="flex-grow bg-gray-700 text-white px-4 py-2 rounded focus:outline-none"
            />
            {/* Close Icon */}
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
                <Link href='/cart'
                  // @ts-ignore
                  alt="go to cart items" >
                  <button
                    className="bg-purple-800 hover:bg-blue-600 px-4 py-2 rounded text-sm"
                  >
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
                <li
                  className="hover:text-gray-300 relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className=" inline-block text-xs">
                    <ChevronDown className=" w-3 h-3 mr-1" />
                  </span>
                  خدمات
                  {/* Dropdown Menu */}

                  <ul
                    className={`absolute left-0 mt-2 bg-gray-700 rounded shadow-lg w-40 transition-opacity duration-200 ${dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    <li className="px-4 py-2 hover:bg-gray-600">خدمات</li>
                    <li className="px-4 py-2 hover:bg-gray-600">خدمات</li>
                  </ul>
                </li>
                <li className="hover:text-gray-300">آکادمی آموزشی</li>
                <li className="hover:text-gray-300">خانه</li>
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
            <li
              className="hover:text-gray-300 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              خدمات
              {/* Nested Menu for Mobile */}
              <ul
                className={`pl-4 mt-2 space-y-2 text-sm ${dropdownOpen ? "block" : "hidden"
                  }`}
              >
                <li className="hover:text-gray-400">خدمات</li>
                <li className="hover:text-gray-400">خدمات</li>
              </ul>
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
