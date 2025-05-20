'use clent'

import React, { useState } from 'react';

// Sample video data
const videoData = [
  { id: 1, title: 'هوش مصنوعی', src: 'https://www.example.com/video1.mp4' },
  { id: 2, title: 'ولایت فقیه', src: 'https://www.example.com/video2.mp4' },
  { id: 3, title: 'بسیج دانشگاه', src: 'https://www.example.com/video3.mp4' },
  { id: 4, title: 'ایران ما', src: 'https://www.example.com/video4.mp4' },
  { id: 5, title: 'بسیج خواهران', src: 'https://www.example.com/video5.mp4' },
  { id: 6, title: 'شهید علوی', src: 'https://www.example.com/video6.mp4' },
];

const MultimediaTabs: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(videoData[0]);

  if (!currentVideo) {
    return null;
  }

  return (
    <div className="flex w-full flex-col-reverse md:flex-row pb-12">
      {/* Left section - Video Player (70% width) */}
      <div className="w-full md:w-[70%] p-4 shadow-lg">
        <video
          src={currentVideo.src}
          className="w-full h-[300px] object-cover"
          controls
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right section - Tab list (30% width) */}
      <div className=" w-full md:w-[30%] bg-gray-200 overflow-y-auto">
        <div className="flex flex-col border-l-2 border-gray-800">
          {videoData.map((video) => (
            <div
              key={video.id}
              onClick={() => setCurrentVideo(video)}
              className={`p-4 [&:not(:last-child)]:border-b border-gray-800 text-white text-right cursor-pointer transition-colors duration-300 ${
                currentVideo.id === video.id
                  ? 'bg-purple-800'
                  : 'bg-black hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center text-right justify-between ">
                <div className={`w-1 h-6 mr-3 ${currentVideo.id === video.id ? 'bg-white' : 'bg-blue-500'}`}></div>
                <span>{video.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultimediaTabs;

