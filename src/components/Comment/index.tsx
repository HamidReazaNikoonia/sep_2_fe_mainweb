/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import CommentSection from './CommentSection';

export default function CommentLayout({ productId, type }: { productId: string; type: string }) {
  return (
    <div dir="rtl" className="min-h-scree w-full">
      <div className="w-full  overflow-hidden bg-gray-500 pb-20 shadow-xl">
        <div className="px-16 py-8">
          <h1 className="mb-4 text-3xl font-semibold text-gray-100">نظرات شما</h1>
          <p className=" text-xs font-semibold text-gray-300 md:text-sm">
            شما هم میتوانید در این قسمت نظر بگذارید
          </p>
        </div>
        <CommentSection type={type} productId={productId} />
      </div>
    </div>
  );
}
