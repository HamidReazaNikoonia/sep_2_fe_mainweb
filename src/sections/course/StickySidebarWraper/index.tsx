/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable style/multiline-ternary */
/* eslint-disable style/jsx-quotes */
/* eslint-disable tailwindcss/classnames-order */
'use client';
import type { ICourseTypes } from '@/types/Course';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// Icons
import { BookAudio, Calendar, Copy, FolderClosed, Heart, Languages, Link, Scroll, SquareArrowUpLeft, Star, Timer, Users } from 'lucide-react';
import moment from 'moment-jalaali';

import Image from 'next/image';

import React, { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import { useCartStore } from '@/_store/Cart';

import { addProductToCartRequest } from '@/API/cart';
import LoadingButton from '@/components/LoadingButton';
import useAuth from '@/hooks/useAuth';
// utils
import useResponsiveEvent from '@/hooks/useResponsiveEvent'; // Adjust the path
// assets
// import SampleImage2 from '@/public/assets/images/product_placeholder.png';
import SampleImage from '@/public/assets/images/course_banner.png';

// sections
import CourseCharacter from '@/sections/course/CourseCharacter';

import CourseDetails from '@/sections/course/CourseDetails';
import VideoSampleGallery from '@/sections/course/VideoSampleGallery';
import { formatDurationWithPersian } from '@/utils/Helpers';
import TeacherInfoSection from '../SpecificCoursePage/TeacherInfoSection';

moment.loadPersian({ usePersianDigits: true });

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

export default function StickyComponent({ dataFromServer }: { dataFromServer: ICourseTypes }) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const isMobileScreen = useResponsiveEvent(768, 200);

  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: addProductToCartRequest,
    onSuccess: (response) => {
      // @ts-expect-error
      queryClient.invalidateQueries('cart');

      console.log('response', response);

      if (!response) {
        toast.error('خطایی رخ داده است');
        return false;
      }

      if (response?.code === 208) {
        toast.error('این دوره در سبد خرید شما موجود است');
        return false;
      }

      if (response?._id) {
        toast.success('محصول به سبد خرید شما اضافه شد');
        return true;
      }
    },
  });

  const { isAuthenticated } = useAuth();
  const addToCartInLocalStorage = useCartStore(state => state.addToCart);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current && footerRef.current) {
        const stickyTop = stickyRef.current.getBoundingClientRect().top * 15;
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (footerTop <= viewportHeight) {
          // Footer is in view, set position to static
          setIsSticky(false);
        } else if (window.scrollY > stickyTop) {
          // Scroll position is past the original position of sticky element
          setIsSticky(true);
        } else {
          // Reset to original position
          setIsSticky(false);
        }
      }
    };

    !isMobileScreen && window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileScreen]);

  const { price_discount, price_real, course_duration, sample_media, course_objects, is_have_licence, score, tumbnail_image, description_long, description } = dataFromServer;

  const memberCount = (Array.isArray(dataFromServer.member) ? dataFromServer.member?.length : 0);
  const courseLanguage: string = (dataFromServer?.course_language || 'FA');
  const createAtDateInJalaliFormat = moment(dataFromServer?.createdAt).format('jYYYY jMMMM jD');
  const courseCategoryName = (dataFromServer.course_category[0]?.name || '');
  const coachData = dataFromServer.coach_id;
  const tumbnailImage = tumbnail_image?.file_name ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${tumbnail_image?.file_name}` : SampleImage;

  const courseLanguageMap: {
    [key: string]: string;
  } = {
    FA: 'فارسی',
    EN: 'انگلیسی',
  };

  const courseTypeMap: {
    [key: string]: string;
  } = {
    HOZORI: 'حضوری',
    OFFLINE: 'آنلاین',
  };

  console.log({ sample_media });

  const attToBasketHandler = () => {
    console.log('attToBasketHandler', dataFromServer);

    if (!dataFromServer?.id) {
      toast.error('متاسفانه محصوصل در دسترس نمیباشد');
      return false;
    }

    if (dataFromServer) {
      // addToCart(dataFromServer);
      // if user authenticated, add product to cart in database
    // Send a request to the server to add the product to the cart
      if (isAuthenticated) {
        console.log('Add course to cart in database');
        console.log({ dataFromServer, isAuthenticated });
        addToCartMutation.mutate({ courseId: dataFromServer.id, quantity: 1 });
      } else {
      // Add product to cart in local storage
        addToCartInLocalStorage(dataFromServer);
      }

      return true;
    }

    toast.error('متاسفانه محصوصل در دسترس نمیباشد');
    return false;
  };

  return (
    <div className="">

      <div className='w-full'>
        {/* Thumb Image */}
        <div className='bg-white w-full relative py-0'>
          
          {/* Image with full width */}
          <div className='w-full max-h-[600px] overflow-hidden'>
            <Image className=' w-full' alt="" width={600} height={450} src={tumbnailImage} />
          </div>

          {/* Buttons Section - Absolute positioned over image */}
          <div className='hidden min-w-[400px] md:block absolute top-[-80px] left-10 opacity-90 hover:opacity-100 bg-white rounded-lg shadow-lg p-4 max-w-sm'>
            {/* Buttons */}
            <div className='w-full flex flex-col justify-center items-center'>
              {/* Price Section */}
              <div className='flex w-full px-12 md:px-4 justify-between items-center border-2 border-green-600 border-dashed py-2 rounded-xl'>
                <div className='flex flex-col items-start'>
                  {price_discount ? (
                    <>
                      <div className='flex items-center'>
                        <div className='text-sm md:text-lg text-gray-900 font-bold mr-2'>ریال</div>
                        <div className='text-lg md:text-2xl text-gray-900'>{(price_discount).toLocaleString('ar-EG')}</div>
                        <div className='ml-2 px-3 py-1 bg-[#cf741e] text-white text-xs md:text-sm rounded-full'>تخفیف ویژه</div>
                      </div>
                      <div className='flex items-center mt-1 relative'>
                        <div className='text-sm text-gray-400 font-bold mr-2'>ریال</div>
                        <div className='text-lg text-gray-400'>{(price_real).toLocaleString('ar-EG')}</div>
                        {/* Custom diagonal line through the original price */}
                        <div className="absolute top-1/2 inset-x-0 h-[1.5px] w-full -rotate-12 bg-red-500"></div>
                      </div>
                    </>
                  ) : (
                    <div className='flex items-center text-gray-900'>
                      <div className='text-lg font-bold mr-2'>ریال</div>
                      <div className='text-4xl'>{(price_real).toLocaleString('ar-EG')}</div>
                    </div>
                  )}
                </div>
                <div className='text-sm md:text-xl font-semibold text-gray-900'>قیمت</div>
              </div>

              {/* Buttons Section */}
              <div className='flex flex-col space-y-2 mt-6 w-full justify-between items-center'>

                <LoadingButton disabled={addToCartMutation.isPending} isLoading={addToCartMutation.isPending} onClick={attToBasketHandler} className="text-white flex justify-center items-center w-full pink-gradient-bg px-4 py-1.5 rounded-xl text-sm md:text-lg">
                   خرید دوره
                  <SquareArrowUpLeft className='ml-2' />
                </LoadingButton>

                <button type='button' className="bg-[#251f3e] text-white hover:opacity-80 w-full flex justify-center px-4 py-2 rounded-xl  text-sm md:text-base">
                  افزودن به علاقه مندی ها
                  <Heart className='ml-3' />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Button Section for mobile */}
        {/* Buttons Section - Absolute positioned over image */}
        <div className='bg-white rounded-lg shadow-lg py-4 px-5 flex md:hidden'>
          {/* Buttons */}
          <div className='w-full flex flex-col justify-center items-center'>
            {/* Price Section */}
            <div className='flex w-full px-4 justify-between items-center border-2 border-green-600 border-dashed p-2 rounded-xl'>
              <div className='flex flex-col items-start'>
                {price_discount ? (
                  <>
                    <div className='flex items-center'>
                      <div className='text-sm md:text-lg text-gray-900 font-bold mr-2'>ریال</div>
                      <div className='text-2xl md:text-4xl text-gray-900'>{(price_discount).toLocaleString('ar-EG')}</div>
                      <div className='ml-2 px-3 py-1 bg-[#cf741e] text-white text-xs md:text-sm rounded-full'>تخفیف ویژه</div>
                    </div>
                    <div className='flex items-center mt-1 relative'>
                      <div className='text-sm text-gray-400 font-bold mr-2'>ریال</div>
                      <div className='text-lg text-gray-400'>{(price_real).toLocaleString('ar-EG')}</div>
                      {/* Custom diagonal line through the original price */}
                      <div className="absolute top-1/2 inset-x-0 h-[1.5px] w-full -rotate-12 bg-red-500"></div>
                    </div>
                  </>
                ) : (
                  <div className='flex items-center text-gray-900'>
                    <div className='text-lg font-bold mr-2'>ریال</div>
                    <div className='text-4xl'>{(price_real).toLocaleString('ar-EG')}</div>
                  </div>
                )}
              </div>
              <div className='text-base md:text-xl font-semibold text-gray-900'>قیمت</div>
            </div>

            {/* Buttons Section */}
            <div className='flex flex-col space-y-2 mt-6 w-full justify-between items-center'>

              <LoadingButton disabled={addToCartMutation.isPending} isLoading={addToCartMutation.isPending} onClick={attToBasketHandler} className="text-white flex justify-center items-center w-full pink-gradient-bg px-4 py-1.5 rounded-xl text-sm md:text-lg">
                خرید دوره
                <SquareArrowUpLeft className='ml-2' />
              </LoadingButton>

              <button type='button' className="bg-[#251f3e] text-white hover:opacity-80 w-full flex justify-center px-4 py-2 rounded-xl  text-sm md:text-base">
                افزودن به علاقه مندی ها
                <Heart className='ml-3' />
              </button>
            </div>

          </div>
        </div>


        <div className="flex flex-col-reverse md:flex-row px-0 mt-1 space-x-0 md:mt-4 md:px-6 md:space-x-4">

          {/* Left Side (Sticky Side Bar) */}
          <div className="md:w-1/3 space-y-6 mt-6 md:mt-1.5 px-4 md:px-0">
            {/* <div className="bg-red-500 rounded-md overflow-hidden">
            <h5 className="text-white text-lg p-2">Sticky Pens</h5>
            {["Stinky Footer", "Stick Up", "Sticky Sidebar"].map((item, index) => (
              <a key={index} href="#" className="block bg-gray-100 bg-opacity-80 hover:bg-blue-400 hover:text-black p-2 text-sm">{item}</a>
            ))}
          </div> */}

            <div className=' w-full flex justify-center items-center flex-col'>

              {/* Course Information */}
              <div className='w-full text-xs md:text-sm text-gray-900 flex flex-col px-4 bg-white rounded-lg py-5'>
                {/* Item */}
                {/* <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex grow before_style_course_info'>
                  <span className='mr-1'>هنرجو</span>
                  <span>{(memberCount + 2) || 0}</span>
                </div>

                <div className=''>
                  تعداد شرکت کننده ها
                </div>

                <Users size={20} className="ml-2" />
              </div> */}

                {/* Item */}
                <div className='flex justify-center items-center py-4'>

                  <div className='flex grow before_style_course_info'>
                    <span>{courseLanguageMap[courseLanguage] || 'فارسی'}</span>
                  </div>

                  <div className='text-right'>
                    زبان آموزشی
                  </div>

                  <Languages size={20} className="ml-2" />
                </div>

                {/* Item */}
                <div className='flex justify-center items-center py-4'>

                  <div className='flex grow before_style_course_info'>
                    <span>{formatDurationWithPersian(course_duration)}</span>
                  </div>

                  <div className='text-right'>
                    مدت زمان آموزش
                  </div>

                  <Timer size={20} className="ml-2" />
                </div>

                {/* Item */}
                {/* <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex flex-grow before_style_course_info'>
                  <span>{courseTypeMap[course_type]}</span>
                </div>

                <div className=''>
                  نوع دوره
                </div>

                <Cast size={20} className="ml-2" />
              </div> */}

                {/* Item */}
                <div className='flex justify-center items-center py-4'>

                  <div className='flex grow before_style_course_info'>
                    <span className='mr-1'>فصل</span>
                    <span>{course_objects && course_objects.length}</span>
                  </div>

                  <div className=''>
                    سرفصل های این دوره
                  </div>

                  <BookAudio size={20} className="ml-2" />
                </div>

                {/* Item */}
                <div className='flex justify-center items-center py-4'>

                  <div className='flex grow before_style_course_info'>
                    <span>{is_have_licence ? 'دارد' : 'ندارد'}</span>
                  </div>

                  <div className=''>
                    گواهی
                  </div>

                  <Scroll size={20} className="ml-2" />
                </div>
              </div>

              {/* Course Information Second Card */}
              <div className='w-full text-gray-900 flex flex-col mt-4 px-8 text-xs md:text-sm  bg-white rounded-lg py-5'>
                {/* Item */}
                <div className="w-full flex justify-end items-center border-b border-gray-300 py-4">

                  <span>{createAtDateInJalaliFormat}</span>
                  <span className='ml-2'>   : تاریخ انتشار  </span>
                  <Calendar size={18} className="ml-2" />
                </div>

                {/* Item */}
                <div className="w-full flex justify-end items-center border-b border-gray-300 py-4">
                  <div className='flex justify-between w-1/5'>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        strokeWidth={1}
                        size={18}
                        fill={index < (score || 0) ? '#facc15' : 'gray'}
                        stroke="none"
                      />
                    ))}
                  </div>
                  <span className='ml-2'> : امتیاز کاربران</span>
                  <Star size={18} className="ml-2" />
                </div>

                {/* Item */}
                <div className="w-full flex flex-col border-b border-gray-300 py-4">

                  <div className='flex w-full justify-end'>
                    <span className='ml-2'>  دسته بندی  </span>
                    <FolderClosed size={18} className="ml-2" />
                  </div>

                  <div className='text-right text-xs mt-4'>
                    {courseCategoryName}
                  </div>
                </div>

                {/* Item */}
                {/* <div className="w-full flex flex-col py-4">

                  <div className='flex w-full justify-end'>
                    <span className='ml-2'>  لینک کوتاه  </span>
                    <Link size={18} className="ml-2" />
                  </div>

                  <div className='text-right text-xs p-2 items-center mt-4 flex justify-between border border-gray-300 rounded-md'>
                    <span>
                      -
                    </span>
                    <Copy size={18} />
                  </div>
                </div> */}

              </div>

              {/* Course Information Teacher Info */}
              <div
                ref={stickyRef}
                className={` flex ${
                  isSticky ? 'fixed top-20  w-[426px]' : 'w-full'
                }`}
              >
                {coachData && <TeacherInfoSection coach={coachData} />}
              </div>

            </div>

            {/* ******************** LAST ITEM STICKY WITH REF ************** */}

            {/* <div
            ref={stickyRef}
            className={`bg-red-500 rounded-md overflow-hidden ${
              isSticky ? 'fixed top-20  w-1/3' : ''
            }`}
          >
            <h5 className="text-white text-lg p-2">More Cool Stuff</h5>
            {["Boxes", "Riveting Rivets"].map((item, index) => (
              <a key={index} href="#" className="block bg-gray-100 bg-opacity-80 hover:bg-blue-400 hover:text-black p-2 text-sm">{item}</a>
            ))}
          </div> */}
          </div>

          {/* Rigth Side */}
          <div className="md:w-2/3">
            <div className='flex flex-col justify-center items-center px-0 '>

              {/* courseCharacteristics */}
              <div className='w-full'>
                <CourseCharacter />
              </div>

              {/* Video Sample Gallery */}
              <div className='w-full bg-white px-6 pb-10 pt-6 rounded-t-lg shadow-lg'>
                <VideoSampleGallery sampleMedia={sample_media} />
              </div>

              {/* Course Details information */}
              <div className='w-full bg-white px-4 pb-10 pt-6 rounded-b-lg'>
                <CourseDetails courseDescriptionLong={description_long} courseDescriptionShort={description} />
              </div>

              {/* CourseSchedule */}
              {/* <div className='w-full mt-12 py-8 bg-black rounded-lg'>
              <CourseSchedule />
            </div> */}

              {/* Commen Course Swiper Section */}
              {/* <div className='w-full  px-4 md:px-0 pt-10 rounded-lg pb-3 mt-6'>
              <h3 className='text-center mb-8 text-lg md:text-2xl font-semibold text-gray-200'>
                دوره های مشابه
              </h3>
              <CommenCourseSwiper />
            </div> */}

              {/* Get a List of Course Based on Category */}
              {/* <div className='w-full px-6 py-4'>
              <button type='button' className=" bg-purple-800 text-white w-full hover:bg-blue-900 px-4 py-2 rounded mr-2 text-sm">
                مشاهده دوره های بیشتر
              </button>
            </div> */}

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
    </div>
  );
}
