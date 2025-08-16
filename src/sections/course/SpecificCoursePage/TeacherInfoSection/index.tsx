import React from 'react'
import TeacherCourseSwiper from '../TeacherCourseSwiper'

export default function TeacherInfoSection({ coach }: { coach: any }) {
  return (
    <>
      <div className='w-full flex flex-col mt-4 px-8 test-gradient-bg rounded-lg py-5'>
        <div style={{ marginBottom: "-18px" }} className='text-center text-sm relative w-40 flex justify-center mx-auto py-2 rounded-md pink-gradient-bg text-white'>
          درباره این مدرس
        </div>
        <div className='w-full flex justify-end items-center border-t border-cyan-300 pt-10'>

          {/* Profile */}
          

          {/* Avatar */}
          <div className="flex text-right">
            <div className='mr-3 flex flex-col'>
              <h6 className="text-sm font-medium text-gray-200">
                {coach.first_name} {coach.last_name}
              </h6>
              <div className='text-[11px] mt-1 text-gray-300 cursor-pointer'>
            نمایش پروفایل
          </div>
              {/* <p className="text-xs text-gray-300 mt-1">هنر جوی این دوره</p> */}
            </div>
            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg" alt="user avatar" width="400" height="400" loading="lazy" />
          </div>



        </div>



        <p className='text-right mt-8 text-xs leading-7'>
          من مدرس دوره های آکادمی هستم و از سال 1398 به صورت تخصصی آموزش گرافیکی را انجام می دهم
        </p>


        <div className='mt-4'>
          {/* <TeacherCourseSwiper /> */}
        </div>
      </div>
    </>
  )
}
