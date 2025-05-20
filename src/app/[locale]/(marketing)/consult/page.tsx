'use client';
import { CustomRadioForm } from '@/components/CouchAndCosultSectionWidget';
import useResponsiveEvent from '@/hooks/useResponsiveEvent';

import AvatarImage from '@/public/assets/images/avatar.png';

import ReserveCalendar from '@/sections/consult/ReserveCalendar';
import { BadgeCheck, Pencil } from 'lucide-react';
import momentJalaali from 'moment-jalaali';

import Image from 'next/image';

import { useRouter, useSearchParams } from 'next/navigation';

import { Suspense, useEffect, useState } from 'react';

type IPortfolioProps = {
  params: Promise<{ locale: string }>;
};

// export async function generateMetadata(props: IPortfolioProps) {
//   const { locale } = await props.params;
//   const t = await getTranslations({
//     locale,
//     namespace: 'Portfolio',
//   });

//   return {
//     title: t('meta_title'),
//     description: t('meta_description'),
//   };
// }

const options1 = [
  { value: 'option1', label: 'مشاوره نوجوانان' },
  { value: 'option2', label: 'مشاوره مربیان' },
  { value: 'option3', label: 'مشاوره والدین' },

];

const consultations = [
  {
    _id: '1',
    first_name: 'مریم ',
    last_name: 'صفدری',
    avatar_image: null,
    description: 'مشاوره خانواده و نوجوان با ۲۰ سال سابقه تدریس',
  },
  {
    _id: '2',
    first_name: 'سید حمید رضا',
    last_name: 'نیکونیا',
    avatar_image: null,
    description: 'مشاوره خانواده و نوجوان با ۲۰ سال سابقه تدریس',

  },
  {
    _id: '3',
    first_name: 'سید حمید رضا',
    last_name: 'نیکونیا',
    avatar_image: null,
    description: 'مشاوره خانواده و نوجوان با ۲۰ سال سابقه تدریس',

  },
  {
    _id: '4',
    first_name: 'سید حمید رضا',
    last_name: 'نیکونیا',
    avatar_image: null,
    description: 'مشاوره خانواده و نوجوان با ۲۰ سال سابقه تدریس',

  },
  {
    _id: '5',
    first_name: 'سید حمید رضا',
    last_name: 'نیکونیا',
    avatar_image: null,
    description: 'مشاوره خانواده و نوجوان با ۲۰ سال سابقه تدریس',

  },
  {
    _id: '6',
    first_name: 'سید حمید رضا',
    last_name: 'نیکونیا',
    avatar_image: null,
    description: 'مشاوره خانواده و نوجوان با ۲۰ سال سابقه تدریس',

  },
];

const findLabel = (value) => {
  const option = options1.find(option => option.value === value);
  return option.label;
};

const options2 = [
  { value: 'HOZORI', label: 'مشاوره حضوری' },
  { value: 'OFFLINE', label: 'مشاوره آنلاین' },

];

// const fetchRepo = async () => {
//   const res = await fetch('http://localhost:9000/v1/course', {
//     next: { revalidate: 60 }, // Enables ISR (Incremental Static Regeneration)
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// };

export default function Page(props: IPortfolioProps) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConsultPgae {...props} />
    </Suspense>
  );
}

function ConsultPgae(props: IPortfolioProps) {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Portfolio',
  // });

  // const coursesData = await fetchRepo();
  // console.log({coursesData: coursesData.data.courses})

  const searchParams = useSearchParams();
  const consultCategoryQueryParam = searchParams.get('consult_category');
  const consultTypeQueryParam = searchParams.get('consult_type');

  // UI STATE
  const [ShowConsultCategory, setShowConsultCategory] = useState(false);
  const [ShowConsultType, setShowConsultType] = useState(false);

  // Add new state for selected consultation
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [selectedConsultCategory, setSelectedConsultCategory] = useState(consultCategoryQueryParam || options1[0].value);
  const [selectedConsultType, setSelectedConsultType] = useState(consultTypeQueryParam || options2[0].value);

  const isMobileScreen = useResponsiveEvent(768, 200);

  // Reservation time state
  const [selectedDateState, setSelectedDateState] = useState(
    momentJalaali().locale('fa').format('jYYYY/jM/jD'),
  );
  const [timeSlotItem, settimeSlotItem] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!consultCategoryQueryParam) {
      setShowConsultCategory(true);
    }

    if (!consultTypeQueryParam) {
      setShowConsultType(true);
    }
  }, []);

  const handleConsultCategoryChange = (value) => {
    setSelectedConsultCategory(value); // Update parent state
  };

  const handleConsultTypeChange = (value) => {
    setSelectedConsultType(value); // Update parent state
  };

  const reserveSubmitHandler = () => {
    console.log('selectedConsultCategory', selectedConsultCategory);
    console.log('selectedConsultType', selectedConsultType);
    router.push(`/consult?consult_category=${selectedConsultCategory}&consult_type=${selectedConsultType}`);
  };

  const dateChangeHandler = (date) => {
    setSelectedDateState(date);
    console.log('date', date);
  };

  const timeSlotChangeHandler = (slot) => {
    settimeSlotItem(slot);
    console.log('slot', slot);
  };

  const courseTypeMap: {
    HOZORI: string;
    OFFLINE: string;
  } = {
    HOZORI: 'حضوری',
    OFFLINE: 'آنلاین',
  };

  return (
    <div className="primary-gradient-bg min-h-screen overflow-hidden text-black">

      <div className="  mb-24 mt-12 rounded-2xl bg-white px-0 py-4 shadow-xl md:container md:mx-auto md:px-8">

        {/* SELECT Consult Category and Consult Type Section */}
        <div className="flex w-full flex-col items-center justify-end px-0 pb-2 md:flex-row md:px-8">

          {/* Rigth Section */}
          <div dir="rtl" className="flex flex-col space-y-2 rounded-xl bg-inherit p-6 ">
            <div className="flex flex-row items-center gap-1 md:gap-3">
              <span
                className="mt-3 text-sm font-medium leading-6 text-gray-800 md:text-lg"
              >
                {' '}
               &nbsp; شما مشاوره برای
                <span className="font-bold text-green-700">
                &nbsp;
                  {selectedConsultCategory && findLabel(selectedConsultCategory)}
                  &nbsp;
                </span>
                {' '}
                انتخاب کردید
              </span>
              {consultCategoryQueryParam && (
                <span onClick={() => setShowConsultCategory(true)} className="shrink-0 cursor-pointer text-[11px] text-blue-700 hover:underline">
                  {' '}
                  ( تغییر موضوع )
                  <Pencil size={isMobileScreen ? 14 : 16} className=" inline" />
                </span>
              )}
            </div>

            {ShowConsultCategory && (
              <div className="mt-4 flex flex-wrap gap-3  border-b pb-7 ">

                <CustomRadioForm
                  options={options1}
                  selectedOption={selectedConsultCategory}
                  onChange={handleConsultCategoryChange} // Pass handler to child
                />

              </div>
            )}

            <div className="flex flex-row items-center gap-3">
              <span
                className="mt-5 text-sm font-medium text-gray-800 md:text-lg"
              >
                {' '}
                &nbsp;شما مشاوره
                <span className="font-bold text-green-700">
                 &nbsp;
                  {' '}
                  {courseTypeMap[selectedConsultType]}
                  &nbsp;
                </span>
                {' '}
                را انتخاب کردید
                {' '}
              </span>

              {consultTypeQueryParam && (
                <span onClick={() => setShowConsultType(true)} className="cursor-pointer text-[11px] text-blue-700 hover:underline">
                  {' '}
                  ( تغییر )
                  <Pencil size={isMobileScreen ? 14 : 16} className=" inline" />
                </span>
              )}

            </div>

            {ShowConsultType && (
              <div className="mt-4 flex flex-wrap gap-3">
                <CustomRadioForm
                  options={options2}
                  selectedOption={selectedConsultType}
                  onChange={handleConsultTypeChange} // Pass handler to child
                />
              </div>
            )}

            {/* <div className="relative w-full mt-6">
              <button onClick={reserveSubmitHandler} className="w-full mt-6 yellow-gradient-bg py-4 rounded-lg  flex justify-center items-center">
                <span className="text-sm">
                  رزرو مشاوره
                </span>
                <ChevronLeft />
              </button>
            </div> */}

          </div>
        </div>

        {/* Consultaion Person List */}
        <div className="flex w-full flex-col border-t-2 px-8 py-12 ">
          <h2 className="text-center text-sm md:text-lg">
            لطفا مشاور مورد نظر خود را انتخاب کنید
          </h2>

          <div className="mt-8 flex flex-col flex-wrap justify-end gap-4 md:flex-row">
            {consultations.map(item => (
              <button
                type="button"
                key={item._id}
                onClick={() => setSelectedConsultation(item as any)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4 transition-all  md:w-[32%] ${
                  selectedConsultation?._id === item._id ? 'bg-green-50 ring-2 ring-green-500' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <Image
                    width={80}
                    height={80}
                    src={item.avatar_image || AvatarImage}
                    alt="Consultation Person"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="mb-2 text-sm font-semibold">{`${item.first_name} ${item.last_name}`}</span>
                  <span className="pl-3 text-xs font-normal text-gray-500">{item?.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Select Time/Date Section */}
        <div className="flex w-full flex-col border-y-2 px-8 py-12">
          <h2 className="text-center text-lg">
            لطفا تاریخ و ساعت مورد نظر خود را انتخاب کنید
          </h2>

          {/* Calendar Wrapper */}
          <div className="py-14">
            <ReserveCalendar timeSlotChangeHandler={timeSlotChangeHandler} dateChangeHandler={dateChangeHandler} />
          </div>
        </div>

        {/* Payment And Information Section */}
        <div className="flex w-full flex-col p-8">
          {/* Header Information */}
          <div className="text-center text-lg">
            هزینه و اطلاعات پرداخت برای مشاوره
          </div>

          <div dir="rtl" className="mt-12 rounded-lg border-2 border-dashed border-gray-400 p-4 text-sm leading-7 text-gray-800">
            هزینه مشاوره برای هر جلسه با بهترین اساتید و مشاوران شامل  هزار تومان میباشد که شما میبایست این
            مبلغ را به صورت اینترنتی پرداخت کنید, شما بعد از کامل کردن اطلاعات این صفحه که شامل نوع مشاوره و زمان برگذاری مشاوره میباشد
            با کلیک کردن بر روی دکمه ثبت مشاوره به صفحه ی پرداخت بانک منتقل خواهید شد و بعد از
            پرداخت , در صورت تایید مشاور شما برای شما اطلاع رسانی خواهد شد.
          </div>

          {/* Button */}
          <div className="relative mt-6 w-full">
            <button onClick={reserveSubmitHandler} className="yellow-gradient-bg mt-6 flex w-full items-center  justify-center rounded-lg py-4">
              <span className="text-sm">
                ثبت مشاوره
              </span>
              <BadgeCheck className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
