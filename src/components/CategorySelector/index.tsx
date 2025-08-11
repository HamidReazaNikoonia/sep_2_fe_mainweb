'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesRequest } from '@/API/course';
import { ChevronDown, ChevronRight, Loader2 } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  parent: string | null;
  level: number;
  isActive: boolean;
  children: Category[];
  createdAt: string;
  updatedAt: string;
}

interface CategorySelectorProps {
  selectedCategory?: string;
  onCategoryChange: (categoryId: string) => void;
  placeholder?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory = '',
  onCategoryChange,
  placeholder = 'انتخاب دسته‌بندی',
  showAllOption = true,
  allOptionLabel = 'همه دسته‌ها'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesRequest,
  });

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory || !categories?.data) return placeholder;
    
    const findCategory = (cats: Category[]): Category | null => {
      for (const cat of cats) {
        if (cat._id === selectedCategory) return cat;
        if (cat.children && cat.children.length > 0) {
          const found = findCategory(cat.children);
          if (found) return found;
        }
      }
      return null;
    };

    const category = findCategory(categories.data);
    return category ? category.name : placeholder;
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category._id);
    const isSelected = selectedCategory === category._id;

    return (
      <div key={category._id}>
        <div
          className={`flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors ${
            isSelected ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700'
          }`}
          style={{ paddingRight: `${level * 20 + 12}px` }}
          onClick={() => handleCategorySelect(category._id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(category._id);
              }}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          <span className="text-sm">{category.name}</span>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {category.children.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  if (isError || !categories?.data) {
    return (
      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-red-500">
        خطا در بارگذاری دسته‌بندی‌ها
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-right flex items-center justify-between hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-20 transition-colors"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
          {getSelectedCategoryName()}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {showAllOption && (
              <div
                className={`flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors border-b ${
                  !selectedCategory ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700'
                }`}
                onClick={() => handleCategorySelect('')}
              >
                <span className="text-sm">{allOptionLabel}</span>
              </div>
            )}
            
            {categories.data
              .filter((cat: Category) => cat.level === 0) // Only show top-level categories
              .map((category: Category) => renderCategory(category))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelector;