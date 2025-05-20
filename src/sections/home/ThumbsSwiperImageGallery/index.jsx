import React from 'react'
import { ChevronsLeft, ClipboardList } from 'lucide-react';
import ImageGallerySwiper from '@/components/swiper/ImageGallerySwiper'

export default function ThumbsSwiperImageGallery() {
return (
<>
    {/* Header */}
    <div className='flex justify-between w-full pb-2 px-4 md:px-8'>

        <button
            className="bg-transparent text-white font-medium text-xs md:text-sm py-2 px-1 mdpx-4   rounded-md inline-flex items-center">
            <ChevronsLeft className='mr-2' />
            مشاهده همه
        </button>
        <div className='py-2 inline-flex items-center  text-lg text-white font-semibold'>
        
             گالری تصاویر 
          <ClipboardList className='ml-3' />
        </div>
    </div>
    <div className="w-full">
    <ImageGallerySwiper />
   
    </div>
    
</>
)
}
