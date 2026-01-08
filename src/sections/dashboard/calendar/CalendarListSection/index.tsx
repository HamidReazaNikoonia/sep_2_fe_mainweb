'use client'
import React, { useEffect, useState } from 'react'
import CalendarView from '../CalendarView'
import { useQuery } from '@tanstack/react-query';
import { getUserProfileRequest } from '@/API/auth';
import useAuth from '@/hooks/useAuth';

export default function CalendarListSection() {

  const { user } = useAuth();

  // Add this state and effect after your existing states (around line 30)
  const [sessionList, setSessionList] = useState<any[]>([]);

  const { data: profileData, isLoading: profileIsLoading, isError: profileIsError, error: profileError, isSuccess: profileIsSuccess } = useQuery({
  // @ts-expect-error
    queryKey: ['profile', user?.id],
    // @ts-expect-error
    queryFn: user ? () => getUserProfileRequest({ userId: user.id }) : undefined,
    enabled: !!user, // Prevents query execution when user is null
  });

  // Add this useEffect to prepare the session data
  useEffect(() => {
    if (profileData?.programs) {
      const allSessions: any[] = [];
    
      profileData.programs.forEach((item: any) => {
        if (item.program?.sessions && Array.isArray(item.program.sessions)) {
          item.program.sessions.forEach((session: any) => {
            allSessions.push({
              date: session.date,
              startTime: session.startTime,
              endTime: session.endTime,
              status: session.status,
              _id: session._id,
              program: {
                title: item.program?.course?.title || 'بدون عنوان',
                coachFullName: `${item.program?.coach?.first_name || ''} ${item.program?.coach?.last_name || ''}`.trim() || 'نامشخص',
              },
            });
          });
        }
      });
    
      setSessionList(allSessions);
    }
  }, [profileData]);
  return (
    <div className="w-full">
      <div className='w-full flex justify-center'>
        {sessionList.length > 0 && (
          <div className="mb-6 md:px-8 w-full mx-4 md:mx-0">
            <h2 className="mb-4 mr-2 flex items-center gap-2 text-base font-bold text-purple-800 md:text-lg">
              <span>تقویم کلاس‌ها</span>
            </h2>
            <CalendarView sessions={sessionList} />
          </div>
        )}
      </div>
    </div>
  )
}
