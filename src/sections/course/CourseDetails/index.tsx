/* eslint-disable react-dom/no-dangerously-set-innerhtml */
'use client';
import he from 'he';
import { IndentIncrease, Newspaper } from 'lucide-react';
import React from 'react';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

export default function CourseDetails({ courseDescriptionLong, courseDescriptionShort }: { courseDescriptionLong: string; courseDescriptionShort: string }) {
  const decodedHtml = he.decode(courseDescriptionLong || '');

  const isMobileScreen = useResponsiveEvent(768, 200);

  return (
    <>
      <div className="flex flex-col gap-4 text-black">
        {courseDescriptionShort && (
          <div>
            <h3 className="flex items-center justify-end gap-2 text-right text-base font-bold md:text-lg">
              توضیحات دوره
              <IndentIncrease size={isMobileScreen ? 18 : 23} />
            </h3>
            <p dir="rtl" style={{ whiteSpace: 'pre-wrap', lineBreak: 'anywhere' }} className="mt-3 text-right text-xs leading-8 md:text-sm">
              {courseDescriptionShort}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {courseDescriptionLong && (
          <div className="mt-8">
            <h3 className="flex items-center justify-end gap-2 text-right text-base font-bold text-black md:text-lg">
              توضیحات بیشتر
              <Newspaper size={isMobileScreen ? 18 : 23} />
            </h3>
            {/* <p style={{ whiteSpace: 'pre-line' }} className="text-right text-sm leading-8">
              {courseDescriptionLong}
            </p> */}
            <div
              dir="rtl"
              dangerouslySetInnerHTML={{ __html: decodedHtml || '' }}
              className="mt-3 text-right text-xs leading-8 text-gray-700 md:text-sm"
            />
          </div>
        )}
      </div>
    </>
  );
}
