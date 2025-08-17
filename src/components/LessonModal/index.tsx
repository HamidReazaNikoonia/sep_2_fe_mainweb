/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import React, { useEffect } from 'react';
import { X, Download, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDurationWithPersian } from '@/utils/Helpers';
import { createPortal } from 'react-dom';

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

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  subject: CourseObject | null;
  onDownloadFile?: (file: LessonFile, type: 'lesson') => void;
  videoUrl?: string; // Optional custom video URL
}

export default function LessonModal({
  isOpen,
  onClose,
  lesson,
  subject,
  onDownloadFile,
  videoUrl
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

  if (!isOpen || !lesson || !subject) return null;

  // Generate video URL - you can customize this based on your file structure
  const defaultVideoUrl = lesson.file ? 
    `${process.env.NEXT_PUBLIC_SERVER_FILES_URL}/${lesson.file.file_name}` : 
    '';

  const finalVideoUrl = videoUrl || defaultVideoUrl;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      {/* Mobile Full Screen Layout */}
      <div className="flex h-full w-full flex-col md:items-center md:justify-center md:p-4">
        {/* Modal Container */}
        <div className="flex h-full w-full flex-col bg-white md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-lg md:overflow-hidden md:shadow-2xl">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-gray-200 bg-white p-4 md:p-6" dir="rtl">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="size-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-sm text-gray-600 font-medium">
                  {subject.subject_title}
                </h3>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                {lesson.title}
              </h1>
              {lesson.description && (
                <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                  {lesson.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{formatDurationWithPersian(lesson.duration)}</span>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="بستن"
            >
              <X className="size-6 text-gray-600" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="flex-1 bg-black relative">
            {finalVideoUrl ? (
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={lesson.file?.file_name ? `/uploads/${lesson.file.file_name}` : undefined}
              >
                <source src={finalVideoUrl} type="video/mp4" />
                <source src={finalVideoUrl} type="video/webm" />
                <source src={finalVideoUrl} type="video/ogg" />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <BookOpen className="size-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">ویدیو در دسترس نیست</h3>
                  <p className="text-gray-300">فایل ویدیو برای این درس موجود نمی‌باشد</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-200 bg-white p-4 md:p-4" dir="rtl">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>درس {lesson.order} از {subject.lessons.length}</span>
                <span className="mx-2">•</span>
                <span>{subject.subject_title}</span>
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
    document.body
  );
}
