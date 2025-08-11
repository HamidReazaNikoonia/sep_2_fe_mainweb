/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
'use client';

import { getCourseSessionPrograms } from '@/API/course';
import { Badge } from '@/components/ui/badge';
import useAuth from '@/hooks/useAuth';
import { filterPriceNumber, toPersianDigits } from '@/utils/Helpers';
import { useQuery } from '@tanstack/react-query';
import { 
  Calendar, 
  Clock, 
  Play, 
  Users,
  MapPin,
  ArrowLeft,
  Check
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

// Types (same as before)
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

// Minimal Components
const SessionRow = ({ session }: { session: Session }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-6 space-x-reverse">
      <div className="w-2 h-2 rounded-full bg-primary"></div>
      <div className="text-sm text-gray-600">
        {toPersianDigits(session.date)}
      </div>
      <div className="text-sm text-gray-500">
        {`${toPersianDigits(session.startTime)} - ${toPersianDigits(session.endTime)}`}
      </div>
    </div>
    <Badge variant="outline" className="text-xs">
      {session.status === 'scheduled' ? 'برنامه‌ریزی شده' : 'برگذار شده'}
    </Badge>
  </div>
);

const MediaGrid = ({ media }: { media: any[] }) => (
  <div className="grid grid-cols-4 gap-2">
    {media.slice(0, 4).map((item, index) => (
      <div key={item._id || index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        {item.media_type === 'IMAGE' ? (
          <img
            src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`}
            alt={item.media_title}
            className="w-full h-full object-cover"
          />
        ) : item.media_type === 'VIDEO' ? (
          <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-400" />
          </div>
        ) : null}
      </div>
    ))}
  </div>
);

const ProgramRow = ({ 
  program, 
  isSelected, 
  onSelect,
  onViewDetails
}: { 
  program: Program; 
  isSelected: boolean; 
  onSelect: () => void;
  onViewDetails: () => void;
}) => {
  const hasDiscount = program.price_discounted && program.price_discounted !== program.price_real;
  
  return (
    <div 
      className={`relative p-6 rounded-lg border transition-all ${
        isSelected 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {isSelected && (
        <div className="absolute left-4 top-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          {program.coach.avatar ? (
            <img
              src={`${NEXT_PUBLIC_SERVER_FILES_URL}/${program.coach.avatar.file_name}`}
              alt={`${program.coach.first_name} ${program.coach.last_name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              {program.coach.first_name.charAt(0)}
            </div>
          )}
          
          <div>
            <h3 className="font-medium text-gray-900">
              {`${program.coach.first_name} ${program.coach.last_name}`}
            </h3>
            <div className="flex items-center space-x-4 space-x-reverse mt-1">
              <Badge variant="outline" className="text-xs">
                {program.program_type === 'ON-SITE' ? 'حضوری' : 'آنلاین'}
              </Badge>
              <span className="text-xs text-gray-500">
                {program.max_member_accept} نفر
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-left">
          {hasDiscount ? (
            <div>
              <div className="text-sm text-gray-400 line-through">
                {filterPriceNumber(program.price_real)}
              </div>
              <div className="font-bold text-primary">
                {filterPriceNumber(program.price_discounted)} تومان
              </div>
            </div>
          ) : (
            <div className="font-bold text-primary">
              {filterPriceNumber(program.price_real)} تومان
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">جلسات دوره</h4>
          <div className="space-y-1">
            {program.sessions.slice(0, 2).map(session => (
              <SessionRow key={session._id} session={session} />
            ))}
            {program.sessions.length > 2 && (
              <div className="text-xs text-gray-500 pt-2">
                و {program.sessions.length - 2} جلسه دیگر...
              </div>
            )}
          </div>
        </div>
        
        {program.sample_media?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">نمونه‌کارها</h4>
            <MediaGrid media={program.sample_media} />
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={onViewDetails}
          className="text-sm text-primary hover:text-primary/80 flex items-center"
        >
          مشاهده جزئیات
          <ArrowLeft className="w-4 h-4 mr-1" />
        </button>
        
        <button
          onClick={onSelect}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'انتخاب شده' : 'انتخاب'}
        </button>
      </div>
    </div>
  );
};

// Main Component
export default function MinimalCleanLayout({
  courseId,
  onProgramSelect,
}: {
  courseId: string;
  onProgramSelect?: (program: Program) => void;
}) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null);
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
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  const programsData = programs?.data?.programs || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          انتخاب استاد
        </h1>
        <p className="text-gray-600">
          از بین اساتید زیر یکی را انتخاب کنید
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {programsData.map((program: Program) => (
          <ProgramRow
            key={program._id}
            program={program}
            isSelected={selectedProgram?._id === program._id}
            onSelect={() => handleProgramSelect(program)}
            onViewDetails={() => setShowDetails(
              showDetails === program._id ? null : program._id
            )}
          />
        ))}
      </div>

      {/* Simple Packages */}
      {selectedProgram?.packages?.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-medium mb-4">پکیج‌های اضافی</h3>
          <div className="space-y-3">
            {selectedProgram.packages.map((pkg: any) => (
              <label key={pkg._id} className="flex items-center justify-between p-3 bg-white rounded border cursor-pointer hover:border-primary">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={selectedPackages.includes(pkg._id)}
                    onChange={() => {
                      setSelectedPackages(prev => 
                        prev.includes(pkg._id) 
                          ? prev.filter(id => id !== pkg._id)
                          : [...prev, pkg._id]
                      );
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{pkg.title}</span>
                </div>
                <span className="text-sm font-medium">
                  {filterPriceNumber(pkg.price)} ریال
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Simple Invoice */}
      {selectedProgram && (
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="font-medium mb-4">خلاصه سفارش</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>شهریه دوره:</span>
              <span>{filterPriceNumber(selectedProgram.price_discounted || selectedProgram.price_real)} ریال</span>
            </div>
            {selectedPackages.map(packageId => {
              const pkg = selectedProgram.packages.find((p: any) => p._id === packageId);
              return pkg ? (
                <div key={pkg._id} className="flex justify-between text-gray-600">
                  <span>{pkg.title}</span>
                  <span>{filterPriceNumber(pkg.price)} ریال</span>
                </div>
              ) : null;
            })}
            <div className="border-t pt-2 font-medium flex justify-between">
              <span>مجموع:</span>
              <span>
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

      {selectedProgram && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            ادامه خرید
          </button>
        </div>
      )}
    </div>
  );
}