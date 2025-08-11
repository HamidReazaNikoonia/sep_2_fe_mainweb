'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import PriceRangeSlider from '@/components/PriceRangeSlider';
import { useInfiniteQuery } from '@tanstack/react-query';
import CategorySelector from '@/components/CategorySelector';

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

// Types
interface FilterConfig {
  search?: {
    placeholder?: string;
    label?: string;
  };
  priceRange?: {
    min: number;
    max: number;
    step?: number;
    label?: string;
    debounceMs?: number;
  };
  customFilters?: Array<{
    key: string;
    label: string;
    type: 'checkbox' | 'select' | 'date';
    options?: Array<{ value: string; label: string }>;
  }>;
}

interface UseDataHook {
  (params: Record<string, any>): {
    data: any;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    isError: boolean;
    error: any;
  };
}

interface ListWithFiltersAndPaginationProps {
  // Required props
  useDataHook: UseDataHook;
  renderItem: (item: any, index: number) => React.ReactNode;

  // Filter configuration
  filterConfig: FilterConfig;

  // Optional props
  initialFilters?: Record<string, any>;
  queryKey?: string;
  className?: string;
  itemClassName?: string;

  // Layout
  title?: string;
  showFiltersOnMobile?: boolean;

  // Infinite scroll
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

const ListWithFiltersAndPagination: React.FC<ListWithFiltersAndPaginationProps> = ({
  useDataHook,
  renderItem,
  filterConfig,
  initialFilters = {},
  queryKey = 'list-data',
  className = '',
  itemClassName = '',
  title,
  showFiltersOnMobile = true,
  loadingComponent,
  errorComponent,
  emptyComponent,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get('price_from') || filterConfig.priceRange?.min?.toString() || '0'),
    parseInt(searchParams.get('price_to') || filterConfig.priceRange?.max?.toString() || '1000000')
  ]);
  const [customFilters, setCustomFilters] = useState<Record<string, any>>(() => {
    const filters: Record<string, any> = {};
    filterConfig.customFilters?.forEach(filter => {
      const paramValue = searchParams.get(filter.key);
      if (paramValue) {
        if (filter.type === 'checkbox') {
          filters[filter.key] = paramValue.split(',');
        } else {
          filters[filter.key] = paramValue;
        }
      }
    });
    return { ...initialFilters, ...filters };
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Debounce search query and price range separately
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedPriceRange = useDebounce(priceRange, 800); // Debounce price range changes

  // Refs for infinite scroll
  const observerRef = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);

  // Memoize filter params for API to prevent unnecessary recalculations
  const filterParams = useMemo(() => {
    const params: Record<string, any> = {};
    
    if (debouncedSearchQuery.trim()) params.q = debouncedSearchQuery.trim();
    if (filterConfig.priceRange) {
      // Only include price range if it's different from the default range
      if (debouncedPriceRange[0] > filterConfig.priceRange.min || debouncedPriceRange[1] < filterConfig.priceRange.max) {
        params.price_from = debouncedPriceRange[0];
        params.price_to = debouncedPriceRange[1];
      }
    }
    
    Object.entries(customFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'is_fire_sale' && Array.isArray(value) && value.length > 0) {
          // Convert checkbox array to boolean
          params[key] = value.includes('true');
        } else if (Array.isArray(value) && value.length > 0) {
          params[key] = value.join(',');
        } else if (!Array.isArray(value)) {
          params[key] = value;
        }
      }
    });
    
    return params;
  }, [debouncedSearchQuery, debouncedPriceRange, customFilters, filterConfig.priceRange]);

  // Update URL query parameters (no additional debouncing needed here)
  const updateURLParams = useCallback((params: Record<string, any>) => {
    const newSearchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newSearchParams.set(key, value.toString());
      }
    });
    
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    if (newUrl !== `${pathname}?${searchParams.toString()}`) {
      router.push(newUrl, { scroll: false });
    }
  }, [router, pathname, searchParams]);

  // Custom hook for data fetching
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error
  } = useDataHook(filterParams);

  // Update URL when filters change (remove additional debouncing here)
  useEffect(() => {
    updateURLParams(filterParams);
  }, [filterParams, updateURLParams]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    
    if (lastItemRef.current) {
      observerRef.current.observe(lastItemRef.current);
    }
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  // Filter handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);
  
  // Price range handler - direct update, debouncing handled at component level
  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    setPriceRange(range);
  }, []);
  
  const handleCustomFilterChange = useCallback((key: string, value: any) => {
    setCustomFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  
  const handleCustomFilterToggle = useCallback((key: string, value: string) => {
    setCustomFilters(prev => {
      const currentValues = prev[key] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [key]: newValues
      };
    });
  }, []);
  
  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setPriceRange([
      filterConfig.priceRange?.min || 0,
      filterConfig.priceRange?.max || 1000000
    ]);
    setCustomFilters(initialFilters);
  }, [filterConfig.priceRange, initialFilters]);

  // Get all items from paginated data
  const allItems = useMemo(() => {
    return data?.pages?.flatMap(page => page.data || page.items || page) || [];
  }, [data]);
  
  // Render filter section
  const renderFilters = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6 h-fit">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">فیلترها</h2>
        {(searchQuery || Object.keys(customFilters).some(key => {
          const value = customFilters[key];
          return value && (Array.isArray(value) ? value.length > 0 : value !== '');
        }) || (filterConfig.priceRange && (priceRange[0] > filterConfig.priceRange.min || priceRange[1] < filterConfig.priceRange.max))) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="mr-auto text-xs text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4 ml-1" />
            پاک کردن همه
          </Button>
        )}
      </div>

      {/* Search Input */}
      {filterConfig.search && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={filterConfig.search.placeholder || 'جستجو...'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-right text-sm"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Filters Accordion */}
      <Accordion type="multiple" className="w-full">
        
        {/* Price Range Filter */}
        {filterConfig.priceRange && (
          <AccordionItem value="price-range">
            <AccordionTrigger className="text-right hover:no-underline">
              <span>{filterConfig.priceRange.label || 'محدوده قیمت'}</span>
            </AccordionTrigger>
            <AccordionContent>
              <PriceRangeSlider
                min={filterConfig.priceRange.min}
                max={filterConfig.priceRange.max}
                step={filterConfig.priceRange.step || 100000}
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                debounceMs={0} // Remove internal debouncing, handled at component level
                formatValue={(value) => value.toLocaleString('fa')}
                label={filterConfig.priceRange.label || 'محدوده قیمت'}
                className="w-full"
              />
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Custom Filters */}
        {filterConfig.customFilters?.map((filter) => (
          <AccordionItem key={filter.key} value={filter.key}>
            <AccordionTrigger className="text-right hover:no-underline">
              <span>{filter.label}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {/* Special handling for course_category */}
                {filter.key === 'course_category' ? (
                  <CategorySelector
                    selectedCategory={customFilters[filter.key] || ''}
                    onCategoryChange={(categoryId) => handleCustomFilterChange(filter.key, categoryId)}
                    placeholder="انتخاب دسته‌بندی"
                    showAllOption={true}
                    allOptionLabel="همه دسته‌ها"
                  />
                ) : filter.type === 'checkbox' && filter.options?.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id={`${filter.key}-${option.value}`}
                      className="rounded"
                      checked={(customFilters[filter.key] || []).includes(option.value)}
                      onChange={() => handleCustomFilterToggle(filter.key, option.value)}
                    />
                    <label 
                      htmlFor={`${filter.key}-${option.value}`} 
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
                
                {filter.type === 'select' && filter.key !== 'course_category' && (
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={customFilters[filter.key] || ''}
                    onChange={(e) => handleCustomFilterChange(filter.key, e.target.value)}
                  >
                    <option value="">انتخاب کنید</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  if (isError) {
    return errorComponent || (
      <div className="flex items-center justify-center min-h-[200px] text-center">
        <div className="text-red-500">
          <p>خطا در بارگذاری اطلاعات</p>
          <p className="text-sm mt-2">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-200 ${className}`} dir="rtl">
      {/* Header Section */}
      {title && (
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-lg md:text-2xl mt-16 font-bold text-gray-800 text-center mb-4">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-80">
            {renderFilters()}
          </div>

          {/* Mobile Filter Button */}
          {showFiltersOnMobile && (
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              >
                <Filter className="w-4 h-4 ml-2" />
                فیلترها
              </Button>
            </div>
          )}

          {/* Mobile Filters */}
          {showMobileFilters && showFiltersOnMobile && (
            <div className="lg:hidden mb-6">
              {renderFilters()}
            </div>
          )}

          {/* Content List */}
          <div className="flex-1">
            {isLoading && allItems.length === 0 ? (
              loadingComponent || (
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-pink-500" />
                    <p className="text-gray-600">در حال بارگذاری...</p>
                  </div>
                </div>
              )
            ) : allItems.length === 0 ? (
              emptyComponent || (
                <div className="flex items-center justify-center min-h-[200px] text-center">
                  <p className="text-gray-600">هیچ موردی یافت نشد</p>
                </div>
              )
            ) : (
              <div className={`space-y-4 ${itemClassName}`}>
                {allItems.map((item, index) => (
                  <div key={item.id || item._id || index}>
                    {renderItem(item, index)}
                  </div>
                ))}
                
                {/* Infinite Scroll Trigger */}
                <div ref={lastItemRef} className="h-4" />
                
                {/* Loading More Indicator */}
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-pink-500" />
                      <p className="text-sm text-gray-600">در حال بارگذاری موارد بیشتر...</p>
                    </div>
                  </div>
                )}
                
                {/* End of List Indicator */}
                {!hasNextPage && allItems.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">همه موارد نمایش داده شد</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListWithFiltersAndPagination;