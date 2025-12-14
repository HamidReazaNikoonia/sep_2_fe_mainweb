'use client';

import { useQuery } from '@tanstack/react-query';
import { Ban, CalendarCheck, CheckCheck, Clock, Download, MapPin, School, User, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserProfileRequest } from '@/API/auth';
import EnrollmentCardItem from '@/components/EnrollmentCardItem';
import LoadingSpiner from '@/components/LoadingSpiner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useAuth from '@/hooks/useAuth';
import { toPersianDigits } from '@/utils/Helpers';

type FilterType = 'active' | 'completed' | 'all';

export default function CourseSessionPage() {
  const { user } = useAuth();

  // Get `program_id` query from url

  const searchParams = useSearchParams();
  const programId = searchParams.get('program_id');

  const [courseSessionEnrollments, setCourseSessionEnrollments] = useState([]);
  const [filterType, setFilterType] = useState<FilterType>('active');
  const [selectedSessionReport, setSelectedSessionReport] = useState<any>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const { data: profileData, isLoading: profileIsLoading, isError: profileIsError, error: profileError, isSuccess: profileIsSuccess } = useQuery({
    // @ts-expect-error not sure why this is needed
    queryKey: ['profile', user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error('User not authenticated');
      }
      return getUserProfileRequest({ userId: user.id });
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (profileData) {
      console.log('program----', profileData?.programs);
      const list = profileData?.programs?.map((item: any) => ({
        ...item.program,
        is_completed: item.is_completed,
        is_active: item.is_active,
        is_valid: item.is_valid,
      }));
      setCourseSessionEnrollments(list || []);
    }
  }, [profileIsSuccess, profileData]);

  // eslint-disable-next-line no-console
  console.log(profileData, 'profileData----');

  // scroll to specifc enrollment card
  useEffect(() => {
    if (programId && profileIsSuccess && profileData) {
      // eslint-disable-next-line react-web-api/no-leaked-timeout
      setTimeout(() => {
        const enrollmentCard = document.getElementById(`enrollment-${programId}`);
        if (enrollmentCard) {
          enrollmentCard.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);
    }
  }, [programId, profileIsSuccess, profileData]);

  const filteredEnrollments = courseSessionEnrollments.filter((enrollment: any) => {
    if (filterType === 'active') {
      return enrollment.is_completed === false && enrollment.is_active === true;
    } else if (filterType === 'completed') {
      return enrollment.is_completed === true;
    }
    return true;
  });

  const getUserAttendanceStatus = (session: any) => {
    if (!session.attendance || !user?.id) {
      return null;
    }
    const userAttendance = session.attendance.find((att: any) => att.user === user.id || att.user?._id === user.id);
    return userAttendance?.status || null;
  };

  const getAttendanceStatusLabel = (status: string | null) => {
    switch (status) {
      case 'present':
        return 'حاضر';
      case 'absent':
        return 'غایب';
      case 'excused':
        return 'غیبت موجه';
      default:
        return '-';
    }
  };

  const getAttendanceStatusColor = (status: string | null) => {
    switch (status) {
      case 'present':
        return 'font-normal bg-green-100 text-green-800';
      case 'absent':
        return 'font-normal bg-red-100 text-red-800';
      case 'excused':
        return 'font-normal bg-yellow-100 text-yellow-800';
      default:
        return 'font-normal bg-gray-100 text-gray-800';
    }
  };

  const handleViewReport = (sessionReport: any) => {
    setSelectedSessionReport(sessionReport);
    setIsReportModalOpen(true);
  };

  // const handleCloseReportModal = () => {
  //   setIsReportModalOpen(false);
  //   setSelectedSessionReport(null);
  // };

  const handleDownloadFile = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  // eslint-disable-next-line no-console
  console.log(courseSessionEnrollments, 'courseSessionEnrollments----');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'flex font-normal items-center gap-2 bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'flex font-normal items-center gap-2 bg-green-100 text-green-800';
      case 'cancelled':
        return 'flex font-normal items-center gap-2 bg-red-100 text-red-800';
      default:
        return 'flex font-normal items-center gap-2 bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const formatTime = (time: string) => {
    return toPersianDigits(time);
  };

  if (profileIsLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <LoadingSpiner />
      </div>
    );
  }

  if (profileIsError) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>خطا در بارگذاری اطلاعات دوره‌ها</p>
        <p className="text-sm">{profileError?.message}</p>
      </div>
    );
  }

  if (courseSessionEnrollments.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">هیچ دوره‌ای ثبت نشده است</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-right text-base font-bold text-purple-800 md:text-lg">کلاس های من</h1>
        <Badge variant="outline">
          {toPersianDigits(courseSessionEnrollments?.length)}
          {' '}
          دوره
        </Badge>
      </div>

      {/* Category Buttons */}
      <div dir="rtl" className="flex flex-wrap gap-2">
        <Button
          variant={filterType === 'active' ? 'default' : 'outline'}
          onClick={() => setFilterType('active')}
          className="text-xs"
        >
          دوره های در حال برگذاری
          <Badge variant="purple" className="mr-2 text-xs">
            {toPersianDigits(courseSessionEnrollments.filter((e: any) => e.is_completed === false && e.is_active === true).length)}
          </Badge>
        </Button>
        <Button
          variant={filterType === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilterType('completed')}
          className="hidden text-xs md:block"
        >
          دوره های برگذار شده
          <Badge variant="purple" className="mr-2 text-xs text-purple-500">
            {toPersianDigits(courseSessionEnrollments.filter((e: any) => e.is_completed === true).length)}
          </Badge>
        </Button>
        <Button
          variant={filterType === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterType('all')}
          className="text-xs"
        >
          همه دوره ها
          <Badge variant="purple" className="mr-2 text-xs">
            {toPersianDigits(courseSessionEnrollments.length)}
          </Badge>
        </Button>
      </div>

      {filteredEnrollments.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">هیچ دوره‌ای در این دسته یافت نشد</p>
        </div>
      )}

      {/* Mobile View - Card Items */}
      <div dir="rtl" className="grid gap-4 md:hidden">
        {filteredEnrollments.map(enrollment => (
          <EnrollmentCardItem
            id={enrollment.id}
            key={enrollment.id}
            enrollment={enrollment}
            formatDate={formatDate}
            formatTime={formatTime}
            getStatusColor={getStatusColor}
            getSessionStatusColor={getSessionStatusColor}
            getUserAttendanceStatus={getUserAttendanceStatus}
            getAttendanceStatusColor={getAttendanceStatusColor}
            getAttendanceStatusLabel={getAttendanceStatusLabel}
            handleViewReport={handleViewReport}
          />
        ))}
      </div>

      {/* Desktop View - Table */}
      <div dir="rtl" className="hidden gap-6 md:grid">
        {filteredEnrollments.map(enrollment => (
          <Card id={`enrollment-${enrollment.id}`} key={enrollment._id} className="w-full">
            <CardHeader>
              <div className="mb-4">
                {!enrollment?.is_completed
                  ? (
                      <div className="flex items-center gap-2">
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                        <span className="animate-fade-in-slow text-xs font-semibold text-purple-700 transition-colors md:text-sm">
                          در حال برگذاری
                        </span>
                      </div>
                    )
                  : (
                      <h2 className="text-xs font-normal md:text-sm">تکمیل شده</h2>
                    )}
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <CardTitle className="text-sm md:text-xl">
                    <Link href={`/course-session/${enrollment?.course?.id}`}>
                      {enrollment?.course?.title}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {enrollment?.course?.sub_title?.length > 60 ? `${enrollment?.course?.sub_title?.substring(0, 100)}...` : enrollment?.course?.sub_title}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`${enrollment?.program_type === 'ONLINE' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}
                  >
                    {enrollment?.program_type === 'ONLINE' ? 'آنلاین' : 'حضوری'}
                  </Badge>
                  <Badge className={getStatusColor(enrollment?.status)}>
                    {enrollment?.status === 'active'
                      ? 'فعال'
                      : enrollment?.status === 'completed' ? 'تکمیل شده' : 'غیرفعال'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Coach Information */}
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  {enrollment?.coach?.avatar?.file_name
                    ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${enrollment.coach.avatar.file_name}`}
                          alt={`${enrollment?.coach?.first_name} ${enrollment?.coach?.last_name || ''}`}
                          className="size-full rounded-full object-cover"
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
                <div>
                  <p className="font-medium">
                    {enrollment?.coach?.first_name}
                    {' '}
                    {enrollment?.coach?.last_name || ''}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-gray-600">
                    <User className="size-4" />
                    مربی دوره
                  </p>
                </div>
              </div>

              {/* Class Information */}
              {enrollment?.class_id?.class_title && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <School className="size-4 text-purple-600" />
                  <span>
                    کلاس:
                    {' '}
                    {enrollment?.class_id?.class_title}
                  </span>
                </div>
              )}

              {/* Sessions Table */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">جلسات دوره</h3>
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">تاریخ</TableHead>
                        <TableHead className="text-right">زمان شروع</TableHead>
                        <TableHead className="text-right">زمان پایان</TableHead>
                        <TableHead className="text-right">مکان/لینک</TableHead>
                        <TableHead className="text-right">وضعیت</TableHead>
                        <TableHead className="text-right">حضور و غیاب</TableHead>
                        <TableHead className="text-right">عملیات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollment?.sessions?.length > 0 && enrollment?.sessions?.map(session => (
                        <TableRow key={session._id}>
                          <TableCell className="text-right">
                            {formatDate(session.date)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-1">
                              {formatTime(session.startTime)}
                              <Clock className="size-3 text-purple-600" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-1">
                              {formatTime(session.endTime)}
                              <Clock className="size-3 text-purple-600" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {session.meetingLink
                              ? (
                                  <a
                                    href={session.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                  >
                                    <Video className="size-4" />
                                    لینک جلسه
                                  </a>
                                )
                              : session.location
                                ? (
                                    <div className="flex items-center gap-1 text-gray-600">
                                      <MapPin className="size-4" />
                                      {session.location}
                                    </div>
                                  )
                                : (
                                    <span className="text-gray-400">-</span>
                                  )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className={getSessionStatusColor(session.status)}
                            >
                              {session.status === 'completed' && (
                                <CheckCheck className="ml-1 inline-block size-5 text-green-600" />
                              )}
                              {session.status === 'scheduled' && (
                                <CalendarCheck className="ml-1 inline-block size-5 text-yellow-600" />
                              )}
                              {session.status === 'cancelled' && (
                                <Ban className="ml-1 inline-block size-5 text-red-600" />
                              )}
                              {session.status === 'scheduled'
                                ? 'برنامه‌ریزی شده'
                                : session.status === 'completed' ? 'تکمیل شده' : 'لغو شده'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className={getAttendanceStatusColor(getUserAttendanceStatus(session))}
                            >
                              {getAttendanceStatusLabel(getUserAttendanceStatus(session))}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {session.status === 'completed' && session.sessionReport
                              ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewReport(session.sessionReport)}
                                  >
                                    مشاهده گزارش
                                  </Button>
                                )
                              : (
                                  <span className="text-sm text-gray-400">-</span>
                                )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Session Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-xl font-bold">گزارش جلسه</DialogTitle>
          </DialogHeader>

          {selectedSessionReport && (
            <div className="space-y-6 py-4">
              {selectedSessionReport.description && (
                <div className="space-y-2">
                  <h3 className="text-right font-semibold">توضیحات جلسه</h3>
                  <p className="text-right leading-7 text-gray-700">
                    {selectedSessionReport.description}
                  </p>
                </div>
              )}

              {selectedSessionReport.topics_covered && selectedSessionReport.topics_covered.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-right font-semibold">نکاتی که در این جلسه مطرح شد</h3>
                  <ul className="list-inside list-disc space-y-1 text-right">
                    {selectedSessionReport.topics_covered.map((topic: string, index: number) => (
                      <li key={index} className="text-gray-700">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedSessionReport.learning_objectives_met && selectedSessionReport.learning_objectives_met.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-right font-semibold">اهداف یادگیری</h3>
                  <ul className="list-inside list-disc space-y-1 text-right">
                    {selectedSessionReport.learning_objectives_met.map((objective: string, index: number) => (
                      <li key={index} className="text-gray-700">
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedSessionReport.attachments && selectedSessionReport.attachments.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-right font-semibold">فایل های پیوست</h3>
                  <div className="space-y-2">
                    {selectedSessionReport.attachments.map((attachment: any, index: number) => (
                      <div key={index} className="flex items-center justify-between gap-3 rounded-lg border bg-gray-50 p-3">
                        <div className="flex-1 text-right">
                          <p className="text-sm text-gray-700">
                            {attachment.description || `فایل ${index + 1}`}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadFile(attachment.file?.url || attachment.file)}
                          className="flex items-center gap-2"
                        >
                          <Download className="size-4" />
                          دانلود
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
