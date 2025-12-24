/* eslint-disable jsx-a11y/no-autofocus */
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { OtpInput } from 'reactjs-otp-input';

// assets

// API
import { completeProfileRequest, loginByOTPRequest, validateOTPRequest } from '@/API/auth';

// Components
import LoadingButton from '@/components/LoadingButton';

import useAuth from '@/hooks/useAuth';
// utils
import { isEmpty, isValidIranianMobileNumber, storeAuthToken, toPersianDigits } from '@/utils/Helpers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AuthCardContainer = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div
          className="absolute inset-0 -skew-y-6 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"
        >
        </div>
        <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">

          {/* <div class="max-w-md mx-auto">
        <div>
          <h1 class="text-2xl font-semibold">Login</h1>
        </div>
        <div class="divide-y divide-gray-200">
          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div class="relative">
              <input autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
            </div>
            <div class="relative">
              <input autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div class="relative">
              <button class="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
            </div>
          </div>
        </div>
      </div> */}

          {children}

          {/* <div className="w-full flex justify-center">
        <button className="">

          <span>Continue with Google</span>
        </button>
      </div> */}

        </div>
      </div>
    </div>
  );
};

export default function AuthComponent() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [userId, setuserId] = useState(null);
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [gender, setGender] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2-minute timer
  const [canResend, setCanResend] = useState(false);
  const [uiSteps, setUISteps] = useState(1);
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
      if (response?._id || response?.id) {
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

    if (!gender || isEmpty(gender)) {
      toast.error('لطفا جنسیت خود را انتخاب کنید');
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
      <div className="flex h-screen w-full bg-white text-gray-700">
        <div className="mx-auto flex w-full  max-w-xl flex-col items-center justify-center px-8 md:px-0">
          <div className="text-center">
            <h2 className="mb-8 text-sm font-extrabold text-gray-700 md:text-xl">
              نام و نام خانوادگی خود را وارد کنید
            </h2>
          </div>

          {/* Form */}
          <div dir="rtl" className="flex w-full px-6 flex-col ">
            <input
              type="text"
              placeholder="نام خود را وارد کنید "
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="mb-4 rounded-md border-gray-900 bg-gray-200 px-4 py-2 text-xs text-gray-800 placeholder:text-gray-600 md:text-sm"
            />
            <input
              type="text"
              placeholder=" فامیلی خود را وارد کنید "
              value={family}
              onChange={e => setFamily(e.target.value)}
              required
              className="mb-4 rounded-md border-gray-500 bg-gray-200 px-4 py-2 text-xs text-gray-800 placeholder:text-gray-600 md:text-sm"
            />

            <div className="relative mb-4">
              {/* <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                required
                className="w-full appearance-none rounded-md border-gray-00 bg-gray-300 px-4 py-2 pr-10 text-xs text-gray-800 placeholder:text-gray-600 md:text-sm"
              >
                <option style={{ padding: '10px 0' }} value="" disabled>جنسیت خود را انتخاب کنید</option>
                <option value="W">زن</option>
                <option value="M">مرد</option>
              </select> */}


              <Select
              dir="rtl"
              value={gender}
              onValueChange={(value: string) => setGender(value)}
            >
              <SelectTrigger className="border border-gray-500 bg-gray-200 text-xs placeholder:text-xs md:text-sm">
                <SelectValue placeholder="جنسیت خود را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="W">زن</SelectItem>
                <SelectItem value="M">مرد</SelectItem>
              </SelectContent>
            </Select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-400">
                <svg className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
    <AuthCardContainer>

      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-sm font-semibold text-gray-700 md:text-lg">
            {uiSteps === 1 && 'با شماره موبایل خود وارد شوید'}
            {uiSteps === 2 && 'کد را وارد کنید'}
          </h2>
        </div>

        <form dir="rtl" className="mt-8 flex w-full flex-col items-center justify-center text-right" onSubmit={handleSubmit}>

          {uiSteps === 1
          && (
            <div className="relative mt-4">
              <input required autoFocus type="tel" value={mobileNumber} placeholder=" شماره موبایل " onChange={e => setMobileNumber(e.target.value)} autoComplete="off" id="mobile" name="mobile" className="focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder:text-transparent focus:outline-none" />
              <label htmlFor="mobile" className="peer-placeholder-shown:text-gray-440 absolute -top-3.5 right-0 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:text-gray-600">شماره موبایل</label>
            </div>

          )}

          {uiSteps === 2 && (
            <div>
              <p className="mb-3 mt-1 text-center text-xs text-gray-600">
                {' '}
                شماره موبایل شما&nbsp;
                {mobileNumber && toPersianDigits(mobileNumber)}
              </p>

              <div dir="ltr" className="flex justify-center py-4">

                <OtpInput inputStyle={{ width: '35px', border: '1px solid #cbcbcb', padding: '5px 12px', borderRadius: '8px' }} focusStyle isInputNum value={otp} onChange={setOtp} numInputs={6} separator={<span> &nbsp;</span>} />

              </div>

              {/* <input
                  type="text"
                  placeholder=""
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  className="mb-4 rounded-md border-gray-700 bg-gray-800 px-4 py-1 text-white placeholder:text-gray-400"
                /> */}

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
            <LoadingButton isLoading={(loginByOTPMutation.isPending || validateOTPMutation.isPending)} className="mt-12 w-52 py-2 text-xs md:w-72 md:text-sm  " type="submit">
              {uiSteps === 1 && 'وارد شوید'}
              {uiSteps === 2 && ' تایید کد'}
            </LoadingButton>
          )}
        </form>
      </div>

    </AuthCardContainer>

  );
}
