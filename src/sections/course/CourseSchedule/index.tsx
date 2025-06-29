/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
'use client';

import { getCourseSessionPrograms } from '@/API/course';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Check, Clock, FileText, Play, Users } from 'lucide-react';
import { useState } from 'react';

// Mock data that matches the API structure
const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

// const mockPrograms = [
//   {
//     _id: '683df3bbec28c1ed6d9fa1ce',
//     max_member_accept: 14,
//     status: 'active',
//     course: null,
//     coach: {
//       _id: '680bd330e9487d95620ae6c1',
//       __t: 'Coach',
//       first_name: 'حمید',
//       last_name: 'نیکونیا',
//       portfolio: [
//         {
//           _id: 'port1',
//           type: 'image',
//           url: '/placeholder.svg?height=200&width=200',
//           title: 'نمونه کار ۱',
//         },
//         {
//           _id: 'port2',
//           type: 'video',
//           url: '/placeholder.svg?height=200&width=200',
//           thumbnail: '/placeholder.svg?height=200&width=200',
//           title: 'ویدیو آموزشی',
//         },
//         {
//           _id: 'port3',
//           type: 'image',
//           url: '/placeholder.svg?height=200&width=200',
//           title: 'نمونه کار ۲',
//         },
//       ],
//     },
//     class_id: '683b425f3dbcefc2a0f0bbbb',
//     program_type: 'ON-SITE',
//     sessions: [
//       {
//         status: 'scheduled',
//         _id: '683df3bbec28c1ed6d9fa1cf',
//         date: '1405/5/20',
//         startTime: '08:00',
//         endTime: '09:00',
//         location: 'Music Room A',
//       },
//       {
//         status: 'scheduled',
//         _id: '683df3bbec28c1ed6d9fa1d0',
//         date: '1405/5/27',
//         startTime: '10:00',
//         endTime: '12:00',
//         location: 'Music Room A',
//       },
//     ],
//     course_subjects: [
//       {
//         _id: 'sub1',
//         title: 'مبانی موسیقی',
//         sub_title: 'آشنایی با نت‌ها و ریتم',
//       },
//       {
//         _id: 'sub2',
//         title: 'تکنیک‌های پیشرفته',
//         sub_title: 'تمرین‌های تخصصی و حرفه‌ای',
//       },
//       {
//         _id: 'sub3',
//         title: 'اجرای قطعات کلاسیک',
//         sub_title: 'تفسیر و اجرای آثار بزرگان',
//       },
//     ],
//     members: [],
//     createdAt: '2025-06-02T18:55:55.691Z',
//     updatedAt: '2025-06-02T18:55:55.691Z',
//     __v: 0,
//   },
//   {
//     _id: '683df3bbec28c1ed6d9fa1cf',
//     max_member_accept: 10,
//     status: 'active',
//     course: null,
//     coach: {
//       _id: '680bd330e9487d95620ae6c2',
//       __t: 'Coach',
//       first_name: 'سارا',
//       last_name: 'محمدی',
//       portfolio: [
//         {
//           _id: 'port4',
//           type: 'video',
//           url: '/placeholder.svg?height=200&width=200',
//           thumbnail: '/placeholder.svg?height=200&width=200',
//           title: 'کلاس آنلاین نمونه',
//         },
//         {
//           _id: 'port5',
//           type: 'image',
//           url: '/placeholder.svg?height=200&width=200',
//           title: 'گواهینامه تدریس',
//         },
//       ],
//     },
//     class_id: '683b425f3dbcefc2a0f0bbbc',
//     program_type: 'ONLINE',
//     sessions: [
//       {
//         status: 'scheduled',
//         _id: '683df3bbec28c1ed6d9fa1d1',
//         date: '1405/5/21',
//         startTime: '14:00',
//         endTime: '16:00',
//         location: 'Zoom Meeting',
//       },
//       {
//         status: 'scheduled',
//         _id: '683df3bbec28c1ed6d9fa1d2',
//         date: '1405/5/28',
//         startTime: '14:00',
//         endTime: '16:00',
//         location: 'Zoom Meeting',
//       },
//     ],
//     course_subjects: [
//       {
//         _id: 'sub4',
//         title: 'آموزش آنلاین موثر',
//         sub_title: 'روش‌های نوین تدریس مجازی',
//       },
//       {
//         _id: 'sub5',
//         title: 'تعامل با دانشجو',
//         sub_title: 'ایجاد ارتباط موثر در فضای مجازی',
//       },
//     ],
//     members: [],
//     createdAt: '2025-06-02T19:00:00.000Z',
//     updatedAt: '2025-06-02T19:00:00.000Z',
//     __v: 0,
//   },
// ];

// Types based on the API response
type Session = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
};

type PortfolioItem = {
  _id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
};

type CourseSubject = {
  _id: string;
  title: string;
  sub_title: string;
};

type Coach = {
  _id: string;
  __t: string;
  first_name: string;
  last_name: string;
  portfolio?: PortfolioItem[];
};

type Program = {
  sample_media: any;
  price_discounted: any;
  price_real: any;
  subjects: any;
  _id: string;
  max_member_accept: number;
  status: string;
  course: any;
  coach: Coach;
  class_id: string;
  program_type: string;
  sessions: Session[];
  course_subjects?: CourseSubject[];
  members: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Update the status mapping object with badge styles
const STATUS_CONFIG = {
  completed: {
    text: 'برگذار شده',
    className: 'relative opacity-90 after:absolute after:inset-0 after:bg-green-500 after:opacity-30',
    badgeStyle: 'bg-green-500 text-white border-green-500',
  },
  scheduled: {
    text: 'برنامه ریزی شده',
    className: 'relative opacity-100 after:absolute after:inset-0 after:bg-purple-500 after:opacity-20',
    badgeStyle: 'bg-blue-500 text-white border-blue-500',
  },
  cancelled: {
    text: 'کنسل شده',
    className: 'relative opacity-60 after:absolute after:inset-0 after:bg-red-500 after:opacity-30',
    badgeStyle: 'bg-red-500 text-white border-red-500',
  },
} as const;

// Component to display a single session
const SessionItem = ({ session }: { session: Session }) => {
  const statusConfig = STATUS_CONFIG[session.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.scheduled;

  return (
    <div
      dir="rtl"
      className={`flex flex-col rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${statusConfig.className}`}
    >
      <div className="mb-3 flex items-center justify-between border-b pb-2">
        <h4 className="font-medium">جلسه آموزشی</h4>
        <Badge variant="outline" className={`${statusConfig.badgeStyle} px-2 py-1 font-semibold`}>
          {statusConfig.text}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <Calendar className="ml-2 size-4 text-primary" />
          <span className="text-sm text-gray-700">{session.date}</span>
        </div>

        <div className="flex items-center">
          <Clock className="ml-2 size-4 text-primary" />
          <span className="text-sm text-gray-700">{`${session.startTime} - ${session.endTime}`}</span>
        </div>

        {session.location && (
          <div className="flex items-center">
            <div className="ml-2 size-4 text-primary">📍</div>
            <span className="text-sm text-gray-700">{session.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Component to display portfolio items
const PortfolioGrid = ({ portfolio }: { portfolio: any[] }) => {
  return (
    <div className="grid grid-cols-2 gap-8 p-4 md:grid-cols-5">
      {portfolio.map(item => (
        <div key={item._id} className="group relative">
          <div className="mx-auto aspect-square max-h-[200px] max-w-[200px] overflow-hidden rounded-lg border border-gray-300 bg-muted p-1">
            {item.media_type === 'IMAGE'
              ? (
                  <img
                    src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`}
                    alt={item.media_title}
                    className="mx-auto size-full max-h-[200px] max-w-[200px] object-cover"
                  />
                )
              : item.media_type === 'VIDEO' && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center transition-colors">
                    <Play className="size-8 text-white" />
                  </div>
                  <video
                    className="size-full object-cover"
                    controls
                    preload="none"
                    poster=""
                  >
                    <source data-src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )}
          </div>
          <p className="mt-2 text-center text-xs">{item.media_title}</p>
        </div>
      ))}
    </div>
  );
};

// Component to display course subjects
const SubjectsList = ({ subjects }: { subjects: CourseSubject[] }) => {
  return (
    <div dir="rtl" className="space-y-3 p-4">
      {subjects.map(subject => (
        <div key={subject._id} className="flex items-start space-x-3 rounded-lg border p-3">
          <FileText className="ml-2 mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div className="flex-1">
            <h4 className="text-sm font-medium">{subject.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{subject.sub_title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Component to display a single program card
const ProgramCard = ({
  program,
  isSelected,
  onSelect,
}: {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const firstSessionDate = program?.sessions[0]?.date || 'تاریخ نامشخص';
  const hasDiscount = program?.price_discounted && program.price_discounted !== program.price_real;
  return (
    <Card
      className={`mb-4 w-full cursor-pointer py-4 transition-all ${isSelected ? 'border-4 border-green-500' : 'border-0'
      }`}
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      role="radio"
      aria-checked={isSelected}
    >
      <CardHeader className="relative pt-16">
        <div className="flex items-start justify-between">
          <div>
            <CardDescription>استاد</CardDescription>
            <CardTitle>{`${program.coach.first_name} ${program.coach.last_name}`}</CardTitle>
          </div>
          <Badge variant="default">{program.program_type === 'ON-SITE' ? 'حضوری' : 'آنلاین'}</Badge>
        </div>
        {isSelected && (
          <div className="absolute right-2 top-2 rounded-full bg-green-500 p-1 text-white">
            <Check className="size-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <Users className="ml-2 size-4 text-muted-foreground" />
          <span className="text-xs">{`جای خالی ${program.max_member_accept} `}</span>
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions" className="text-xs">
              کلاس های دوره
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">
              نمونه کار های استاد
            </TabsTrigger>
            <TabsTrigger value="subjects" className="text-xs">
              سرفصل ها
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="mt-4">
            <div dir="rtl" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[...program.sessions, ...program.sessions, ...program.sessions, ...program.sessions].map(session => (
                <SessionItem key={session._id} session={session} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-4">
            {program?.sample_media && program?.sample_media.length > 0
              ? (
                  <PortfolioGrid portfolio={program?.sample_media} />
                )
              : (
                  <div className="p-4 text-center text-sm text-muted-foreground">نمونه کاری موجود نیست</div>
                )}
          </TabsContent>

          <TabsContent value="subjects" className="mt-4">
            {program.subjects && program.subjects.length > 0
              ? (
                  <SubjectsList subjects={program.subjects} />
                )
              : (
                  <div className="p-4 text-center text-sm text-muted-foreground">سرفصل موجود نیست</div>
                )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          شروع دوره:
          {' '}
          {firstSessionDate}
        </div>
        <div className="text-xs text-muted-foreground">
          وضعیت:
          {program.status === 'active' ? 'فعال' : 'غیرفعال'}
        </div>
      </CardFooter>

      {/* Price display section */}
      {program.price_real && (
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="text-xl font-medium">قیمت:</span>
          {hasDiscount
            ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl text-muted-foreground line-through">
                    {program.price_real.toLocaleString()}
                    {' '}
                    تومان
                  </span>
                  <Badge variant="destructive" className="px-2 py-0 text-xl">
                    {program.price_discounted.toLocaleString()}
                    {' '}
                    تومان
                  </Badge>
                </div>
              )
            : (
                <span className="text-xl font-semibold">
                  {program.price_real.toLocaleString()}
                  {' '}
                  تومان
                </span>
              )}
        </div>
      )}

      {/* Hidden radio input for form submission */}
      <input
        type="radio"
        name="selectedProgram"
        value={program._id}
        checked={isSelected}
        onChange={() => { }} // Controlled by parent component
        className="sr-only" // Visually hidden
      />
    </Card>
  );
};

// Main component to display all programs
export default function CourseSchedule({
  courseId,
  onProgramSelect,
}: {
  courseId: string;
  onProgramSelect?: (program: Program) => void;
}) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const { data: programs, isLoading, error } = useQuery({
    queryKey: ['coursePrograms', courseId],
    queryFn: () => getCourseSessionPrograms(courseId),
    enabled: !!courseId,
  });

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    // Reset selectedPackages when a new program is selected
    setSelectedPackages([]);
    if (onProgramSelect) {
      onProgramSelect(program);
    }
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackages((prev) => {
      if (prev.includes(packageId)) {
        return prev.filter(id => id !== packageId);
      } else {
        return [...prev, packageId];
      }
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl p-4 text-center" dir="rtl">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl p-4 text-center text-red-500" dir="rtl">
        <p>
          خطا در دریافت اطلاعات:
          {(error as Error).message}
        </p>
      </div>
    );
  }

  const programsData = programs?.data?.programs || [];

  return (
    <div className="w-full p-4" dir="rtl">
      <h2 className="mb-6 text-center text-xs font-semibold md:text-lg">اساتیدی که این درس را ارایه میکنند</h2>
      <div className="space-y-4" role="radiogroup" aria-label="انتخاب استاد">
        {programsData.map((program: { _id: any; sample_media?: any; price_discounted?: any; price_real?: any; subjects?: any; max_member_accept?: number; status?: string; course?: any; coach?: Coach; class_id?: string; program_type?: string; sessions?: Session[]; course_subjects?: CourseSubject[] | undefined; members?: any[]; createdAt?: string; updatedAt?: string; __v?: number; }) => (
          <ProgramCard
            key={program._id}
            program={program}
            isSelected={selectedProgram?._id === program._id}
            onSelect={() => handleProgramSelect(program)}
          />
        ))}
      </div>


      <div className="mt-12 w-full">
        <div className="flex w-full items-center justify-center">
          {selectedProgram?.packages && selectedProgram.packages.length > 0 && (
            <div className="w-full">
              <h3 className="mb-8  text-center text-lg font-semibold">پکیج‌های ارائه شده برای این استاد</h3>
              <div className="space-y-3">
                {selectedProgram.packages.map((pkg) => (
                  <div key={pkg._id} className="flex items-center justify-between rounded-lg border-2 border-gray-500 bg-white p-3 px-4 md:px-8">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="checkbox"
                        id={`package-${pkg._id}`}
                        checked={selectedPackages.includes(pkg._id)}
                        onChange={() => handlePackageSelect(pkg._id)}
                        className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`package-${pkg._id}`} className="flex cursor-pointer items-center">
                        {pkg.image
                          ? (
                              <img
                                src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${pkg.image.file_name}`}
                                alt={pkg.title}
                                className="ml-3 size-10 rounded object-cover"
                              />
                            )
                          : (
                              <div className="ml-3 flex  size-10 items-center justify-center rounded bg-gray-200">
                                <span className="text-center text-[8px] text-gray-600">بدون تصویر</span>
                              </div>
                            )}
                        <span className="text-sm text-gray-900">{pkg.title}</span>
                      </label>
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-primary">
                        {pkg.price.toLocaleString()}
                        ریال
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 w-full">
        {selectedProgram && (
          <div className="my-6 w-full rounded-lg border-2 border-dashed border-gray-400 p-4">
            <h3 className="mb-4 text-center text-lg font-semibold">پیش فاکتور</h3>

            <div className="space-y-3">
              {/* Program Price */}
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">قیمت دوره:</span>
                <span className="font-medium">
                  {selectedProgram.price_discounted !== undefined && selectedProgram.price_discounted !== selectedProgram.price_real
                    ? `${selectedProgram.price_discounted.toLocaleString()} ریال`
                    : selectedProgram.price_real
                      ? `${selectedProgram.price_real.toLocaleString()} ریال`
                      : 'رایگان'}
                </span>
              </div>

              {/* Selected Packages */}
              {selectedPackages.length > 0 && (
                <div className="border-b pb-2">
                  <div className="mb-2 font-medium">پکیج‌های انتخاب شده:</div>
                  <div className="mr-4 space-y-1">
                    {selectedPackages.map((packageId) => {
                      const pkg = selectedProgram.packages.find(p => p._id === packageId);
                      return pkg
                        ? (
                            <div key={pkg._id} className="flex justify-between text-sm">
                              <span>{pkg.title}</span>
                              <span>
                                {pkg.price.toLocaleString()}
                                {' '}
                                ریال
                              </span>
                            </div>
                          )
                        : null;
                    })}
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="flex justify-between pt-2 font-bold">
                <span>مبلغ کل:</span>
                <span className="rounded-md bg-gray-200 px-2 py-1 text-primary">
                  {(() => {
                    // Calculate base program price
                    const programPrice = selectedProgram.price_discounted !== undefined &&
                      selectedProgram.price_discounted !== selectedProgram.price_real
                      ? selectedProgram.price_discounted
                      : selectedProgram.price_real || 0;

                    // Calculate sum of selected packages
                    const packagesPrice = selectedPackages.reduce((sum, packageId) => {
                      const pkg = selectedProgram.packages.find(p => p._id === packageId);
                      return sum + (pkg?.price || 0);
                    }, 0);

                    // Return total formatted price
                    return `${(programPrice + packagesPrice).toLocaleString()} ریال`;
                  })()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedProgram && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => console.log('Selected program:', selectedProgram, 'Selected packages:', selectedPackages)}
          >
            تایید انتخاب
          </button>
        </div>
      )}
    </div>
  );
}
