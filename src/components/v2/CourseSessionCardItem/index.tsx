/* eslint-disable @next/next/no-img-element */
import { Banknote, BookCheck, Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

type CourseSessionCardItemProps = {
  courseSessionData: { _id: any; title: any; sub_title: any; tumbnail: any; active_program: any; price?: 295000 | undefined; originalPrice?: 520000 | undefined; isPopular?: false | undefined; };
  title?: string;
  sub_title?: string;
  websiteUrl?: string;
  duration?: string;
  price?: number;
  originalPrice?: number;
  courseType?: string;
  linkHref?: string;
  isPopular?: boolean;
};

const CourseSessionCardItem: React.FC<CourseSessionCardItemProps> = (props) => {
  const {
    _id: id,
    title,
    sub_title,
    tumbnail,
    active_program,
    isPopular = false,
  } = props.courseSessionData;

  const isMobileScreen = useResponsiveEvent(768, 200);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  const SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';
  const image = tumbnail?.file_name ? `${SERVER_FILES_URL}/${tumbnail?.file_name}` : '/assets/images/product_placeholder.png';
  const coaches = active_program ? active_program.map((program: any) => program.coach) : [];
  // const courseType = active_program ? active_program[0]?.course_type : '';

  // if `active_program` Array include `program.program_type === 'ON-SITE'`
  const isOnSite = active_program?.some((program: any) => program.program_type === 'ON-SITE');
  const isOnline = active_program?.some((program: any) => program.program_type === 'ONLINE');

  const lowestPrice = active_program && active_program?.filter((item: { program_price: number }) => item.program_price > 0)
    .length > 0
    ? Math.min(...active_program
        .filter((item: { program_price: number }) => item.program_price > 0)
        .map((item: { program_price: any }) => item.program_price))
    : null;

  return (
    <Link href={`/course-session/${id}`}>
      <div style={{ height: isMobileScreen ? '430px' : '470px' }} dir="rtl" className=" flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-95 hover:shadow-xl">
        {/* Purple Gradient Header */}
        <div style={{ backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="relative h-56 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4 md:h-96">
          {/* Decorative elements */}
          {/* <div className="absolute left-4 top-2">
            <div className="size-2 rounded-full bg-white/30">a</div>
          </div>
          <div className="absolute right-8 top-4">
            <div className="size-1 rounded-full bg-white/40">b</div>
          </div>
          <div className="absolute bottom-6 left-6">
            <div className="size-1.5 rounded-full bg-white/25">c</div>
          </div> */}

          {/* Orange Circle with Laptop Icon */}
          {coaches.length > 0 && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-9">
              <div className="flex">
                {coaches.map((coach: any) => (
                  <div key={coach?._id} className="mx-1 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg md:size-16">
                    <img
                      alt={coach?._id}
                      src={coach?.avatar ? `${SERVER_FILES_URL}/${coach?.avatar}` : 'https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png'}
                      className="rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Website URL */}
        {coaches.length > 0 && (
          <p className="z-20 mb-0 mt-6 bg-green-100 py-2 text-center text-xs text-black opacity-80">
            {coaches.length}
            {' '}
            مدرس در حال برگذاری
          </p>
        )}

        {/* Content Section */}
        <div className="flex h-full flex-col justify-between px-6 pb-6 pt-2">
          {/* Top Section */}
          <div>
            {/* Course Type */}
            <div className="mb-2 text-center">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {(isOnSite && isOnline) ? ' حضوری / آنلاین' : isOnSite ? 'حضوری' : isOnline ? 'آنلاین' : ''}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-2 text-center text-lg font-bold leading-tight text-gray-900">
              {title}
            </h2>

            {/* English Subtitle */}
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
              {sub_title}
            </p>
          </div>

          <div>
            {/* Course Info */}
            {active_program?.length > 0
              ? (
                  <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-1">
                      <Banknote className="size-5 text-gray-400" />
                      <span className="text-xs text-gray-600">شروع قیمت ها از</span>
                    </div>
                    <div className="text-left">
                      {lowestPrice && (
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-gray-900">{Number.isFinite(lowestPrice) && formatPrice(lowestPrice)}</span>
                          <span className="text-xs text-gray-500">تومان</span>
                        </div>
                      )}

                    </div>
                  </div>
                )
              : (
                  <div className="mb-8 text-center text-xs text-gray-500">
                    برای این دوره کلاس فعال وجود ندارد
                  </div>
                )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-pink-500 text-xs text-pink-500 hover:bg-pink-50"
              >
                <Phone className="ml-0 size-4" />
                مشاوره
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-xs hover:from-pink-600 hover:to-purple-700"
              >
                ثبت نام
              </Button>
            </div>
          </div>

          {/* Popular Badge */}
          {isPopular && (
            <div className="absolute right-4 top-4">
              <div className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-1">
                <BookCheck className="size-3 text-white" />
                <span className="text-xs font-medium text-white">محبوب</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseSessionCardItem;
