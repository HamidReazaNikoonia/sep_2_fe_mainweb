/* eslint-disable tailwindcss/no-custom-classname */
import { truncateDescription } from '@/utils/Helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function TeacherInfoSection({ coach }: { coach: any }) {
  return (
    <>
      <div className="test-gradient-bg mt-4 flex w-full flex-col rounded-lg px-8 py-5">
        <div style={{ marginBottom: '-18px' }} className="pink-gradient-bg relative mx-auto flex w-40 justify-center rounded-md py-2 text-center text-sm text-white">
          درباره این مدرس
        </div>
        <div className="flex w-full items-center justify-end border-t border-cyan-300 pt-10">

          {/* Profile */}

          {/* Avatar */}
          <Link href={`/coach/${coach.id}`}>
            <div className="flex items-center text-right">
              <div className="mr-3 flex flex-col">
                <h6 className="text-sm font-medium text-gray-200">
                  {coach.first_name}
                  {' '}
                  {coach.last_name}
                </h6>
                <div className="mt-1 cursor-pointer text-[11px] text-gray-300">
                  نمایش پروفایل
                </div>
                {/* <p className="text-xs text-gray-300 mt-1">هنر جوی این دوره</p> */}
              </div>
              {coach.avatar.file_name && (
                <Image className="size-16 rounded-full object-cover" src={`${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${coach.avatar.file_name}`} width={64} height={64} alt="user avatar" loading="lazy" />
              )}
            </div>

          </Link>

        </div>

        {coach.description && (
          <div className="mt-4 text-right text-xs leading-7">
            {coach.description && truncateDescription(coach.description, 400) }
          </div>
        )}

        <div className="mt-4">
          {/* <TeacherCourseSwiper /> */}
        </div>
      </div>
    </>
  );
}
