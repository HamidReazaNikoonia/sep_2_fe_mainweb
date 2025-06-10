import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookCheck, Presentation, Star, Videotape } from 'lucide-react';
import avatarImage from '@/public/assets/images/avatar.png';
import product_placeholder from '@/public/assets/images/s4.jpg';
import { filterPriceNumber } from '@/utils/Helpers';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

type CourseSessionCardProps = {
  data: {
    id: string;
    title: string;
    sub_title: string;
    tumbnail?: {
      file_name: string;
    };
    course_session_category: {
      id: string;
      name: string;
      level: number;
      parent: string | null;
      isActive: boolean;
      path?: string;
    }[];
    coaches: {
      id: string;
      first_name: string;
      last_name: string;
      avatar?: {
        file_name: string;
      };
    }[];
    course_status: boolean;
    description?: string;
  };
};

const CourseSessionCard: React.FC<CourseSessionCardProps> = ({ data }) => {
  const {
    id,
    title,
    sub_title,
    tumbnail,
    course_session_category,
    coaches,
    course_status,
  } = data;

  // Get the first coach if available
  const coach = coaches && coaches.length > 0 ? coaches[0] : null;
  // Get the first category if available
  const category = course_session_category && course_session_category.length > 0 
    ? course_session_category[0] 
    : null;

  return (
    <Link href={id ? `/course-session/${id}` : '/course-session'}>
      <div dir="rtl" className="relative flex min-h-[450px] flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg hover:opacity-70">
        {/* Banner */}
        <div className="relative w-full">
          <Image
            src={tumbnail?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${tumbnail.file_name}` : product_placeholder}
            alt="Course Session Banner"
            quality={100}
            width={300}
            height={200}
            style={{
              width: '100%',
              height: 'auto',
            }}
            className="rounded-lg"
          />

          <div className="absolute bottom-2 left-4 z-10 mb-2 mt-2.5 flex items-center justify-end">
            {/* Rating could be added here if needed */}
          </div>
        </div>

        {/* Content */}
        <div className="flex grow flex-col p-4">
          <div className="flex size-full h-full flex-col justify-between">
            {/* Top Side */}
            <div>
              <div className="flex justify-between">
                <h2 className="text-sm font-bold text-gray-900 md:text-lg">{title}</h2>
                <div className="yellow-gradient-bg flex items-center gap-2 rounded-2xl px-4 py-1.5 md:px-5">
                  <h2 className="text-xs font-semibold text-gray-900 md:text-sm">
                    {course_status ? 'فعال' : 'غیرفعال'}
                  </h2>
                  <Presentation color="black" />
                </div>
              </div>
              <p className="mt-0 text-xs text-gray-500">{category?.name}</p>
              <p className="mt-2 text-xs leading-6 text-gray-600">{sub_title}</p>
            </div>

            {/* Bottom Side */}
            <div className="flex w-full items-center justify-between">
              {/* Coach */}
              <div className="mt-6 flex items-center gap-2">
                <Image
                  src={coach?.avatar?.file_name 
                    ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${coach.avatar.file_name}`
                    : avatarImage}
                  alt="coach"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-xs font-medium text-gray-800 md:text-sm">
                  {coach ? `${coach.first_name} ${coach.last_name}` : 'بدون مربی'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseSessionCard;