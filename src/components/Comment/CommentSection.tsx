// @ts-nocheck
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";


import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Pagination from './Pagination';
import { getComments } from '@/API/product';

type Comment = {
  id: number;
  username: string;
  avatar: string;
  text: string;
  isAdmin: boolean;
  replies: Comment[];
};


type Iprops = {
  productId: string;
  type: string;
}
const CommentSection: React.FC<Iprops> = ({productId, type}: Iprops) => {
  const [user, setUser] = useState<{ username: string; avatar: string; isAdmin: boolean } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  // const { data, isLoading, isError, error } = useQuery(
  //   ['comments', currentPage],
  //   () => getComments(currentPage),
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryFn: async () => getComments(currentPage || 1, productId, type),
    keepPreviousData: true,
    queryKey: ["comments", currentPage], //Array according to Documentation
  });

  const toggleUser = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({
        username: 'جان دو',
        avatar: '/placeholder.svg?height=40&width=40',
        isAdmin: true,
      });
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div className="text-center text-gray-300">در حال بارگذاری نظرات...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">خطا در بارگذاری نظرات: {(error as Error).message}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-medium mb-6 text-gray-100"> دیدگاه های شما {data?.totalReviews && `(${parseInt(data?.totalReviews || 0).toLocaleString('ar-EG')})`}  </h2>
      {/* <button
        onClick={toggleUser}
        className="mb-6 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-md"
      >
        {user ? 'خروج' : 'ورود به عنوان مدیر'}
      </button> */}
      <CommentForm productId={productId} user={user} />
      <CommentList comments={data?.data} currentUser={user} />
      <Pagination
        commentsPerPage={commentsPerPage}
        totalComments={data?.totalReviews}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CommentSection;

