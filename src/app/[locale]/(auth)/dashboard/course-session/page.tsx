'use client';

import { useQuery } from '@tanstack/react-query';
import { CalendarDays, Clock, MapPin, User, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserProfileRequest } from '@/API/auth';
import LoadingSpiner from '@/components/LoadingSpiner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserAvatar from '@/components/UserAvatar';
import useAuth from '@/hooks/useAuth';

export default function CourseSessionPage() {
  const { user } = useAuth();

  const [courseSessionEnrollments, setCourseSessionEnrollments] = useState([]);

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
    if (profileIsSuccess && profileData) {
      setCourseSessionEnrollments(profileData?.profile?.course_session_program_enrollments || []);
    }
  }, [profileIsSuccess, profileData]);

  // eslint-disable-next-line no-console
  console.log(profileData, 'profileData----');

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

      <div dir="rtl" className="grid gap-6">
        {courseSessionEnrollments?.length > 0 && courseSessionEnrollments.map(enrollment => (
          <Card key={enrollment._id} className="w-full">
            <CardHeader>
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
    </div>
  );
}
