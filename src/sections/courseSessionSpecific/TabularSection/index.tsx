/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable style/multiline-ternary */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import clsx from 'clsx';
import {
  FileText,
  ImageIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';
import MediaItem from '@/components/MediaItem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccordionView from '../AccordionViewDetail';
import TabularView from '../TabularViewDetail';

type SampleMedia = {
  url_address: string;
  media_title: string;
  file?: { file_name: string };
  media_type: 'VIDEO' | 'IMAGE' | 'AUDIO';
};

type TabularSectionProps = {
  courseData?: {
    description?: string;
    images?: string[];
    specifications?: Record<string, string>;
    instructor?: {
      name: string;
      bio: string;
      experience: string;
    };
    sample_media?: SampleMedia[];
  };
};

// Update the MobileTabsUICards component to handle both mobile and md layouts
const CardStyleTabs = ({ activeTab, onTabChange, layout = 'column' }: {
  activeTab: string;
  onTabChange: (value: string) => void;
  layout?: 'column' | 'row';
}) => {
  const tabs = [
    {
      value: 'description',
      label: 'توضیحات',
      icon: <FileText className="size-6" />,
      description: 'اطلاعات کامل دوره',
      gradient: 'from-blue-400 to-blue-500',
    },
    {
      value: 'images',
      label: 'نمونه کارها',
      icon: <ImageIcon className="size-6" />,
      description: 'تصاویر و ویدیوهای دوره',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      value: 'support',
      label: 'پشتیبانی',
      icon: <MessageCircle className="size-6" />,
      description: 'راه‌های ارتباطی',
      gradient: 'from-purple-600 to-purple-700',
    },
  ];

  return (
    <div className={clsx(
      'gap-4 p-4',
      {
        'flex flex-col md:flex-row-reverse': layout === 'row',
        'grid grid-cols-1': layout === 'column',
      },
    )}
    >
      {tabs.map(tab => (
        <div
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={clsx(
            'relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]',
            {
              'md:flex-1': layout === 'row',
              'ring-4 ring-pink-200': activeTab === tab.value,
            },
          )}
        >
          <div className={clsx(
            `bg-gradient-to-r ${tab.gradient} relative text-white`,
            {
              'p-4': layout === 'row',
              'p-6': layout === 'column',
            },
          )}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute right-0 top-0 size-32 -translate-y-16 translate-x-16 rounded-full bg-white" />
              <div className="absolute bottom-0 left-0 size-24 -translate-x-12 translate-y-12 rounded-full bg-white" />
            </div>

            <div className="relative z-10">
              {layout === 'row' ? (
                // Row layout for medium screens
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="rounded-xl bg-white bg-opacity-20 p-3 backdrop-blur-sm">
                    {tab.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{tab.label}</h3>
                    <p className="text-sm opacity-90">{tab.description}</p>
                  </div>
                  {/* Selection indicator */}
                  <div className={clsx(
                    'absolute right-0 top-0 flex size-6 items-center justify-center rounded-full border-2 border-white transition-all duration-300',
                    {
                      'bg-white': activeTab === tab.value,
                      'bg-transparent': activeTab !== tab.value,
                    },
                  )}
                  >
                    {activeTab === tab.value && (
                      <div className={`size-3 rounded-full bg-gradient-to-r ${tab.gradient}`} />
                    )}
                  </div>
                </div>
              ) : (
                // Column layout for mobile
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 items-center gap-2 md:gap-4">
                    <div className="rounded-xl bg-white bg-opacity-20 p-3 backdrop-blur-sm">
                      {tab.icon}
                    </div>
                    <div className="mr-2 w-full text-right">
                      <h3 className="text-lg font-bold">{tab.label}</h3>
                      <p className="text-sm opacity-90">{tab.description}</p>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  <div className={clsx(
                    'flex size-6 items-center justify-center rounded-full border-2 border-white transition-all duration-300',
                    {
                      'bg-white': activeTab === tab.value,
                      'bg-transparent': activeTab !== tab.value,
                    },
                  )}
                  >
                    {activeTab === tab.value && (
                      <div className={`size-3 rounded-full bg-gradient-to-r ${tab.gradient}`} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function TabularSection({ courseData }: TabularSectionProps) {
  // Mock data for demonstration
  const mockData = {
    description: 'این دوره جامع طراحی وب‌سایت با WordPress برای مبتدیان طراحی شده است. در این دوره شما با مفاهیم پایه طراحی وب، نحوه کار با WordPress، ایجاد قالب‌های حرفه‌ای و بهینه‌سازی سایت آشنا خواهید شد.',
    images: [
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
    ],
    specifications: {
      'مدت زمان': '40 ساعت',
      'تعداد جلسات': '16 جلسه',
      'سطح دوره': 'مقدماتی تا پیشرفته',
      'نوع دوره': 'حضوری',
      'گواهینامه': 'معتبر',
    },
    instructor: {
      name: 'مهندس احمد محمدی',
      bio: 'طراح وب با بیش از 8 سال تجربه در زمینه طراحی و توسعه وب‌سایت',
      experience: '8 سال تجربه کاری',
    },
    verticalTabsData: {
      objectives: [
        'آشنایی کامل با مفاهیم طراحی وب',
        'تسلط بر WordPress و ابزارهای آن',
        'ایجاد قالب‌های حرفه‌ای و واکنش‌گرا',
        'بهینه‌سازی سایت برای موتورهای جستجو',
        'راه‌اندازی فروشگاه آنلاین با WooCommerce',
      ],
      requirements: [
        'آشنایی با مفاهیم پایه رایانه',
        'علاقه به یادگیری طراحی وب',
        'دسترسی به اینترنت پایدار',
        'رایانه شخصی یا لپ‌تاپ',
      ],
      features: [
        'پشتیبانی 24 ساعته',
        'گواهینامه معتبر',
        'پروژه‌های عملی',
        'منتورشیپ تخصصی',
        'دسترسی مادام‌العمر به محتوا',
      ],
      benefits: [
        'افزایش مهارت‌های فنی',
        'فرصت‌های شغلی بهتر',
        'درآمد اضافی از طریق فریلنسری',
        'ایجاد کسب‌وکار آنلاین',
        'عضویت در جامعه حرفه‌ای',
      ],
    },
    sample_media: [
      {
        url_address: '/api/placeholder/300/200',
        media_title: 'نمونه کار 1',
        media_type: 'IMAGE',
      },
      {
        url_address: '/api/placeholder/300/200',
        media_title: 'نمونه کار 2',
        media_type: 'VIDEO',
      },
      {
        url_address: '/api/placeholder/300/200',
        media_title: 'نمونه کار 3',
        media_type: 'AUDIO',
      },
    ],
  };

  const mockContent = [
    {
      title: 'اهداف',
      content: '<p>آشنایی کامل با مفاهیم طراحی وب و تسلط بر WordPress و ابزارهای آن. همچنین ایجاد قالب‌های حرفه‌ای و واکنش‌گرا و بهینه‌سازی سایت برای موتورهای جستجو.</p><ul><li>یادگیری طراحی واکنش‌گرا</li><li>تسلط بر WordPress</li><li>بهینه‌سازی SEO</li></ul>',
    },
    {
      title: 'پیش‌نیازها',
      content: '<p>برای شرکت در این دوره نیاز به آشنایی با مفاهیم پایه رایانه و علاقه به یادگیری طراحی وب دارید.</p><p><strong>الزامات فنی:</strong></p><ul><li>دسترسی به اینترنت پایدار</li><li>رایانه شخصی یا لپ‌تاپ</li><li>نصب نرم‌افزارهای مورد نیاز</li></ul>',
    },
    {
      title: 'ویژگی‌ها',
      content: '<p>این دوره شامل ویژگی‌های منحصر به فردی است که تجربه یادگیری شما را بهبود می‌بخشد:</p><ul><li><strong>پشتیبانی 24 ساعته:</strong> در تمام ساعات شبانه‌روز</li><li><strong>گواهینامه معتبر:</strong> پس از اتمام موفقیت‌آمیز دوره</li><li><strong>پروژه‌های عملی:</strong> کار بر روی پروژه‌های واقعی</li><li><strong>منتورشیپ تخصصی:</strong> راهنمایی مستقیم از اساتید</li></ul>',
    },
    {
      title: 'مزایا',
      content: '<p>شرکت در این دوره مزایای فراوانی برای آینده شغلی شما دارد:</p><blockquote><p>با تکمیل این دوره، مهارت‌های لازم برای ورود به بازار کار را کسب خواهید کرد.</p></blockquote><ul><li>افزایش مهارت‌های فنی و عملی</li><li>فرصت‌های شغلی بهتر در حوزه IT</li><li>امکان درآمدزایی از طریق فریلنسری</li><li>قابلیت ایجاد کسب‌وکار آنلاین</li><li>عضویت در جامعه حرفه‌ای طراحان وب</li></ul>',
    },
  ];

  const data = courseData || mockData;

  // Add this state for mobile tab handling
  const [activeMobileTab, setActiveMobileTab] = useState('description');

  return (
    <div dir="ltr" className="w-full space-y-6 shadow-lg">
      {/* Main Tabs Section with Gradient Border */}
      <div className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 md:p-3">
        <div className="rounded-lg bg-white pt-2 pb-8">
          <Tabs value={activeMobileTab} onValueChange={setActiveMobileTab} className="w-full">
            {/* Desktop Tabs - Standard horizontal tabs for large screens */}
            <div className="hidden">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description" className="flex items-center gap-2 text-sm">
                  <FileText className="size-4" />
                  توضیحات
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-2 text-sm">
                  <ImageIcon className="size-4" />
                  نمونه کار برای دوره
                </TabsTrigger>
                <TabsTrigger value="support" className="flex items-center gap-2 text-sm">
                  <MessageCircle className="size-4" />
                  پشتیبانی
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Medium Screen Card Tabs - Row layout (md to xl) */}
            <div className="hidden md:block">
              <CardStyleTabs
                activeTab={activeMobileTab}
                onTabChange={setActiveMobileTab}
                layout="row"
              />
            </div>

            {/* Mobile Card Tabs - Column layout (below md) */}
            <div className="block md:hidden">
              <CardStyleTabs
                activeTab={activeMobileTab}
                onTabChange={setActiveMobileTab}
                layout="column"
              />
            </div>

            {/* Tab Contents */}
            <TabsContent value="description" className="mt-6">
              <Card className="border-0 shadow-none">
                {/* Show TabularView on medium and larger screens */}
                <div className="hidden md:block">
                  <TabularView content={mockContent} />
                </div>

                {/* Show AccordionView on mobile screens */}
                <div className="block md:hidden">
                  <AccordionView content={mockContent} />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="mt-6">
              <Card dir="rtl" className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="size-5" />
                    نمونه کار
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.sample_media && data.sample_media.length > 0
                    ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {data.sample_media.map((media, index) => (
                            <div key={index} className="space-y-2">
                              <MediaItem media={media} />
                            </div>
                          ))}
                        </div>
                      )
                    : (
                        <div className="py-12 text-center">
                          <ImageIcon className="mx-auto mb-4 size-12 text-gray-400" />
                          <p className="text-gray-500">هیچ رسانه‌ای برای نمایش وجود ندارد</p>
                        </div>
                      )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-6">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle dir="rtl" className="flex items-center gap-2">
                    <MessageCircle className="size-5" />
                    راه‌های ارتباطی و پشتیبانی
                  </CardTitle>
                </CardHeader>
                <CardContent dir="rtl" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
                      <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                        <Phone className="size-5 text-blue-600" />
                        <div>
                          <p className="font-medium">تماس تلفنی</p>
                          <p className="text-sm text-gray-600">{('021-12345678').toLocaleString('fa-IR')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
                      <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                        <Mail className="size-5 text-green-600" />
                        <div>
                          <p className="font-medium">ایمیل پشتیبانی</p>
                          <p className="text-sm text-gray-600">support@example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 md:w-auto">
                    <MessageSquare className="mr-2 size-4" />
                    شروع گفتگو با پشتیبانی
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </div>
  );
}
