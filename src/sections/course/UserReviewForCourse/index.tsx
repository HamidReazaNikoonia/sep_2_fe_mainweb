/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/no-useless-fragment */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export default function UserReviewForCourse() {
  return (
    <>
      <div className="pt-8 text-gray-600 dark:bg-gray-900 dark:text-gray-300" id="reviews">

        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 xl:px-6">

          <div className="mb-10 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-xl font-bold text-gray-100 dark:text-white md:text-2xl">
              نظرات برتر هنرجویان
            </h2>
          </div>

          <div className="flex">
            <Swiper

              spaceBetween={10}
              autoplay={{
                delay: 4500,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
              loop
              grabCursor
              modules={[Autoplay, Pagination]}
              className="swiper_review"
            >

              <SwiperSlide>

                <div
                  dir="rtl"
                  className=" rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none"
                >
                  <div className="flex gap-4">
                    <img className="size-12 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg" alt="user avatar" width="400" height="400" loading="lazy" />
                    <div>
                      <h6 className="text-lg font-medium text-gray-700 dark:text-white">زهرا احمدی </h6>
                      <p className="mt-1 text-xs text-gray-600">هنر جوی این دوره</p>
                    </div>
                  </div>
                  <p className="mt-8 text-xs leading-6">

                    این روزها صفحات اینستاگرام و شبکه های اجتماعی را که بالا و پایین می‌کنیم، ویدیوهای شگفت انگیزی به چشم می‌خورند که بدون شک ما را حیرت زده کردند؛ ویدیوهایی که علاوه بر جذاب بودن، متفاوت از نمونه‌هایی هستند که تا به حال داشتیم
                    این روزها صفحات اینستاگرام و شبکه های اجتماعی را که بالا و پایین می‌کنیم، ویدیوهای شگفت انگیزی به چشم می‌خورند که بدون شک ما را حیرت زده کردند؛ ویدیوهایی که علاوه بر جذاب بودن، متفاوت از نمونه‌هایی هستند که تا به حال داشتیم
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>

                <div
                  dir="rtl"
                  className=" rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none"
                >
                  <div className="flex gap-4">
                    <img className="size-12 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg" alt="user avatar" width="400" height="400" loading="lazy" />
                    <div>
                      <h6 className="text-lg font-medium text-gray-700 dark:text-white">زهرا احمدی </h6>
                      <p className="mt-1 text-xs text-gray-600">هنر جوی این دوره</p>
                    </div>
                  </div>
                  <p className="mt-8 text-xs leading-6">

                    این روزها صفحات اینستاگرام و شبکه های اجتماعی را که بالا و پایین می‌کنیم، ویدیوهای شگفت انگیزی به چشم می‌خورند که بدون شک ما را حیرت زده کردند؛ ویدیوهایی که علاوه بر جذاب بودن، متفاوت از نمونه‌هایی هستند که تا به حال داشتیم
                    این روزها صفحات اینستاگرام و شبکه های اجتماعی را که بالا و پایین می‌کنیم، ویدیوهای شگفت انگیزی به چشم می‌خورند که بدون شک ما را حیرت زده کردند؛ ویدیوهایی که علاوه بر جذاب بودن، متفاوت از نمونه‌هایی هستند که تا به حال داشتیم
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>

                <div
                  dir="rtl"
                  className=" rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none"
                >
                  <div className="flex gap-4">
                    <img className="size-12 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg" alt="user avatar" width="400" height="400" loading="lazy" />
                    <div>
                      <h6 className="text-lg font-medium text-gray-700 dark:text-white">زهرا احمدی </h6>
                      <p className="mt-1 text-xs text-gray-600">هنر جوی این دوره</p>
                    </div>
                  </div>
                  <p className="mt-8 text-xs leading-6">

                    این روزها صفحات اینستاگرام و شبکه های اجتماعی را که بالا و پایین می‌کنیم، ویدیوهای شگفت انگیزی به چشم می‌خورند که بدون شک ما را حیرت زده کردند؛ ویدیوهایی که علاوه بر جذاب بودن، متفاوت از نمونه‌هایی هستند که تا به حال داشتیم
                    این روزها صفحات اینستاگرام و شبکه های اجتماعی را که بالا و پایین می‌کنیم، ویدیوهای شگفت انگیزی به چشم می‌خورند که بدون شک ما را حیرت زده کردند؛ ویدیوهایی که علاوه بر جذاب بودن، متفاوت از نمونه‌هایی هستند که تا به حال داشتیم
                  </p>
                </div>
              </SwiperSlide>

            </Swiper>

          </div>
        </div>
      </div>
    </>
  );
}
