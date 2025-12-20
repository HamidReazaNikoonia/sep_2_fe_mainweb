/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import { BookOpen, Clock, Download, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { formatDurationWithPersian } from '@/utils/Helpers';

// Types matching your CourseSubjectLessonsList component
type LessonFile = {
  _id: string;
  file_name: string;
};

type Lesson = {
  title: string;
  description: string;
  order: number;
  status: 'PUBLIC' | 'PRIVATE';
  duration: number; // minutes
  file: LessonFile;
};

type CourseObject = {
  subject_title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  duration: number; // minutes
  files: {
    _id: string;
    file_name: string;
  };
};

type LessonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  subject: CourseObject | null;
  onDownloadFile?: (file: LessonFile, type: 'lesson') => void;
  videoUrl?: string; // Optional custom video URL
};

export default function LessonModal({
  isOpen,
  onClose,
  lesson,
  subject,
  onDownloadFile,
  videoUrl,
}: LessonModalProps) {
  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lesson || !subject) {
    return null;
  }

  // Generate video URL - you can customize this based on your file structure
  const defaultVideoUrl = lesson.file
    ? `${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${lesson.file.file_name}`
    : '';

  const finalVideoUrl = videoUrl || defaultVideoUrl;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      {/* Mobile Full Screen Layout */}
      <div className="flex size-full flex-col md:items-center md:justify-center md:p-4">
        {/* Modal Container */}
        <div className="flex size-full flex-col overflow-x-hidden overflow-y-scroll bg-white md:h-auto md:max-w-4xl md:rounded-lg md:shadow-2xl">

          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-gray-200 bg-white p-4 md:p-6" dir="rtl">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <BookOpen className="size-5 flex-shrink-0 text-blue-600" />
                <h3 className="text-sm font-medium text-purple-800">
                  {subject.subject_title}
                </h3>
              </div>
              <h1 className="text-sm font-semibold leading-7 text-purple-900 md:text-xl">
                {lesson.title}
              </h1>
              {lesson.description && (
                <p className="text-xs leading-7 text-gray-600">
                  {lesson.description}
                </p>
              )}
              <div className="mt-3 flex items-center gap-4 text-[10px]  text-gray-500 md:text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="size-3 md:size-4" />
                  <span>{lesson?.duration && formatDurationWithPersian(lesson?.duration || 0)}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 rounded-full p-2 transition-colors hover:bg-gray-100"
              aria-label="بستن"
            >
              <X className="size-6 font-bold text-black" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative flex-1 bg-black">
            {finalVideoUrl
              ? (
                  <video
                    controls
                    className="size-full object-contain"
                  >
                    <source src={finalVideoUrl} type="video/mp4" />
                    <source src={finalVideoUrl} type="video/webm" />
                    <source src={finalVideoUrl} type="video/ogg" />
                    مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                  </video>
                )
              : (
                  <div className="flex size-full items-center justify-center text-white">
                    <div className="text-center">
                      <BookOpen className="mx-auto mb-4 size-16 text-gray-400" />
                      <h3 className="mb-2 text-lg font-medium">ویدیو در دسترس نیست</h3>
                      <p className="text-gray-300">فایل ویدیو برای این درس موجود نمی‌باشد</p>
                    </div>
                  </div>
                )}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-200 bg-white p-4 md:p-4" dir="rtl">
            <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-xs md:text-sm">
                  درس
                  {' '}
                  {lesson.order}
                  {' '}
                  از
                  {' '}
                  {subject.lessons.length}
                </span>
                <span className="mx-2">•</span>
                <span className="text-xs md:text-sm">{subject.subject_title}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Download Button */}
                {lesson.file && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadFile?.(lesson.file, 'lesson')}
                    className="flex items-center gap-2"
                  >
                    <Download className="size-4" />
                    دانلود ویدیو
                  </Button>
                )}

                {/* Close Button (Alternative) */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                  className="md:hidden"
                >
                  بستن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
