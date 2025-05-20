import React from 'react'
import TeacherCourseSwiper from '../TeacherCourseSwiper'

export default function TeacherInfoSection() {
  return (
    <>
      <div className='w-full flex flex-col mt-4 px-8 bg-gray-200 rounded-lg py-5'>
        <div style={{ marginBottom: "-18px" }} className='text-center text-sm relative w-40 flex justify-center mx-auto py-2 rounded-md yellow-gradient-bg'>
          درباره این مدرس
        </div>
        <div className='w-full flex justify-between items-center border-t border-cyan-700 pt-10'>

          {/* Profile */}
          <div className='text-xs text-gray-400 cursor-pointer'>
            نمایش پروفایل
          </div>

          {/* Avatar */}
          <div className="flex text-right">
            <div className='mr-2'>
              <h6 className="text-sm font-medium text-gray-700 dark:text-white">زهرا احمدی </h6>
              <p className="text-xs text-gray-600 mt-1">هنر جوی این دوره</p>
            </div>
            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg" alt="user avatar" width="400" height="400" loading="lazy" />
          </div>



        </div>



        <p className='text-right mt-8 text-xs leading-8'>
          من مدرس دوره های آکادمی هستم و از سال 1398 به صورت تخصصی آموزش گرافیکی را انجام می دهم
        </p>


        <div className='mt-6'>
          <TeacherCourseSwiper />
        </div>
      </div>
    </>
  )
}
