/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @next/next/no-img-element */
'use client';

import {
  Award,
  CheckCircle,
  FileText,
  ImageIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Star,
  Target,
  Users,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccordionView from '../AccordionViewDetail';
import TabularView from '../TabularViewDetail';

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
  };
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
  };


  const mockContent = [
    {
      title: 'اهداف',
      content: '<p>آشنایی کامل با مفاهیم طراحی وب و تسلط بر WordPress و ابزارهای آن. همچنین ایجاد قالب‌های حرفه‌ای و واکنش‌گرا و بهینه‌سازی سایت برای موتورهای جستجو.</p><ul><li>یادگیری طراحی واکنش‌گرا</li><li>تسلط بر WordPress</li><li>بهینه‌سازی SEO</li></ul>'
    },
    {
      title: 'پیش‌نیازها',
      content: '<p>برای شرکت در این دوره نیاز به آشنایی با مفاهیم پایه رایانه و علاقه به یادگیری طراحی وب دارید.</p><p><strong>الزامات فنی:</strong></p><ul><li>دسترسی به اینترنت پایدار</li><li>رایانه شخصی یا لپ‌تاپ</li><li>نصب نرم‌افزارهای مورد نیاز</li></ul>'
    },
    {
      title: 'ویژگی‌ها',
      content: '<p>این دوره شامل ویژگی‌های منحصر به فردی است که تجربه یادگیری شما را بهبود می‌بخشد:</p><ul><li><strong>پشتیبانی 24 ساعته:</strong> در تمام ساعات شبانه‌روز</li><li><strong>گواهینامه معتبر:</strong> پس از اتمام موفقیت‌آمیز دوره</li><li><strong>پروژه‌های عملی:</strong> کار بر روی پروژه‌های واقعی</li><li><strong>منتورشیپ تخصصی:</strong> راهنمایی مستقیم از اساتید</li></ul>'
    },
    {
      title: 'مزایا',
      content: '<p>شرکت در این دوره مزایای فراوانی برای آینده شغلی شما دارد:</p><blockquote><p>با تکمیل این دوره، مهارت‌های لازم برای ورود به بازار کار را کسب خواهید کرد.</p></blockquote><ul><li>افزایش مهارت‌های فنی و عملی</li><li>فرصت‌های شغلی بهتر در حوزه IT</li><li>امکان درآمدزایی از طریق فریلنسری</li><li>قابلیت ایجاد کسب‌وکار آنلاین</li><li>عضویت در جامعه حرفه‌ای طراحان وب</li></ul>'
    }
  ];

  const data = courseData || mockData;

  return (
    <div dir="ltr" className="w-full space-y-6">
      {/* Main Tabs Section with Gradient Border */}
      <div className="rounded-xl  p-1">
        <div className="rounded-lg bg-white">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="support" className="flex items-center gap-2 text-sm">
                <MessageCircle className="size-4" />
                پشتیبانی
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2 text-sm">
                <ImageIcon className="size-4" />
                تصاویر دوره
              </TabsTrigger>
              <TabsTrigger value="description" className="flex items-center gap-2 text-sm">
                <FileText className="size-4" />
                توضیحات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
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

            <TabsContent value="images" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="size-5" />
                    گالری تصاویر
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.images.map((image, index) => (
                      <div key={index} className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt={`تصویر دوره ${index + 1}`}
                            className="size-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="size-5" />
                    راه‌های ارتباطی و پشتیبانی
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
                      <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                        <Phone className="size-5 text-blue-600" />
                        <div>
                          <p className="font-medium">تماس تلفنی</p>
                          <p className="text-sm text-gray-600">021-12345678</p>
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

      {/* Description Section with Left and Right Parts */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Section with gradient border */}
        <div className="flex-1 space-y-4">
          <div className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
            <Card className="border-0">
              <CardHeader>
                <CardTitle>جزئیات بیشتر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-7 text-gray-700">
                  در این بخش اطلاعات تکمیلی درباره دوره ارائه می‌شود. شما می‌توانید جزئیات بیشتری درباره
                  محتوای دوره، پیش‌نیازها و اهداف آموزشی را در این قسمت مطالعه کنید.
                </p>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">نحوه برگزاری کلاس‌ها:</h4>
                  <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                    <li>کلاس‌های تعاملی و عملی</li>
                    <li>پروژه‌های گروهی و انفرادی</li>
                    <li>بازخورد مستقیم از مدرس</li>
                    <li>ارائه و نقد کارهای دانشجویان</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Section with gradient border */}
        <div className="space-y-4 lg:w-80">
          <div className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
            <div className="rounded-lg bg-white p-1">
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="specifications" className="text-xs">
                    مشخصات
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="text-xs">
                    مدرس
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="specifications" className="mt-4">
                  <Card className="border-0 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-lg">مشخصات دوره</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(data.specifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {key}
                            :
                          </span>
                          <Badge variant="secondary" className="bg-gradient-to-r from-pink-500 to-purple-600 text-xs text-white">
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="instructor" className="mt-4">
                  <Card className="border-0 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-lg">درباره مدرس</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                          <Users className="size-8 text-white" />
                        </div>
                        <h4 className="font-medium">{data.instructor.name}</h4>
                        <p className="text-xs text-gray-600">{data.instructor.experience}</p>
                      </div>

                      <Separator />

                      <p className="text-sm leading-6 text-gray-700">
                        {data.instructor.bio}
                      </p>

                      <Button variant="outline" size="sm" className="border-gradient-to-r w-full border-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white">
                        <MessageCircle className="mr-2 size-4" />
                        ارتباط با مدرس
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
