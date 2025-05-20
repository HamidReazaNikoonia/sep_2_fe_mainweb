'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getCategoriesRequest } from '@/API/course';
import { useQuery } from "@tanstack/react-query";

import { DatePicker } from "react-advance-jalaali-datepicker";
import { isEmpty } from '@/utils/Helpers';

export default function CourseListFilter({filterHandler}) {

  const [showModal, setShowModal] = useState(false);
  const [selectedFilterDateFrom, setselectedFilterDateFrom] = useState();
  const [selectedFilterDateTo, setselectedFilterDateTo] = useState();
  const [searchQuery, setsearchQuery] = useState('');
  const [selectCategory, setselectCategory] = useState("ALL");
  const [courseType, setcourseType] = useState("ALL");


  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: courseCategories, isLoading, isError, isSuccess } = useQuery({
    queryFn: async () => await getCategoriesRequest(),
    queryKey: ["course_category"], //Array according to Documentation
  });


  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);




  // const changeDataPickerFrom = (unix, formatted) => {
  //   setselectedFilterDateFrom(formatted)
  //   console.log(unix); // returns timestamp of the selected value, for example.
  //   console.log(formatted);
  // }


  // const changeDataPickerTo = (unix, formatted) => {
  //   setselectedFilterDateTo(formatted)
  //   console.log(unix); // returns timestamp of the selected value, for example.
  //   console.log(formatted);
  // }


  const triggertFilterHandler = (e) => {
    e.preventDefault();
    setShowModal(false);

    const queryOptions = {};

    if  (!isEmpty(searchQuery)) queryOptions.keyword = searchQuery;
    if (selectedFilterDateFrom) queryOptions.date_from = selectedFilterDateFrom;
    if (selectedFilterDateTo) queryOptions.date_to = selectedFilterDateTo;
    if(selectCategory && selectCategory !== "ALL") queryOptions.course_category = selectCategory;
    if(courseType && courseType !== "ALL") queryOptions.course_type = courseType;



    
    filterHandler(queryOptions);
  }



  const resetFormHandler = () => {
    setsearchQuery('');
    setselectCategory('ALL');
    setcourseType('ALL');
    setShowModal(false);
    setselectedFilterDateFrom(undefined);
    setselectedFilterDateTo(undefined);


    filterHandler({});
  }


  // useEffect(() => {
  // setShowModal(isOpen)


  // }, [isOpen])


  // if (!showModal) return null;
  return (

    <>

      <button className='flex hover:opacity-60' onClick={() => setShowModal(true)}>
        <SlidersHorizontal />
        <span className='ml-4'> فیلتر کنید </span>
      </button>

      {showModal && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div ref={dropdownRef} className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex  w-full bg-[#1f2937e0] outline-none focus:outline-none">

                <>
                  <div className="m-10 w-screen max-w-screen-md">

                    <div className="flex flex-col px-12 md:px-2">
                      <div className="rounded-xl ">
                        <form className="">
                          <div
                            className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                            <input type="name" name="search"
                              value={searchQuery}
                              onChange={(e) => setsearchQuery(e.target.value)}
                              className="h-12 w-full cursor-text rounded-md border border-gray-500 bg-gray-700 py-4 px-4 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-right text-white"
                              placeholder="عنوان جستجو" />
                            <div className=' hidden md:block'>
                            <Search color='gray' className='ml-4' />
                            </div>
                          </div>

                          <div
                            className="grid grid-cols-1 gap-6 md:grid-cols-2  text-right">
                            <div className="flex flex-col">
                              <label htmlFor="course_type"
                                className="text-xs mb-1 font-medium text-stone-100">دسته بندی</label>

                              <select id="course_type"
                                value={courseType}
                                onChange={(e) => setcourseType(e.target.value)}
                                className="text-right text-xs mt-2 block w-full cursor-pointer rounded-md border border-gray-500 bg-gray-700 px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white">
                                <option value="ALL">همه</option>
                                <option value="HOZORI" >آنلاین</option>
                                <option value="OFFLINE">حضوری</option>
                              </select>
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="course_subject"
                                className="text-xs mb-1 font-medium text-stone-100">موضوع</label>

                              <select id="course_subject"
                                value={selectCategory}
                                onChange={(e) => setselectCategory(e.target.value)}
                                className="text-right text-xs mt-2 block w-full cursor-pointer rounded-md border border-gray-500 bg-gray-700 px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white">
                                      <option value="ALL">همه</option>
                                {(isSuccess && Array.isArray(courseCategories)) && courseCategories.map((item, index) => (
                                  <option value={item._id} key={item._id}>{item.name}</option>
                                ))}
                              </select>
                            </div>



                            {/* <div className="flex flex-col">
                              <label htmlFor="status"
                                className="text-sm font-medium text-stone-600">Status</label>

                              <select id="status"
                                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <option>Dispached Out</option>
                                <option>In Warehouse</option>
                                <option>Being Brought In</option>
                              </select>
                            </div> */}

                            {/* <div className='flex '>
                            <DateRangePicker
          placeholderStart="تاریخ شروع"
          placeholderEnd="تاریخ پایان"
          format="jYYYY/jMM/jDD"
          onChangeStart={changeDataPickerFrom}
          onChangeEnd={changeDataPickerTo}
          idStart="datePicker_from"
          idEnd="datePicker_to"
          renderPointer={true}
          customClassStart="custom_style"
          customClassEnd="custom_style"

        />
                            </div> */}


                            {/* <div className="flex flex-col">
                              <label htmlFor="date"
                                className="text-xs mb-1 font-medium text-stone-100"> تا تاریخ</label>
                             
                              <DatePicker placeholder=" " format="jYYYY/jMM/jDD"
                                onChange={changeDataPickerTo} preSelected={selectedFilterDateTo} cancelOnBackgroundClick inputTextAlign="center"
                                id="datePicker_to"  customClass="custom_style"
                                newThemeColor="#2f4699" />
                            </div> */}


                            {/* <div className="flex flex-col">
                              <label htmlFor="date"
                                className="text-xs mb-1 font-medium text-stone-100">شروع از تاریخ</label>
                            
                              <DatePicker placeholder=" " format="jYYYY/jMM/jDD"
                                onChange={changeDataPickerFrom} preSelected={selectedFilterDateFrom} cancelOnBackgroundClick inputTextAlign="center"
                                id="datePicker_from"  customClass="custom_style"
                                newThemeColor="#2f4699" />
                            </div> */}
                          </div>

                          <div className="mt-10 flex w-full flex-col md:flex-row justify-end ">
                            <button onClick={() => resetFormHandler()}
                              className="text-xs rounded-lg mb-4 md:mb-0 mr-0 md:mr-6 bg-gray-200 px-8 py-2 font-semibold text-gray-700 outline-none hover:opacity-80 focus:ring">پاک کردن فیلتر</button>
                            <button
                            onClick={(e) => triggertFilterHandler(e)}
                              className=" text-xs font-semibold rounded-lg bg-blue-600 px-8 py-2 text-white outline-none hover:opacity-80 focus:ring">جستجو</button>
                          </div>
                        </form>
                      </div>
                    </div>

                  </div>

                </>
              </div>
            </div>
          </div>
          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )

}
