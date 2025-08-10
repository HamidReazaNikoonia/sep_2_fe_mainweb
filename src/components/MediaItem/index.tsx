/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import { Play } from 'lucide-react';
import { useState } from 'react';
import VideoPlayer from '../VideoPlayerItem';

type SampleMedia = {
  url_address: string;
  media_title: string;
  file?: { file_name: string };
  media_type: 'VIDEO' | 'IMAGE' | 'AUDIO';
};

// Add this component for media item
const MediaItem = ({ media }: { media: SampleMedia }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const handleVideoClick = () => {
    if (media.media_type === 'VIDEO') {
      setShowVideoPlayer(true);
    }
  };

  const renderMediaContent = () => {
    switch (media.media_type) {
      case 'IMAGE':
        return (
          <div className="group relative aspect-video overflow-hidden rounded-lg">
            <img
              src={media.url_address || `/uploads/${media.file?.file_name}`}
              alt={media.media_title}
              className="size-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />
          </div>
        );

      case 'VIDEO':
        return (
          <div
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
            onClick={handleVideoClick}
          >
            {/* Video thumbnail/poster */}
            <img
              src={media.file?.file_name ? `/uploads/${media.file.file_name}` : '/api/placeholder/300/200'}
              alt={media.media_title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-all duration-300 group-hover:bg-opacity-50">
              <div className="transform rounded-full bg-white bg-opacity-90 p-3 transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 size-8 text-gray-800" />
              </div>
            </div>

            {/* Video duration badge (optional) */}
            <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-75 px-2 py-1 text-xs text-white">
              ویدیو
            </div>
          </div>
        );

      case 'AUDIO':
        return (
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 to-pink-400">
            <div className="text-center text-white">
              <div className="mx-auto mb-2 w-fit rounded-full bg-white bg-opacity-20 p-4">
                <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <p className="text-sm">فایل صوتی</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gray-200">
            <span className="text-gray-500">نوع رسانه پشتیبانی نمی‌شود</span>
          </div>
        );
    }
  };

  return (
    <>
      <div className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
        {renderMediaContent()}
      </div>

      {/* Media title */}
      <h4 className="mt-2 line-clamp-2 text-center text-sm font-medium text-gray-800">
        {media.media_title}
      </h4>

      {/* Video player modal */}
      {showVideoPlayer && media.media_type === 'VIDEO' && (
        <VideoPlayer
          media={media}
          onClose={() => setShowVideoPlayer(false)}
        />
      )}
    </>
  );
};

export default MediaItem;
