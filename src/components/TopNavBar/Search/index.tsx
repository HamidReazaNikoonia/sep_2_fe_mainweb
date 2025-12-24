/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
'use client';

import { Book, Search, Video, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type SearchComponentProps = {
  isMobileScreen: boolean;
  onClose: () => void;
};

// Custom debounce hook
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchComponent: React.FC<SearchComponentProps> = ({ isMobileScreen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // 1 second debounce
  const router = useRouter();

  const enableProductSearch = false; // toggle for product search

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchNavigation = (path: string) => {
    setShowSuggestions(false);
    setSearchTerm('');
    router.push(path);
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full animate-fade-in-down items-center justify-between">
        <button
          type="button"
          className="rounded-lg border border-white/50 bg-white/30 px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/50"
          onClick={onClose}
        >
          <Search strokeWidth={1} size={isMobileScreen ? 16 : 24} />
        </button>

        <input
          autoFocus
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="جستجو کنید"
          className="w-full rounded-lg border border-white bg-white/70 px-4 py-2 text-right text-sm shadow-sm backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="button"
          className="ml-2 text-gray-700"
          onClick={onClose}
        >
          <span className=""><X size={isMobileScreen ? 16 : 24} /></span>
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div dir="rtl" className="absolute inset-x-0 top-full z-[99999] mt-2 rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="py-2">
            <div
              className="flex cursor-pointer items-center gap-2 px-4 py-3 text-right text-sm hover:bg-gray-50 md:gap-3"
              onClick={() => handleSearchNavigation(`/course?search=${encodeURIComponent(debouncedSearchTerm)}`)}
            >
              <Video className="size-4 text-gray-400" />
              <span className="text-[10px] font-normal leading-3 tracking-tighter text-gray-500 md:text-sm">
                جستجو در فیلم های آموزشی
              </span>
              <span className="font-[500] tracking-normal text-gray-800">{debouncedSearchTerm}</span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-4 py-3 text-right text-sm hover:bg-gray-50 md:gap-3"
              onClick={() => handleSearchNavigation(`/program?search=${encodeURIComponent(debouncedSearchTerm)}`)}
            >
              <Book className="size-4 text-gray-400" />
              <span className="text-[10px] font-normal leading-3 tracking-tighter text-gray-500 md:text-sm">
                جستجو در کلاس ها
              </span>
              <span className="font-[500] tracking-normal text-gray-800">{debouncedSearchTerm}</span>
            </div>
            {enableProductSearch && (
              <div
                className="cursor-pointer px-4 py-3 text-right text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => handleSearchNavigation(`/products?search=${encodeURIComponent(debouncedSearchTerm)}`)}
              >
                جستجو در محصولات:
                {' '}
                {debouncedSearchTerm}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
