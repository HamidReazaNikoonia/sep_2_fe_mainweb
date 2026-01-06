/* eslint-disable style/multiline-ternary */
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useUserFavorites } from '@/API/profile/useUserFavorites';
import CustomImage from '@/components/CustomImage';
import DotLoading from '@/components/DotLoading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Component to render individual favorite items based on their type
const FavoriteItem = ({ favorite }: { favorite: any }) => {
  const { type, item } = favorite;

  // Render Course Item
  if (type === 'course') {
    return (
      <Link href={`/course/${item.id}`}>
        <div className={`flex items-center gap-4 border-b p-4 last:border-0 ${!item.course_status ? 'opacity-50' : 'opacity-100'}`}>
          <div className="relative size-20 shrink-0">
            <CustomImage
              fileName={item.tumbnail_image?.file_name}
              alt={item.title}
              containerClassName="rounded-md overflow-hidden"
            />
          </div>
          <div className="flex flex-col gap-1 overflow-hidden text-right">
            <h3 className="truncate text-xs font-bold md:text-sm">{item.title}</h3>
            <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">{item.sub_title}</p>
          </div>
        </div>
      </Link>
    );
  }

  // Render Product Item
  if (type === 'product') {
    return (
      <div className="flex items-center justify-between border-b p-4 text-right last:border-0">
        <h3 className="text-lg font-bold">{item.title}</h3>
        <span className="font-medium text-primary">
          {item.price?.toLocaleString()}
          {' '}
          تومان
        </span>
      </div>
    );
  }

  // Render Program Item
  if (type === 'program') {
    return (
      <div className="flex items-center border-b p-4 text-right last:border-0">
        <h3 className="text-lg font-bold">{item.title}</h3>
      </div>
    );
  }

  return null;
};

export default function FavoritesPage() {
  const [activeType, setActiveType] = useState('course');

  // Fetch favorites using the custom hook
  const { data: favorites, isLoading } = useUserFavorites(activeType);

  return (
    <Card dir="rtl" className="w-full">
      <CardHeader className="text-right">
        <CardTitle className="text-lg text-purple-700 md:text-xl">علاقه‌مندی‌های شما</CardTitle>
        <CardDescription className="text-xs md:text-base">لیست محصولات و دوره‌های مورد علاقه شما</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Category Selection Tabs */}
        <Tabs defaultValue="course" onValueChange={setActiveType} className="w-full">
          <TabsList dir="rtl" className="mx-auto grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="course">دوره‌ها</TabsTrigger>
            <TabsTrigger value="product">محصولات</TabsTrigger>
            <TabsTrigger value="program">برنامه‌ها</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex min-h-[200px] flex-col">
          {isLoading ? (
            // Loading state
            <div className="flex flex-1 items-center justify-center">
              <DotLoading />
            </div>
          ) : favorites && favorites.length > 0 ? (
            // List of favorites
            <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
              {favorites.map((fav: any) => (
                <FavoriteItem key={fav.id} favorite={fav} />
              ))}
            </div>
          ) : (
            // Empty state
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              موردی در این دسته‌بندی یافت نشد.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
