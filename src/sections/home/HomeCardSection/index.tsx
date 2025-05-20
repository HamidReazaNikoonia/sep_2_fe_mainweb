import React from 'react'
import Image from 'next/image';

import cardItemForCourse from '@/public/assets/svg/card_item_home_course.svg';
import cardItemForConsult from '@/public/assets/svg/card_item_home_consult.svg';
import cardItemForConsult2 from '@/public/assets/svg/card_item_home_consult_2.svg';
import cardItemForProduct from '@/public/assets/svg/card_item_home_product.svg';



import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeCardSection() {
  return (
    <div className='container mx-auto pb-20 pt-8 md:pt-20 overflow-x-hidden relative px-4 md:px-0'>
      {/* Course Card */}
      <div className='w-full flex flex-col items-center'>
        {/* Header */}
        <div className='text-xs md:text-xl font-semibold text-pink-700 mb-4 md:mb-6'>
          خدمات ما برای شما
        </div>

        <div className='text-lg text-center md:text-4xl font-semibold px-6 md:px-0'>
          برای داشتن زندگی بهتر با آرامش بیشتر
        </div>


        {/* Card Items */}
        <div className='w-full flex justify-center flex-wrap items-center mt-12 '>
          {/* Item */}
          <div className='bg-[#f8f8f8] p-8 flex mr-0 md:mr-8 mb-8 text-right w-full md:w-2/5 justify-end shadow-lg rounded-xl hover:shadow-2xl'>
            {/* Text (Rigth Side) */}
            <div className='flex flex-col items-center justify-center flex-1'>
              <div className='text-lg md:text-2xl mb-2 font-semibold'>
                دوره های آموزشی
              </div>

              <div className='text-xs md:text-sm'>
                برای داشتن زندگی بهتر
              </div>

              <Link href="/course">
                <Button variant="default" className='text-sm mt-8' > نمایش دوره ها</Button>
              </Link>
            </div>

            {/* Icon */}
            <div>
              <Image alt="course" src={cardItemForCourse} width={250} height={250} />
            </div>
          </div>


          {/* Item */}
          <div className='bg-[#f8f8f8] p-8 mb-8 flex text-right w-full md:w-2/5 justify-end shadow-lg rounded-xl hover:shadow-2xl'>
            {/* Text (Rigth Side) */}
            <div className='flex flex-col items-center justify-center flex-1'>
              <div className='text-lg md:text-2xl mb-2 font-semibold'>
                محصولات فرهنگی
              </div>

              <div className='text-xs md:text-sm'>
                برای داشتن زندگی بهتر
              </div>

              <Link href="/product">
                <Button variant="default" className='text-sm mt-8' > نمایش  محصولات</Button>
              </Link>
            </div>

            {/* Icon */}
            <div>
              <Image alt="course" src={cardItemForProduct} width={250} height={250} />
            </div>
          </div>



          {/* Item */}
          <div className='bg-[#f8f8f8] p-8 mr-0 mb-8 md:mr-8 md:mb-0  flex text-right w-full md:w-2/5 justify-end shadow-lg rounded-xl hover:shadow-2xl'>
            {/* Text (Rigth Side) */}
            <div className='flex flex-col items-center justify-center flex-1'>
              <div className='text-lg md:text-2xl mb-2 font-semibold'>
                مشاوره
              </div>

              <div className='text-xs md:text-sm'>
                برای داشتن زندگی بهتر
              </div>

              <Button variant="default" className='text-sm mt-8' >   نمایش مربی ها</Button>
            </div>

            {/* Icon */}
            <div>
              <Image alt="course" src={cardItemForConsult} width={250} height={250} />
            </div>
          </div>



          {/* Item */}
          <div className='bg-[#f8f8f8] p-8 flex text-right w-full md:w-2/5 justify-end shadow-lg rounded-xl hover:shadow-2xl'>
            {/* Text (Rigth Side) */}
            <div className='flex flex-col items-center justify-center flex-1'>
              <div className='text-lg md:text-2xl mb-2 font-semibold'>
                رزرو مشاوره
              </div>

              <div className='text-xs md:text-sm'>
                برای داشتن زندگی بهتر
              </div>

              <Link href="/consult">
                <Button variant="default" className='text-sm mt-8' >  رزرو آنلاین</Button>
              </Link>
            </div>

            {/* Icon */}
            <div>
              <Image alt="course" src={cardItemForConsult2} width={250} height={250} />
            </div>
          </div>
        </div>
      </div>

      {/* Particle */}
      {/* <div className=' absolute w-full top-0 left-0' id="parallax" style={{transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", pointerEvents: "none"}} >
                    <div className="header-shape shape-one" data-depth="0.10" style={{transform: "translate3d(-5.6px, -4.9px, 0px)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", position: "relative", display: "block", left: "90px", top: "0px"}}>
                        <img src="https://i.postimg.cc/J7bRR2cK/shape-1.png" alt="image" />
                    </div>

                    <div className="header-shape shape-two" data-depth="0.30" style={{transform: "translate3d(-16.7px, -14.6px, 0px)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", position: "absolute", display: "block", right: "40px", top: "30px" }}>
                        <img src="https://i.postimg.cc/437TqLx6/shape-2.png" alt="image" />
                    </div>

                    <div className="header-shape shape-three" data-depth="0.40" style={{transform: "translate3d(-22.3px, -19.5px, 0px)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", position: "absolute", display: "block", left: "0px", top: "0px"  }}>
                        <img src="https://i.postimg.cc/63Cx58RT/shape-3.png" alt="image" />
                    </div>

                    <div className="header-shape shape-four" data-depth="0.60" style={{transform: "translate3d(-33.4px, -29.2px, 0px)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", position: "absolute", display: "block", left: "0px", top: "0px"  }}>
                        <img src="https://i.postimg.cc/437TqLx6/shape-2.png" alt="image" />
                    </div>

                    <div className="header-shape shape-five" data-depth="0.20" style={{transform: "translate3d(-11.1px, -9.7px, 0px)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", position: "absolute", display: "block", left: "0px", top: "0px" }} >
                        <img src="https://i.postimg.cc/J7bRR2cK/shape-1.png" alt="image" />
                    </div>

                    <div className="header-shape shape-six" data-depth="0.15" style={{transform: "translate3d(-8.4px, -7.3px, 0px)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", position: "absolute", display: "block", left: "0px", top: "0px"  }}>
                        <img src="https://i.postimg.cc/bNyfpNvN/shape-4.png" alt="image" />
                    </div>

                    <div className="header-shape shape-seven" data-depth="0.50" style={{transform: "translate3d(-27.9px, -24.4px, 0px)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", position: "absolute", display: "block", left: "0px", top: "0px"  }}>
                        <img src="https://i.postimg.cc/9FL5M54P/shape-5.png" alt="image" />
                    </div>

                </div> */}


    </div>
  )
}
