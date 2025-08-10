'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  ImageIcon, 
  MessageCircle, 
  BookOpen, 
  Clock, 
  Users,
  Phone,
  Mail,
  MessageSquare,
  Target,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';

interface TabularSectionProps {
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
}

export default function TabularSection({ courseData }: TabularSectionProps) {
  // Mock data for demonstration
  const mockData = {
    description: "این دوره جامع طراحی وب‌سایت با WordPress برای مبتدیان طراحی شده است. در این دوره شما با مفاهیم پایه طراحی وب، نحوه کار با WordPress، ایجاد قالب‌های حرفه‌ای و بهینه‌سازی سایت آشنا خواهید شد.",
    images: [
      "/api/placeholder/300/200",
      "/api/placeholder/300/200", 
      "/api/placeholder/300/200",
      "/api/placeholder/300/200"
    ],
    specifications: {
      "مدت زمان": "40 ساعت",
      "تعداد جلسات": "16 جلسه",
      "سطح دوره": "مقدماتی تا پیشرفته",
      "نوع دوره": "حضوری",
      "گواهینامه": "معتبر"
    },
    instructor: {
      name: "مهندس احمد محمدی",
      bio: "طراح وب با بیش از 8 سال تجربه در زمینه طراحی و توسعه وب‌سایت",
      experience: "8 سال تجربه کاری"
    },
    verticalTabsData: {
      objectives: [
        "آشنایی کامل با مفاهیم طراحی وب",
        "تسلط بر WordPress و ابزارهای آن",
        "ایجاد قالب‌های حرفه‌ای و واکنش‌گرا",
        "بهینه‌سازی سایت برای موتورهای جستجو",
        "راه‌اندازی فروشگاه آنلاین با WooCommerce"
      ],
      requirements: [
        "آشنایی با مفاهیم پایه رایانه",
        "علاقه به یادگیری طراحی وب",
        "دسترسی به اینترنت پایدار",
        "رایانه شخصی یا لپ‌تاپ"
      ],
      features: [
        "پشتیبانی 24 ساعته",
        "گواهینامه معتبر",
        "پروژه‌های عملی",
        "منتورشیپ تخصصی",
        "دسترسی مادام‌العمر به محتوا"
      ],
      benefits: [
        "افزایش مهارت‌های فنی",
        "فرصت‌های شغلی بهتر",
        "درآمد اضافی از طریق فریلنسری",
        "ایجاد کسب‌وکار آنلاین",
        "عضویت در جامعه حرفه‌ای"
      ]
    }
  };

  const data = courseData || mockData;

  return (
    <div dir="rtl" className="w-full space-y-6">
      {/* Main Tabs Section with Gradient Border */}
      <div className="p-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
        <div className="bg-white rounded-lg">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description" className="flex items-center gap-2 text-sm">
                <FileText className="size-4" />
                توضیحات
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2 text-sm">
                <ImageIcon className="size-4" />
                تصاویر دوره
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2 text-sm">
                <MessageCircle className="size-4" />
                پشتیبانی
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="size-5" />
                    توضیحات دوره
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Description content with vertical tabs on the right */}
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left side - Main content */}
                    <div className="flex-1 space-y-4">
                      <p className="text-gray-700 leading-7 text-justify">
                        {data.description}
                      </p>
                      
                      <p className="text-gray-700 leading-7 text-justify">
                        همچنین نحوه راه‌اندازی فروشگاه آنلاین با WooCommerce را نیز فرا خواهید گرفت. 
                        این دوره شامل پروژه‌های عملی و تمرین‌های کاربردی است که به شما کمک می‌کند 
                        مهارت‌های خود را در محیط واقعی به کار ببرید.
                      </p>

                      {/* Info box with gradient border */}
                      <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                        <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                          <p className="text-sm text-blue-800">
                            <strong>نکته مهم:</strong> این دوره برای افرادی طراحی شده که می‌خواهند 
                            به صورت حرفه‌ای وارد حوزه طراحی وب شوند و مهارت‌های عملی کسب کنند.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Vertical tabs with gradient border */}
                    <div className="lg:w-80">
                      <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                        <div className="bg-white rounded-lg p-4">
                          <Tabs defaultValue="objectives" orientation="vertical" className="flex">
                            <TabsList className="flex flex-col h-fit w-32 shrink-0">
                              <TabsTrigger 
                                value="objectives" 
                                className="w-full justify-start text-xs h-auto py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                              >
                                <Target className="size-4 ml-2" />
                                اهداف
                              </TabsTrigger>
                              <TabsTrigger 
                                value="requirements" 
                                className="w-full justify-start text-xs h-auto py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                              >
                                <CheckCircle className="size-4 ml-2" />
                                پیش‌نیازها
                              </TabsTrigger>
                              <TabsTrigger 
                                value="features" 
                                className="w-full justify-start text-xs h-auto py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                              >
                                <Star className="size-4 ml-2" />
                                ویژگی‌ها
                              </TabsTrigger>
                              <TabsTrigger 
                                value="benefits" 
                                className="w-full justify-start text-xs h-auto py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                              >
                                <Award className="size-4 ml-2" />
                                مزایا
                              </TabsTrigger>
                            </TabsList>

                            <div className="flex-1 mr-4">
                              <TabsContent value="objectives" className="mt-0">
                                <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                                  <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                                      <Target className="size-4" />
                                      اهداف آموزشی
                                    </h4>
                                    <ul className="space-y-2">
                                      {data.verticalTabsData.objectives.map((objective, index) => (
                                        <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                                          <CheckCircle className="size-3 mt-1 shrink-0 text-blue-600" />
                                          {objective}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="requirements" className="mt-0">
                                <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                                  <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                                      <CheckCircle className="size-4" />
                                      پیش‌نیازهای دوره
                                    </h4>
                                    <ul className="space-y-2">
                                      {data.verticalTabsData.requirements.map((requirement, index) => (
                                        <li key={index} className="text-sm text-green-800 flex items-start gap-2">
                                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                                          {requirement}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="features" className="mt-0">
                                <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                                  <div className="bg-purple-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                                      <Star className="size-4" />
                                      ویژگی‌های دوره
                                    </h4>
                                    <ul className="space-y-2">
                                      {data.verticalTabsData.features.map((feature, index) => (
                                        <li key={index} className="text-sm text-purple-800 flex items-start gap-2">
                                          <Star className="size-3 mt-1 shrink-0 text-purple-600" />
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="benefits" className="mt-0">
                                <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                                  <div className="bg-orange-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-orange-900 mb-3 flex items-center gap-2">
                                      <Award className="size-4" />
                                      مزایای شرکت در دوره
                                    </h4>
                                    <ul className="space-y-2">
                                      {data.verticalTabsData.benefits.map((benefit, index) => (
                                        <li key={index} className="text-sm text-orange-800 flex items-start gap-2">
                                          <Award className="size-3 mt-1 shrink-0 text-orange-600" />
                                          {benefit}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </TabsContent>
                            </div>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="mt-6">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="size-5" />
                    گالری تصاویر
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.images.map((image, index) => (
                      <div key={index} className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt={`تصویر دوره ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-6">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="size-5" />
                    راه‌های ارتباطی و پشتیبانی
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                        <Phone className="size-5 text-blue-600" />
                        <div>
                          <p className="font-medium">تماس تلفنی</p>
                          <p className="text-sm text-gray-600">021-12345678</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                        <Mail className="size-5 text-green-600" />
                        <div>
                          <p className="font-medium">ایمیل پشتیبانی</p>
                          <p className="text-sm text-gray-600">support@example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    <MessageSquare className="size-4 mr-2" />
                    شروع گفتگو با پشتیبانی
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Description Section with Left and Right Parts */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section with gradient border */}
        <div className="flex-1 space-y-4">
          <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
            <Card className="border-0">
              <CardHeader>
                <CardTitle>جزئیات بیشتر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-7">
                  در این بخش اطلاعات تکمیلی درباره دوره ارائه می‌شود. شما می‌توانید جزئیات بیشتری درباره 
                  محتوای دوره، پیش‌نیازها و اهداف آموزشی را در این قسمت مطالعه کنید.
                </p>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">نحوه برگزاری کلاس‌ها:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
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
        <div className="lg:w-80 space-y-4">
          <div className="p-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
            <div className="bg-white rounded-lg p-1">
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
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{key}:</span>
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white">
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
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <Users className="size-8 text-white" />
                        </div>
                        <h4 className="font-medium">{data.instructor.name}</h4>
                        <p className="text-xs text-gray-600">{data.instructor.experience}</p>
                      </div>
                      
                      <Separator />
                      
                      <p className="text-sm text-gray-700 leading-6">
                        {data.instructor.bio}
                      </p>
                      
                      <Button variant="outline" size="sm" className="w-full border-gradient-to-r border-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white">
                        <MessageCircle className="size-4 mr-2" />
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
