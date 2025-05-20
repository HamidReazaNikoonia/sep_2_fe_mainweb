// @ts-nocheck
import React from 'react';
import Comment from './Comment';

type CommentType = {
  id: number;
  username: string;
  avatar: string;
  text: string;
  isAdmin: boolean;
  replies: CommentType[];
};

type CommentListProps = {
  comments: CommentType[];
  currentUser: { username: string; avatar: string; isAdmin: boolean } | null;
};

const CommentList: React.FC<CommentListProps> = ({ comments, currentUser }) => {
  return (
    <div className="space-y-8 mb-6 mt-14">
      {Array.isArray(comments) && comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default CommentList;

