/* eslint-disable react-dom/no-dangerously-set-innerhtml */
'use client';
import he from 'he';
import { IndentIncrease, Newspaper } from 'lucide-react';
import React from 'react';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

export default function CourseDetails({ courseDescriptionLong, courseDescriptionShort }: { courseDescriptionLong: string; courseDescriptionShort: string }) {
  const decodedHtml = he.decode(courseDescriptionLong || '');

  console.log('raw', JSON.stringify(courseDescriptionLong, null, 2));
  console.log('decoded', decodedHtml);

  const isMobileScreen = useResponsiveEvent(768, 200);

  return (
    <>
      <div className="flex flex-col gap-4 text-black">
        {courseDescriptionShort && (
          <div>
            <h3 className="mr-3 flex items-center justify-end text-right text-lg font-bold text-purple-900 md:text-xl ">
              توضیحات دوره
              <IndentIncrease className="ml-3 text-purple-600" size={28} />
            </h3>
            <p
              dir="rtl"
              style={{ whiteSpace: 'pre-wrap', lineBreak: 'auto', backgroundColor: 'floralwhite' }}
              className="mt-3 rounded-lg px-6 py-4 text-right text-xs leading-6 md:text-sm md:leading-6"
            >
              {courseDescriptionShort}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {courseDescriptionLong && (
          <div className="mt-12">
            <h3 className="mr-3 flex items-center justify-end text-right text-lg font-semibold text-purple-900 md:text-xl">
              توضیحات بیشتر
              <Newspaper className="ml-3 text-purple-600" size={28} />
            </h3>
            {/* <p style={{ whiteSpace: 'pre-line' }} className="text-right text-sm leading-8">
              {courseDescriptionLong}
            </p> */}
            <div
              dir="rtl"
              style={{ whiteSpace: 'pre-wrap', lineBreak: 'auto', backgroundColor: 'floralwhite' }}
              dangerouslySetInnerHTML={{ __html: decodedHtml || '' }}
              className="richtext-view mt-3 max-w-none rounded-lg px-6 pb-6 pt-2 text-right text-xs leading-6 text-gray-700 md:text-sm"
            />
          </div>
        )}
      </div>
    </>
  );
}
