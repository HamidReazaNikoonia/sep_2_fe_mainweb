/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeCoachInfoRequest } from '@/API/coach';
import useAuth from '@/hooks/useAuth';
import LoadingButton from '@/components/LoadingButton';
import React, { useEffect, useState } from 'react';

import { DatePicker } from 'react-advance-jalaali-datepicker';
import toast from 'react-hot-toast';

// eslint-disable-next-line ts/no-require-imports
const iranCity = require('iran-city');

type FormData = {
  father_name: string;
  national_code: string;
  birth_date: string;
  city: number;
  state: string;
  description?: string;
  group_name?: string;
};

type FormErrors = {
  father_name?: string;
  national_code?: string;
  birth_date?: string;
  [key: string]: string | undefined;
};

export default function ProfileForm({moveSteps}) {
  const { user } = useAuth();
  const queryClient = useQueryClient();


  const [formData, setFormData] = useState<FormData>({
    father_name: '',
    national_code: '',
    birth_date: '',
    city: 8,
    state: '301',
    description: '',
    group_name: '',
  });
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState<string[]>([]);

  const { mutate: completeCoachInfo, isLoading } = useMutation({
    mutationFn: (data: FormData) => completeCoachInfoRequest(user?.id || '', data),
    onSuccess: (response) => {
      // Invalidate and refetch coach profile query
      queryClient.invalidateQueries({ queryKey: ['coachProfile'] });
      toast.success('اطلاعات با موفقیت ثبت شد');

      // validate Response and Move to the Next Step in The Dashboard
      moveSteps();
      console.log('log from onSuccess', response);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'خطا در ثبت اطلاعات');
    },
  });

  // Get cities and provinces data
  // const cities = new Cities().list();

  useEffect(() => {
    const CitiesOfProvince = iranCity.citiesOfProvince(8);
    setStates(CitiesOfProvince);
  }, []);

  const provinces = iranCity.allProvinces();

  // Filter cities based on selected province

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (unix: number, formatted: string) => {
    setFormData(prev => ({
      ...prev,
      birth_date: formatted,
    }));
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = Number.parseInt(event.target.value);
    const CitiesOfProvince = iranCity.citiesOfProvince(cityId);
    setFormData({ ...formData, city: cityId, state: CitiesOfProvince[0].id });
    setStates(CitiesOfProvince || []);
    // console.log(CitiesOfProvince)
  };

  const validateNationalCode = (code: string): boolean => {
    if (code.length !== 10) {
      return false;
    }

    const check = Number.parseInt(code[9]);
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(code[i]) * (10 - i);
    }

    const remainder = sum % 11;
    const result = remainder < 2 ? remainder === check : 11 - remainder === check;

    return result;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate father name
    if (!formData.father_name.trim()) {
      newErrors.father_name = 'نام پدر الزامی است';
    }

    // Validate national code
    if (!formData.national_code) {
      newErrors.national_code = 'کد ملی الزامی است';
    } else if (!/^\d{10}$/.test(formData.national_code)) {
      newErrors.national_code = 'کد ملی باید 10 رقم باشد';
    } else if (!validateNationalCode(formData.national_code)) {
      newErrors.national_code = 'کد ملی معتبر نیست';
    }

    // validate Brith Date
    if (!formData.birth_date) {
      newErrors.birth_date = 'تاریخ تولد را به درستی انتخاب کنید';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToFirstError = () => {
    const firstErrorElement = document.querySelector('.border-red-500');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error after a small delay to ensure the DOM is updated
      toast.error('لطفا اطلاعات فرم را به درستی وارد کنید');
      setTimeout(scrollToFirstError, 100);
      return;
    }

    console.log('Form Data:', formData);
     // Call the mutation with form data
     completeCoachInfo(formData);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-14 min-w-full rounded-lg bg-white px-4 py-12 shadow-md md:min-w-[900px] md:px-12">
      <div className="mb-4">
        <label htmlFor="father_name" className="mb-3 block text-sm font-medium text-gray-700">
          نام پدر
        </label>
        <input
          type="text"
          id="father_name"
          name="father_name"
          value={formData.father_name}
          onChange={handleInputChange}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.father_name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors?.father_name && (
          <p className="mt-1 text-sm text-red-500">{errors.father_name}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="national_code" className="mb-3 block text-sm font-medium text-gray-700">
          کد ملی
        </label>
        <input
          type="text"
          id="national_code"
          name="national_code"
          value={formData.national_code}
          onChange={handleInputChange}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.national_code ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors?.national_code && (
          <p className="mt-1 text-sm text-red-500">{errors.national_code}</p>
        )}
      </div>

      <div className={`mb-6 mt-8 p-2 ${errors?.birth_date ? 'border border-red-500' : 'border-0'}`}>
        <label htmlFor="birth_date" className="mb-3 block border-b-2 pb-2 text-sm font-medium text-gray-700">
          تاریخ تولد
        </label>
        <DatePicker
          placeholder="تاریخ تولد"
          cancelOnBackgroundClick
          format="jYYYY/jMM/jDD"
          onChange={handleDateChange}
          id="birth_date"
          customClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.birth_date && (
          <p className="mt-1 text-sm text-red-500">{errors.birth_date}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="mb-3 block text-sm font-medium text-gray-700">
          استان
        </label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={e => handleCityChange(e)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">انتخاب استان</option>
          {provinces.map(province => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="mb-3 block text-sm font-medium text-gray-700">
          شهر
        </label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={!formData.state}
        >
          <option value="">انتخاب شهر</option>
          {states && states.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 mt-8">
        <label htmlFor="group_name" className="mb-3 block text-sm font-medium text-gray-700">
          عنوان یا نام مجموعه
        </label>
        <input
          type="text"
          id="group_name"
          name="group_name"
          value={formData.group_name}
          onChange={handleInputChange}
          maxLength={30}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 mt-8">
        <label htmlFor="description" className="mb-3 block text-sm font-medium text-gray-700">
          توضیحات مخاطبین
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        ثبت اطلاعات
      </LoadingButton>
    </form>
  );
}
