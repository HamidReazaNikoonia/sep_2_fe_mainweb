'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  User, 
  Star, 
  CheckCircle, 
  Calendar, 
  Clock, 
  DollarSign, 
  Play,
  Book,
  Trophy,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

import { getSpecificCoachRequest } from '@/API/coach';
import CustomImage from '@/components/CustomImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CoachSpecificContainerProps = {
  coachId: string;
};

// Types based on the API response structure
type Coach = {
  first_name: string;
  last_name: string;
  tags: string[];
  isVerified: boolean;
  avatar: { file_name: string };
};

type CoachProgram = {
  course: {
    title: string;
    course_status: string;
    tumbnail: string;
    sub_title: string;
    description: string;
    id: string;
  };
  status: string;
  program_type: string;
  price_real: number;
  price_discounted: number;
  id: string;
};

type CoachCourse = {
  title: string;
  sub_title: string;
  tumbnail_image: { file_name: string };
  price_real: number;
  price_discount: number;
  is_fire_sale: boolean;
  score: number;
  id: string;
};

type CoachData = {
  coach: Coach;
  coachProgram: CoachProgram[];
  coachCourses: CoachCourse[];
};

// Coach Info Section Component
const CoachInfoSection: React.FC<{ coach: Coach }> = ({ coach }) => {
  const fullName = `${coach.first_name} ${coach.last_name}`;

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
            {coach.avatar?.file_name ? (
              <CustomImage
                fileName={coach.avatar.file_name}
                alt={fullName}
                className="rounded-full ring-4 ring-green-100"
                containerClassName="w-full h-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-500" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {fullName}
              </h1>
              {coach.isVerified && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>

            {/* Tags */}
            {coach.tags && coach.tags.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {coach.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>مربی معتبر</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Program Card Component
const ProgramCard: React.FC<{ program: CoachProgram }> = ({ program }) => {
  const hasDiscount = program.price_discounted < program.price_real;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="relative h-48 mb-4">
          {program.course.tumbnail ? (
            <CustomImage
              fileName={program.course.tumbnail}
              alt={program.course.title}
              className="rounded-lg"
              containerClassName="w-full h-full"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Book className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <CardTitle className="text-lg text-right line-clamp-2">
          {program.course.title}
        </CardTitle>
        
        {program.course.sub_title && (
          <p className="text-sm text-gray-600 text-right line-clamp-2">
            {program.course.sub_title}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Program Type & Status */}
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline" className="text-xs">
            {program.program_type}
          </Badge>
          <Badge 
            variant={program.status === 'active' ? 'default' : 'secondary'} 
            className="text-xs"
          >
            {program.status}
          </Badge>
        </div>

        {/* Description */}
        {program.course.description && (
          <p className="text-xs text-gray-600 text-right line-clamp-3 mb-4">
            {program.course.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-right">
            {hasDiscount ? (
              <div>
                <span className="text-lg font-bold text-green-600">
                  {program.price_discounted.toLocaleString('fa-IR')} تومان
                </span>
                <div className="text-sm text-gray-500 line-through">
                  {program.price_real.toLocaleString('fa-IR')} تومان
                </div>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {program.price_real.toLocaleString('fa-IR')} تومان
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/program/${program.id}`} className="w-full">
          <Button className="w-full">
            مشاهده برنامه
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

// Course Card Component
const CourseCard: React.FC<{ course: CoachCourse }> = ({ course }) => {
  const hasDiscount = course.price_discount < course.price_real;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="relative h-48 mb-4">
          {course.tumbnail_image?.file_name ? (
            <CustomImage
              fileName={course.tumbnail_image.file_name}
              alt={course.title}
              className="rounded-lg"
              containerClassName="w-full h-full"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Play className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* Fire Sale Badge */}
          {course.is_fire_sale && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="text-xs">
                🔥 فروش ویژه
              </Badge>
            </div>
          )}
        </div>
        
        <CardTitle className="text-lg text-right line-clamp-2">
          {course.title}
        </CardTitle>
        
        {course.sub_title && (
          <p className="text-sm text-gray-600 text-right line-clamp-2">
            {course.sub_title}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Score */}
        <div className="flex items-center justify-start gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {course.score.toLocaleString('fa-IR')}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-right">
            {hasDiscount ? (
              <div>
                <span className="text-lg font-bold text-green-600">
                  {course.price_discount.toLocaleString('fa-IR')} تومان
                </span>
                <div className="text-sm text-gray-500 line-through">
                  {course.price_real.toLocaleString('fa-IR')} تومان
                </div>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {course.price_real.toLocaleString('fa-IR')} تومان
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/course/${course.id}`} className="w-full">
          <Button className="w-full">
            مشاهده دوره
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

// Main Container Component
const CoachSpecificContainer: React.FC<CoachSpecificContainerProps> = ({ coachId }) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<CoachData>({
    queryKey: ['coach-specific', coachId],
    queryFn: () => getSpecificCoachRequest(coachId),
    enabled: !!coachId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600 mb-4" />
          <p className="text-gray-600">در حال بارگذاری اطلاعات مربی...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            خطا در بارگذاری اطلاعات
          </h2>
          <p className="text-gray-600 mb-4">
            متأسفانه نتوانستیم اطلاعات مربی را بارگذاری کنیم
          </p>
          <Button onClick={() => window.location.reload()}>
            تلاش مجدد
          </Button>
        </div>
      </div>
    );
  }

  // No Data State
  if (!data || !data.coach) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <User className="w-12 h-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            مربی یافت نشد
          </h2>
          <p className="text-gray-600">
            مربی مورد نظر شما یافت نشد
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Coach Information */}
      <CoachInfoSection coach={data.coach} />

      {/* Programs Section */}
      {data.coachProgram && data.coachProgram.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
            برنامه‌های ارائه شده
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.coachProgram.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </section>
      )}

      {/* Courses Section */}
      {data.coachCourses && data.coachCourses.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
            دوره‌های ارائه شده
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.coachCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {(!data.coachProgram || data.coachProgram.length === 0) && 
       (!data.coachCourses || data.coachCourses.length === 0) && (
        <div className="text-center py-12">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            هنوز محتوایی ارائه نشده
          </h3>
          <p className="text-gray-600">
            این مربی هنوز دوره یا برنامه‌ای ارائه نداده است
          </p>
        </div>
      )}
    </div>
  );
};

export default CoachSpecificContainer;
