import React from 'react'
import { SwatchBook } from 'lucide-react';

export default function VideoSampleGallery() {
  return (
    <>
      <div className='w-full flex flex-col justify-center items-end'>
        {/* Title */}
        <h3 className='flex text-lg text-white mb-6'>
          نمونه ویدیو ها
          <SwatchBook className='ml-3' />
        </h3>

        <video className="h-full w-full rounded-lg" controls autoPlay muted>
          <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        {/* Video Items */}
        <div className='flex  md:flex-row flex-wrap w-full mt-8'>
          <article className=" w-1/2 md:w-1/3 p-2  md:p-3 mb-3 md:mb-0">
            <div className=" flex items-end overflow-hidden rounded-xl">
              <video className="h-full w-full rounded-lg" controls muted>
                <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className='text-white text-center mt-2 text-xs'>عنوان</div>
          </article>

          <article className="w-1/2 md:w-1/3 p-2 md:p-3 mb-3 md:mb-0">
            <div className=" flex items-end overflow-hidden rounded-xl">
              <video className="h-full w-full rounded-lg" controls muted>
                <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className='text-white text-center mt-2 text-xs'>عنوان</div>
          </article>


          <article className="w-1/2 md:w-1/3 p-2 md:p-3 mb-3 md:mb-0">
            <div className=" flex items-end overflow-hidden rounded-xl">
              <video className="h-full w-full rounded-lg" controls muted>
                <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className='text-white text-center mt-2 text-xs'>عنوان</div>
          </article>
        </div>
      </div>
    </>
  )
}
