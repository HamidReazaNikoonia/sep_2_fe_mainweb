/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useQuery } from '@tanstack/react-query';
import { Plus, Minus, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { getCategoriesRequest } from '@/API/course';

type Category = {
  _id: string;
  name: string;
  parent: string | null;
  level: number;
  isActive: boolean;
  children: Category[];
  createdAt: string;
  updatedAt: string;
};

type CategorySelectorProps = {
  selectedCategory?: string;
  onCategoryChange: (categoryId: string) => void;
  placeholder?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory = '',
  onCategoryChange,
  placeholder = 'انتخاب دسته‌بندی',
  showAllOption = true,
  allOptionLabel = 'همه دسته‌ها',
}) => {
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
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category._id);
    const isSelected = selectedCategory === category._id;

    return (
      <div key={category._id}>
        <div
          className={`flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50 ${
            isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
          } ${level > 0 ? 'border-l border-gray-200' : ''}`}
          style={{ paddingLeft: `${level * 20 + 16}px` }}
          onClick={() => handleCategorySelect(category._id)}
        >
          <span className="text-sm font-medium">{category.name}</span>
          
          {hasChildren && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(category._id);
              }}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isExpanded ? (
                <Minus className="w-3 h-3 text-gray-600" />
              ) : (
                <Plus className="w-3 h-3 text-gray-600" />
              )}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="bg-gray-50/50">
            {category.children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-center gap-2 px-4 py-8">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          <span className="text-sm text-gray-500">در حال بارگذاری دسته‌بندی‌ها...</span>
        </div>
      </div>
    );
  }

  if (isError || !categories) {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-center px-4 py-8">
          <span className="text-sm text-red-500">خطا در بارگذاری دسته‌بندی‌ها</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">دسته‌بندی</h3>
      </div>

      {/* Categories List */}
      <div className="overflow-y-auto">
        {showAllOption && (
          <div
            className={`flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50 ${
              !selectedCategory ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => handleCategorySelect('')}
          >
            <span className="text-sm font-medium">{allOptionLabel}</span>
          </div>
        )}

        {categories
          ?.filter((cat: Category) => cat.level === 0) // Only show top-level categories
          .map((category: Category) => renderCategory(category))}
      </div>
    </div>
  );
};

export default CategorySelector;
