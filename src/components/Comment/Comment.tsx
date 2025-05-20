import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import ReplyForm from './ReplyForm';

// Assets
import avatarImage from '@/public/assets/images/avatar.png'
import Rating from '../RatingStar';

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
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center mb-3">
        <div className='flex items-center flex-1'>
        <Image alt={`تصویر ${comment.name}`} className="w-10 h-10 rounded-full ml-3 border-2 border-purple-400"
          src={avatarImage} width={24} height={24} />
        <div>
          <h3 className="font-medium text-xs md:text-sm text-gray-100">{comment.name}</h3>
          {comment.isAdmin && (
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2">مدیر</span>
          )}
        </div>
        </div>


        <div className=' self-start'>
          <Rating disabled defaultValue={comment.rating} size={screenMobile ? 14 : 18} />
        </div>
      </div>
      <p className="mb-3 text-gray-300 text-sm">{comment.comment}</p>
      {currentUser?.isAdmin && !comment.isAdmin && (
        <button onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
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
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
