/* eslint-disable @next/next/no-img-element */
/* eslint-disable curly */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toPersianDigits, truncateDescription } from '@/utils/Helpers';
import Link from 'next/link';

// Helper function to check if a date is today or tomorrow
const isTodayOrTomorrow = (dateString: string) => {
  const sessionDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 2);

  sessionDate.setHours(0, 0, 0, 0);

  return sessionDate >= today && sessionDate < nextDay;
};

// Helper function to format Persian date
const formatPersianDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return new Intl.DateTimeFormat('fa-IR', options).format(date);
};

// Helper function to get time until session
// const getTimeUntilSession = (dateString: string, startTime: string) => {
//   const sessionDate = new Date(dateString);
//   const [hours, minutes] = startTime.split(':').map(Number);
//   sessionDate.setHours(hours, minutes, 0, 0);

//   const now = new Date();
//   const diff = sessionDate.getTime() - now.getTime();

//   if (diff <= 0) return { hours: 0, minutes: 0, isPast: true };

//   const totalMinutes = Math.floor(diff / 1000 / 60);
//   const hoursRemaining = Math.floor(totalMinutes / 60);
//   const minutesRemaining = totalMinutes % 60;

//   return { hours: hoursRemaining, minutes: minutesRemaining, isPast: false };
// };

// Session status badge component
const SessionStatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    scheduled: { label: 'برنامه‌ریزی شده', className: 'bg-blue-100 text-blue-800' },
    ongoing: { label: 'در حال برگزاری', className: 'bg-green-100 text-green-800' },
    completed: { label: 'برگزار شده', className: 'bg-gray-100 text-gray-800' },
    cancelled: { label: 'لغو شده', className: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

// Countdown timer component
// const CountdownTimer = ({ date, startTime }: { date: string; startTime: string }) => {
//   const [timeLeft, setTimeLeft] = useState(getTimeUntilSession(date, startTime));

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(getTimeUntilSession(date, startTime));
//     }, 60000); // Update every minute

//     return () => clearInterval(timer);
//   }, [date, startTime]);

//   if (timeLeft.isPast) {
//     return <span className="text-xs text-gray-500">شروع شده</span>;
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 text-white shadow-md">
//         <span className="text-lg font-bold tabular-nums">
//           {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
//         </span>
//         <span className="text-xs">:</span>
//         <span className="text-lg font-bold tabular-nums">
//           {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
//         </span>
//       </div>
//     </div>
//   );
// };

// Helper function to get time until session (with seconds)
const getTimeUntilSession = (dateString: string, startTime: string) => {
  const sessionDate = new Date(dateString);
  const [hours, minutes] = startTime.split(':').map(Number);
  sessionDate.setHours(hours || 0, minutes || 0, 0, 0);

  const now = new Date();
  const diff = sessionDate.getTime() - now.getTime();

  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, isPast: true };

  const totalSeconds = Math.floor(diff / 1000);
  const hoursRemaining = Math.floor(totalSeconds / 3600);
  const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
  const secondsRemaining = totalSeconds % 60;

  return {
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining,
    isPast: false,
  };
};

// Countdown timer component with seconds
const CountdownTimer = ({ date, startTime }: { date: string; startTime: string }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilSession(date, startTime));

  useEffect(() => {
    // Update every second for real-time countdown
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilSession(date, startTime));
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [date, startTime]);

  if (timeLeft.isPast) {
    return (
      <div className="rounded-lg bg-gray-500 px-3 py-2 text-white shadow-md">
        <span className="text-xs font-semibold">شروع شده</span>
      </div>
    );
  }

  return (
    <div dir="rtl" className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-gray-500">زمان باقی‌مانده</span>
      <div dir="rtl" className="flex min-w-[117px] flex-row-reverse items-center gap-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-2 text-white shadow-md">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold tabular-nums leading-none">
            {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
          </span>
          <span className="text-[8px] opacity-75">ساعت</span>
        </div>

        <span className="text-sm font-bold">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold tabular-nums leading-none">
            {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
          </span>
          <span className="text-[8px] opacity-75">دقیقه</span>
        </div>

        <span className="text-sm font-bold">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold tabular-nums leading-none">
            {toPersianDigits(String(timeLeft.seconds).padStart(2, '0'))}
          </span>
          <span className="text-[8px] opacity-75">ثانیه</span>
        </div>
      </div>
    </div>
  );
};

// Main Program Banner Component
const ProgramBanner = ({ program }: { program: any }) => {
  // Filter sessions for today and tomorrow
  const upcomingSessions = program?.program?.sessions?.filter((session: any) =>
    isTodayOrTomorrow(session.date),
  ) || [];

  // console.log(program, 'upcomingSessions');

  // Get image URL
  const getImageUrl = (fileName: string) => {
    return `${process.env.NEXT_PUBLIC_SERVER_FILES_URL || ''}/${fileName}`;
  };

  const programState = program?.program;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-xl transition-all hover:shadow-2xl">
      {/* Banner Header with Image and Course Info */}
      <Link href={`/dashboard/course-session?program_id=${programState?.id || programState?._id}`}>
        <div className="relative h-40 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 md:h-48">
          {/* Background Image */}
          {programState.course?.tumbnail?.file_name && (
            <div className="absolute inset-0">
              <img
                src={getImageUrl(programState?.course?.tumbnail?.file_name)}
                alt={programState?.course?.title}
                className="size-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          {/* Course Title and Subtitle */}
          <div className="absolute bottom-0 right-0 p-6 text-right text-white">
            <Link href={`/dashboard/course-session?program_id=${programState?.id || programState?._id}`}>
              <h3 className="mb-0.5 text-lg font-bold drop-shadow-lg md:text-xl">
                {programState?.course?.title || 'عنوان دوره'}
              </h3>
            </Link>
            {programState?.course?.sub_title && (
              <p className="text-xs leading-5 text-gray-200 drop-shadow-md md:text-sm">
                {programState?.course?.sub_title && truncateDescription(programState?.course?.sub_title, 200)}
              </p>
            )}

            <div className="mt-3 flex items-center gap-2 text-xs md:text-sm">

              <div className="text-gray-300">استاد دوره :</div>

              <div className="font-semibold">
                {`${programState?.coach?.first_name} ${programState?.coach?.last_name}`} 
              </div>

            </div>
          </div>

          {/* Active Badge */}
          <div className="absolute left-4 top-4">
            <span className="flex items-center gap-2 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              <span className="size-2 animate-pulse rounded-full bg-white"></span>
              فعال
            </span>
          </div>
        </div>

      </Link>

      {/* Sessions Section */}
      {upcomingSessions.length > 0 && (
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="size-1 rounded-full bg-blue-600"></div>
            <h4 className="text-sm font-bold text-purple-800">کلاس‌های امروز و فردا شما</h4>
            <div className="size-1 rounded-full bg-blue-600"></div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingSessions.map((session: any, index: number) => (
              <div
                key={session._id || index}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-400 hover:shadow-lg"
              >
                {/* Decorative gradient */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>

                <div className="space-y-3">
                  {/* Date */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="mb-2 text-xs text-gray-500">تاریخ برگزاری</p>
                      <p className="mt-1 text-sm font-semibold text-purple-800">
                        {formatPersianDate(session.date)}
                      </p>
                    </div>
                  </div>

                  {/* Time Range */}
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                    <svg className="size-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[11px] text-gray-400">از ساعت</span>
                      {` `}
                      <span className="font-semibold text-gray-700">
                        {toPersianDigits(session.startTime)}
                      </span>
                      <span className="text-[11px] text-gray-400">تا ساعت</span>
                      {` `}
                      <span className="font-semibold text-gray-700">
                        {` `}
                        {toPersianDigits(session.endTime)}
                      </span>
                    </div>
                  </div>

                  {/* Status and Countdown */}
                  <div className="flex items-center justify-between">
                    <SessionStatusBadge status={session.status} />
                    <CountdownTimer date={session.date} startTime={session.startTime} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No upcoming sessions message */}
      {upcomingSessions.length === 0 && (
        <div className="p-4 md:p-6">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-xs text-gray-600 md:text-sm">هیچ کلاسی برای امروز یا فردا برنامه‌ریزی نشده است</p>
            <p className="mt-1 text-[8px] leading-6 text-gray-500 md:mt-2 md:text-xs">
              برای اطمینان بیشتر از زمان کلاس ها حتما به صفحه 
              <span className="font-semibold text-purple-800">
                <Link href={`/dashboard/course-session?program_id=${programState?.id || programState?._id}`}>
              &nbsp;کلاس های من&nbsp;
                </Link>
              </span>
              مراجعه کنید
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramBanner;
