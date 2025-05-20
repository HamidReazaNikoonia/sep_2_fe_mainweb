'use client'
import CommentSection from './CommentSection';

export default function CommentLayout({productId, type}: {productId: string, type: string}) {
  return (
    <div dir="rtl" className="min-h-screepy-12 ">
      <div className="mx-auto yellow-gradient-bg shadow-xl overflow-hidden pb-20">
        <div className="px-16 py-12">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">نظرات شما</h1>
          <p className="mb-8 font-semibold text-xs md:text-sm text-gray-700">
            شما هم میتوانید در این قسمت نظر بگذارید
          </p>
        </div>
        <CommentSection type={type} productId={productId} />
      </div>
    </div>
  );
}

