import React, { useState } from 'react';

type ReplyFormProps = {
  onSubmit: (text: string) => void;
};

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="پاسخ خود را بنویسید..."
        className="w-full p-2 bg-gray-600 text-gray-100 border-b-2 border-gray-500 rounded-t-md resize-none focus:outline-none focus:border-purple-500 transition-colors duration-300"
        rows={2}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-1 bg-purple-600 text-white text-sm rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300 shadow-sm"
      >
        ارسال پاسخ
      </button>
    </form>
  );
};

export default ReplyForm;

