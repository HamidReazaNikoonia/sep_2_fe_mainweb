/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import parse from 'html-react-parser';
import React from 'react';

export default function CourseDetails({ courseDescriptionLong, courseDescriptionShort }: { courseDescriptionLong: string; courseDescriptionShort: string }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {courseDescriptionShort && (
          <div>
            <h3 className="text-right  text-lg font-bold">
              توضیحات دوره
            </h3>
            <p style={{ whiteSpace: 'pre-line' }} className="text-right text-sm leading-8">
              {courseDescriptionShort}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {courseDescriptionLong && (
          <div className="mt-8">
            <h3 className="text-right  text-lg font-bold">
              توضیحات بیشتر
            </h3>
            {/* <p style={{ whiteSpace: 'pre-line' }} className="text-right text-sm leading-8">
              {courseDescriptionLong}
            </p> */}
            <div
              dangerouslySetInnerHTML={{ __html: courseDescriptionLong }}
              style={{ whiteSpace: 'pre-wrap', lineBreak: 'anywhere' }}
              className="mt-4 text-right text-sm leading-8"
            />
          </div>
        )}
      </div>
    </>
  );
}
