import React from 'react'
import Image from 'next/image';

import cardItemForCourse from '@/public/assets/svg/card_item_home_course.svg';
import cardItemForConsult from '@/public/assets/svg/card_item_home_consult.svg';
import cardItemForConsult2 from '@/public/assets/svg/card_item_home_consult_2.svg';
import cardItemForProduct from '@/public/assets/svg/card_item_home_product.svg';


import ProductCat1 from '@/public/assets/images/product_cat_1.jpg';
import ProductCat2 from '@/public/assets/images/product_cat_2.jpg';
import ProductCat3 from '@/public/assets/images/product_cat_3.jpg';
import ProductCat4 from '@/public/assets/images/product_cat_4.jpg';


import imageforme from '@/public/assets/images/s1.jpg';



import { Button } from '@/components/ui/button';
import Link from 'next/link';


import SvgSport from './SvgSport';
import SvgTelescop from './svgTelescop';
import SvgFemale from './SvgFemale';
import SvgWomen from './SvgWomen';
import SvgMen from './SvgMen';
import SvgKid from './SvgKid';
import SvgPerfeum from './SvgPerfeum';
import SvgMale from './SvgMale';

// styles
import './styles.css';



export default function ProductCategoryCards() {
  return (
    <div className=' py-20 overflow-x-hidden relative bg-white'>
      {/* Course Card */}
      <div className='w-full flex flex-col items-center'>
        {/* Header */}
        <div className='text-xs md:text-xl font-semibold text-pink-700 mb-4 md:mb-6'>
          دسته بندی محصولات
        </div>

        <div className='text-lg text-center md:text-4xl font-semibold px-12 md:px-0 text-black'>
          محصولاتی که به زندگی شما ارزش می دهند
        </div>


        {/* Card Items */}
        <div className='w-full mt-12 px-6 md:px-0 '>
          <div className="flex flex-box-wrapper flex-wrap gap-4 justify-center">

            <a className='w-full md:w-[45%]' href="#" >
              {/* <p className="align-right">لباس ورزشی</p> */}
              <Image alt="product_cat_1" src={ProductCat1} />
                <div className='flex justify-center items-center w-full h-[88%] svg transition'>
                {/* <SvgSport /> */}
                </div>
            </a>

            <a className='w-full md:w-1/2' href="#" >
              {/* <p>محصولات گرافیکی</p> */}
              <Image src={ProductCat2} alt="product_cat_2" />
              <div className='flex justify-center items-center w-full h-[20%] svg transition'>
                {/* <SvgTelescop /> */}
                </div>
            </a>

            

            <a href="#" className='w-full md:w-[50%]' >
              {/* <p>زنانه </p> */}
              <div className='flex justify-center items-center w-full svg transition'>
                {/* <SvgWomen /> */}
                </div>
              <Image src={ProductCat3} alt="product_cat_3" />
            </a>

            <a href="#" className='w-full md:w-[45%]'>
              {/* <p>مردانه</p> */}
               <div className='flex justify-center items-center w-full h-[0%] svg transition'>
                {/* <SvgMen /> */}
                </div>
              <Image src={ProductCat4} alt="pc4" />
            </a>

            
            

           



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



