/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';

import type { CreateTicketRequest, User } from '@/API/ticket/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Paperclip, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { getUserProfileRequest } from '@/API/auth';
// API imports
import { createTicketRequest } from '@/API/ticket';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAuth from '@/hooks/useAuth';

// Types
type FileUpload = {
  id: string;
  file: File;
  name: string;
  uploadId?: string;
  uploading: boolean;
  progress: number;
};

type CourseOption = {
  id: string;
  title: string;
  type: 'course';
};

type ProgramOption = {
  classProgramId: {
    id: string;
    title: string;
    coach: {
      first_name: string;
      last_name: string;
    };
  };
  type: 'program';
};

// type RelatedCourseOption = CourseOption | ProgramOption;

export default function CreateTicketPage() {
  const router = useRouter();
  const [requestBody, setRequestBody] = useState<CreateTicketRequest>({
    title: '',
    description: '',
    category: undefined,
    attachments: [],
  });

  const [files, setFiles] = useState<FileUpload[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseOption | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<ProgramOption | null>(null);


  const { user } = useAuth() as {
    user: User | null;
    updateUser: (data: any) => void;
    fetchUserFromServer: () => void;
  };

  // Category options
  const categoryOptions = [
    { value: 'technical_support', label: 'پشتیبانی فنی' },
    { value: 'course_content', label: 'محتوای دوره' },
    { value: 'payment_issue', label: 'مشکل پرداخت' },
    { value: 'access_problem', label: 'مشکل دسترسی' },
    { value: 'general_inquiry', label: 'سوال عمومی' },
    { value: 'bug_report', label: 'گزارش باگ' },
    { value: 'feature_request', label: 'درخواست ویژگی' },
    { value: 'other', label: 'سایر' },
  ];

  // Get user profile for courses and programs
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => {
      const userId = user?.id;
      return getUserProfileRequest({ userId });
    },
    enabled: !!user?.id,
  });

  // Create ticket mutation
  const createTicketMutation = useMutation({
    mutationFn: createTicketRequest,
    onSuccess: (data) => {
      console.log({kirdata: data})
      toast.success('تیکت شما با موفقیت ایجاد شد');
      // router.push('/dashboard/ticket');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'خطا در ایجاد تیکت');
      console.error('Create ticket error:', error);
    },
  });

  // File upload function
  const handleFileUpload = async (file: File): Promise<string | null> => {
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

            setFiles(prev => prev.map(f =>
              f.file === file
                ? { ...f, progress, uploading: progress < 100 }
                : f
            ));
          },
        }
      );

      if (response.status !== 200 || !response?.data) {
        throw new Error('Upload failed');
      }

      return response?.data?.uploadedFile?._id || null;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (files.length + selectedFiles.length > 2) {
      toast.error('حداکثر 2 فایل قابل آپلود است');
      return;
    }

    const newFiles: FileUpload[] = selectedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      uploading: false,
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Start uploading files
    newFiles.forEach(async (fileUpload) => {
      setFiles(prev => prev.map(f =>
        f.id === fileUpload.id
          ? { ...f, uploading: true }
          : f
      ));

      try {
        const uploadId = await handleFileUpload(fileUpload.file);

        if (uploadId) {
          setFiles(prev => prev.map(f =>
            f.id === fileUpload.id
              ? { ...f, uploadId, uploading: false, progress: 100 }
              : f
          ));

          setRequestBody(prev => ({
            ...prev,
            attachments: [...(prev.attachments || []), uploadId],
          }));

          toast.success(`فایل ${fileUpload.name} با موفقیت آپلود شد`);
        }
      } catch (error) {
        setFiles(prev => prev.filter(f => f.id !== fileUpload.id));
        toast.error(`خطا در آپلود فایل ${fileUpload.name}`);
      }
    });

    // Clear the input
    e.target.value = '';
  };

  // Remove file
  const removeFile = (fileId: string) => {
    const fileToRemove = files.find(f => f.id === fileId);
    if (fileToRemove?.uploadId) {
      setRequestBody(prev => ({
        ...prev,
        attachments: prev.attachments?.filter(id => id !== fileToRemove.uploadId) || [],
      }));
    }
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Handle related course/program selection
  const handleRelatedCourseChange = (value: string) => {
    // console.log({value: value})
    // Find the selected item from user profile
    const courses = userProfile?.courses || [];
    const programs = userProfile?.programs || [];

    const selectedCourse = courses.find((course: any) => course.id === value);
    const selectedProgram = programs.find((program: any) => program?.classProgramId?.id === value);

    if (selectedCourse) {
      setSelectedCourse(selectedCourse);
      setSelectedProgram(null);
      setRequestBody(prev => ({
        ...prev,
        course_id: selectedCourse?.id,
        program_type: 'course',
        program_id: undefined,
      }));
    } else if (selectedProgram) {
      setSelectedProgram(selectedProgram);
      setSelectedCourse(null);
      setRequestBody(prev => ({
        ...prev,
        program_id: selectedProgram?.classProgramId?.id,
        program_type: 'course_session',
        course_id: undefined,
      }));
    }
  };

  // Prepare course and program options
  const relatedCourseOptions = React.useMemo(() => {
    // console.log({userProfile: userProfile})
    if (!userProfile) {
      return [];
    }

    const courses = userProfile?.courses || [];
    const programs = userProfile?.programs || [];

    const courseOptions = courses.map((course: any) => ({
      value: course?.id,
      label: `دوره آموزشی ${course?.title}`,
      type: 'course' as const,
    }));

    const programOptions = programs.map((program: any) => ({
      value: program?.classProgramId?.id,
      label: `کلاس آموزشی ${program?.classProgramId?.course?.title} با استاد ${program?.classProgramId?.coach?.first_name}`,
      type: 'program' as const,
    }));

    return [...courseOptions, ...programOptions];
  }, [userProfile]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestBody.title.trim()) {
      toast.error('عنوان تیکت الزامی است');
      return;
    }

    if (!requestBody.description.trim()) {
      toast.error('توضیحات تیکت الزامی است');
      return;
    }

    if (!requestBody.category) {
      toast.error('انتخاب دسته‌بندی الزامی است');
      return;
    }

    // Check if any files are still uploading
    const uploadingFiles = files.filter(f => f.uploading);
    if (uploadingFiles.length > 0) {
      toast.error('لطفا تا اتمام آپلود فایل‌ها صبر کنید');
      return;
    }

    createTicketMutation.mutate(requestBody);
  };

  return (
    <div className="w-full md:container mx-auto max-w-5xl p-0 md:p-6">
      <Card className="px-4 md:px-6 py-6">
        <h1 className="mb-10 text-right text-sm md:text-xl font-bold">ایجاد تیکت جدید</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-600 text-right text-sm font-medium">
              عنوان تیکت *
            </label>
            <Input
              id="title"
              type="text"
              placeholder="عنوان تیکت خود را وارد کنید"
              value={requestBody.title}
              onChange={e => setRequestBody(prev => ({ ...prev, title: e.target.value }))}
              className="text-right placeholder:text-xs"
              required
            />
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-gray-600 text-right text-sm font-medium">
              دسته‌بندی *
            </label>
            <Select
              dir="rtl"
              value={requestBody.category}
              onValueChange={(value: any) => setRequestBody(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="border text-xs md:text-sm border-gray-300 placeholder:text-xs">
                <SelectValue placeholder="دسته‌بندی تیکت را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Related Course/Program Select */}
          {!isLoadingProfile && relatedCourseOptions.length > 0 && (
            <div dir="rtl" className="space-y-2">
              <label htmlFor="related-course" className="block text-gray-600 text-right text-sm font-medium">
                دوره مرتبط
              </label>
              <Select
                dir="rtl"
                value={selectedCourse?.id || selectedProgram?.classProgramId?.id || ''}
                onValueChange={handleRelatedCourseChange}
              >
                <SelectTrigger className="border text-xs md:text-sm border-gray-300 placeholder:text-xs">
                  <SelectValue placeholder="دوره یا برنامه مرتبط را انتخاب کنید (اختیاری)" />
                </SelectTrigger>
                <SelectContent>
                  {relatedCourseOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Description Textarea */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-right text-gray-600 text-sm font-medium">
              توضیحات *
            </label>
            <textarea
              id="description"
              placeholder="توضیحات مفصل درباره موضوع تیکت"
              value={requestBody.description}
              onChange={e => setRequestBody(prev => ({ ...prev, description: e.target.value }))}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-right text-xs md:text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-right text-gray-600 text-sm font-medium">
              پیوست‌ها (حداکثر 2 فایل)
            </label>

            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={files.length >= 2}
              />
              <label
                htmlFor="file-upload"
                className={`flex cursor-pointer flex-col items-center space-y-2 ${
                  files.length >= 2 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Upload className="size-8 text-gray-400" />
                <span className="text-[10px] md:text-sm text-gray-600">
                  {files.length >= 2
                    ? 'حداکثر 2 فایل قابل آپلود است'
                    : 'فایل‌های خود را انتخاب کنید یا اینجا بکشید'}
                </span>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map(file => (
                  <div key={file.id} className="flex items-center flex-wrap justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Paperclip className="size-4 text-gray-500" />
                      <span className="text-xs md:text-sm">{file.name}</span>
                      {file.uploading && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="h-2 w-16 rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{file.progress}%</span>
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      disabled={file.uploading}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-start space-x-4 space-x-reverse">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={createTicketMutation.isPending}
            >
              انصراف
            </Button>
            <Button
              className="bg-blue-500"
              type="submit"
              disabled={createTicketMutation.isPending || files.some(f => f.uploading)}
            >
              {createTicketMutation.isPending ? 'در حال ایجاد...' : 'ایجاد تیکت'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}