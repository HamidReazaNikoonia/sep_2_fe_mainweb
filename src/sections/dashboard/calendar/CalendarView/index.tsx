/* eslint-disable react/no-nested-components */
'use client';
import React, { useState, useMemo,  useEffect, useRef } from 'react';
import moment from 'moment-jalaali';
import { ChevronLeft, ChevronRight, BookOpenText, UserRound, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toPersianDigits, truncateDescription } from '@/utils/Helpers';
import { User } from '@clerk/nextjs/server';

moment.loadPersian({ usePersianDigits: false });

interface Session {
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  _id: string;
  program: {
    title: string;
    coachFullName: string;
  };
}

interface CalendarViewProps {
  sessions: Session[];
}

type ViewType = 'month' | 'week' | 'day';

export default function CalendarView({ sessions }: CalendarViewProps) {
  const [viewType, setViewType] = useState<ViewType>('month');
  const [currentDate, setCurrentDate] = useState(moment());

  const [shouldScrollToToday, setShouldScrollToToday] = useState(false);
  const todayRef = useRef<string | null>(null);

  // Add this useEffect to handle scrolling
  useEffect(() => {
    if (shouldScrollToToday && (viewType === 'month' || viewType === 'week')) {
      const todayId = moment().format('YYYY-MM-DD');
      const element = document.getElementById(`day-${todayId}`);

      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
      }

      setShouldScrollToToday(false);
    }
  }, [shouldScrollToToday, viewType, currentDate]);

  // Get sessions for a specific date
  const getSessionsForDate = (date: moment.Moment) => {
    const dateStr = date.format('YYYY-MM-DD');
    return sessions
      .filter((session) => {
        const sessionDate = moment(session.date).format('YYYY-MM-DD');
        return sessionDate === dateStr;
      })
      .sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
      });
  };

  // Month View Component
  const MonthView = () => {
    const startOfMonth = currentDate.clone().startOf('jMonth');
    const endOfMonth = currentDate.clone().endOf('jMonth');
    const startDate = startOfMonth.clone().startOf('week');
    const endDate = endOfMonth.clone().endOf('week');

    const days = [];
    const day = startDate.clone();

    while (day.isBefore(endDate, 'day')) {
      days.push(day.clone());
      day.add(1, 'day');
    }

    const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

    return (
      <div className="w-full">
        <div className="mb-4 grid grid-cols-7 gap-2">
          {/* {weekDays.map((dayName) => (
            <div key={dayName} className="text-center text-sm font-semibold text-gray-700">
              {dayName}
            </div>
          ))} */}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {days.map((day, index) => {
            const daySessions = getSessionsForDate(day);
            const isCurrentMonth = day.jMonth() === currentDate.jMonth();
            const isToday = day.isSame(moment(), 'day');

            return (
              <Card
                key={index}
                id={`day-${day.format('YYYY-MM-DD')}`}
                className={`min-h-[120px] cursor-pointer p-2 transition-all hover:border-purple-500 ${
                  !isCurrentMonth ? 'bg-gray-50 opacity-50' : ''
                } ${isToday ? 'border-2 border-purple-600' : ''}`}
                onClick={() => {
                  setCurrentDate(day.clone());
                  setViewType('day');
                }}
              >
                <div className={`mx-1 mb-1.5 flex flex-row-reverse items-center justify-between text-base font-medium ${isToday ? 'text-purple-600' : 'text-gray-700'}`}>
                  <div>
                    {day.format('jD') && toPersianDigits(day.format('jD'))}
                  </div>

                  <div className='text-[11px]'>
                    {day.format('dddd')}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  {daySessions.map((session) => (
                    <div
                      dir='ltr'
                      key={session._id}
                      className="rounded-xl bg-purple-100 px-1 py-0.5 text-center text-[10px] text-purple-800 shadow-sm"
                    >
                      {session.startTime && toPersianDigits(session.startTime)}
                      {' '}
                      -
                      {' '}
                      {session.endTime && toPersianDigits(session.endTime)}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Week View Component
  const WeekView = () => {
    const startOfWeek = currentDate.clone().startOf('week');
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.clone().add(i, 'days'));
    }

    const weekDaysFull = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-2">
          {days.map((day, index) => {
            const daySessions = getSessionsForDate(day);
            const isToday = day.isSame(moment(), 'day');

            return (
              <Card
                key={index}
                id={`day-${day.format('YYYY-MM-DD')}`}
                className={`min-h-[150px] cursor-pointer p-3 transition-all hover:border-purple-500 ${
                  isToday ? 'border-2 border-purple-600' : ''
                }`}
                onClick={() => {
                  setCurrentDate(day.clone());
                  setViewType('day');
                }}
              >
                <div className="mb-2">
                  <div className="mb-1.5 text-xs text-gray-600">{weekDaysFull[index]}</div>
                  <div className={`text-lg font-bold ${isToday ? 'text-purple-600' : 'text-gray-800'}`}>
                    {day.format('jD') && toPersianDigits(day.format('jD'))}
                  </div>
                </div>
                <div className="space-y-2">
                  {daySessions.map((session) => (
                    <div
                      key={session._id}
                      className="text-rigth rounded-xl bg-purple-100 px-3 py-4 text-xs text-purple-800 shadow-sm"
                    >
                      <div className="flex mb-3 items-center gap-2 text-right text-sm font-normal">
                        <span>
                          <Clock className="size-5 text-purple-700" />
                        </span>
                        <span>از ساعت</span>
                        <span>{session.startTime && toPersianDigits(session.startTime)}</span>
                        <span>تا</span>
                        <span>{session.endTime && toPersianDigits(session.endTime)}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 truncate">
                        <span className="shrink-0">
                          <BookOpenText className="size-4 text-purple-700" />
                        </span>
                        <span className="font-medium text-purple-800">کلاس</span>
                        <span className="flex-1 truncate font-semibold text-gray-900">{session.program.title}</span>
                      </div>

                      <div className="mt-1 flex items-center gap-2 truncate">
                        <span className="shrink-0">
                          <UserRound className="size-4 text-purple-700" />
                        </span>
                        <span className="font-medium text-gray-600">استاد</span>
                        <span className="flex-1 truncate font-normal text-gray-900">{session.program.coachFullName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Day View Component
  const DayView = () => {
    const daySessions = getSessionsForDate(currentDate);
    const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 06:00 to 23:00

    return (
      <div className="w-full">
        <div className="mb-4 text-center">
          <div className="text-sm text-gray-600">
            {currentDate.format('dddd')}
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {currentDate.format('jD jMMMM jYYYY')}
          </div>
        </div>

        <div className="relative">
          {hours.map((hour) => {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            
            return (
              <div key={hour} className="relative flex border-b border-gray-200" style={{ height: '80px' }}>
                <div className="w-20 shrink-0 py-2 pr-4 text-right text-sm text-gray-600">
                  {timeString}
                </div>
                <div className="relative flex-1 border-r border-gray-200"></div>
              </div>
            );
          })}

          {/* Render session cards */}
          {daySessions.map((session) => {
            const startHour = parseInt(session.startTime.split(':')[0]);
            const startMinute = parseInt(session.startTime.split(':')[1]);
            const endHour = parseInt(session.endTime.split(':')[0]);
            const endMinute = parseInt(session.endTime.split(':')[1]);

            if (startHour < 6 || startHour > 23) return null;

            const topPosition = (startHour - 6) * 80 + (startMinute / 60) * 80;
            const duration = (endHour - startHour) + (endMinute - startMinute) / 60;
            const height = duration * 80;

            return (
              <Card
                key={session._id}
                className="absolute inset-x-0 right-[70px] ml-10 overflow-hidden border-l-4 border-purple-600 bg-purple-50 px-4 py-2"
                style={{
                  top: `${topPosition}px`,
                  height: `${Math.max(height, 60)}px`,
                }}
              >

                <div className="mb-1.5 flex items-center gap-2 text-right text-[10px] font-normal text-purple-700">
                  <span>
                    <Clock className="size-4 " />
                  </span>
                  <span>از ساعت</span>
                  <span>{session.startTime && toPersianDigits(session.startTime)}</span>
                  <span>تا</span>
                  <span>{session.endTime && toPersianDigits(session.endTime)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 truncate text-xs">
                  <span className="shrink-0">
                    <BookOpenText className="size-4 text-purple-700" />
                  </span>
                  <span className="font-medium text-purple-800">کلاس</span>
                  <span className="flex-1 truncate font-semibold text-gray-900">{session.program.title && truncateDescription(session.program.title, 20)}</span>
                </div>

                <div className="mt-1 flex items-center gap-2 truncate text-xs">
                  <span className="shrink-0">
                    <UserRound className="size-4 text-purple-700" />
                  </span>
                  <span className="font-medium text-gray-600">استاد</span>
                  <span className="flex-1 truncate font-normal text-gray-900">{session.program.coachFullName}</span>
                </div>
                <div className="mt-1">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[10px] ${
                      session.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : session.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {session.status === 'completed' ? 'تکمیل شده' : session.status === 'cancelled' ? 'لغو شده' : 'برنامه ریزی شده'}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (viewType === 'month') {
      setCurrentDate(currentDate.clone().subtract(1, 'jMonth'));
    } else if (viewType === 'week') {
      setCurrentDate(currentDate.clone().subtract(1, 'week'));
    } else {
      setCurrentDate(currentDate.clone().subtract(1, 'day'));
    }
  };

  const handleNext = () => {
    if (viewType === 'month') {
      setCurrentDate(currentDate.clone().add(1, 'jMonth'));
    } else if (viewType === 'week') {
      setCurrentDate(currentDate.clone().add(1, 'week'));
    } else {
      setCurrentDate(currentDate.clone().add(1, 'day'));
    }
  };

  const handleToday = () => {
    setCurrentDate(moment());

    // Trigger scroll if in month or week view
    if (viewType === 'month' || viewType === 'week') {
      setShouldScrollToToday(true);
    }
  };

  // Get current period text
  const getCurrentPeriodText = () => {
    if (viewType === 'month') {
      return currentDate.format('jMMMM jYYYY');
    } else if (viewType === 'week') {
      const startOfWeek = currentDate.clone().startOf('week');
      const endOfWeek = currentDate.clone().endOf('week');
      return `${startOfWeek.format('jD jMMMM')} - ${endOfWeek.format('jD jMMMM jYYYY')}`;
    } else {
      return currentDate.format('jD jMMMM jYYYY');
    }
  };

  return (
    <Card className="w-full p-5">
      {/* Header Controls */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* View Type Selector */}
        <div className="flex gap-2">
          <Button
            variant={viewType === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('month')}
          >
            ماهانه
          </Button>
          <Button
            variant={viewType === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('week')}
          >
            هفتگی
          </Button>
          <Button
            variant={viewType === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('day')}
          >
            روزانه
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleToday}>
            امروز
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <ChevronLeft className="size-4" />
            </Button>
            <div className="min-w-[200px] text-center text-sm font-semibold">
              {getCurrentPeriodText()}
            </div>
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="w-full">
        {viewType === 'month' && <MonthView />}
        {viewType === 'week' && <WeekView />}
        {viewType === 'day' && <DayView />}
      </div>
    </Card>
  );
}