'use client'
import React from 'react'
import Image from 'next/image'
import HeaderSearchInput from '@/components/HeaderSearchInput'
import BannerSwiper from '@/components/swiper/BannerSwiper'


export default function HeroSection() {
  return (
    <div className='w-full'>

      <div style={{ background: "linear-gradient(90deg,#4dba64,#25a06f)" }} className='text-white flex relative min-h-[490px]'>
        {/* background Image Hero */}
        <div className='w-full h-full absolute top-0 left-0 opacity-15' style={{ backgroundImage: 'url(/assets/images/hero_image.webp)', backgroundRepeat: 'repeat' }} ></div>

        {/* container  */}
        <div className='flex flex-1 relative mx-auto  px-6 py-1'>
          {/* Hero Text Header and Search input */}
          <div className='w-full text-center text-2xl md:text-4xl font-semibold flex flex-col justify-center items-center'>
            <span style={{ textShadow: '0 0 50px hsla(0,0%,0%,.4)' }} >   مهارت های زندگی شاد </span>
            <span style={{ textShadow: '0 0 50px hsla(0,0%,0%,.4)' }} className='text-sm mt-4'>
              مرجع دوره های ویدیویی و مشاوره خانواده
            </span>

            {/* Search Input */}
            <div className='w-full md:w-4/6'>
              <HeaderSearchInput />
            </div>
          </div>
        </div>


      </div>

      {/* Banner Swiper */}
      <div className='mt-0 md:mt-[-100px]'>
        <BannerSwiper />
      </div>
    </div>

  )
}
