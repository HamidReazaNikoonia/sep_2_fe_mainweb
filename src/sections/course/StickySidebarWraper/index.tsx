'use client'
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment-jalaali';
import Image from 'next/image'
import toast from 'react-hot-toast';

// Icons
import { Heart, ShoppingBasket, Users, Languages, Link, Timer, Cast, Copy, BookAudio, Scroll, Calendar, Star, FolderClosed } from 'lucide-react';


import { useCartStore } from '@/_store/Cart';

// sections
import CourseCharacter from '@/sections/course/CourseCharacter';
import VideoSampleGallery from '@/sections/course/VideoSampleGallery';
import CourseDetails from '@/sections/course/CourseDetails';

// assets
import SampleImage from '@/public/assets/images/product_placeholder.png'
import UserReviewForCourse from '@/sections/course/UserReviewForCourse';
import { ICourseTypes } from '@/types/Course';
import TeacherInfoSection from '../SpecificCoursePage/TeacherInfoSection';
import CommenCourseSwiper from '../SpecificCoursePage/CommenCourseSwiper';
import CommentLayout from '@/components/Comment';


// utils
import useResponsiveEvent from '@/hooks/useResponsiveEvent'; // Adjust the path
import useAuth from '@/hooks/useAuth';
import { addProductToCartRequest } from '@/API/cart';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import LoadingButton from '@/components/LoadingButton';

moment.loadPersian({ usePersianDigits: true });


export default function StickyComponent({ dataFromServer }: { dataFromServer: ICourseTypes }) {
  const stickyRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  const isMobileScreen = useResponsiveEvent(768, 200);

  const queryClient = useQueryClient();


  const addToCartMutation = useMutation({
    mutationFn: addProductToCartRequest,
    onSuccess: () => {
      // @ts-expect-error
      queryClient.invalidateQueries("cart");
    },
  });

  const { isAuthenticated } = useAuth();
  const addToCartInLocalStorage = useCartStore(state => state.addToCart)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current && footerRef.current) {
        const stickyTop = stickyRef.current.getBoundingClientRect().top * 15
        const footerTop = footerRef.current.getBoundingClientRect().top
        const viewportHeight = window.innerHeight

        if (footerTop <= viewportHeight) {
          // Footer is in view, set position to static
          setIsSticky(false)
        } else if (window.scrollY > stickyTop) {
          // Scroll position is past the original position of sticky element
          setIsSticky(true)
        } else {
          // Reset to original position
          setIsSticky(false)
        }
      }
    }

    !isMobileScreen && window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileScreen])


  const { price, course_duration, course_type, course_subject_header, is_have_licence, score } = dataFromServer;

  const memberCount = (Array.isArray(dataFromServer.member) ? dataFromServer.member?.length : 0);
  const courseLanguage: string = (dataFromServer?.course_language || "FA");
  const createAtDateInJalaliFormat = moment(dataFromServer?.createdAt).format('jYYYY jMMMM jD');
  const courseCategoryName = (dataFromServer.course_category?.name || '');


  const courseLanguageMap: {
    [key: string]: string,
  } = {
    "FA": "فارسی",
    "EN": "انگلیسی"
  }

  const courseTypeMap: {
    [key: string]: string,
  } = {
    "HOZORI": "حضوری",
    "OFFLINE": "آنلاین"
  }



  const attToBasketHandler = () => {
    if (dataFromServer) {
      // addToCart(dataFromServer);
      toast.success('محصول به سبد خرید شما اضافه شد'); // Displays a success message
       // if user authenticated, add product to cart in database
    // Send a request to the server to add the product to the cart
    if (isAuthenticated) {
      console.log('Add course to cart in database');
      console.log({dataFromServer, isAuthenticated})
      addToCartMutation.mutate({ courseId: dataFromServer._id, quantity: 1 });
    } else {
      // Add product to cart in local storage
      addToCartInLocalStorage(dataFromServer);
    }
      
      return true;
    }

    toast.error('متاسفانه محصوصل در دسترس نمیباشد')
    return false
  }

  return (
    <div className=" mt-12">
      <div className="flex flex-col-reverse md:flex-row">

        {/* Left Side (Sticky Side Bar) */}
        <div className="md:w-1/3 space-y-6 mt-6 md:mt-0 px-4 md:px-0">






          {/* <div className="bg-red-500 rounded-md overflow-hidden">
            <h5 className="text-white text-lg p-2">Sticky Pens</h5>
            {["Stinky Footer", "Stick Up", "Sticky Sidebar"].map((item, index) => (
              <a key={index} href="#" className="block bg-gray-100 bg-opacity-80 hover:bg-blue-400 hover:text-black p-2 text-sm">{item}</a>
            ))}
          </div> */}

          <div className=' w-full flex justify-center items-center flex-col'>
            {/* Buttons */}
            <div className=' w-full flex flex-col justify-center items-center px-2'>
              {/* Price Section */}
              <div className='flex w-full justify-between items-center border-2 border-green-600 border-dashed p-4 rounded-xl'>
                <div className='flex items-center'>
                  <div className='text-lg text-gray-800 font-bold mr-2' >تومان</div>
                  <div className='text-4xl' >{(price).toLocaleString('ar-EG')}</div>
                </div>
                <div className='text-lg text-gray-800' >قیمت</div>
              </div>


              {/* Buttons Section */}
              <div className='flex flex-col space-y-2 mt-6 w-full justify-between items-center'>

                <LoadingButton disabled={addToCartMutation.isPending} isLoading={addToCartMutation.isPending} onClick={attToBasketHandler} className=" text-white  flex justify-center items-center w-full hover:bg-blue-600 px-4 py-3 rounded mr-2 text-sm md:text-lg">
                  افزودن به سبد خرید
                  <ShoppingBasket className='ml-2' />
                </LoadingButton>
                
                <button >
                  
                </button>


                <button className="bg-[#251f3e] text-white hover:opacity-80 w-full flex justify-center px-4 py-3 rounded mr-2 text-sm md:text-lg">
                  افزودن به علاقه مندی ها
                  <Heart className='ml-3' />
                </button>
              </div>

            </div>


            {/* Course Information */}
            <div className='w-full flex flex-col mt-4 px-4 bg-gray-200 rounded-lg py-5'>
              {/* Item */}
              <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex flex-grow before_style_course_info'>
                  <span className='mr-1'>هنرجو</span>
                  <span>{memberCount}</span>
                </div>

                <div className=''>
                  تعداد شرکت کننده ها
                </div>

                <Users size={20} className="ml-2" />
              </div>


              {/* Item */}
              <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex flex-grow before_style_course_info'>
                  <span>{courseLanguageMap[courseLanguage]}</span>
                </div>

                <div className=''>
                  زبان آموزشی
                </div>

                <Languages size={20} className="ml-2" />
              </div>

              {/* Item */}
              <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex flex-grow before_style_course_info'>
                  <span className='mr-1'>ساعت</span>
                  <span>{course_duration}</span>
                </div>

                <div className=''>
                  مدت زمان آموزش
                </div>

                <Timer size={20} className="ml-2" />
              </div>


              {/* Item */}
              <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex flex-grow before_style_course_info'>
                  <span>{courseTypeMap[course_type]}</span>
                </div>

                <div className=''>
                  نوع دوره
                </div>

                <Cast size={20} className="ml-2" />
              </div>



              {/* Item */}
              <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex flex-grow before_style_course_info'>
                  <span className='mr-1'>فصل</span>
                  <span>{course_subject_header}</span>
                </div>

                <div className=''>
                  سرفصل های این دوره
                </div>

                <BookAudio size={20} className="ml-2" />
              </div>


              {/* Item */}
              <div className='flex justify-center items-center py-4 text-sm'>

                <div className='flex flex-grow before_style_course_info'>
                  <span>{is_have_licence ? "دارد" : "ندارد"}</span>
                </div>

                <div className=''>
                  گواهی
                </div>

                <Scroll size={20} className="ml-2" />
              </div>
            </div>


            {/* Course Information Second Card */}
            <div className='w-full flex flex-col mt-4 px-8 text-sm bg-gray-200 rounded-lg py-5'>
              {/* Item */}
              <div className="w-full flex justify-end items-center border-b border-cyan-800 py-4">


                <span>{createAtDateInJalaliFormat}</span>
                <span className='ml-2'>   : تاریخ انتشار  </span>
                <Calendar size={18} className="ml-2" />
              </div>


              {/* Item */}
              <div className="w-full flex justify-end items-center border-b border-cyan-800 py-4">
                <div className='flex justify-between w-1/5'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      strokeWidth={1}
                      size={18}
                      fill={index < (score || 0) ? "#facc15" : "gray"}
                      stroke="none"
                    />
                  ))}
                </div>
                <span className='ml-2'> : امتیاز کاربران</span>
                <Star size={18} className="ml-2" />
              </div>


              {/* Item */}
              <div className="w-full flex flex-col border-b border-cyan-800 py-4">

                <div className='flex w-full justify-end'>
                  <span className='ml-2'>  دسته بندی  </span>
                  <FolderClosed size={18} className="ml-2" />
                </div>


                <div className='text-right text-xs mt-4'>
                  {`آکادمی آموزشی / آموزش های ${courseTypeMap[course_type]} / ${courseCategoryName}`}
                </div>
              </div>


              {/* Item */}
              <div className="w-full flex flex-col py-4">

                <div className='flex w-full justify-end'>
                  <span className='ml-2'>  لینک کوتاه  </span>
                  <Link size={18} className="ml-2" />
                </div>


                <div className='text-right text-xs py-2 items-center mt-4 flex justify-between px-2 border border-cyan-800 rounded-md'>
                  <span>
                    https://aisun-ci.ir/?p=3633
                  </span>
                  <Copy size={18} />
                </div>
              </div>


            </div>


            {/* Course Information Teacher Info */}
            <div 
            ref={stickyRef}
            className={` flex ${
              isSticky ? 'fixed top-20  w-[426px]' : 'w-full'
            }`}
          >
            <TeacherInfoSection />
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
          <div className='flex flex-col justify-center items-center px-0 md:px-8'>
            {/* Thumb Image */}
            <div>
              <Image className=' rounded-lg' alt="" width={700} height={450} src={SampleImage} />
            </div>


            {/* courseCharacteristics */}
            <div className='w-full'>
              <CourseCharacter />
            </div>


            {/* Video Sample Gallery */}
            <div className='w-full bg-gray-300 px-6 py-10 rounded-t-lg shadow-lg' >
              <VideoSampleGallery />
            </div>


            {/* Course Details information */}
            <div className='w-full bg-gray-300 px-6 py-10 rounded-b-lg'>
              <CourseDetails />
            </div>


            

            {/* Commen Course Swiper Section */}
            <div className='w-full  px-4 md:px-0 pt-10 rounded-lg pb-3 mt-6'>
              <h3 className='text-center mb-8 text-lg md:text-2xl font-bold text-gray-800'>
                دوره های مشابه
              </h3>
              <CommenCourseSwiper />
            </div>

            {/* Get a List of Course Based on Category */}
            <div className='w-full px-6 py-10'>
              <button className=" bg-purple-800 text-white w-full hover:bg-blue-900 px-4 py-2 rounded mr-2 text-sm">
                مشاهده دوره های بیشتر
              </button>
            </div>



            {/* User Review */}
            <div className='w-full px-1 py-10'>
              <UserReviewForCourse />
            </div>
          </div>
        </div>




      </div>



      <div ref={footerRef} className="mt-6">
         {/* Comment Section */}
      {/* <CommentLayout type="course" productId={dataFromServer._id} /> */}
      </div>
    </div>
  )
}

