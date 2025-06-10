import React from 'react';
import { WalletMinimal, Headset, Clock } from 'lucide-react';


export default function CourseCharacter() {
  return (
    <>
      <div className='w-full bg-black py-8 flex flex-col md:flex-row justify-around mt-8 mb-6 md:mb-16 py-4 px-4 rounded-lg'>
        <div className='flex items-center justify-end mb-5 md:mb-0'>
          <div className='text-[13px] text-right pr-4 leading-7 font-medium w-56 md:w-44'>
            بازگشت وجه درصورت عدم رضایـت از دوره آموزشی
          </div>


          <div>
            <div className='p-3 rounded-2xl bg-gray-300 '>
              <WalletMinimal size={32} />
            </div>
          </div>


        </div>




        <div className='flex items-center justify-end mb-5 md:mb-0'>
          <div className='text-[13px] text-right pr-4 leading-7 font-medium w-36'>
            پشتیبانی ۲ ساله برای پاسخ به سوالات
          </div>


          <div>
            <div className='p-3 rounded-2xl bg-gray-300 '>
              <Headset size={32} />
            </div>
          </div>


        </div>





        <div className='flex items-center justify-end'>
          <div className='text-[13px] text-right pr-4 leading-7 font-medium w-44'>
            دسترسی همیشگی به محتوای آفلاین آموزشی
          </div>


          <div>
            <div className='p-3 rounded-2xl bg-gray-300 '>
              <Clock size={32} />
            </div>
          </div>


        </div>
      </div>
      </>
  )
}
