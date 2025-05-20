/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import type { CoachCourseProgram } from '@/types/Coach';

import { getCoachUserProfileRequest } from '@/API/coach';

import LoadingSpinner from '@/components/LoadingSpiner';
import useAuth from '@/hooks/useAuth';
import CoachCourseCard from '@/sections/coachDashboard/CoachCourseProgramCard';
import { useEffect, useState } from 'react';
// API
import CoachForm from '@/sections/coachDashboard/CoachForm';
import Stepper from '@/sections/coachDashboard/Stepper';

import { useQuery } from '@tanstack/react-query';
import { mockCoachCoursePrograms } from '../../../../mocks/coach-course-program';
import CoursesPage from '../dashboard/courses/page';
import CoachCourseProgramListPage from '@/sections/coachDashboard/CoachCourseProgramList';


export default function CoachDashboardPage() {
  const [steps, setsteps] = useState(0);
  const [isLoadingState, setisLoadingState] = useState(true);

  const { user, updateUser } = useAuth();

  // const [profileDataState, setProfileData] = useState({
  //   courseCount: 0,
  //   orderCount: 0,
  //   favorites: 0
  // })

  const {
    data: coachProfile,
    isLoading: profileIsLoading,
    isError: profileIsError,
    error: profileError,
  } = useQuery({
    queryKey: ['coachProfile', user?.id],
    queryFn: () => getCoachUserProfileRequest(user?.id || ''),
    enabled: !!user?.id, // Only run query when user ID exists
    staleTime: 0, // Fetch fresh data every time (ms)

  });

  useEffect(() => {
    if (coachProfile) {
      // console.log('viiii', coachProfile);
      updateUser(coachProfile);

      if (coachProfile?.coach_Information) {
        setsteps(1);
      }
    }

    // check Steps
    setisLoadingState(false);
  }, [coachProfile, updateUser]);

  // Show a loading spinner or nothing while checking authentication
  // Show loading state
  if (profileIsLoading || isLoadingState) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state
  if (profileIsError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">خطا در دریافت اطلاعات</h2>
          <p className="mt-2 text-gray-600">
            {profileError instanceof Error ? profileError.message : 'خطای ناشناخته'}
          </p>
        </div>
      </div>
    );
  }

  const moveToTheNextStepHandler = () => {
    setsteps(1);
  };

  // console.log('_________user_____', user);
  return (
    <div dir="rtl" className="border-1 min-h-svh bg-slate-100 px-1 py-12 md:px-4">

      {/* Stepper */}
      <div className="mr-4 w-full md:mr-0">
        <Stepper activeStep={steps} />
      </div>

      {/* Steps 0 ==> Coach Information Complete */}
      {steps === 0 && (
        <div className="flex w-full flex-col">
          <CoachForm moveSteps={moveToTheNextStepHandler} />
        </div>
      )}

      {steps !== 0 && (
        <div className=" mt-12 w-full">
          {user && <CoachCourseProgramListPage user={user} />}
        </div>
      )}
    </div>
  );
}
