/* eslint-disable jsx-a11y/no-autofocus */
'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// assets
import AuthVector from '@/public/assets/svg/undraw_authentication_tbfc.svg';

// API
import { completeProfileRequest, loginByOTPRequest, validateOTPRequest } from '@/API/auth';

// Components
import LoadingButton from '@/components/LoadingButton';

import { Button } from '@/components/ui/button';
// utils
import { isEmpty, isValidIranianMobileNumber, storeAuthToken, toPersianDigits } from '@/utils/Helpers';
import useAuth from '@/hooks/useAuth';


export default function AuthComponent() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [userId, setuserId] = useState(null);
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [gender, setGender] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2-minute timer
  const [canResend, setCanResend] = useState(false);
  const [uiSteps, setUISteps] = useState(0);
  const [isFirstLogin, setisFirstLogin] = useState(false);
  const [showSetProfileInfo, setshowSetProfileInfo] = useState(false);
  const [curentLoginUserId, setCurentLoginUserId] = useState(null);
  const [userRole, setuserRole] = useState('user');

  const router = useRouter();
  const { updateUser } = useAuth();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (uiSteps === 2 && timer > 0) {
      setCanResend(false); // Disable resend initially
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true); // Enable resend when timer reaches 0
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [uiSteps, timer]);

  /**
   * API Mutation
   */
  const completeProfileMutation = useMutation({
    mutationFn: completeProfileRequest,
    onSuccess: (response) => {
      if (response?.id) {
        // eslint-disable-next-line no-console
        console.log('__response__', response);
        updateUser(response);
        router.push('/');
        toast.success(' ارسال شد');
      } else {
        toast.error('خطا در ارسال کد');
      }
    },
  });

  const loginByOTPMutation = useMutation({
    mutationFn: loginByOTPRequest,
    onSuccess: (response) => {
      if (response?.user) {
        // eslint-disable-next-line no-console
        console.log('__response__', response);
        // eslint-disable-next-line no-alert
        alert(response?.user?.otp || 'کد ارسال نشد');
        setuserId(response.user.id);
        setUISteps(2);
        setisFirstLogin(response?.firstLogin);
        toast.success('کد ارسال شد');
      } else {
        toast.error('خطا در ارسال کد');
      }
    },
  });

  // When we Send The Login Request to The API
  // Then we will send a code to user mobile number
  // then user, give us the code and we will send it to the API
  const validateOTPMutation = useMutation({
    mutationFn: validateOTPRequest,
    onSuccess: (response) => {
      if (!response) {
        toast.error('مشکلی پیش آمده است');
        return false;
      }

      if (response.code === 401) {
        toast.error('کد اشتباه است');
        return false;
      }

      if (!response?.tokens) {
        // if ()
        toast.error('مشکلی پیش آمده است');
        toast.error('توکن از سمت سرور وجود ندارد');

        return false;
      }

      // eslint-disable-next-line no-console
      console.log({ response });
      toast.success('کد تایید شد');

      // navigate User
      // save token in storage
      storeAuthToken(response.tokens, response.userDoc);
      setCurentLoginUserId(response.userDoc?.id);

      if (!isFirstLogin) {
        router.push('/');
        return false;
      } else {
        setshowSetProfileInfo(true);
      }

      return true;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uiSteps === 1) {
      // validate mobile number

      const isValidMobileNumber = isValidIranianMobileNumber(mobileNumber);

      if (!isValidMobileNumber) {
        toast.error('شماره موبایل را درست وارد کنید');
        return false;
      }

      // TODO: Implement OTP sending logic
      // Send OTP Login Logic
      loginByOTPMutation.mutate({ mobile: mobileNumber, role: userRole });
    } else if (uiSteps === 2) {
      // TODO: Implement OTP verification logic
      if (!userId || !otp) {
        toast.error('خطا در ارسال کد');
        return false;
      }
      validateOTPMutation.mutate({ userId, otpCode: otp, role: userRole });
    }
    return true;
  };

  const handleResendOtp = () => {
    if (canResend) {
      // console.log('Resending OTP...');
      setTimer(120); // Reset timer on resend
      setCanResend(false);
    }
  };

  const setProfileSubmit = () => {
    if (!name || isEmpty(name)) {
      toast.error('لطفا نام خود را وارد کنید');
      return false;
    }

    if (!family || isEmpty(family)) {
      toast.error('لطفا نام خانوادگی خود را وارد کنید');
      return false;
    }

    if (!curentLoginUserId) {
      toast.error('مشکلی پیش آمده , لطفا صفحه را رفرش کنید و دوباره امتحان کنید');
      return false;
    }

    // send complete Profile Request to API
    completeProfileMutation.mutate({ userId: curentLoginUserId, data: { name, family, gender } });
    return true;
  };

  const setUserRoleHandler = (role: string) => {
    setuserRole(role);
    setUISteps(1);
  };

  if (showSetProfileInfo) {
    return (
      <div className="flex h-screen w-full bg-gray-900 text-white">
        <div className="mx-auto flex w-full  max-w-xl flex-col items-center justify-center px-8 md:px-0">
          <div className="text-center">
            <h2 className="mb-8 text-sm font-extrabold text-white md:text-xl">
              نام و نام خانوادگی خود را وارد کنید
            </h2>
          </div>

          {/* Form */}
          <div dir="rtl" className="flex w-full flex-col ">
            <input
              type="text"
              placeholder="نام خود را وارد کنید "
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="mb-4 rounded-md border-gray-700 bg-gray-800 px-4 py-2 text-xs text-white placeholder:text-gray-400 md:text-sm"
            />
            <input
              type="text"
              placeholder=" فامیلی خود را وارد کنید "
              value={family}
              onChange={e => setFamily(e.target.value)}
              required
              className="mb-4 rounded-md border-gray-700 bg-gray-800 px-4 py-2 text-xs text-white placeholder:text-gray-400 md:text-sm"
            />

            <div className="relative mb-4">
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                required
                className="w-full appearance-none rounded-md border-gray-700 bg-gray-800 px-4 py-2 pr-10 text-xs text-white placeholder:text-gray-400 md:text-sm"
              >
                <option style={{padding: '10px 0'}} value="" disabled>جنسیت خود را انتخاب کنید</option>
                <option value="W">زن</option>
                <option value="M">مرد</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-400">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="flex justify-center">
              <LoadingButton onClick={setProfileSubmit} isLoading={completeProfileMutation.isPending} className="mt-4 w-52 py-2 text-xs md:w-72 md:text-sm ">
                ثبت نام
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      {/* Image half */}
      <div className="relative hidden w-1/2 md:block ">
        <div className="mt-16 flex items-center justify-center">
          <Image
            src={AuthVector}
            alt="Authentication background"
            width={400}
            height={500}

          />
        </div>
      </div>

      {/* Form half */}
      <div className=" flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-sm font-extrabold text-white md:text-xl">
              {uiSteps === 1 && 'با شماره موبایل خود وارد شوید'}
              {uiSteps === 2 && 'کد را وارد کنید'}
            </h2>
          </div>
          <form dir="rtl" className="mt-8 flex flex-col items-center justify-center text-right" onSubmit={handleSubmit}>
            {uiSteps === 0 && (
              <div className="flex w-full flex-col space-y-4">
                <Button onClick={() => setUserRoleHandler('user')} variant="secondary"> ورود کاربر</Button>
                <Button onClick={() => setUserRoleHandler('coach')} variant="secondary"> ورود مربی</Button>
              </div>
            )}

            {uiSteps === 1
              && (

                <input
                  type="tel"
                  autoFocus
                  placeholder=" شماره موبایل "
                  value={mobileNumber}
                  onChange={e => setMobileNumber(e.target.value)}
                  required
                  className="mb-4 rounded-md border-gray-700 bg-gray-800 px-4 py-2 text-xs text-white placeholder:text-gray-400 md:text-sm"
                />
              )}

            {uiSteps === 2 && (
              <div>
                <p className="mb-3 mt-1 text-center text-xs text-gray-300">
                  {' '}
                  شماره موبایل شما
                  {mobileNumber && toPersianDigits(mobileNumber)}
                </p>
                <input
                  type="text"
                  placeholder=""
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  className="mb-4 rounded-md border-gray-700 bg-gray-800 px-4 py-1 text-white placeholder:text-gray-400"
                />

                {!canResend && (
                  <p className="mt-2 text-xs text-gray-600">
                    ارسال مجدد کد به شماره موبایل شما بعد از
                    {' '}
                    {timer}
                    {' '}
                    ثانیه
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend}
                  className={`mt-2 w-full text-center text-xs text-blue-500 ${!canResend ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                >
                  ارسال مجدد کد
                </button>
              </div>
            )}

            {uiSteps !== 0 && (
              <LoadingButton isLoading={(loginByOTPMutation.isPending || validateOTPMutation.isPending)} className="mt-4 w-52 py-2 text-xs md:w-72 md:text-sm " type="submit">
                {uiSteps === 1 && 'وارد شوید'}
                {uiSteps === 2 && ' تایید کد'}
              </LoadingButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
