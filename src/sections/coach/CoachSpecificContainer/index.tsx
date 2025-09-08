/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useQuery } from '@tanstack/react-query';
import {
  AlertCircle,
  Book,
  CheckCircle,
  Loader2,
  Play,
  Star,
  Trophy,
  User,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { getSpecificCoachRequest } from '@/API/coach';
import CustomImage from '@/components/CustomImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import useResponsiveEvent from '@/hooks/useResponsiveEvent';

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

// Program Card Component
const ProgramCard: React.FC<{ program: CoachProgram }> = ({ program }) => {
  const hasDiscount = program.price_discounted < program.price_real;

  return (
    <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
      <div className="pb-4">
        <div className="relative mb-4 h-56">
          {program.course.tumbnail
            ? (
                <CustomImage
                  fileName={program.course?.tumbnail?.file_name}
                  alt={program.course.title}
                  className="rounded-t-lg"
                  containerClassName="w-full h-full"
                />
              )
            : (
                <div className="flex size-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                  <Book className="size-12 text-gray-400" />
                </div>
              )}
        </div>

        <div className="flex flex-col px-4">
          <CardTitle className="line-clamp-2 text-right text-lg">
            {program.course.title}
          </CardTitle>

          {program.course.sub_title && (
            <p className="line-clamp-2 text-right text-sm text-gray-600">
              {program.course.sub_title}
            </p>
          )}
        </div>
      </div>

      <CardContent className="pt-0">
        {/* Program Type & Status */}
        <div className="mb-3 mt-[-30px] flex items-center   justify-end">
          <Badge variant="outline" className="text-xs">
            {program.program_type === 'ON-SITE' ? 'حضوری' : 'آنلاین'}
          </Badge>
          {/* <Badge
            variant={program.status === 'active' ? 'default' : 'secondary'}
            className="text-xs bg-green-600 text-white"
          >
            {program.status === 'active' ? 'فعال' : 'غیر فعال'}
          </Badge> */}
        </div>

        {/* Description */}
        {program.course.description && (
          <p className="mb-4 line-clamp-3 text-right text-xs text-gray-600">
            {program.course.description}
          </p>
        )}

        {/* Price */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-right">
            {hasDiscount
              ? (
                  <div>
                    <span className="text-lg font-bold text-green-600">
                      {program.price_discounted.toLocaleString('fa-IR')}
                      {' '}
                      تومان
                    </span>
                    <div className="text-sm text-gray-500 line-through">
                      {program.price_real.toLocaleString('fa-IR')}
                      {' '}
                      تومان
                    </div>
                  </div>
                )
              : (
                  <span className="text-lg font-bold text-gray-900">
                    {program.price_real.toLocaleString('fa-IR')}
                    {' '}
                    تومان
                  </span>
                )}
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/program/${program.id}`} className="w-full">
          <Button className="pink-gradient-bg w-full text-white">
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
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="relative mb-4 h-48">
          {course.tumbnail_image?.file_name
            ? (
                <CustomImage
                  fileName={course.tumbnail_image.file_name}
                  alt={course.title}
                  className="rounded-lg"
                  containerClassName="w-full h-full"
                />
              )
            : (
                <div className="flex size-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                  <Play className="size-12 text-gray-400" />
                </div>
              )}

          {/* Fire Sale Badge */}
          {course.is_fire_sale && (
            <div className="absolute right-2 top-2">
              <Badge variant="destructive" className="text-xs">
                🔥 فروش ویژه
              </Badge>
            </div>
          )}
        </div>

        <CardTitle className="line-clamp-2 text-right text-lg">
          {course.title}
        </CardTitle>

        {course.sub_title && (
          <p className="line-clamp-2 text-right text-sm text-gray-600">
            {course.sub_title}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Score */}
        <div className="mb-4 flex items-center justify-start gap-2">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {course.score.toLocaleString('fa-IR')}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-right">
            {hasDiscount
              ? (
                  <div>
                    <span className="text-lg font-bold text-green-600">
                      {course.price_discount.toLocaleString('fa-IR')}
                      {' '}
                      تومان
                    </span>
                    <div className="text-sm text-gray-500 line-through">
                      {course.price_real.toLocaleString('fa-IR')}
                      {' '}
                      تومان
                    </div>
                  </div>
                )
              : (
                  <span className="text-lg font-bold text-gray-900">
                    {course.price_real.toLocaleString('fa-IR')}
                    {' '}
                    تومان
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
// Coach Hero Section with Enhanced Parallax Effect
const CoachHeroSection: React.FC<{ coach: Coach; data: CoachData }> = ({ coach, data }) => {
  // const [scrollY, setScrollY] = React.useState(0);
  // const heroRef = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   // Use requestAnimationFrame for better performance
  //   let ticking = false;
  //   const optimizedScrollHandler = () => {
  //     if (!ticking) {
  //       requestAnimationFrame(() => {
  //         handleScroll();
  //         ticking = false;
  //       });
  //       ticking = true;
  //     }
  //   };

  //   window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  //   return () => window.removeEventListener('scroll', optimizedScrollHandler);
  // }, []);

  const fullName = `${coach.first_name} ${coach.last_name}`;
  const isMobileScreen = useResponsiveEvent(768, 200);
  // // Calculate parallax values with smoother transitions
  // const parallaxBackground = scrollY * 0.4; // Reduced parallax effect
  // const contentTranslateY = Math.max(0, Math.min(100, scrollY * 0.1)); // Limited upward movement

  return (
    <div className="primary-gradient-bg relative w-full overflow-hidden">
      {/* Fixed Background Image with Enhanced Parallax */}

      {/* Content Container with Smooth Scroll Effect */}

      <div style={{ backgroundImage: `url('https://taaghche.com/landing/shakuri/assets/img/baner.png')`, backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: `${isMobileScreen ? '163px' : '276px 328px'}`, backgroundPosition: `${isMobileScreen ? '85% 80px' : '76% 95px'}`, height: `${isMobileScreen ? '220px' : '402px'}` }} className="mt-16 w-full bg-pink-600 md:mt-12"></div>

      <div
        className="relative left-0 top-[-70px] z-20 transition-all duration-500"
        style={{
          transform: `translate3d(0, ${isMobileScreen ? '0px' : '0px'}, 0)`,
        }}

      >
        <div className="w-full px-4 py-8 md:container md:mx-auto md:px-6" dir="rtl">
          {/* Coach Profile Card */}
          <div className="hover:shadow-3xl mx-0 rounded-2xl bg-white/90 px-0 py-6 shadow-2xl backdrop-blur-sm transition-all duration-300 md:mx-8 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="relative size-24 shrink-0 md:size-32">
                {coach.avatar?.file_name
                  ? (
                      <CustomImage
                        fileName={coach.avatar.file_name}
                        alt={fullName}
                        className="rounded-full shadow-lg ring-4 ring-white"
                        containerClassName="w-full h-full"
                      />
                    )
                  : (
                      <div className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-4 ring-white">
                        <User className="size-8 text-gray-500" />
                      </div>
                    )}
              </div>

              {/* Coach Info */}
              <div className="flex-1 text-center md:text-right">
                <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
                  <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {fullName}
                  </h1>
                  {coach.isVerified && (
                    <CheckCircle className="size-6 text-green-500" />
                  )}
                </div>

                {/* Tags */}
                {coach.tags && coach.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                    {coach.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-orange-100 text-xs text-orange-800 hover:bg-orange-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 md:justify-start">
                  <div className="flex items-center gap-1">
                    <Trophy className="size-4 text-orange-500" />
                    <span>مربی معتبر</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 text-yellow-500" />
                    <span>امتیاز بالا</span>
                  </div>
                </div>

                {/* Bio Text Section */}
                <div className="mt-6 rounded-lg bg-gray-50 p-6 md:p-4">
                  <h3 className="mb-3 text-right text-sm font-semibold text-gray-900 md:text-lg">
                    {fullName}
                  </h3>
                  <p className=" text-right text-xs leading-relaxed text-gray-700 md:text-sm">
                    اولین بار که در برنامه کتاب‌باز به‌عنوان مهمان آمد، مجتبی شکوری یادگیری، معلم، کارشناس آموزشی و فعال حوزه کتاب است. او با حرفه‌هایی که از دل کتاب‌ها بیرون می‌آورد، همه را در درجه اول دعوت به فکر کردن و در درجه دوم تشویق به مطالعه کتاب می‌کند.
                  </p>
                  <p className="mt-3 text-right text-sm text-xs leading-relaxed text-gray-700 md:text-sm">
                    او از طریق روش‌های مختلف مثل سخنرانی، پادکست و حضور در برنامه‌هایی چون کتاب‌باز، به توزیع مفاهیم مینت زندگی کمک کرده و مخاطبان را با حرف‌های دلنشین تشویق می‌کند.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Sections - Moved outside parallax container */}
            <div className="pt-screen bg-white">
              <div className="container mx-auto px-4 py-8" dir="rtl">
                {/* Programs Section */}
                {data.coachProgram && data.coachProgram.length > 0 && (
                  <section className="mb-12">
                    <h2 className="mb-6 text-right text-base font-bold text-gray-600 md:text-lg">
                      برنامه‌های ارائه شده
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {data.coachProgram.map(program => (
                        <ProgramCard key={program.id} program={program} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Courses Section */}
                {data.coachCourses && data.coachCourses.length > 0 && (
                  <section>
                    <h2 className="mb-6 text-right text-2xl font-bold text-gray-900">
                      دوره‌های ارائه شده
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {data.coachCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Empty State */}
                {(!data.coachProgram || data.coachProgram.length === 0)
                && (!data.coachCourses || data.coachCourses.length === 0) && (
                  <div className="py-12 text-center">
                    <Book className="mx-auto mb-4 size-16 text-gray-300" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      هنوز محتوایی ارائه نشده
                    </h3>
                    <p className="text-gray-600">
                      این مربی هنوز دوره یا برنامه‌ای ارائه نداده است
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
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
          <Loader2 className="mb-4 size-8 animate-spin text-gray-600" />
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
          <AlertCircle className="mb-4 size-12 text-red-500" />
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            خطا در بارگذاری اطلاعات
          </h2>
          <p className="mb-4 text-gray-600">
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
          <User className="mb-4 size-12 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
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
    <div className="min-h-max">
      {/* Hero Section with Parallax */}
      <CoachHeroSection data={data} coach={data.coach} />

    </div>
  );
};

// Main Container Component
// const CoachSpecificContainer: React.FC<CoachSpecificContainerProps> = ({ coachId }) => {
//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//   } = useQuery<CoachData>({
//     queryKey: ['coach-specific', coachId],
//     queryFn: () => getSpecificCoachRequest(coachId),
//     enabled: !!coachId,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col items-center justify-center py-20">
//           <Loader2 className="w-8 h-8 animate-spin text-gray-600 mb-4" />
//           <p className="text-gray-600">در حال بارگذاری اطلاعات مربی...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (isError) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col items-center justify-center py-20 text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             خطا در بارگذاری اطلاعات
//           </h2>
//           <p className="text-gray-600 mb-4">
//             متأسفانه نتوانستیم اطلاعات مربی را بارگذاری کنیم
//           </p>
//           <Button onClick={() => window.location.reload()}>
//             تلاش مجدد
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // No Data State
//   if (!data || !data.coach) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col items-center justify-center py-20 text-center">
//           <User className="w-12 h-12 text-gray-400 mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             مربی یافت نشد
//           </h2>
//           <p className="text-gray-600">
//             مربی مورد نظر شما یافت نشد
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8" dir="rtl">
//       {/* Coach Information */}
//       <CoachInfoSection coach={data.coach} />

//       {/* Programs Section */}
//       {data.coachProgram && data.coachProgram.length > 0 && (
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
//             برنامه‌های ارائه شده
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {data.coachProgram.map((program) => (
//               <ProgramCard key={program.id} program={program} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Courses Section */}
//       {data.coachCourses && data.coachCourses.length > 0 && (
//         <section>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
//             دوره‌های ارائه شده
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {data.coachCourses.map((course) => (
//               <CourseCard key={course.id} course={course} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Empty State */}
//       {(!data.coachProgram || data.coachProgram.length === 0) &&
//        (!data.coachCourses || data.coachCourses.length === 0) && (
//         <div className="text-center py-12">
//           <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             هنوز محتوایی ارائه نشده
//           </h3>
//           <p className="text-gray-600">
//             این مربی هنوز دوره یا برنامه‌ای ارائه نداده است
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

export default CoachSpecificContainer;
