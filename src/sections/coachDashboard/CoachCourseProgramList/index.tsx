import { getCoachCourseProgramRequest } from '@/API/coach';
import LoadingSpinner from '@/components/LoadingSpiner';
import { useQuery } from '@tanstack/react-query';
import CoachCourseCard from '../CoachCourseProgramCard';

const CoachCourseProgramListPage = ({ user }: { user: any }) => {
  const {
    data: coachCourseProgram,
    isLoading: coachCourseProgramIsLoading,
    isSuccess: coachCourseProgramIsSuccess,
    isError: coachCourseProgramIsError,
    error: coachCourseProgramError,
  } = useQuery({
    queryKey: ['coachCourseProgram', user?.id],
    queryFn: () => getCoachCourseProgramRequest(user?.id || ''),
    enabled: !!user?.id, // Only run query when user ID exists
  });

  // useEffect(() => {
  //   console.log('coachCourseProgram', coachCourseProgram);
  //   console.log(user);
  //   if (coachCourseProgram) {

  //   }
  // }, [coachCourseProgram]);

  // Show a loading spinner or nothing while checking authentication
  // Show loading state
  if (coachCourseProgramIsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state
  if (coachCourseProgramIsError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">خطا در دریافت اطلاعات</h2>
          <p className="mt-2 text-gray-600">
            {(coachCourseProgramError instanceof Error) ? coachCourseProgramError?.message : 'خطای ناشناخته'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 flex flex-col flex-wrap justify-center gap-4 md:mx-0 md:flex-row md:justify-start">
      {(coachCourseProgram && coachCourseProgramIsSuccess) && coachCourseProgram.map((program) => {
        // Check if user is enrolled in this program
        const isEnrolled = user?.enrolledCourses?.some(
          (course: { coach_course_program_id: string }) => course.coach_course_program_id === program._id,
        );

        return (
          <div key={program._id} className={isEnrolled ? 'h-[28rem] w-full md:w-full' : 'h-[28rem] w-full md:w-[48%]'}>
            <CoachCourseCard
              program={program}
              enrolled={isEnrolled || false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CoachCourseProgramListPage;
