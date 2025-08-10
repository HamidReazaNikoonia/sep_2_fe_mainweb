'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import he from 'he';

interface ContentItem {
  title: string;
  content: string;
}

interface TabularViewProps {
  content: ContentItem[];
}

export default function TabularView({ content }: TabularViewProps) {
  // Create tab values from array indices to ensure uniqueness
  const tabValues = content.map((_, index) => `tab-${index}`);
  const defaultValue = tabValues.length > 0 ? tabValues[0] : '';

  return (
    <div className="w-full">
      <div className="rounded-xl p-4">
        <div className="rounded-lg bg-white">
          <Tabs dir="rtl" defaultValue={defaultValue} orientation="horizontal" className="flex">
            <TabsList className="flex h-fit w-32 shrink-0 flex-col md:w-1/4">
              {content.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={`tab-${index}`}
                  className="h-auto w-full justify-start py-3 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <span className="text-right text-base">{item.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mr-4 flex-1">
              {content.map((item, index) => (
                <TabsContent key={index} value={`tab-${index}`} className="mt-0">
                  <div className="rounded-lg">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <div
                        dangerouslySetInnerHTML={{ __html: he.decode(item.content || '') }}
                        className="text-sm leading-7 text-gray-700"
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}