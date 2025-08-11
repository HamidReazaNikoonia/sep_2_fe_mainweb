/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowDown,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Play,
  Star,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCourseSessionPrograms } from '@/API/course';
import { Badge } from '@/components/ui/badge';
import useAuth from '@/hooks/useAuth';
import { filterPriceNumber, toPersianDigits } from '@/utils/Helpers';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

// Types (same as previous)
type Session = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
};

type Coach = {
  _id: string;
  first_name: string;
  last_name: string;
  avatar?: { file_name: string };
};

type Program = {
  _id: string;
  coach: Coach;
  sample_media: any[];
  price_discounted: number;
  price_real: number;
  subjects: { title: string; sub_title: string }[];
  sessions: Session[];
  packages: any[];
  program_type: 'ONLINE' | 'ON-SITE';
  max_member_accept: number;
  status: string;
};

// Timeline Components
const SessionTimeline = ({ sessions }: { sessions: Session[] }) => (
  <div className="relative">
    <div className="absolute right-6 inset-y-0 w-0.5 bg-gradient-to-b from-primary to-primary/30"></div>
    <div className="space-y-6">
      {sessions.map((session, index) => (
        <div key={session._id} className="relative flex items-start space-x-4 space-x-reverse">
          <div className={`relative z-10 size-3 rounded-full ${session.status === 'scheduled' ? 'bg-primary' : 'bg-green-500'
          }`}
          >
            <div className={`absolute -inset-1 rounded-full animate-pulse ${session.status === 'scheduled' ? 'bg-primary/20' : 'bg-green-500/20'
            }`}
            >
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="size-4 text-primary" />
                <span className="font-medium">{toPersianDigits(session.date)}</span>
              </div>
              <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'}>
                جلسه
                {' '}
                {index + 1}
              </Badge>
            </div>

            <div className="flex items-center text-sm text-gray-600 space-x-4 space-x-reverse">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Clock className="size-4" />
                <span>{`${toPersianDigits(session.startTime)} - ${toPersianDigits(session.endTime)}`}</span>
              </div>
              {session.location && (
                <div className="flex items-center space-x-1 space-x-reverse">
                  <MapPin className="size-4" />
                  <span>{session.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MediaShowcase = ({ media }: { media: any[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {media.map((item, index) => (
      <div key={item._id || index} className="group relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {item.media_type === 'IMAGE'
          ? (
              <img
                src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`}
                alt={item.media_title}
                className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            )
          : item.media_type === 'VIDEO'
            ? (
                <div className="relative size-full">
                  <video className="size-full object-cover" preload="none">
                    <source src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="size-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="size-6 text-gray-800 mr-0.5" />
                    </div>
                  </div>
                </div>
              )
            : null}

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3">
          <p className="text-white text-sm font-medium truncate">{item.media_title}</p>
        </div>
      </div>
    ))}
  </div>
);

const SubjectsGrid = ({ subjects }: { subjects: any[] }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {subjects.map((subject, index) => (
      <div key={subject._id || index} className="flex items-start space-x-3 space-x-reverse p-4 bg-gradient-to-l from-primary/5 to-transparent rounded-lg border border-primary/20">
        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Award className="size-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{subject.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{subject.sub_title}</p>
        </div>
      </div>
    ))}
  </div>
);

const ProgramGrid = ({
  program,
  isSelected,
  onSelect,
}: {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'media' | 'subjects'>('sessions');
  const hasDiscount = program.price_discounted && program.price_discounted !== program.price_real;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer h-[500px] flex flex-col ${isSelected
        ? 'ring-4 ring-primary/30 shadow-2xl scale-[1.02]'
        : 'shadow-lg hover:shadow-xl hover:scale-[1.01]'
      }`}
      onClick={onSelect}
    >
      {/* Header with gradient - Fixed height */}
      <div className="relative  bg-gradient-to-r from-pink-500 to-purple-600   text-white p-6 shrink-0">
        {isSelected && (
          <div className="absolute left-4 top-4 size-8 bg-white rounded-full flex items-center justify-center">
            <CheckCircle className="size-6 text-primary" />
          </div>
        )}

        <div className="flex items-center space-x-4 space-x-reverse">
          {program.coach.avatar
            ? (
                <img
                  src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${program.coach.avatar.file_name}`}
                  alt={`${program.coach.first_name} ${program.coach.last_name}`}
                  className="size-16 rounded-full border-4 border-white/30 object-cover"
                />
              )
            : (
                <div className="size-16 rounded-full border-4 border-white/30 bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {program.coach.first_name.charAt(0)}
                </div>
              )}

          <div className="flex-1">
            <h3 className=" text-lg md:text-xl font-bold">
              {`${program.coach.first_name} ${program.coach.last_name}`}
            </h3>
            {/* <div className="flex items-center space-x-2 space-x-reverse mt-2">
              <div className="flex">
                {[...Array.from({ length: 5 })].map((_, i) => (
                  <Star key={i} className={`size-4 ${i < 4 ? 'text-yellow-300 fill-current' : 'text-white/30'}`} />
                ))}
              </div>
              <span className="text-white/90 text-sm">(۴.۲)</span>
            </div> */}
          </div>

          <div className="text-left hidden md:block">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white text-xs border-white/30 mb-2"
            >
              {program.program_type === 'ON-SITE' ? '🏢 حضوری' : '💻 آنلاین'}
            </Badge>
            <div className="flex text-xs md:text-sm items-center text-white/90">
              <Users className="size-4  ml-1" />
              {program.max_member_accept}
              {' '}
              نفر
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 flex flex-row-reverse justify-between">
          <div>
          {hasDiscount
            ? (
                <div>
                  <div className="text-white/70 line-through text-sm">
                    {filterPriceNumber(program.price_real)}
                    {' '}
                    تومان
                  </div>
                  <div className="text-2xl font-bold">
                    {filterPriceNumber(program.price_discounted)}
                    {' '}
                    تومان
                  </div>
                </div>
              )
            : (
                <div className="text-2xl font-bold">
                  {filterPriceNumber(program.price_real)}
                  {' '}
                  تومان
                </div>
              )}
          </div>

          <div className="block md:hidden">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white text-xs md:text-base border-white/30 mb-2"
            >
              {program.program_type === 'ON-SITE' ? '🏢 حضوری' : '💻 آنلاین'}
            </Badge>
            <div className="flex text-xs md:text-base items-center text-white/90">
              <Users className="size-4  ml-1" />
              {program.max_member_accept}
              {' '}
              نفر
            </div>
          </div>
        </div>
      </div>

      {/* Content - Flexible with overflow */}
      <div className="bg-white flex-1 flex flex-col overflow-hidden">
        {/* Tabs - Fixed height */}
        <div className="border-b border-gray-200 shrink-0">
          <div className="flex">
            {[
              { key: 'sessions', label: 'جلسات', icon: Calendar },
              { key: 'media', label: 'نمونه‌کارها', icon: Play },
              { key: 'subjects', label: 'سرفصل‌ها', icon: Award },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(key as any);
                }}
                className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse py-4 text-sm font-medium transition-colors ${activeTab === key
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === 'sessions' && (
              <SessionTimeline sessions={[...program.sessions, ...program.sessions, ...program.sessions, ...program.sessions]} />
            )}

            {activeTab === 'media' && (
              program.sample_media?.length > 0
                ? (
                    <MediaShowcase media={program.sample_media} />
                  )
                : (
                    <div className="text-center py-12 text-gray-500">
                      <Play className="size-12 mx-auto text-gray-300 mb-4" />
                      <p>نمونه کاری موجود نیست</p>
                    </div>
                  )
            )}

            {activeTab === 'subjects' && (
              program.subjects?.length > 0
                ? (
                    <SubjectsGrid subjects={program.subjects} />
                  )
                : (
                    <div className="text-center py-12 text-gray-500">
                      <Award className="size-12 mx-auto text-gray-300 mb-4" />
                      <p>سرفصل موجود نیست</p>
                    </div>
                  )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function TimelineGridLayout({
  courseId,
  onProgramSelect,
}: {
  courseId: string;
  onProgramSelect?: (program: Program) => void;
}) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const router = useRouter();
  const { updateSelectedCourseSessionProgram } = useAuth();

  const { data: programs, isLoading, error } = useQuery({
    queryKey: ['coursePrograms', courseId],
    queryFn: () => getCourseSessionPrograms(courseId),
    enabled: !!courseId,
  });

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    setSelectedPackages([]);
    onProgramSelect?.(program);
  };

  const handleSubmit = () => {
    if (!selectedProgram?._id) {
      toast.error('لطفا یک دوره انتخاب کنید');
      return;
    }

    updateSelectedCourseSessionProgram({
      programId: selectedProgram._id,
      packages: selectedPackages,
    });

    router.push(`/course-session/checkout?programId=${selectedProgram._id}&packageIds=${selectedPackages.join(',')}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">در حال بارگذاری اساتید...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <div className="text-6xl mb-4">⚠️</div>
        <p>خطا در دریافت اطلاعات</p>
      </div>
    );
  }

  const programsData = programs?.data?.programs || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center size-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-6">
          <Users className="size-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          انتخاب استاد دوره
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          از میان بهترین اساتید ما، استاد مورد نظر خود را انتخاب کنید و سفر یادگیری خود را آغاز کنید
        </p>
        <ArrowDown className="size-6 mx-auto mt-8 text-primary animate-bounce" />
      </div>

      {/* Programs Grid */}
      <div className="grid gap-8 lg:grid-cols-1 mb-16">
        {programsData.map((program: Program) => (
          <ProgramGrid
            key={program._id}
            program={program}
            isSelected={selectedProgram?._id === program._id}
            onSelect={() => handleProgramSelect(program)}
          />
        ))}
      </div>

      {/* Packages Section */}
      {selectedProgram?.packages?.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">پکیج‌های تکمیلی</h3>
            <p className="text-gray-600">پکیج‌های اضافی برای تجربه بهتر یادگیری</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedProgram.packages.map((pkg: any) => (
              <div
                key={pkg._id}
                className={`relative overflow-hidden rounded-xl border-2 p-6 transition-all cursor-pointer group ${selectedPackages.includes(pkg._id)
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-gray-200 hover:border-primary/50 hover:shadow-lg'
                }`}
                onClick={() => {
                  setSelectedPackages(prev =>
                    prev.includes(pkg._id)
                      ? prev.filter(id => id !== pkg._id)
                      : [...prev, pkg._id],
                  );
                }}
              >
                <div className="absolute -left-4 -top-4 size-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full"></div>

                {selectedPackages.includes(pkg._id) && (
                  <CheckCircle className="absolute left-3 top-3 size-6 text-primary" />
                )}

                <div className="relative">
                  {pkg.image
                    ? (
                        <img
                          src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${pkg.image.file_name}`}
                          alt={pkg.title}
                          className="size-16 rounded-lg object-cover mb-4"
                        />
                      )
                    : (
                        <div className="size-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                          <Award className="size-8 text-primary" />
                        </div>
                      )}

                  <h4 className="font-bold text-gray-900 mb-2">{pkg.title}</h4>
                  <div className="text-2xl font-bold text-primary">
                    {filterPriceNumber(pkg.price)}
                    {' '}
                    ریال
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Invoice */}
      {selectedProgram && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-primary/30 p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="size-6 text-primary" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-6">صورت‌حساب نهایی</h3>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-between py-3 border-b">
              <span className="font-medium">دوره انتخابی:</span>
              <span className="font-bold">
                {selectedProgram.price_discounted && selectedProgram.price_discounted !== selectedProgram.price_real
                  ? `${filterPriceNumber(selectedProgram.price_discounted)} ریال`
                  : `${filterPriceNumber(selectedProgram.price_real)} ریال`}
              </span>
            </div>

            {selectedPackages.map((packageId) => {
              const pkg = selectedProgram.packages.find((p: any) => p._id === packageId);
              return pkg
                ? (
                    <div key={pkg._id} className="flex justify-between py-2 text-gray-600">
                      <span>{pkg.title}</span>
                      <span>
                        {filterPriceNumber(pkg.price)}
                        {' '}
                        ریال
                      </span>
                    </div>
                  )
                : null;
            })}

            <div className="flex justify-between py-4 border-t-2 border-primary/20 text-xl font-bold">
              <span>مجموع کل:</span>
              <span className="bg-primary text-white px-4 py-2 rounded-lg">
                {(() => {
                  const programPrice = selectedProgram.price_discounted || selectedProgram.price_real;
                  const packagesPrice = selectedPackages.reduce((sum, packageId) => {
                    const pkg = selectedProgram.packages.find((p: any) => p._id === packageId);
                    return sum + (pkg?.price || 0);
                  }, 0);
                  return `${filterPriceNumber(programPrice + packagesPrice)} ریال`;
                })()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Button */}
      {selectedProgram && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-primary to-primary/80 text-white px-12 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <CheckCircle className="size-6" />
            <span>تایید نهایی و ادامه خرید</span>
          </button>
        </div>
      )}
    </div>
  );
}
