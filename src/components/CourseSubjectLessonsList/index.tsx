/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { Book, Clock, FileText, Lock, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import LessonModal from '@/components/LessonModal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDurationWithPersian, toPersianDigits } from '@/utils/Helpers';

// Types based on the provided data structure
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

type SubjectFiles = {
  _id: string;
  file_name: string;
};

type CourseObject = {
  subject_title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  duration: number; // minutes
  files: SubjectFiles;
};

type CourseSubjectLessonsListProps = {
  course_objects: CourseObject[];
  onLessonClick?: (lesson: Lesson, subject: CourseObject) => void;
  onDownloadFile?: (file: LessonFile | SubjectFiles, type: 'lesson' | 'subject') => void;
  userPermission?: boolean;
};

export default function CourseSubjectLessonsList({
  course_objects,
  onLessonClick,
  onDownloadFile,
  userPermission = false,
}: CourseSubjectLessonsListProps) {
  // Modal state
  const [courseObjectsState, setCourseObjectsState] = useState(course_objects);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<CourseObject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Change the Logic From Back-end
    if (userPermission) {
      const data = course_objects.map((subject) => {
        const filteredLessons = subject.lessons.map((lesson) => {
          lesson.status = 'PUBLIC';
          return lesson;
        });
        return { ...subject, lessons: filteredLessons };
      });
      setCourseObjectsState(data);
    }
    // eslint-disable-next-line no-console
    console.log(userPermission);
  }, [course_objects, userPermission]);

  // Calculate total lessons count for a subject
  const getTotalLessonsCount = (lessons: Lesson[]) => lessons.length ? toPersianDigits(lessons.length) : 0;

  // Handle lesson click
  const handleLessonClick = (lesson: Lesson, subject: CourseObject) => {
    if (lesson.status === 'PUBLIC') {
      setSelectedLesson(lesson);
      setSelectedSubject(subject);
      setIsModalOpen(true);
      // Also call the original callback if provided
      onLessonClick?.(lesson, subject);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
    setSelectedSubject(null);
  };

  return (
    <>
      <div className="w-full" dir="rtl">
        <Accordion type="single" collapsible className="w-full space-y-2 md:space-y-4">
          {courseObjectsState
            .sort((a, b) => a.order - b.order)
            .map((subject, subjectIndex) => (
              <AccordionItem
                key={`subject-${subject.order}-${subjectIndex}`}
                value={`subject-${subjectIndex}`}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <AccordionTrigger className="p-3 transition-colors hover:bg-gray-50 hover:no-underline md:px-6 md:py-4">
                  <div className="flex w-full items-start justify-between gap-2 md:items-center">
                    <div className="flex min-w-0 flex-1 items-start gap-2 md:items-center md:gap-3">
                      <Book className="mt-0.5 size-4 shrink-0 text-blue-600 md:mt-0 md:size-5" />
                      <div className="min-w-0 flex-1 text-right">
                        <h3 className="text-xs font-semibold leading-tight text-gray-900 md:text-base md:text-sm">
                          {subject.subject_title}
                        </h3>
                        {subject.description && (
                          <p className="mt-1 line-clamp-2 text-[10px] text-gray-600 md:text-sm">
                            {subject.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-gray-500 md:flex-row md:items-center md:gap-3 md:text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="size-3 md:size-4" />
                        <span className="text-xs md:text-sm">{formatDurationWithPersian(subject.duration)}</span>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap text-[10px] font-medium text-gray-800 md:text-sm">
                        {getTotalLessonsCount(subject.lessons)}
                        {' '}
                        درس
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="bg-gray-50 p-3 md:px-6 md:py-4">
                  {/* Subject Files */}
                  {subject.files && (
                    <div className="mb-3 rounded-lg border border-gray-100 bg-white p-3 md:mb-4 md:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="size-3 text-gray-500 md:size-4" />
                          <span className="text-xs font-medium text-gray-700 md:text-sm">
                            فایل‌های سرفصل
                          </span>
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => onDownloadFile?.(subject.files, 'subject')}
                          className="h-7 px-2 text-xs md:h-8 md:px-3"
                        >
                          دانلود
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Lessons List */}
                  <div className="space-y-1.5 md:space-y-2">
                    {subject.lessons
                      .sort((a, b) => a.order - b.order)
                      .map((lesson, lessonIndex) => (
                        <div
                          key={`lesson-${lesson.order}-${lessonIndex}`}
                          className={`rounded-lg border p-3 transition-all duration-200 md:p-4 ${
                            lesson.status === 'PUBLIC'
                              ? 'cursor-pointer border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                              : 'cursor-not-allowed border-gray-200 bg-gray-100'
                          }`}
                          onClick={() => handleLessonClick(lesson, subject)}
                        >
                          <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                            <div className="flex min-w-0 flex-1 items-start gap-2 md:items-center md:gap-3">
                              <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
                                {lesson.status === 'PUBLIC'
                                  ? (
                                      <Play className="size-4 text-green-600 md:size-5" />
                                    )
                                  : (
                                      <Lock className="size-4 text-gray-400 md:size-5" />
                                    )}

                                <Badge
                                  variant={lesson.status === 'PUBLIC' ? 'default' : 'secondary'}
                                  className="hidden h-5 px-1.5 text-[11px] font-medium md:block md:h-6 md:px-2 md:text-xs"
                                >
                                  {lesson.status === 'PUBLIC' ? 'رایگان' : 'پولی'}
                                </Badge>
                              </div>

                              <div className="min-w-0 flex-1 text-right">
                                <h4 className={`text-sm font-medium leading-tight md:text-base ${
                                  lesson.status === 'PUBLIC' ? 'text-gray-900' : 'text-gray-500'
                                }`}
                                >
                                  {lesson.title}
                                </h4>
                                {lesson.description && (
                                  <p className={`mt-1.5 line-clamp-2 text-xs md:mt-1 md:text-sm ${
                                    lesson.status === 'PUBLIC' ? 'text-gray-600' : 'text-gray-400'
                                  }`}
                                  >
                                    {lesson.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex shrink-0 flex-col items-start gap-1.5 md:flex-row md:items-end md:gap-3">
                              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 md:mt-0 md:text-sm">
                                <Clock className="size-3 md:size-4" />
                                <span>{formatDurationWithPersian(lesson.duration)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Empty state if no lessons */}
                  {subject.lessons.length === 0 && (
                    <div className="py-6 text-center text-gray-500 md:py-8">
                      <Book className="mx-auto mb-2 size-8 text-gray-300 md:mb-3 md:size-12" />
                      <p className="text-xs md:text-sm">هنوز درسی برای این سرفصل اضافه نشده است</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        {/* Empty state if no subjects */}
        {courseObjectsState.length === 0 && (
          <div className="py-8 text-center text-gray-500 md:py-12">
            <Book className="mx-auto mb-3 size-12 text-gray-300 md:mb-4 md:size-16" />
            <h3 className="mb-2 text-base font-medium md:text-lg">هنوز سرفصلی اضافه نشده است</h3>
            <p className="text-xs md:text-sm">محتوای این دوره به زودی اضافه خواهد شد</p>
          </div>
        )}
      </div>

      {/* Lesson Modal */}
      <LessonModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        lesson={selectedLesson}
        subject={selectedSubject}
        onDownloadFile={onDownloadFile}
      />
    </>
  );
}
