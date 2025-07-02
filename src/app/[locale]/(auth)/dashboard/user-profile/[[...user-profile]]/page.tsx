/* eslint-disable @next/next/no-img-element */
/* eslint-disable ts/ban-ts-comment */
/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Upload, UserRound } from 'lucide-react';
import { use, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import toast from 'react-hot-toast';
import LoadingButton from '@/components/LoadingButton';
import { Card, CardContent } from '@/components/ui/card';
import Modal from '@/components/ui/Modal';
import useAuth from '@/hooks/useAuth';
import { validateIranianNationalId } from '@/utils/Helpers';
import { completeProfileRequest } from '@/API/auth';

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
};

type IUserProfilePageProps = {
  params: {
    'locale': string;
    'user-profile'?: string[];
  };
};

type FormData = {
  first_name: string;
  last_name: string;
  gender: 'M' | 'W';
  nationalId: string;
  avatar: string;
  national_card_images: string[];
};

type FormErrors = {
  first_name?: string;
  last_name?: string;
  nationalId?: string;
  national_card_images?: string;
};

export default function UserProfilePage({ params }: IUserProfilePageProps) {
  const { user, updateUser } = useAuth() as {
    user: User | null;
    updateUser: (data: any) => void;
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    gender: user?.gender || 'M',
    nationalId: '',
    avatar: '',
    national_card_images: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor | null>(null);

  // Add these new state variables after the existing state declarations
  const [nationalCardPreviews, setNationalCardPreviews] = useState<string[]>([]);
  const nationalCardInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingNationalCard, setIsUploadingNationalCard] = useState(false);
  const [nationalCardUploadProgress, setNationalCardUploadProgress] = useState(0);

  // Add new state for form errors
  const [errors, setErrors] = useState<FormErrors>({});

  const { 'user-profile': _ = [] } = use(params);

  useEffect(() => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      gender: user?.gender || 'M',
      nationalId: user?.nationalId || '',
      avatar: user?.avatar || '',
      national_card_images: user?.national_card_images?.map(image => image._id) || [],
    });
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: completeProfileRequest,
    onSuccess: (response) => {
      if (response) {
        // eslint-disable-next-line no-console
        console.log('__response__', response);
        updateUser(response);
        toast.success('پروفایل با موفقیت بروزرسانی شد');
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
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

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
            setUploadProgress(progress);
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
          avatar: response.data.uploadedFile._id,
        }));
        toast.success('تصویر با موفقیت آپلود شد');
      }
    } catch (error) {
      toast.error('خطا در آپلود تصویر');
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(file);
      setIsPreviewOpen(true);
    }
  };

  const handleSaveEdit = async () => {
    if (editorRef.current && previewImage) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], previewImage.name, { type: 'image/jpeg' });
          setIsPreviewOpen(false);
          await handleFileUpload(file);
        }
      }, 'image/jpeg');
    }
  };

  // Update form submission to include validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateField('first_name', formData.first_name);
    const isLastNameValid = validateField('last_name', formData.last_name);

    if (!isFirstNameValid || !isLastNameValid) {
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

  return (
    <div className="my-6 -ml-16">
      <div className="container mx-auto">
        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center ">
          <h1 className="mb-8 text-2xl font-bold">پروفایل کاربری</h1>
          <Card className="w-full max-w-2xl shadow-lg">
            <CardContent dir="rtl" className="p-6">
              <div className="mb-6 flex items-center justify-center">
                <div className="flex size-24 items-center justify-center rounded-full bg-gray-100">
                  <UserRound size={48} className="text-gray-400" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">نام و نام خانوادگی</span>
                  <span className="mt-2 font-medium">
                    {user?.first_name}
                    {' '}
                    {user?.last_name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">شماره موبایل</span>
                  <span className="mt-2 font-medium">{user?.mobile}</span>
                </div>
                {user?.gender && (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">جنسیت</span>
                    <span className="mt-2 font-medium">
                      {user?.gender === 'M' ? 'مرد' : 'زن'}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form Card */}
          <Card className="mt-8 w-full max-w-2xl shadow-lg">
            <CardContent dir="rtl" className="p-6">
              <h2 className="mb-6 text-xl font-semibold">ویرایش پروفایل</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">نام</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`rounded-md border p-2 text-sm ${
                      errors.first_name ?
                        'border-red-500 focus:border-red-500 focus:ring-red-500' :
                        'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                  />
                  {errors.first_name && (
                    <span className="mt-1 text-xs text-red-500">{errors.first_name}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">نام خانوادگی</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`rounded-md border p-2 text-sm ${
                      errors.last_name ?
                        'border-red-500 focus:border-red-500 focus:ring-red-500' :
                        'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                  />
                  {errors.last_name && (
                    <span className="mt-1 text-xs text-red-500">{errors.last_name}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">جنسیت</label>
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
                  <label className="mb-2 text-sm text-gray-500">کد ملی</label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    onBlur={handleNationalIdBlur}
                    className={`rounded-md border p-2 ${
                      errors.nationalId ?
                        'border-red-500 focus:border-red-500 focus:ring-red-500' :
                        'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                  />
                  {errors.nationalId && (
                    <span className="mt-1 text-xs text-red-500">{errors.nationalId}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">تصویر پروفایل</label>
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
                    className="flex items-center justify-center rounded-md border border-gray-300 p-2 text-xs hover:bg-gray-50"
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

                {/* After the avatar upload section, add this new section */}
                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">تصویر کارت ملی (حداکثر 3 تصویر)</label>
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

                <LoadingButton
                  type="submit"
                  isLoading={updateProfileMutation.isPending}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  ذخیره
                </LoadingButton>
              </form>
            </CardContent>
          </Card>
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
              onClick={handleSaveEdit}
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
    </div>
  );
}
