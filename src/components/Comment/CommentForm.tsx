// @ts-nocheck
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitComment } from '@/API/product';
import { Star } from 'lucide-react';

import RatingStar from '@/components/RatingStar';

type CommentFormProps = {
  user: { username: string; avatar: string } | null;
  productId: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ user, productId }) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [rate, setRate] = useState(1);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitComment,
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      setText('');
      setName('');
      setRate(0);
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      mutation.mutate({ text, productId, name, rating: rate });
    }
  };

  const handleRatingChange = (rating: number) => {
    console.log("Selected Rating:", rating);
    setRate(rating);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {!user && (
        <input onChange={(e) => setName(e.target.value)} value={name} placeholder='نام خود را وارد کنید' className='w-full md:w-1/3 mb-4 text-sm p-3 bg-gray-700 text-gray-100 border-b-2 border-gray-600 rounded-t-md resize-none focus:outline-none focus:border-purple-500 transition-colors duration-300' />
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={user ? "نظر خود را بنویسید..." : "به عنوان ناشناس نظر دهید..."}
        className="w-full text-sm p-3 bg-gray-700 text-gray-100 border-b-2 border-gray-600 rounded-t-md resize-none focus:outline-none focus:border-purple-500 transition-colors duration-300"
        rows={4}
      />
      <div className='flex mt-4 justify-end'>
          <div className='flex'>
            <h5 className='text-xs text-white ml-4 mt-1'>نظر دهید</h5>
            <RatingStar defaultValue={1} onChange={handleRatingChange}  />
          {/* <Star
            key={1}
            strokeWidth={1}
            size={24}
            fill={true ? "#facc15" : "gray"}
            stroke="none"
          />
          <Star
            key={2}
            strokeWidth={1}
            size={24}
            fill={true ? "#facc15" : "gray"}
            stroke="none"
          />
          <Star
            key={3}
            strokeWidth={1}
            size={24}
            fill={true ? "#facc15" : "gray"}
            stroke="none"
          />
          <Star
            key={4}
            strokeWidth={1}
            size={24}
            fill={true ? "#facc15" : "gray"}
            stroke="none"
          />
          <Star
            key={5}
            strokeWidth={1}
            size={24}
            fill={true ? "#facc15" : "gray"}
            stroke="none"
          /> */}
          </div>
      </div>


      <button
        type="submit"
        disabled={mutation.isLoading}
        className="mt-2 px-6 py-2 green-gradient-bg text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300 shadow-md disabled:opacity-50"
      >
        {mutation.isLoading ? 'در حال ارسال...' : 'ارسال نظر'}
      </button>
      {mutation.isError && (
        <p className="mt-2 text-red-500">خطا در ارسال نظر: {(mutation.error as Error).message}</p>
      )}
    </form>
  );
};

export default CommentForm;

