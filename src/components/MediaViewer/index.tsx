/* eslint-disable jsx-a11y/media-has-caption */
'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

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
}) => {
  const { mediaType, mediaSrc } = data;

  if (!mediaSrc) {
    return <div className="p-4 text-center text-gray-500">No media source provided</div>;
  }

  if (mediaType === 'VIDEO' || mediaType === 'video') {
    return (
      <div className={clsx('relative overflow-hidden rounded-lg', videoPlayerContainerClassName)}>
        <video
          src={mediaSrc}
          controls
          className={clsx('h-auto w-full', videoPlayerClassName)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (mediaType === 'IMAGE' || mediaType === 'image') {
    return (
      <div className={clsx('relative overflow-hidden rounded-lg', imageContainerClassName)}>
        <Image
          src={mediaSrc}
          alt={alt}
          width={width}
          height={height}
          className={clsx('h-auto w-full object-cover', imageClassName)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 text-center text-gray-500">
      این فایل پشتیبانی نمی شود:
      {' '}
      {mediaType}
    </div>
  );
};

export default MediaViewer;
