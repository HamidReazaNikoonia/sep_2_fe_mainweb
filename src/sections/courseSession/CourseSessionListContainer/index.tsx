'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CourseSessionCard from '@/sections/courseSession/CourseSessionCard';
import { Filter, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type CourseSession = {
  id: string;
  title: string;
  sub_title: string;
  tumbnail?: {
    file_name: string;
  };
  course_session_category: {
    id: string;
    name: string;
    level: number;
    parent: string | null;
    isActive: boolean;
    path?: string;
  }[];
  coaches: {
    id: string;
    first_name: string;
    last_name: string;
    avatar?: {
      file_name: string;
    };
  }[];
  course_status: boolean;
  description?: string;
};

type CourseSessionListProps = {
  courseSessions: CourseSession[];
  title?: string;
};

const CourseSessionListContainer: React.FC<CourseSessionListProps> = ({
  courseSessions,
  title = 'دوره های آموزشی',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSessions, setFilteredSessions] = useState<CourseSession[]>(courseSessions);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Extract unique categories from sessions
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    courseSessions.forEach(session => {
      session.course_session_category.forEach(category => {
        uniqueCategories.add(category.name);
      });
    });
    return Array.from(uniqueCategories);
  }, [courseSessions]);

  // Apply filters and search
  useEffect(() => {
    let result = courseSessions;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(session => 
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.sub_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(session => 
        session.course_session_category.some(category => 
          category.name === selectedCategory
        )
      );
    }
    
    // Apply status filter
    if (selectedStatus !== 'all') {
      const isActive = selectedStatus === 'active';
      result = result.filter(session => session.course_status === isActive);
    }
    
    setFilteredSessions(result);
  }, [searchTerm, selectedCategory, selectedStatus, courseSessions]);

  return (
    <div dir="rtl" className="w-full p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">{title}</h1>
      
      {/* Filters and Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Input
            type="text"
            placeholder="جستجو دوره ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        {/* <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm">دسته بندی:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="همه دسته ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه دسته ها</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">وضعیت:</span>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="همه وضعیت ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه وضعیت ها</SelectItem>
                <SelectItem value="active">فعال</SelectItem>
                <SelectItem value="inactive">غیرفعال</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
          >
            <Filter size={16} />
            پاک کردن فیلترها
          </Button>
        </div> */}
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        {filteredSessions.length} دوره یافت شد
      </div>
      
      {/* Course Session Cards Grid */}
      {filteredSessions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredSessions.map((session) => (
            <CourseSessionCard key={session.id} data={session} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500">هیچ دوره ای با این مشخصات یافت نشد.</p>
        </div>
      )}
    </div>
  );
};

export default CourseSessionListContainer;