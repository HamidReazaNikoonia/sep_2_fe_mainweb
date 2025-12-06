/* eslint-disable style/multiline-ternary */
/* eslint-disable react/no-missing-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable style/jsx-one-expression-per-line */
'use client';
import type { ICourseTypes } from '@/types/Course';
import { CirclePause, CirclePlay, CircleX, GraduationCap, Headset, Phone, User } from 'lucide-react';
import Image from 'next/image';

import React, { useEffect, useRef, useState } from 'react';
import { SERVER_API_URL, SERVER_FILES_URL } from '@/API/config';
import CommentLayout from '@/components/Comment';
import { Button } from '@/components/ui/button';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';
// import testPosterImg from '@/public/assets/images/webmaster-course-cover-1.png';
// import CourseScheduleV1 from '@/sections/course/CourseSchedule/CourseScheduleV1';
// import CourseScheduleV2 from '@/sections/course/CourseSchedule/CourseScheduleV2';
import CourseScheduleV3 from '@/sections/course/CourseSchedule/CourseScheduleV3';
import TabularSection from '@/sections/courseSessionSpecific/TabularSection';
import { truncateDescription } from '@/utils/Helpers';
import { getCourseSessionPrograms } from '@/API/course';
import { useQuery } from '@tanstack/react-query';

const flattenCoachData = (response: any) => {
  return response
    .filter((item: any) => item.status === 'active')
    .map((item: any) => ({
      first_name: item.coach.first_name,
      last_name: item.coach.last_name,
      avatar: item.coach.avatar,
      price_real: item.price_real,
      price_discounted: item.price_discounted,
      program_type: item.program_type,
      is_fire_sale: item.is_fire_sale,
    }));
};

const courseSessionData = {
  title: 'دوره وبمستر',
  description: '',
  coaches: [
    {
      name: 'حمید نیکونیا',
      avatar: 'https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png',
      price_real: 800000,
      price_discount: null,
      first_name: 'حمید',
      last_name: 'نیکونیا',
    },
    {
      name: 'حمید نیکونیا',
      avatar: 'https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png',
      price_real: 900000,
      price_discount: 8000000,
      first_name: 'حمید',
      last_name: 'نیکونیا',
    },
    {
      name: 'حمید نیکونیا',
      avatar: 'https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png',
      price_real: 900000,
      price_discount: 8000000,
      first_name: 'حمید',
      last_name: 'نیکونیا',
    },
  ],
};

export default function page({ params }: { params: { slug: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  const [dataFromServer, setDataFromServer] = useState<ICourseTypes | null>(null);

  // coach data from server
  const [coaches, setCoaches] = useState<any[]>([]);

  const { data: programs, isLoading, error } = useQuery({
    queryKey: ['coursePrograms', dataFromServer?.id],
    queryFn: () => getCourseSessionPrograms(dataFromServer?.id as string),
    enabled: !!dataFromServer?.id,
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  console.log('programs', programs);

  const originalPrice = 9000000;
  const price = 800000;

  const handleVideoToggle = () => {
    if (!showVideo) {
      // First click - show video and start playing
      setShowVideo(true);
      setIsPlaying(true);
      // Use setTimeout to ensure video element is rendered before playing
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 100);
    } else {
      // Subsequent clicks - toggle play/pause
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${SERVER_API_URL}/course-session/${params.slug}`, {
          next: { revalidate: 60 },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setDataFromServer(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (programs?.data?.programs) {
      if (programs?.data?.programs?.length > 0) {
        const coaches = flattenCoachData(programs?.data?.programs as any);
        setCoaches(coaches);
      }
    }
  }, [programs]);

  const isMobileScreen = useResponsiveEvent(768, 200);

  const isMediaImageAvailable = !!dataFromServer?.preview_media?.preview_image_mobile?.file_name && !!dataFromServer?.preview_media?.preview_image_desktop?.file_name;

  return (
    <div dir="rtl" className="w-full bg-gray-200">
      {/* Header Hero */}
      <div className="container mx-auto flex flex-col gap-2 pb-4 md:pb-12 pt-[68px] md:pt-24 md:flex-row ">
        {/* Rigth Section  */}
        <div className="flex w-full flex-col rounded-b-2xl md:rounded-2xl border bg-gradient-to-r  from-pink-500 to-purple-600 pb-16 text-xs hover:from-pink-600 hover:to-purple-700 md:w-3/5">

          {/* Title and properties */}
          <div dir="rtl" className="w-full ">

            {/* Header Title */}
            <div className="rounded-2xl p-6 ">
              <div className="flex flex-col">
                <h1 className="w-full text-xl md:text-2xl font-semibold text-white">
                  {dataFromServer?.title || ''}
                </h1>

                <ul style={{ transform: 'translateY(15px)' }} className="flex flex-wrap justify-start gap-x-4 rounded-2xl bg-white px-4 py-1.5 md:py-2.5">

                  <li className="mot-course-desc-item flex items-center">
                    <div className="attr-icon">
                      <Headset size={isMobileScreen ? 14 : 18} color="gray" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-800 mr-2">پشتیبانی دائمی</span>
                  </li>

                  <li className="mot-course-desc-item flex items-center">
                    <div className="attr-icon">
                      <Headset size={isMobileScreen ? 14 : 18} color="gray" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-800 mr-2">پشتیبانی دائمی</span>
                  </li>

                </ul>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="w-full">
            <div className="top-5 flex h-96 w-full justify-center bg-transparent relative">
              {/* Play/Pause Button */}
              {!!dataFromServer?.preview_media?.video_file?.file_name && (
                <div
                  onClick={handleVideoToggle}
                  className="absolute left-2/4 top-2/4 size-16 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                >
                  <span className={`aticon ${isPlaying ? 'hidden' : 'block'}`} data-icon=""></span>
                  <CirclePlay className={`size-20 text-white ${isPlaying ? 'hidden' : 'block'} hover:scale-110 transition-transform drop-shadow-lg`} color="white" />
                  <CirclePause className={`size-20 text-white ${isPlaying ? 'block' : 'hidden'} hover:scale-110 transition-transform drop-shadow-lg`} color="white" />
                </div>
              )}
              {/* Poster Image - Only visible when video is not shown */}

              {/* If Media Image is Available */}
              {!isMediaImageAvailable && (
                <Image
                  src={`${SERVER_FILES_URL}/${dataFromServer?.tumbnail?.file_name}`}
                  width={100}
                  height={100}
                  className={`${showVideo ? 'hidden' : 'block'} w-full h-full object-cover`}
                  alt={dataFromServer?.title || ''}
                />
              )}
              {/* Poster Image - Only visible when video is not shown */}
              {!!dataFromServer?.preview_media?.preview_image_mobile?.file_name && isMobileScreen && (
                <Image
                  src={`${SERVER_FILES_URL}/${dataFromServer?.preview_media?.preview_image_mobile?.file_name}`}
                  width={100}
                  height={100}
                  className={`${showVideo ? 'hidden' : 'block'} w-full h-full object-cover`}
                  alt={dataFromServer?.title || ''}
                />
              )}
              {!!dataFromServer?.preview_media?.preview_image_desktop?.file_name && !isMobileScreen && (
                <Image
                  src={`${SERVER_FILES_URL}/${dataFromServer?.preview_media?.preview_image_desktop?.file_name}`}
                  width={100}
                  height={100}
                  className={`${showVideo ? 'hidden' : 'block'} w-full h-52 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover`}
                  alt={dataFromServer?.title || ''}
                />
              )}

              {/* Video Player - Only visible after first play click */}
              {!!dataFromServer?.preview_media?.video_file?.file_name && (
                <video
                  ref={videoRef}
                  className={`${showVideo ? 'block' : 'hidden'} w-full h-full object-cover`}
                  src={`${SERVER_FILES_URL}/${dataFromServer?.preview_media?.video_file?.file_name}`}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  controls
                />
              )}
            </div>
          </div>

        </div>

        {/* Left Section */}
        <div className="p-2 md:p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-xl md:w-2/5">
          <div className="gradient-to-r flex size-full rounded-2xl bg-white">
            {/* Item */}
            <div className="flex w-full flex-col gap-y-6 px-4 py-6">

              <div className='w-full flex flex-col justify-between h-full'>
                <div>
                  <div className="w-full">

                    {/* Course Session Description */}
                    <div className="w-full border-y border-r border-r-red-500 py-2 pr-3 text-right text-sm leading-7">
                      {dataFromServer?.description && truncateDescription(dataFromServer?.description as string, 350)}
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 hidden w-full justify-end md:flex">
                      <Button
                        variant="outline"
                        className="flex-1  bg-gradient-to-r from-pink-500 to-purple-600 text-sm text-white hover:text-white hover:from-pink-600 hover:to-purple-700"
                      >
                        <Phone className="ml-0 size-10" />
                        مشاوره رایگان
                      </Button>
                    </div>
                  </div>

                  {/* Coaches */}
                  <div className="flex w-full flex-col">
                    {/* Header */}
                    {coaches?.length > 0 && (
                      <h3 className="mt-4 text-right text-sm font-semibold text-gray-800">
                        لیست اساتید این دوره آموزشی
                      </h3>
                    )}

                    {/* Lists */}
                    <ul className="flex flex-col gap-y-2  pt-4">

                      {coaches?.length === 0 && (
                        <div className="flex flex-row py-6 items-center gap-x-2 text-gray-500 text-sm">
                          <span>
                            <CircleX className="text-gray-300" />
                          </span>
                          <span>
                            در حال حاضر اساتیدی برای این دوره آموزشی در دسترس نیست.
                          </span>
                        </div>
                      )}

                      {coaches?.length > 0 && coaches?.map((coach: any) => (
                        <li className=" flex w-full flex-col items-center border-y border-r-4 border-gray-300 border-r-red-500 py-1.5 pr-2 md:flex-row">
                          <div className="flex w-full flex-row items-center">
                            {/* Avatar */}
                            <div>
                              <div className="mx-1 flex size-11 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-lg md:size-12">
                                {coach?.avatar?.file_name ? (
                                  <img alt={coach?.first_name} src={`${SERVER_FILES_URL}/${coach?.avatar?.file_name}`} className="rounded-full" />
                                ) : (
                                  <User className="size-8 text-gray-100" />
                                )}
                              </div>
                            </div>

                            {/* Coach Name */}
                            <div className="mr-2 flex flex-col items-start gap-y-1 text-xs md:text-sm">
                              <span className="text-gray-900 md:text-sm">
                                {coach?.first_name} {coach?.last_name}
                              </span>
                              <span className="text-gray-500 gap-x-1 flex flex-row items-center md:text-xs">
                                <span>نوع دوره:</span>
                                <span>
                                  {coach?.program_type === 'ON-SITE' ? 'حضوری' : 'آنلاین'}
                                </span>
                              </span>
                            </div>

                            {/* Price */}
                            <div className="ml-0 mr-1 flex flex-1 flex-row-reverse items-center gap-3 text-left md:ml-4">
                              <div className="flex flex-col items-center gap-1">
                                <div>
                                  <span className="text-sm font-bold text-gray-900 md:text-base">{coach?.is_fire_sale ? formatPrice(coach?.price_discounted) : formatPrice(coach?.price_real)}</span>
                                  <span className="text-xs text-gray-500">ریال</span>
                                </div>

                                {coach?.price_discounted && coach?.is_fire_sale && (
                                  <div className="text-[10px] text-gray-400 line-through">
                                    {formatPrice(coach?.price_real)} ریال
                                  </div>
                                )}
                              </div>

                            </div>
                          </div>

                          {/* Buttons Mobile Screen */}
                          <div className="mt-4 flex w-full items-center justify-end gap-2 md:hidden">
                            <Button
                              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:w-auto"
                            >
                              جزيیات
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-pink-500 text-xs text-pink-500 hover:bg-pink-50"
                            >
                              <Phone className="ml-0 size-4" />
                              مشاوره
                            </Button>
                          </div>

                          {/* Button Desktop Screen */}
                          <Button
                            className="mt-3 hidden w-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 text-xs hover:from-pink-600 hover:to-purple-700 md:mt-0 md:block md:w-auto"
                          >
                            جزيیات
                          </Button>
                        </li>
                      ))}

                     
                    </ul>
                  </div>
                </div>

                <div>
                {coaches?.length > 0 && (
                        <div className="mt-4 w-full cursor-pointer flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 py-2 text-center text-xs text-white hover:from-pink-600 hover:to-purple-700 md:mt-0 md:text-sm">
                          <GraduationCap className="ml-2 size-6 inline-block" />
                          <span>مشاهده لیست کامل اساتید این دوره آموزشی</span>
                        </div>
                      )}
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Description Tabular Section */}
      <div className="container mx-auto pb-0 md:pb-20">
        <TabularSection />
      </div>

      {/* CourseSchedule */}
      <div className="w-full py-8 bg-gray-300">
        <div className="w-full  container mx-auto ">
          <CourseScheduleV3 courseId={dataFromServer?.id || ''} />
        </div>
      </div>

      <div className="w-full bg-gray-300">
        {/* Comment Section */}
        <CommentLayout type="product" productId={dataFromServer?.id || ''} />
      </div>

    </div>
  );
}
