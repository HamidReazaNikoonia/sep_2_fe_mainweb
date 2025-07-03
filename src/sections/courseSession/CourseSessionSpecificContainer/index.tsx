/* eslint-disable style/jsx-quotes */
/* eslint-disable tailwindcss/classnames-order */
'use client';
import type { ICourseTypes } from '@/types/Course';
import { useCartStore } from '@/_store/Cart';
import { addProductToCartRequest } from '@/API/cart';
import useAuth from '@/hooks/useAuth';

import moment from 'moment-jalaali';

import Image from 'next/image';

import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
// Icons
import { Calendar, Copy, FolderClosed, Link, Star } from 'lucide-react';

// sections
import CourseCharacter from '@/sections/course/CourseCharacter';
import CourseDetails from '@/sections/course/CourseDetails';

import VideoSampleGallery from '@/sections/course/VideoSampleGallery';
// assets
import SampleImage from '@/public/assets/images/product_placeholder.png';
// utils
import useResponsiveEvent from '@/hooks/useResponsiveEvent'; // Adjust the path
import CourseSchedule from '@/sections/course/CourseSchedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';

moment.loadPersian({ usePersianDigits: true });

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

export default function CourseSessionSpecificContainer({ dataFromServer }: { dataFromServer: ICourseTypes }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const isMobileScreen = useResponsiveEvent(768, 200);

  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuth();

  const { price_discount, price_real, course_duration, sample_media, course_objects, is_have_licence, score, tumbnail, description_long, description } = dataFromServer;

  const createAtDateInJalaliFormat = moment(dataFromServer?.createdAt).format('jYYYY jMMMM jD');
  const courseCategoryName = (dataFromServer.course_session_category[0]?.name || '');
  const tumbnailImage = tumbnail?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${tumbnail?.file_name}` : SampleImage;

  return (
    <div className=" mt-1">

      {/* Image Hero Section */}
      <div className='w-full flex flex-col-reverse md:flex-row justify-center items-center bg-black rounded-lg'>

        {/* Course Information Second Card */}
        <div className=' w-full md:w-1/4 flex flex-col mt-4 pr-0 md:pr-8 text-sm bg-black rounded-lg py-5'>
          <div dir='rtl' className='flex flex-col px-6 pb-8  md:px-0'>
            <p className='text-sm leading-6'>{description}</p>
          </div>

        </div>

        {/* Thumb Image */}
        <div>
          <Image className='' alt="" width={800} height={450} src={tumbnailImage} />
        </div>

      </div>

      <div className="container mx-auto flex flex-col-reverse md:flex-row">

        {/* Rigth Side */}
        <div className="w-full">
          <div className='flex flex-col justify-center items-center px-0 md:px-8'>
            {/* courseCharacteristics */}
            <div className='w-full'>
              <CourseCharacter />
            </div>

            {/* Video Sample Gallery */}
            <div className='w-full bg-black px-6 py-10 rounded-t-lg shadow-lg'>
              <VideoSampleGallery sampleMedia={sample_media} />
            </div>

            {/* Course Details information */}
            <div className='w-full bg-black px-6 py-10 rounded-b-lg'>
              <CourseDetails courseDescriptionLong={description_long} />
            </div>

            {/* CourseSchedule */}
            <div className='w-full mt-12 py-8 px-0 md:px-6 bg-black rounded-lg'>
              <CourseSchedule courseId={dataFromServer?.id} />
            </div>

            {/* Commen Course Swiper Section */}
            {/* <div className='w-full  px-4 md:px-0 pt-10 rounded-lg pb-3 mt-6'>
              <h3 className='text-center mb-8 text-lg md:text-2xl font-semibold text-gray-200'>
                دوره های مشابه
              </h3>
              <CommenCourseSwiper />
            </div> */}

            {/* Get a List of Course Based on Category */}
            <div className='w-full px-6 py-4'>
              <button type='button' className=" bg-purple-800 text-white w-full hover:bg-blue-900 px-4 py-2 rounded mr-2 text-sm">
                مشاهده دوره های بیشتر
              </button>
            </div>

            {/* User Review */}
            {/* <div className='w-full px-1 py-10'>
              <UserReviewForCourse />
            </div> */}
          </div>
        </div>

      </div>

      <div ref={footerRef} className="mt-6">
        {/* Comment Section */}
        {/* <CommentLayout type="course" productId={dataFromServer._id} /> */}
      </div>
    </div>
  );
};
