'use client';
import LoadingButton from '@/components/LoadingButton';
import { Card, CardContent } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import { validateIranianNationalId } from '@/utils/Helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Upload, UserRound } from 'lucide-react';
import { use, useRef, useState } from 'react';
import toast from 'react-hot-toast';

type User = {
  first_name: string;
  last_name: string;
  mobile: string;
  role?: string;
  gender?: 'M' | 'W';
};

type UserProfile = {
  gender: 'M' | 'W';
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
};

export default function UserProfilePage({ params }: IUserProfilePageProps) {
  const { user, userProfileData, updateUser } = useAuth() as {
    user: User | null;
    userProfileData: UserProfile | null;
    updateUser: (data: any) => void;
  };
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    gender: user?.gender || 'M',
    nationalId: '',
    avatar: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { 'user-profile': segments = [] } = use(params);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(`${process.env.NEXT_PUBLIC_PROJECT_NAME}-access`)}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      updateUser(response);
      toast.success('پروفایل با موفقیت بروزرسانی شد');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'خطا در بروزرسانی پروفایل');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'nationalId' && value) {
      const isValid = validateIranianNationalId(value);
      if (!isValid) {
        toast.error('کد ملی نامعتبر است');
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/setting/upload`,
        formData,
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

      console.log(response);

      if (response.status !== 200 || !response?.data) {
        toast.error('خطا در آپلود تصویر');
        return false;
      }

      if (response?.data?.uploadedFile) {
        setFormData(prev => ({
          ...prev,
          avatar: response.data.uploadedFile._id,
        }));
        console.log(formData, response.data.uploadedFile._id);

        toast.success('تصویر با موفقیت آپلود شد');
      }
    } catch (error) {
      toast.error('خطا در آپلود تصویر');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
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
                  <span className="font-medium">
                    {user?.first_name}
                    {' '}
                    {user?.last_name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">شماره موبایل</span>
                  <span className="font-medium">{user?.mobile}</span>
                </div>
                {user?.gender && (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">جنسیت</span>
                    <span className="font-medium">
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
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">نام خانوادگی</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">جنسیت</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="rounded-md border border-gray-300 p-2"
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
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-gray-500">تصویر پروفایل</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center rounded-md border border-gray-300 p-2 hover:bg-gray-50"
                  >
                    <Upload className="mr-2 size-5" />
                    آپلود تصویر
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

                <LoadingButton
                  type="submit"
                  isLoading={updateProfileMutation.isPending}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  ذخیره تغییرات
                </LoadingButton>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
