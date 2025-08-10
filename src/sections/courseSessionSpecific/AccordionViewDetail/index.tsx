'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import he from 'he';

interface ContentItem {
  title: string;
  content: string;
}

interface AccordionViewProps {
  content: ContentItem[];
}

export default function AccordionView({ content }: AccordionViewProps) {
  return (
    <div className="w-full" dir="rtl">
      <div className="rounded-xl">
        <div className="rounded-lg bg-white p-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {content.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-0">
                <div className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
                  <div className="rounded-lg bg-white">
                    <AccordionTrigger className="px-4 py-3 text-right hover:no-underline [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-pink-500 [&[data-state=open]]:to-purple-600 [&[data-state=open]]:text-white [&[data-state=open]]:rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <div
                          dangerouslySetInnerHTML={{ __html: he.decode(item.content || '') }}
                          className="text-sm leading-7 text-gray-700"
                        />
                      </div>
                    </AccordionContent>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}