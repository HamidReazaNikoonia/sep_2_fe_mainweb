'use client'
import React from 'react'
import { ChevronsLeft, Video } from 'lucide-react';

import MultimediaTabs from '@/components/MultimediaTabs';

export default function MultimediaTabsPortfolio() {
return (
<div className='w-full flex flex-col container mx-auto'>
    {/* Header */}
    <div className='flex justify-between w-full pb-8 px-4'>

        <button
            className="bg-transparent hover:bg-blue-500 text-white font-medium hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-md inline-flex items-center">
            <ChevronsLeft className='mr-2' />
             آرشیو تولیدات
        </button>
        <div className='py-2 inline-flex items-center  text-lg text-white font-semibold'>

        استودیو تخصصی
            <Video className='ml-3' />
        </div>
    </div>
    <MultimediaTabs />
</div>
)
}
