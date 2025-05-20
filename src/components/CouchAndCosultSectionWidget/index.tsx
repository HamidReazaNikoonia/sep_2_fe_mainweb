'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

import { ChevronLeft } from 'lucide-react';

import './styles.css';

// import CoachImage from '@/public/assets/images/sec-1-l.webp';
import CoachImgBanner from '@/public/assets/images/customer_support_baner.png';

const options1= [
  { value: "option1", label: "مشاوره نوجوانان" },
  { value: "option2", label: "مشاوره مربیان" },
  { value: "option3", label: "مشاوره والدین" },

];


const options2= [
  { value: "HOZORI", label: "مشاوره حضوری" },
  { value: "OFFLINE", label: "مشاوره آنلاین" },

];




export function CustomRadioForm({ options, selectedOption, onChange }) {
  return (
    <form className="flex flex-row gap-3 py-4 mx-auto max-w-lg flex-wrap w-full">
      {options.map((option) => (
        <div key={option.value} className="relative">
          <input
            type="radio"
            id={option.value}
            name="customRadio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => onChange(option.value)}  // Call parent's handler
            className="hidden"
          />
          <label
            htmlFor={option.value}
            className={`cursor-pointer block px-4 py-2 rounded-2xl border transition-all shadow-sm text-center text-sm font-medium
              ${
                selectedOption === option.value
                  ? "yellow-gradient-bg text-black border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </form>
  );
}



export default function CouchAndCosultSectionWidget() {


  const [selectedConsultCategory, setSelectedConsultCategory] = useState(options1[0].value);
  const [selectedConsultType, setSelectedConsultType] = useState(options2[0].value);

  const router = useRouter();


  const handleConsultCategoryChange = (value) => {
    setSelectedConsultCategory(value);  // Update parent state
   
  };

  const handleConsultTypeChange = (value) => {
    setSelectedConsultType(value);  // Update parent state
   
  };

  const reserveSubmitHandler = () => {
    console.log('selectedConsultCategory', selectedConsultCategory);
    console.log('selectedConsultType', selectedConsultType);
    router.push(`/consult?consult_category=${selectedConsultCategory}&consult_type=${selectedConsultType}`);
  }


  return (
    <div className='py-12 px-8 w-full flex flex-col md:flex-row justify-between items-center'>




      {/* Left Section Image */}
      <div className='flex flex-col justify-center items-center '>



        <div className=' px-8 rounded-3xl'>
          <Image width={380} height={380} className='' src={CoachImgBanner} alt='Coach Image' />
        </div>

      </div>


      {/* Rigth Section */}
      <div dir='rtl' className="bg-inherit flex-col flex rounded-xl p-6">
        <h2 className=" md:text-24px text-20px font-bold mt-8 md:mt-0"> پیدا کردن  مشاور </h2>
        <span
          className="mt-3 font-medium text-sm text-gray-800"> قدم اول :  موضوع دلخواهتان را انتخاب کنید. </span>
        <div className="mt-4 flex flex-wrap gap-3">

        <CustomRadioForm
        options={options1}
        selectedOption={selectedConsultCategory}
        onChange={handleConsultCategoryChange}  // Pass handler to child
      />

        </div>

        <span
          className="mt-3 font-medium text-sm text-gray-800"> قدم دوم :   نوع مشاوره را انتخاب کنید. </span>
        <div className='mt-4 flex flex-wrap gap-3'>
        <CustomRadioForm
        options={options2}
        selectedOption={selectedConsultType}
        onChange={handleConsultTypeChange}  // Pass handler to child
      />
        </div>


        <div  className="relative w-full mt-6">
      <button  onClick={reserveSubmitHandler}  className="w-full mt-6 yellow-gradient-bg py-4 rounded-lg  flex justify-center items-center">
         <span className="text-sm"> 
          رزرو مشاوره
         </span>
         <ChevronLeft />
      </button>
   </div>

      </div>
    </div>
  )
}

