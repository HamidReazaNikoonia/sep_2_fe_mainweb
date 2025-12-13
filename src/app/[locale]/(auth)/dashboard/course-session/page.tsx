'use client';

import { useQuery } from '@tanstack/react-query';
import { CalendarDays, Clock, MapPin, User, Video, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserProfileRequest } from '@/API/auth';
import LoadingSpiner from '@/components/LoadingSpiner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserAvatar from '@/components/UserAvatar';
import useAuth from '@/hooks/useAuth';

type FilterType = 'active' | 'completed' | 'all';

export default function CourseSessionPage() {
  const { user } = useAuth();

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
    enabled: !!user, // Prevents query execution when user is null
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

  // TASK 1: Filter enrollments based on selected filter
  const filteredEnrollments = courseSessionEnrollments.filter(enrollment => {
    if (filterType === 'active') {
      return enrollment.is_completed === false && enrollment.is_active === true;
    } else if (filterType === 'completed') {
      return enrollment.is_completed === true;
    }
    return true; // 'all'
  });

  // TASK 2: Get user attendance status for a session
  const getUserAttendanceStatus = (session: any) => {
    if (!session.attendance || !user?.id) return null;
    
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
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'excused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // TASK 3: Handle session report modal
  const handleViewReport = (sessionReport: any) => {
    setSelectedSessionReport(sessionReport);
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedSessionReport(null);
  };

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
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const formatTime = (time: string) => {
    return time;
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
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-right text-lg font-bold">کلاس های من</h1>
        <Badge variant="outline">
          {courseSessionEnrollments?.length}
          {' '}
          دوره
        </Badge>
      </div>

      {/* TASK 1: Category Buttons */}
      <div dir="rtl" className="flex gap-2 flex-wrap">
        <Button
          variant={filterType === 'active' ? 'default' : 'outline'}
          onClick={() => setFilterType('active')}
          className="text-sm"
        >
          دوره های در حال برگذاری
          <Badge variant="secondary" className="mr-2">
            {courseSessionEnrollments.filter(e => e.is_completed === false && e.is_active === true).length}
          </Badge>
        </Button>
        <Button
          variant={filterType === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilterType('completed')}
          className="text-sm"
        >
          دوره های برگذار شده
          <Badge variant="secondary" className="mr-2">
            {courseSessionEnrollments.filter(e => e.is_completed === true).length}
          </Badge>
        </Button>
        <Button
          variant={filterType === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterType('all')}
          className="text-sm"
        >
          همه دوره ها
          <Badge variant="secondary" className="mr-2">
            {courseSessionEnrollments.length}
          </Badge>
        </Button>
      </div>

      {/* Show message if no courses match the filter */}
      {filteredEnrollments.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">هیچ دوره‌ای در این دسته یافت نشد</p>
        </div>
      )}

      <div dir="rtl" className="grid gap-6">
        {filteredEnrollments.map(enrollment => (
          <Card key={enrollment._id} className="w-full">
            <CardHeader>
              <div>
                <h2 className='text-sm font-normal md:text-lg'>{enrollment?.is_completed ? 'تکمیل شده' : 'در حال برگذاری'}</h2>
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">
                    {enrollment?.course?.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {enrollment?.course?.sub_title}
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
                <UserAvatar
                  src={enrollment?.coach?.avatar}
                  alt={`${enrollment?.coach?.first_name} ${enrollment?.coach?.last_name || ''}`}
                  className="size-14"
                />
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
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarDays className="size-4" />
                <span>
                  کلاس:
                  {enrollment?.class_id?.class_title}
                </span>
              </div>

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
                        {/* TASK 2: Add Attendance Column */}
                        <TableHead className="text-right">حضور و غیاب</TableHead>
                        {/* TASK 3: Add Actions Column */}
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
                              <Clock className="size-4" />
                              {formatTime(session.startTime)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-1">
                              <Clock className="size-4" />
                              {formatTime(session.endTime)}
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
                              {session.status === 'scheduled'
                                ? 'برنامه‌ریزی شده'
                                : session.status === 'completed' ? 'تکمیل شده' : 'لغو شده'}
                            </Badge>
                          </TableCell>
                          {/* TASK 2: Show User Attendance Status */}
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className={getAttendanceStatusColor(getUserAttendanceStatus(session))}
                            >
                              {getAttendanceStatusLabel(getUserAttendanceStatus(session))}
                            </Badge>
                          </TableCell>
                          {/* TASK 3: Show Report Button for Completed Sessions */}
                          <TableCell className="text-right">
                            {session.status === 'completed' && session.sessionReport ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewReport(session.sessionReport)}
                              >
                                مشاهده گزارش
                              </Button>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
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

      {/* TASK 3: Session Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-xl font-bold">گزارش جلسه</DialogTitle>
          </DialogHeader>
          
          {selectedSessionReport && (
            <div className="space-y-6 py-4">
              {/* Description */}
              {selectedSessionReport.description && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-right">توضیحات جلسه</h3>
                  <p className="text-gray-700 text-right leading-7">
                    {selectedSessionReport.description}
                  </p>
                </div>
              )}

              {/* Topics Covered */}
              {selectedSessionReport.topics_covered && selectedSessionReport.topics_covered.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-right">نکاتی که در این جلسه مطرح شد</h3>
                  <ul className="list-disc list-inside space-y-1 text-right">
                    {selectedSessionReport.topics_covered.map((topic: string, index: number) => (
                      <li key={index} className="text-gray-700">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Objectives Met */}
              {selectedSessionReport.learning_objectives_met && selectedSessionReport.learning_objectives_met.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-right">اهداف یادگیری</h3>
                  <ul className="list-disc list-inside space-y-1 text-right">
                    {selectedSessionReport.learning_objectives_met.map((objective: string, index: number) => (
                      <li key={index} className="text-gray-700">
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Attachments */}
              {selectedSessionReport.attachments && selectedSessionReport.attachments.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-right">فایل های پیوست</h3>
                  <div className="space-y-2">
                    {selectedSessionReport.attachments.map((attachment: any, index: number) => (
                      <div key={index} className="flex items-center justify-between gap-3 rounded-lg border p-3 bg-gray-50">
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
