// @ts-nocheck
'use client'

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useResponsiveEvent from '@/hooks/useResponsiveEvent';
import Link from "next/link";
import { X, Search, ShoppingBasket, Menu, ChevronDown } from 'lucide-react';


import { useCartStore } from '@/_store/Cart';
import { getUserCartRequest } from "@/API/cart";


import useAuth from "@/hooks/useAuth";
import UserAvatar from "@/components/UserAvatar";
import clsx from "clsx";

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

  const pathname = usePathname();
  const isMobileScreen = useResponsiveEvent(768, 200);
  const isCartPage = pathname === '/cart';
  const shouldNavFixed = (isCartPage && !isMobileScreen)

  return (
    <nav className={clsx("bg-white text-gray-700 w-full border-b", {"fixed": shouldNavFixed})}>
      <div className="container mx-auto py-5 px-6 ">
        {/* Search Mode */}
        <div className="flex justify-between items-center">
          {/* Left Side: Buttons */}

          {isAuthenticated ? (
            <>
              <UserAvatar user={user} logOut={logout} />
            </>
          ) : (
            <Link className="text-[8px] md:text-sm" href='/sign-in'>
              ورود | ثبت‌نام
            </Link>
          )}

          {/* Right Side: Logo and Menu */}
          <div className="flex items-center">


            {/* Desktop Menu */}
            <ul className="flex space-x-3 md:space-x-6 relative text-[11px] md:text-sm cursor-pointer">
              <Link href="/product">
                <li className="hover:text-gray-500">محصولات</li>

              </Link>

              <Link href="/course">
                <li className="hover:text-gray-500">دوره های آموزشی</li>

              </Link>

              <Link href='/consult'>
                <li className="hover:text-gray-500">مشاوره</li>
              </Link>

              <Link href="/">
                <li className="hover:text-gray-500">خانه</li>
              </Link>
            </ul>


            {/* Hamburger Icon */}
            {/* <button className="md:hidden ml-4" onClick={()=> setIsOpen(!isOpen)}
                    >
                    <span className="material-icons">
                        <Menu />
                    </span>
                </button> */}
          </div>
        </div>

      </div>



    </nav>
  );
};

export default Navbar;
