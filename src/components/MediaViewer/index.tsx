/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '../ui/Modal';

type MediaViewerProps = {
  data: {
    mediaType: 'VIDEO' | 'IMAGE';
    mediaSrc: string;
  };
  videoPlayerClassName?: string;
  videoPlayerContainerClassName?: string;
  imageClassName?: string;
  imageContainerClassName?: string;
  alt?: string;
  width?: number;
  height?: number;
  enableFullscreen?: boolean;
};

const MediaViewer: React.FC<MediaViewerProps> = ({
  data,
  videoPlayerClassName,
  videoPlayerContainerClassName,
  imageClassName,
  imageContainerClassName,
  alt = 'Media content',
  width = 800,
  height = 450,
  enableFullscreen = true,
}) => {
  const { mediaType, mediaSrc } = data;
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => {
    if (enableFullscreen) {
      setIsFullscreen(true);
    }
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (!mediaSrc) {
    return <div className="p-4 text-center text-gray-500">No media source provided</div>;
  }

  const renderMedia = (isFullscreenMode = false) => {
    const fullscreenVideoClasses = isFullscreenMode
      ? 'w-full h-full max-w-none max-h-none object-contain'
      : clsx('h-auto w-full', videoPlayerClassName);

    const fullscreenImageClasses = isFullscreenMode
      ? 'w-full h-full max-w-none max-h-none object-contain'
      : clsx('h-auto w-full object-cover', imageClassName);

    if (mediaType === 'VIDEO' || mediaType === 'video') {
      return (
        <div
          className={clsx(
            'relative overflow-hidden rounded-lg',
            isFullscreenMode ? 'flex size-full items-center justify-center bg-black' : '',
            !isFullscreenMode ? videoPlayerContainerClassName : '',
            enableFullscreen && !isFullscreenMode ? 'cursor-pointer transition-opacity hover:opacity-90' : '',
          )}
          onClick={!isFullscreenMode ? openFullscreen : undefined}
        >
          <video
            src={mediaSrc}
            controls
            className={fullscreenVideoClasses}
            onClick={(e) => {
              // Prevent opening fullscreen when clicking on video controls
              if (!isFullscreenMode) {
                e.stopPropagation();
              }
            }}
          >
            Your browser does not support the video tag.
          </video>
          {enableFullscreen && !isFullscreenMode && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-colors hover:bg-opacity-20">
              <div className="rounded-full bg-black bg-opacity-50 p-3 opacity-0 transition-opacity hover:opacity-100">
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (mediaType === 'IMAGE' || mediaType === 'image') {
      return (
        <div
          className={clsx(
            'relative overflow-hidden rounded-lg',
            isFullscreenMode ? 'flex size-full items-center justify-center bg-black' : '',
            !isFullscreenMode ? imageContainerClassName : '',
            enableFullscreen && !isFullscreenMode ? 'cursor-pointer transition-opacity hover:opacity-90' : '',
          )}
          onClick={!isFullscreenMode ? openFullscreen : undefined}
        >
          <Image
            src={mediaSrc}
            alt={alt}
            width={isFullscreenMode ? 1920 : width}
            height={isFullscreenMode ? 1080 : height}
            className={fullscreenImageClasses}
          />
          {enableFullscreen && !isFullscreenMode && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-colors hover:bg-opacity-20">
              <div className="rounded-full bg-black bg-opacity-50 p-3 opacity-0 transition-opacity hover:opacity-100">
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  if (mediaType === 'VIDEO' || mediaType === 'video' || mediaType === 'IMAGE' || mediaType === 'image') {
    return (
      <>
        {renderMedia(false)}

        {enableFullscreen && (
          <Modal isOpen={isFullscreen} onClose={closeFullscreen}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
              {/* Close button */}
              <button
                onClick={closeFullscreen}
                className="absolute right-4 top-4 z-50 rounded-full bg-black bg-opacity-50 p-2 transition-colors hover:bg-opacity-75"
              >
                <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Media content */}
              <div className="size-full p-8">
                {renderMedia(true)}
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }

  return (
    <div className="p-4 text-center text-gray-300">
      این فایل پشتیبانی نمی شود:
      {' '}
      {mediaType}
    </div>
  );
};

export default MediaViewer;
