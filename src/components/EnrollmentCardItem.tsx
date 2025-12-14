/* eslint-disable style/multiline-ternary */
import { Ban, CalendarCheck, CheckCheck, Clock, FolderPlus, MapPin, School, User, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toPersianDigits } from '@/utils/Helpers';

type EnrollmentCardItemProps = {
  id: string;
  enrollment: any;
  formatDate: (date: string) => string;
  formatTime: (time: string) => string;
  getStatusColor: (status: string) => string;
  getSessionStatusColor: (status: string) => string;
  getUserAttendanceStatus: (session: any) => string | null;
  getAttendanceStatusColor: (status: string | null) => string;
  getAttendanceStatusLabel: (status: string | null) => string;
  handleViewReport: (report: any) => void;
};

export default function EnrollmentCardItem({
  id,
  enrollment,
  formatDate,
  formatTime,
  getStatusColor,
  getSessionStatusColor,
  getUserAttendanceStatus,
  getAttendanceStatusColor,
  getAttendanceStatusLabel,
  handleViewReport,
}: EnrollmentCardItemProps) {
  // Sort sessions by date before rendering
  const sortedSessions = enrollment?.sessions?.length > 0
    ? [...enrollment.sessions].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
    : [];

  // Get background color based on session status
  const getSessionBgColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-50 border-yellow-200';
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'cancelled':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card id={`enrollment-${id}`} className="w-full rounded-lg">
      {/* Header Section */}
      <div className="test-gradient-bg rounded-t-lg border-b bg-gray-50 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="mb-4">
              {!enrollment?.is_completed ? (
                <div className="flex items-center gap-2">
                  <span className="relative flex size-3">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                  </span>
                  <span className="animate-fade-in-slow text-xs font-semibold text-white transition-colors md:text-sm">
                    در حال برگذاری
                  </span>
                </div>
              ) : (
                <h2 className="text-xs font-normal text-white md:text-sm">تکمیل شده</h2>
              )}
            </div>
            <div className="flex flex-wrap justify-end gap-1.5">
              <Badge
                variant="outline"
                className={`text-xs text-white ${enrollment?.program_type === 'ONLINE' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}
              >
                {enrollment?.program_type === 'ONLINE' ? 'آنلاین' : 'حضوری'}
              </Badge>
              <Badge className={`text-xs text-white ${getStatusColor(enrollment?.status)}`}>
                {enrollment?.status === 'active'
                  ? 'فعال'
                  : enrollment?.status === 'completed' ? 'تکمیل شده' : 'غیرفعال'}
              </Badge>
            </div>
          </div>

          <div className="text-right">
            <h3 className="mb-0 text-base font-bold text-white">
              <Link href={`/course-session/${enrollment?.course?.id}`}>
                {enrollment?.course?.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-300">
              {enrollment?.course?.sub_title?.length > 40 ? `${enrollment?.course?.sub_title?.substring(0, 40)}...` : enrollment?.course?.sub_title}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="space-y-4 p-4">
        {/* Coach Information */}
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {enrollment?.coach?.avatar?.file_name
              ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${enrollment.coach.avatar.file_name}`}
                    alt={`${enrollment?.coach?.first_name} ${enrollment?.coach?.last_name || ''}`}
                    className="size-full rounded-full border border-purple-500 object-cover shadow-lg"
                    width={86}
                    height={86}
                  />
                )
              : (
                  <span className="text-xl text-gray-500">
                    {enrollment?.coach?.first_name?.[0] || ''}
                    {enrollment?.coach?.last_name?.[0] || ''}
                  </span>
                )}
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm font-medium">
              {enrollment?.coach?.first_name}
              {' '}
              {enrollment?.coach?.last_name || ''}
            </p>
            <p className="flex items-center gap-1 text-xs text-gray-600">
              <User className="size-3" />
              مربی دوره
            </p>
          </div>
        </div>

        {/* Class Information */}
        {enrollment?.class_id?.class_title && (
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2.5 text-sm text-gray-600">
            <School className="size-5 shrink-0 text-purple-600" />
            <span className="text-right text-xs">
              کلاس:
              {' '}
              {enrollment?.class_id?.class_title}
            </span>
          </div>
        )}

        {/* Sessions Accordion */}
        <div className="space-y-2">
          <h4 className="border-b pb-2 text-sm font-semibold text-purple-800">
            جلسات دوره (
            {sortedSessions.length && toPersianDigits(sortedSessions.length)}
            )
          </h4>

          {sortedSessions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-2">
              {sortedSessions.map((session: any, index: number) => (
                <AccordionItem
                  key={session._id}
                  value={`session-${session._id}`}
                  className={`rounded-lg border ${getSessionBgColor(session.status)} overflow-hidden`}
                >
                  <AccordionTrigger className="px-3 py-2 hover:bg-white/50 hover:no-underline">
                    <div className="flex w-full items-center justify-between gap-2 pr-2">
                      <div className="flex items-center gap-2 text-right">
                        <span className="text-xs font-medium text-gray-500">
                          جلسه
                          {' '}
                          {toPersianDigits(index + 1)}
                        </span>
                        <span className="text-xs text-gray-800">
                          {formatDate(session.date)}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`ml-3 flex max-w-36 flex-1 items-center gap-1 text-xs ${getSessionStatusColor(session.status)}`}
                      >
                        {session.status === 'completed' && (
                          <>
                            <CheckCheck className="size-4 text-green-500" />
                            <span>تکمیل شده</span>
                          </>
                        )}
                        {session.status === 'scheduled' && (
                          <>
                            <CalendarCheck className="size-4 text-yellow-500" />
                            <span>برنامه‌ریزی شده</span>
                          </>
                        )}
                        {session.status === 'cancelled' && (
                          <>
                            <Ban className="size-4 text-red-500" />
                            <span>لغو شده</span>
                          </>
                        )}
                      </Badge>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-3 pb-3 pt-2">
                    <div className="space-y-2.5">
                      {/* Time Range */}
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex flex-1 items-center gap-1.5">
                          <span className="mr-1 text-xs text-gray-500">از ساعت</span>
                          <span className="text-purple-700">{formatTime(session.startTime)}</span>
                          <Clock className="size-4 shrink-0 text-purple-600" />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="flex flex-1 items-center gap-1.5">
                          <span className="text-xs text-gray-500">تا ساعت</span>
                          <span className="text-gray-700">{formatTime(session.endTime)}</span>
                          <Clock className="size-4 shrink-0 text-purple-600" />

                        </div>
                      </div>

                      {/* Location or Meeting Link */}
                      <div className="text-sm">
                        {session.meetingLink
                          ? (
                              <a
                                href={session.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-md bg-blue-100 p-2 text-blue-600 hover:text-blue-800"
                              >
                                <Video className="size-4 shrink-0" />
                                <span>لینک جلسه آنلاین</span>
                              </a>
                            )
                          : session.location
                            ? (
                                <div className="flex items-center gap-2 rounded-md border bg-white p-2 text-gray-600">
                                  <MapPin className="size-4 shrink-0" />
                                  <span>{session.location}</span>
                                </div>
                              )
                            : (
                                <div className="py-1 text-center text-xs text-gray-400">
                                  اطلاعات مکان/لینک موجود نیست
                                </div>
                              )}
                      </div>

                      {/* Attendance Status */}
                      <div className="flex items-center justify-between gap-2 border-t border-gray-200 pt-2">
                        <span className="text-xs text-gray-600">حضور و غیاب:</span>
                        <Badge
                          variant="outline"
                          className={`text-xs font-normal ${getAttendanceStatusColor(getUserAttendanceStatus(session))}`}
                        >
                          {getAttendanceStatusLabel(getUserAttendanceStatus(session))}
                        </Badge>
                      </div>

                      {/* View Report Button */}
                      {session.status === 'completed' && session.sessionReport && (
                        <Button
                          variant="ligth"
                          size="sm"
                          onClick={() => handleViewReport(session.sessionReport)}
                          className="mt-2 w-full text-xs"
                        >
                          <FolderPlus className="size-4 shrink-0" />
                          مشاهده گزارش جلسه
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="py-4 text-center text-sm text-gray-400">
              هیچ جلسه‌ای ثبت نشده است
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
