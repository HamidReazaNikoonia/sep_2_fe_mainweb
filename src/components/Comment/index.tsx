/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import CommentSection from './CommentSection';

export default function CommentLayout({ productId, type }: { productId: string; type: string }) {
  return (
    <div dir="rtl" className="min-h-scree w-full">
      <div className="primary-gradient-bg  w-full overflow-hidden pb-20 shadow-xl">
        <div className="px-5 py-8 md:px-16">
          <h1 className="mb-4 text-xl font-semibold text-gray-900 md:text-3xl">نظرات شما</h1>
          <p className=" text-xs font-semibold text-gray-600 md:text-sm">
            شما هم میتوانید در این قسمت نظر بگذارید
          </p>
        </div>
        <CommentSection type={type} productId={productId} />
      </div>
    </div>
  );
}
