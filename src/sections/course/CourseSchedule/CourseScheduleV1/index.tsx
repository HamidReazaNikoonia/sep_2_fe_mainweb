/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
'use client';

import { getCourseSessionPrograms } from '@/API/course';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuth from '@/hooks/useAuth';
import { filterPriceNumber, toPersianDigits } from '@/utils/Helpers';
import { useQuery } from '@tanstack/react-query';
import { 
  Calendar, 
  Check, 
  Clock, 
  FileText, 
  Play, 
  Users, 
  Star,
  MapPin,
  Award,
  CheckCircle2,
  Package
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

// Types
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

// Components
const SessionCard = ({ session }: { session: Session }) => (
  <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm transition-all hover:shadow-lg hover:scale-105">
    <div className="absolute -right-2 -top-2 size-16 rounded-full bg-primary/10"></div>
    <div className="relative space-y-3">
      <div className="flex items-center justify-between">
        <Badge 
          variant={session.status === 'scheduled' ? 'default' : 'secondary'}
          className="text-xs"
        >
          {session.status === 'scheduled' ? 'برنامه‌ریزی شده' : 'برگذار شده'}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="ml-2 size-4 text-primary" />
          {toPersianDigits(session.date)}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="ml-2 size-4 text-primary" />
          {`${toPersianDigits(session.startTime)} - ${toPersianDigits(session.endTime)}`}
        </div>
        {session.location && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="ml-2 size-4 text-primary" />
            {session.location}
          </div>
        )}
      </div>
    </div>
  </div>
);

const MediaGallery = ({ media }: { media: any[] }) => (
  <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
    {media.map((item, index) => (
      <div key={item._id || index} className="group relative aspect-square overflow-hidden rounded-lg">
        {item.media_type === 'IMAGE' ? (
          <img
            src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`}
            alt={item.media_title}
            className="size-full object-cover transition-transform group-hover:scale-110"
          />
        ) : item.media_type === 'VIDEO' ? (
          <div className="relative size-full bg-gray-100">
            <video className="size-full object-cover" preload="none">
              <source src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Play className="size-8 text-white" />
            </div>
          </div>
        ) : null}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <p className="text-xs text-white truncate">{item.media_title}</p>
        </div>
      </div>
    ))}
  </div>
);

const SubjectsList = ({ subjects }: { subjects: any[] }) => (
  <div className="space-y-3 p-4">
    {subjects.map((subject, index) => (
      <div key={subject._id || index} className="flex items-start space-x-3 rounded-lg border-l-4 border-primary bg-gray-50 p-3">
        <Award className="ml-3 mt-1 size-5 shrink-0 text-primary" />
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{subject.title}</h4>
          <p className="mt-1 text-sm text-gray-600">{subject.sub_title}</p>
        </div>
      </div>
    ))}
  </div>
);

const ProgramCard = ({ 
  program, 
  isSelected, 
  onSelect 
}: { 
  program: Program; 
  isSelected: boolean; 
  onSelect: () => void; 
}) => {
  const hasDiscount = program.price_discounted && program.price_discounted !== program.price_real;
  
  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'ring-4 ring-primary/20 border-primary shadow-xl scale-[1.02]' 
          : 'hover:shadow-lg hover:scale-[1.01] border-gray-200'
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-primary p-2 text-white shadow-lg">
          <CheckCircle2 className="size-5" />
        </div>
      )}
      
      <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-primary/10 to-transparent"></div>
      
      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            {program.coach.avatar ? (
              <img
                src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${program.coach.avatar.file_name}`}
                alt={`${program.coach.first_name} ${program.coach.last_name}`}
                className="size-16 rounded-full border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="flex size-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary to-primary/70 text-white font-bold shadow-lg">
                {program.coach.first_name.charAt(0)}
              </div>
            )}
            <div>
              <CardDescription className="text-xs text-gray-500">استاد دوره</CardDescription>
              <CardTitle className="text-lg">{`${program.coach.first_name} ${program.coach.last_name}`}</CardTitle>
              <div className="flex items-center mt-1">
                <Star className="size-4 text-yellow-400 fill-current" />
                <Star className="size-4 text-yellow-400 fill-current" />
                <Star className="size-4 text-yellow-400 fill-current" />
                <Star className="size-4 text-yellow-400 fill-current" />
                <Star className="size-4 text-gray-300" />
                <span className="mr-2 text-xs text-gray-500">(۴.۲)</span>
              </div>
            </div>
          </div>
          
          <div className="text-left">
            <Badge 
              variant={program.program_type === 'ON-SITE' ? 'default' : 'secondary'}
              className="mb-2"
            >
              {program.program_type === 'ON-SITE' ? '🏢 حضوری' : '💻 آنلاین'}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Users className="ml-1 size-3" />
              {`${program.max_member_accept} نفر`}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="sessions" className="text-xs">جلسات</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">نمونه‌کارها</TabsTrigger>
            <TabsTrigger value="subjects" className="text-xs">سرفصل‌ها</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sessions" className="mt-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {program.sessions.map(session => (
                <SessionCard key={session._id} session={session} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-4">
            {program.sample_media?.length > 0 ? (
              <MediaGallery media={program.sample_media} />
            ) : (
              <div className="py-8 text-center text-gray-500">
                <Package className="mx-auto size-12 text-gray-300" />
                <p className="mt-2">نمونه کاری موجود نیست</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="subjects" className="mt-4">
            {program.subjects?.length > 0 ? (
              <SubjectsList subjects={program.subjects} />
            ) : (
              <div className="py-8 text-center text-gray-500">
                <FileText className="mx-auto size-12 text-gray-300" />
                <p className="mt-2">سرفصل موجود نیست</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-gray-600">
            شروع: {program.sessions[0]?.date || 'نامشخص'}
          </div>
          <div className="text-left">
            {hasDiscount ? (
              <div className="space-y-1">
                <div className="text-sm text-gray-500 line-through">
                  {filterPriceNumber(program.price_real)} تومان
                </div>
                <div className="text-lg font-bold text-primary">
                  {filterPriceNumber(program.price_discounted)} تومان
                </div>
              </div>
            ) : (
              <div className="text-lg font-bold text-primary">
                {filterPriceNumber(program.price_real)} تومان
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Main Component
export default function ModernCardLayout({
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

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        خطا در دریافت اطلاعات: {(error as Error).message}
      </div>
    );
  }

  const programsData = programs?.data?.programs || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8" dir="rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          اساتید این دوره
        </h1>
        <p className="text-xl text-gray-600">
          بهترین مربیان را برای یادگیری انتخاب کنید
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-1 mb-12">
        {programsData.map((program: Program) => (
          <ProgramCard
            key={program._id}
            program={program}
            isSelected={selectedProgram?._id === program._id}
            onSelect={() => handleProgramSelect(program)}
          />
        ))}
      </div>

      {/* Packages Section */}
      {selectedProgram?.packages?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-6">پکیج‌های اضافی</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProgram.packages.map((pkg: any) => (
              <div
                key={pkg._id}
                className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all cursor-pointer ${
                  selectedPackages.includes(pkg._id)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => handlePackageSelect(pkg._id)}
              >
                {selectedPackages.includes(pkg._id) && (
                  <CheckCircle2 className="absolute left-3 top-3 size-6 text-primary" />
                )}
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  {pkg.image ? (
                    <img
                      src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${pkg.image.file_name}`}
                      alt={pkg.title}
                      className="size-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-lg bg-gray-200">
                      <Package className="size-6 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{pkg.title}</h4>
                    <p className="text-lg font-bold text-primary">
                      {filterPriceNumber(pkg.price)} ریال
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice */}
      {selectedProgram && (
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300 p-6 mb-8">
          <h3 className="text-xl font-bold text-center mb-6">صورت‌حساب</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>شهریه دوره:</span>
              <span className="font-medium">
                {selectedProgram.price_discounted && selectedProgram.price_discounted !== selectedProgram.price_real
                  ? `${filterPriceNumber(selectedProgram.price_discounted)} ریال`
                  : `${filterPriceNumber(selectedProgram.price_real)} ریال`}
              </span>
            </div>
            
            {selectedPackages.length > 0 && (
              <div className="border-b pb-2">
                <div className="font-medium mb-2">پکیج‌های انتخاب شده:</div>
                {selectedPackages.map(packageId => {
                  const pkg = selectedProgram.packages.find((p: any) => p._id === packageId);
                  return pkg ? (
                    <div key={pkg._id} className="flex justify-between text-sm ml-4">
                      <span>{pkg.title}</span>
                      <span>{filterPriceNumber(pkg.price)} ریال</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="flex justify-between text-xl font-bold">
              <span>مجموع:</span>
              <span className="bg-primary text-white px-4 py-2 rounded-lg">
                {(() => {
                  const programPrice = selectedProgram.price_discounted !== selectedProgram.price_real
                    ? selectedProgram.price_discounted
                    : selectedProgram.price_real;
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

      {/* Submit Button */}
      {selectedProgram && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary to-primary/80 text-white px-12 py-4 rounded-xl text-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
          >
            ادامه فرآیند خرید
          </button>
        </div>
      )}
    </div>
  );
}