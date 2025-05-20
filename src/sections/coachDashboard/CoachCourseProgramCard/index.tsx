/* eslint-disable react/no-array-index-key */
/* eslint-disable react-dom/no-missing-button-type */
import type { CoachCourseProgram } from '@/types/Coach';
import { filterPriceNumber } from '@/utils/Helpers';
import clsx from 'clsx';
import { AlertTriangle, Banknote, BookOpen, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type CoachCourseCardProps = {
  program: CoachCourseProgram;
  enrolled: boolean;
};

const CoachCourseCard: React.FC<CoachCourseCardProps> = ({ program, enrolled }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const router = useRouter();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const startCourseHandler = () => {
    router.push(`/coach-dashboard/course/${program._id}`);
  };


  console.log('kir', enrolled)
  console.log('cos', program._id)
  console.log('---------------------')


  return (
    <div className={`flip-card h-full ${isFlipped ? 'flip-card-active' : ''}`}>
      <div className="flip-card-inner h-full">
        {/* Front Side */}
        <div className="flip-card-front flex flex-col bg-white p-6">
          <div className="grow">
            <h2 className="mb-3 text-xl font-bold text-gray-800">{program.title}</h2>
            <p className="mb-4 line-clamp-3 text-gray-600">{program.description}</p>

            {/* Course Metadata */}
            <div className="mb-6 mt-8 flex flex-col gap-4">
              {/* Price */}
              <div className="flex items-center gap-3 text-gray-700">
                <Banknote className="size-5 text-green-600" />
                <div>
                  <span className="text-sm text-gray-500">قیمت دوره:</span>
                  <span className="mr-1 font-medium text-blue-900">
                    {filterPriceNumber(program.amount)}
                    {' '}
                    تومان
                  </span>
                </div>
              </div>

              {/* Subjects Count */}
              <div className="flex items-center gap-3 text-gray-700">
                <BookOpen className="size-5 text-green-600" />
                <div>
                  <span className="text-sm text-gray-500">تعداد فصل:</span>
                  <span className="mr-2 font-medium text-blue-900">
                    {program.course_subject_count || 0}
                  </span>
                </div>
              </div>

              {/* Course Duration */}
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="size-5 text-green-600" />
                <div>
                  <span className="text-sm text-gray-500"> زمان دوره:</span>
                  <span className="mr-2 font-medium text-blue-900">
                    10  ساعت
                  </span>
                </div>
              </div>

              {/* Penalty Info */}
              {program.is_have_penalty && (
                <div className="flex items-center gap-3 text-gray-700">
                  <AlertTriangle className="size-5 text-green-600" />
                  <div>
                    <span className="text-sm text-gray-500">جریمه تاخیر:</span>
                    <span className="mr-2 font-medium text-blue-900">
                      {filterPriceNumber(program.penalty_fee)}
                      {' '}
                      تومان
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={handleFlip}
              className="mt-auto flex w-full justify-between rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-700 hover:text-white"
            >
              مشاهده سرفصل‌ها
              <svg className="ml-2 size-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
            <button
              onClick={startCourseHandler}
              className={clsx(
                'mt-auto w-full rounded-md px-4 py-2 text-white transition-colors',
                {
                  'bg-green-900 hover:bg-green-700': enrolled, // If 'enrolled' is true, add 'bg-green-900' class
                  'bg-blue-800 hover:bg-blue-600': !enrolled, // If 'enrolled' is false, add 'bg-blue-800' class
                },
              )}
            >
              {enrolled ? 'مشاهده دوره' : 'شروع دوره'}

            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back flex flex-col bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">سرفصل های دوره</h3>
            <button
              onClick={handleFlip}
              className="p-2 text-gray-500 transition-colors hover:text-gray-700"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grow overflow-y-auto py-4">
            {program.course_object_titles.map((item: string, index: any) => (
              <div
                key={index}
                className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer with back button */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-gray-600">قیمت دوره:</span>
              <span className="font-medium">
                {formatPrice(program.amount)}
                {' '}
                تومان
              </span>
            </div>

            <button
              type="button"
              onClick={handleFlip}
              className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
            >
              بازگشت به اطلاعات دوره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachCourseCard;
