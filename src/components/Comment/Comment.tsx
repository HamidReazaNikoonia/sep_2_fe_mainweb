/* eslint-disable react-dom/no-missing-button-type */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// Assets
import avatarImage from '@/public/assets/images/avatar.png';

import Rating from '../RatingStar';
import ReplyForm from './ReplyForm';

type CommentType = {
  id: number;
  username: string;
  avatar: string;
  text: string;
  isAdmin: boolean;
  replies: CommentType[];
};

type CommentProps = {
  comment: CommentType;
  onReply: (commentId: number, text: string) => void;
  currentUser: { username: string; avatar: string; isAdmin: boolean } | null;
};

const Comment: React.FC<CommentProps> = ({ comment, onReply, currentUser }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [screenMobile, setScreenMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenMobile(window.innerWidth < 700);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="rounded-lg bg-gray-200 p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="mb-3 flex items-center">
        <div className="flex flex-1 items-center">
          <Image
            alt={`تصویر ${comment.name}`}
            className="ml-3 size-10 rounded-full border-2 border-purple-400"
            src={avatarImage}
            width={24}
            height={24}
          />
          <div>
            <h3 className="text-xs font-medium text-gray-700 md:text-sm">{comment.name}</h3>
            {comment.isAdmin && (
              <span className="mr-2 rounded-full bg-purple-600 px-2 py-1 text-xs text-gray-800">مدیر</span>
            )}
          </div>
        </div>

        <div className=" self-start">
          <Rating disabled defaultValue={comment.rating} size={screenMobile ? 14 : 18} />
        </div>
      </div>
      <p className="mb-3 text-sm text-gray-800">{comment.comment}</p>
      {currentUser?.isAdmin && !comment.isAdmin && (
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-purple-400 transition-colors duration-300 hover:text-purple-300"
        >
          پاسخ
        </button>
      )}
      {showReplyForm && (
        <ReplyForm onSubmit={(text) => {
          onReply(comment.id, text);
          setShowReplyForm(false);
        }}
        />
      )}
      {comment?.replies?.length > 0 && (
        <div className="mr-8 mt-4 space-y-4">
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} onReply={onReply} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
