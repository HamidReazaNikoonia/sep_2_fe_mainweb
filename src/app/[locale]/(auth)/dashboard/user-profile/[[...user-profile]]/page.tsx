/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable style/multiline-ternary */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable ts/ban-ts-comment */
/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Upload, UserRound } from 'lucide-react';
import { type ReactNode, use, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import toast from 'react-hot-toast';
import { completeProfileRequest } from '@/API/auth';
import { useCitiesByProvince } from '@/API/siteInfo/useCitiesByProvince';
import LoadingButton from '@/components/LoadingButton';
import { Card, CardContent } from '@/components/ui/card';
import Modal from '@/components/ui/Modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAuth from '@/hooks/useAuth';

import { validateIranianNationalId } from '@/utils/Helpers';

// Import Province data
import { provinceData } from '@/utils/provinceData';

type User = {
  first_name: string;
  last_name: string;
  mobile: string;
  role?: string;
  gender?: 'M' | 'W';
  nationalId?: string;
  avatar?: string;
  national_card_images?: Array<{
    _id: string;
    file_name: string;
  }>;
  address?: string;
  city?: number | undefined;
  province?: number;
  field_of_study?: string;
  postal_code?: string;
  job_title?: string;
  educational_qualification?: string;
  personal_img?: any;
};

type IUserProfilePageProps = {
  params: {
    'locale': string;
    'user-profile'?: string[];
  };
};

type FormData = {
  city: number | undefined;
  first_name: string;
  last_name: string;
  gender: 'M' | 'W';
  nationalId: string;
  avatar: string;
  national_card_images: string[];
  address?: string;
  province?: number;
  field_of_study?: string | null;
  postalCode?: string | null;
  job_title?: string | null;
  educational_qualification?: string | null;
  education_field?: string | null;
  personal_img?: any;
};

type FormErrors = {
  postalCode: ReactNode;
  first_name?: string;
  last_name?: string;
  nationalId?: string;
  national_card_images?: string;
};

export default function UserProfilePage({ params }: IUserProfilePageProps) {
  const { user, updateUser, fetchUserFromServer } = useAuth() as {
    user: User | null;
    updateUser: (data: any) => void;
    fetchUserFromServer: () => void;
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filePersoanlImgInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    gender: user?.gender || 'M',
    nationalId: '',
    avatar: '',
    national_card_images: [],
    city: undefined,
    address: '',
    field_of_study: '',
    postalCode: '',
    job_title: '',
    educational_qualification: '',
    personal_img: undefined,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isUploadingPersonalImg, setIsUploadingPersonalImg] = useState(false);
  const [uploadPersonalImgProgress, setUploadPersonalImgProgress] = useState(0);

  const [personalImagePreview, setpersonalImagePreview] = useState<string | undefined>(undefined);

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor | null>(null);

  // Add these new state variables after the existing state declarations
  const [nationalCardPreviews, setNationalCardPreviews] = useState<string[]>([]);
  const nationalCardInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingNationalCard, setIsUploadingNationalCard] = useState(false);
  const [nationalCardUploadProgress, setNationalCardUploadProgress] = useState(0);

  const [isProfileCompleteModalOpen, setIsProfileCompleteModalOpen] = useState(false);
  const [isUserCompleteProfile, setIsUserCompleteProfile] = useState(false);

  // Add new state for form errors
  const [errors, setErrors] = useState<FormErrors>({});

  const { 'user-profile': _ = [] } = use(params);

  // Use the custom hook for cities
  const {
    cities,
    isLoading,
    handleProvinceChange,
    selectedProvinceId,
  } = useCitiesByProvince();

  useEffect(() => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      gender: user?.gender || 'M',
      nationalId: user?.nationalId || '',
      avatar: user?.avatar || '',
      national_card_images: user?.national_card_images?.map(image => image._id) || [],
      city: user?.city || undefined,
      address: user?.address || undefined,
      field_of_study: user?.field_of_study || undefined,
      postalCode: user?.postal_code || '',
      job_title: user?.job_title || '',
      educational_qualification: user?.educational_qualification || '',
      personal_img: user?.personal_img || undefined,
    });

    if (user?.province) {
      handleProvinceChange(user?.province);
    }

    if (user?.personal_img) {
      setpersonalImagePreview(`${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${user?.personal_img?.file_name}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: completeProfileRequest,
    onSuccess: (response) => {
      if (response) {
        // eslint-disable-next-line no-console
        console.log('__response__', response);
        updateUser(response);
        toast.success('پروفایل با موفقیت بروزرسانی شد');
        fetchUserFromServer();
        setIsUserCompleteProfile(response.isProfileCompleted);
        setIsProfileCompleteModalOpen(true);
      } else {
        toast.error('خطا در بروزرسانی پروفایل');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'خطا در بروزرسانی پروفایل');
    },
  });

  // Add validation function
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'first_name':
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, first_name: 'نام نمی‌تواند خالی باشد' }));
          return false;
        }
        setErrors(prev => ({ ...prev, first_name: undefined }));
        return true;

      case 'last_name':
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, last_name: 'نام خانوادگی نمی‌تواند خالی باشد' }));
          return false;
        }
        setErrors(prev => ({ ...prev, last_name: undefined }));
        return true;

      case 'postalCode':
        // Postal code validation for Iranian postal codes
        // Iranian postal codes are 10-digit numeric strings
        // eslint-disable-next-line no-case-declarations
        const postalCodeRegex = /^\d{10}$/;

        // If postal code is empty, skip validation
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, postalCode: undefined }));
          return true;
        }

        if (!postalCodeRegex.test(value)) {
          setErrors(prev => ({ ...prev, postalCode: 'کد پستی باید ۱۰ رقم باشد' }));
          return false;
        }

        setErrors(prev => ({ ...prev, postalCode: undefined }));
        return true;

      default:
        return true;
    }
  };

  // Update handleInputChange to include validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Add blur handler for all fields
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Update handleNationalIdBlur
  const handleNationalIdBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      const isValid = validateIranianNationalId(value);
      if (!isValid) {
        setErrors(prev => ({ ...prev, nationalId: 'کد ملی نامعتبر است' }));
      } else {
        setErrors(prev => ({ ...prev, nationalId: undefined }));
      }
    }
  };

  // @ts-expect-error
  const handleFileUpload = async (file: File, type: 'avatar' | 'personal_img') => {
    if (type === 'avatar') {
      setIsUploading(true);
      setUploadProgress(0);
    } else {
      setIsUploadingPersonalImg(true);
      setUploadPersonalImgProgress(0);
    }

    const formDataAvatar = new FormData();
    formDataAvatar.append('file', file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/setting/upload`,
        formDataAvatar,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem(`${process.env.NEXT_PUBLIC_PROJECT_NAME}-access`)}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            if (type === 'avatar') {
              setUploadProgress(progress);
            } else {
              setUploadPersonalImgProgress(progress);
            }
          },
        },
      );

      if (response.status !== 200 || !response?.data) {
        toast.error('خطا در آپلود تصویر');
        return false;
      }

      if (response?.data?.uploadedFile) {
        setFormData(prev => ({
          ...prev,
          ...(type === 'avatar' ? { avatar: response.data.uploadedFile._id } : {}),
          ...(type === 'personal_img' ? { personal_img: response.data.uploadedFile._id } : {}),
        }));
        //
        toast.success('تصویر با موفقیت آپلود شد');
        toast.success('برای ثبت تغییرات باید دکمه ذخیره را کلیک کنید');
      }
    } catch (error) {
      toast.error('خطا در آپلود تصویر');
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      if (type === 'avatar') {
        setIsUploading(false);
        setUploadProgress(0);
      } else {
        setIsUploadingPersonalImg(false);
        setUploadPersonalImgProgress(0);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(file);
      setIsPreviewOpen(true);
    }
  };

  const handlePersonalImgFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file, 'personal_img');
    }
  };

  const handleSaveAvatarEdit = async () => {
    if (editorRef.current && previewImage) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], previewImage.name, { type: 'image/jpeg' });
          setIsPreviewOpen(false);
          await handleFileUpload(file, 'avatar');
        }
      }, 'image/jpeg');
    }
  };

  // Update form submission to include validation
  const handleSubmit = () => {
    // Validate all fields
    const isFirstNameValid = validateField('first_name', formData.first_name);
    const isLastNameValid = validateField('last_name', formData.last_name);
    const isPostalCodeValid = validateField('postalCode', formData.postalCode || '');

    if (!isFirstNameValid || !isLastNameValid || !isPostalCodeValid) {
      toast.error('لطفا فیلد های مورد نظر را به درستی وارد کنید');
      return; // Stop submission if validation fails
    }

    updateProfileMutation.mutate({
      userId: user?.id || '',
      data: {
        name: formData.first_name,
        family: formData.last_name,
        gender: formData.gender,
        nationalId: formData.nationalId,
        avatar: formData.avatar,
        national_card_images: formData.national_card_images,
        ...(formData.city && { city: formData.city }),
        ...(formData.address && { address: formData.address }),
        ...(formData.postalCode && { postalCode: formData.postalCode }),
        ...(formData.job_title && { job_title: formData.job_title }),
        ...(formData.educational_qualification && { educational_qualification: formData.educational_qualification }),
        ...(formData.field_of_study && { field_of_study: formData.field_of_study }),
        ...(formData.personal_img && { personal_img: formData.personal_img }),
      },
    });
  };
  // Add this new handler for national ID card upload
  const handleNationalCardUpload = async (files: FileList) => {
    if (formData.national_card_images.length + files.length > 3) {
      toast.error('حداکثر 3 تصویر می‌توانید آپلود کنید');
      return;
    }

    setIsUploadingNationalCard(true);
    setNationalCardUploadProgress(0);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formDataNationalCard = new FormData();
        formDataNationalCard.append('file', file);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/setting/upload`,
          formDataNationalCard,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem(`${process.env.NEXT_PUBLIC_PROJECT_NAME}-access`)}`,
            },
            onUploadProgress: (progressEvent) => {
              const progress = progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : 0;
              setNationalCardUploadProgress(progress);
            },
          },
        );

        if (response.status !== 200 || !response?.data) {
          throw new Error('خطا در آپلود تصویر کارت ملی');
        }

        return response.data.uploadedFile._id;
      });

      const uploadedIds = await Promise.all(uploadPromises);

      setFormData(prev => ({
        ...prev,
        national_card_images: [...prev.national_card_images, ...uploadedIds],
      }));

      toast.success('تصاویر کارت ملی با موفقیت آپلود شدند');
    } catch (error) {
      toast.error('خطا در آپلود تصویر کارت ملی');
      console.error(error);
    } finally {
      setIsUploadingNationalCard(false);
      setNationalCardUploadProgress(0);
    }
  };

  // Add this new handler for national ID card file selection
  const handleNationalCardSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    if (formData.national_card_images.length + files.length > 3) {
      toast.error('حداکثر 3 تصویر می‌توانید آپلود کنید');
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNationalCardPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    handleNationalCardUpload(files);
  };

  const handleRemoveNationalCard = (index: number) => {
    setFormData(prev => ({
      ...prev,
      national_card_images: prev.national_card_images.filter((_, i) => i !== index),
    }));
    setNationalCardPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const citiesByProvince = cities?.cities ? cities?.cities : [];

  return (
    <div className="m-6">
      <div className="container mx-auto">
        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center ">
          <h1 className="mb-8 text-xl font-bold md:text-2xl">پروفایل کاربری</h1>
          <Card className="w-full max-w-5xl shadow-lg">
            <CardContent dir="rtl" className="p-6">
              <div className="mb-6 flex items-center justify-center">
                <div className="flex size-40 items-center justify-center rounded-full bg-gray-100">
                  {user?.avatar?.file_name ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${user?.avatar?.file_name}`}
                      alt={`${user?.first_name} ${user?.last_name}`}
                      className="size-full rounded-full object-cover"
                    />
                  )
                    : (
                        <UserRound size={48} className="text-gray-400" />
                      )}
                </div>
              </div>
              <div className="flex flex-col items-center pb-6">
                <label className="mb-2 text-xs text-gray-500 md:text-sm">تصویر پروفایل</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex max-w-64 items-center justify-center rounded-md border border-gray-300 p-2 text-xs hover:bg-gray-50"
                >
                  <Upload className="ml-2 size-4" />
                  انتخاب تصویر
                </button>
                {isUploading && (
                  <div className="mt-2">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 md:text-sm">نام و نام خانوادگی</span>
                  <span className="mt-2 text-base font-medium">
                    {user?.first_name}
                    {' '}
                    {user?.last_name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 md:text-sm">شماره موبایل</span>
                  <span className="mt-2 font-medium">{user?.mobile}</span>
                </div>
                {user?.gender && (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 md:text-sm">جنسیت</span>
                    <span className="mt-2 font-medium">
                      {user?.gender === 'M' ? 'مرد' : 'زن'}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form Card */}
          <Card className="mt-8 w-full max-w-5xl shadow-lg">
            <CardContent dir="rtl" className="p-6">
              <h2 className="mb-6 text-xl font-semibold">اطلاعات هویتی</h2>
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label className="mb-2 text-xs text-gray-500 md:text-sm">نام</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`rounded-md border p-2 text-sm ${errors.first_name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                  />
                  {errors.first_name && (
                    <span className="mt-1 text-xs text-red-500">{errors.first_name}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-xs text-gray-500 md:text-sm">نام خانوادگی</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`rounded-md border p-2 text-sm ${errors.last_name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                  />
                  {errors.last_name && (
                    <span className="mt-1 text-xs text-red-500">{errors.last_name}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-xs text-gray-500 md:text-sm">جنسیت</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="rounded-md border border-gray-300 p-2 text-sm"
                    required
                  >
                    <option value="M">مرد</option>
                    <option value="W">زن</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-xs text-gray-500 md:text-sm">کد ملی</label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    onBlur={handleNationalIdBlur}
                    className={`rounded-md border p-2 ${errors.nationalId
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                  />
                  {errors.nationalId && (
                    <span className="mt-1 text-xs text-red-500">{errors.nationalId}</span>
                  )}
                </div>

                <div className="flex flex-col border-b pb-4">
                  <label className="mb-2 text-xs text-gray-500 md:text-sm">تصویر پرسونالی 3*4</label>
                  <input
                    type="file"
                    ref={filePersoanlImgInputRef}
                    onChange={handlePersonalImgFileSelect}
                    className="hidden"
                    accept="image/*"
                  />

                  <div className="flex w-full flex-col items-center  justify-between md:flex-row">
                    <button
                      type="button"
                      onClick={() => filePersoanlImgInputRef.current?.click()}
                      className="flex w-full items-center justify-center self-auto rounded-md border border-gray-300 p-2 text-xs hover:bg-gray-50 md:w-40 md:self-start"
                    >
                      <Upload className="ml-2 size-4" />
                      انتخاب تصویر
                    </button>

                    {/* Personal Image Preview */}
                    {personalImagePreview && (
                      <div className="mt-4">
                        <img src={personalImagePreview} alt="Personal Image" className="size-full max-h-32 rounded-lg object-cover" />
                      </div>
                    )}
                  </div>

                  {isUploadingPersonalImg && (
                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all"
                          style={{ width: `${uploadPersonalImgProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* After the avatar upload section, add this new section */}
                <div className="flex flex-col">
                  <label className="mb-2 text-xs text-gray-500 md:text-sm">تصویر کارت ملی (حداکثر 3 تصویر)</label>
                  <input
                    type="file"
                    ref={nationalCardInputRef}
                    onChange={handleNationalCardSelect}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                  <div className="space-y-4">
                    {formData.national_card_images.length < 3 && (
                      <button
                        type="button"
                        onClick={() => nationalCardInputRef.current?.click()}
                        className="flex items-center justify-center rounded-md border border-gray-300 p-2 text-xs hover:bg-gray-50"
                      >
                        <Upload className="ml-2 size-4" />
                        انتخاب تصویر کارت ملی
                      </button>
                    )}

                    {/* Preview section */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {formData.national_card_images.map((imageId, index) => (
                        <div key={imageId} className="relative">
                          <img
                            src={user?.national_card_images?.find(img => img._id === imageId)?.file_name
                              ? `${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${user.national_card_images.find(img => img._id === imageId)?.file_name}`
                              : nationalCardPreviews[index] || ''}
                            alt={`تصویر کارت ملی ${index + 1}`}
                            className="h-48 w-full rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNationalCard(index)}
                            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                            aria-label="حذف تصویر"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Upload progress */}
                    {isUploadingNationalCard && (
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-600 transition-all"
                            style={{ width: `${nationalCardUploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </form>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card className="mt-8 w-full max-w-5xl shadow-lg">
            <CardContent dir="rtl" className="p-6">
              <h2 className="mb-6 text-xl font-semibold">اطلاعات کاربری</h2>
              <div className="flex w-full flex-col gap-4 pb-4">
                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <label className="mb-2 block text-xs text-gray-500 md:text-sm">استان</label>
                    <Select
                      dir="rtl"
                      defaultValue={user?.province || ''}
                      value={selectedProvinceId}
                      onValueChange={(value: any) => handleProvinceChange(Number(value))}
                    >
                      <SelectTrigger className="w-full bg-gray-200">
                        <SelectValue placeholder="انتخاب استان" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinceData.map((province: any) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="mb-2 block text-xs text-gray-500 md:text-sm">شهر</label>
                    <Select
                      dir="rtl"
                      value={formData.city || undefined}
                      onValueChange={(value: any) => setFormData(prev => ({ ...prev, city: value }))}
                      disabled={false}
                    >
                      <SelectTrigger className="w-full bg-gray-200">
                        <SelectValue placeholder="انتخاب شهر" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading ? (
                          <p>Loading cities...</p>
                        )
                          : (
                              <>
                                {citiesByProvince?.map((city: any) => (
                                  <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                                ))}
                              </>
                            )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address */}
                <div className="w-full">
                  <label className="mb-2 block text-xs text-gray-500 md:text-sm">آدرس محل سکونت</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                  />
                </div>

                {/* Postal Code */}
                <div className="mt-2 w-full md:mt-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1">
                      <label className="mb-2 block text-xs text-gray-500 md:text-sm">کد پستی *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode || ''}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-md border p-2 text-sm ${errors.postalCode
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                        placeholder="کد پستی خود را وارد کنید"
                      />
                      {errors.postalCode && (
                        <span className="mt-1 text-xs text-red-500">{errors.postalCode}</span>
                      )}
                    </div>

                    {/* Job Title */}
                    <div className="flex-1">
                      <label className="mb-2 block text-xs text-gray-500 md:text-sm">عنوان شغلی</label>
                      <input
                        type="text"
                        name="job_title"
                        value={formData.job_title || ''}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="عنوان شغلی خود را وارد کنید"
                      />
                    </div>

                  </div>
                </div>

                {/* educational_qualification && field_of_study */}
                <div className="mt-0 w-full md:mt-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1">
                      <label className="mb-2 block text-xs text-gray-500 md:text-sm"> رشته تحصیلی</label>
                      <input
                        type="text"
                        name="field_of_study"
                        value={formData.field_of_study || ''}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="رشته تحصیلی خود را وارد کنید"
                      />
                    </div>

                    {/* Job Title */}
                    <div className="flex-1">
                      <label className="mb-2 block text-xs text-gray-500 md:text-sm">مدرک تحصیلی</label>
                      <input
                        type="text"
                        name="educational_qualification"
                        value={formData.educational_qualification || ''}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="مدرک تحصیلی خود را وارد کنید"
                      />
                    </div>

                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex w-full max-w-5xl justify-center">
            <LoadingButton
              onClick={handleSubmit}
              isLoading={updateProfileMutation.isPending}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={updateProfileMutation.isPending}
            >
              ذخیره
            </LoadingButton>
          </div>
        </div>
      </div>

      {/* Replace the Dialog component with our custom Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="ویرایش تصویر پروفایل"
      >
        <div className="flex flex-col items-center gap-4">
          {previewImage && (
            <AvatarEditor
              ref={editorRef}
              image={previewImage}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={0}
            />
          )}
          <div className="w-full">
            <label className="mb-2 block text-sm">بزرگنمایی</label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={scale}
              onChange={e => setScale(Number.parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveAvatarEdit}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              تایید و آپلود
            </button>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              انصراف
            </button>
          </div>
        </div>
      </Modal>

      {/* profile complete modal */}
      <Modal
        isOpen={isProfileCompleteModalOpen}
        onClose={() => setIsProfileCompleteModalOpen(false)}
      >
        <div dir="rtl" className="flex flex-col items-center gap-4 py-12 px-6">
          {/* Success/Warning Icon */}
          {isUserCompleteProfile ? (
            <svg
              className="size-24 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="size-24 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}

          {/* Success/Warning Message */}
          <div className="text-center pb-6 pt-4">
            {isUserCompleteProfile ? (
              <>
                <p className="text-base mb-4 font-semibold text-green-700">
                  پروفایل شما با موفقیت تکمیل شد!
                </p>
                <p className="text-xs leading-6 md:text-sm text-gray-600">
                  شما میتوانید کلاس های آموزشی خود را ثبت نام کنید تا زمانی که همکاران ما اطالاعات هویتی شما را تایید کنند
                </p>
              </>
            ) : (
              <p className="text-base font-semibold text-yellow-700">
                پروفایل شما هنوز تکمیل نشده است
              </p>
            )}
          </div>

          {/* Mandatory Fields List (only if profile is incomplete) */}
          {!isUserCompleteProfile && (
            <div className="w-full rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="mb-2 text-xs font-medium text-gray-700 md:text-sm">
                لطفاً اطلاعات را تکمیل کنید
              </p>
              <ul className="list-inside list-disc space-y-0.5 text-xs text-gray-500 md:text-sm">
                {!formData.first_name && (
                  <li>نام</li>
                )}
                {!formData.nationalId && (
                  <li>کد ملی</li>
                )}
                {!formData.postalCode && (
                  <li>کد پستی</li>
                )}
                {!formData?.national_card_images?.length && (
                  <li>تصویر کارت ملی</li>
                )}
                {!formData.city && (
                  <li>شهر</li>
                )}
                {!formData.address && (
                  <li>آدرس</li>
                )}
              </ul>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => {
              setIsProfileCompleteModalOpen(false);
              if (!isUserCompleteProfile) {
                // Optionally scroll to the first incomplete field
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`rounded-lg px-12 py-2 font-medium transition-colors ${
              isUserCompleteProfile
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isUserCompleteProfile ? 'بستن' : 'تکمیل پروفایل'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
