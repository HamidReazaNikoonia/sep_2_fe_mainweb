import MediaViewer from '@/components/MediaViewer';
import { SwatchBook } from 'lucide-react';
/* eslint-disable react/no-useless-fragment */
import React from 'react';

const NEXT_PUBLIC_SERVER_FILES_URL = process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

export default function VideoSampleGallery({ sampleMedia }: { sampleMedia: any }) {
  const firstSampleMedia = sampleMedia[0];
  const otherSampleMedia = sampleMedia.length > 1 ? sampleMedia.slice(1) : [];

  return (
    <>
      <div className="flex w-full flex-col items-end justify-center">
        {/* Title */}
        <h3 className="mb-6 flex text-lg text-white">
          نمونه ویدیو ها
          <SwatchBook className="ml-3" />
        </h3>

        {(!sampleMedia || sampleMedia.length === 0) && (
          <div className="text-center text-sm text-gray-400">
            هیچ ویدیویی برای نمایش وجود ندارد
          </div>
        )}

        {/* First Sample Media */}
        {firstSampleMedia && (

          <MediaViewer
            data={{
              mediaType: firstSampleMedia?.media_type,
              mediaSrc: `${NEXT_PUBLIC_SERVER_FILES_URL}/${firstSampleMedia?.file?.file_name}`,
            }}
            videoPlayerContainerClassName="bg-black w-full"
            videoPlayerClassName="aspect-video h-full w-full rounded-lg"
          />

        )}

        {/* Video Items */}
        <div className="mt-8  flex w-full flex-wrap md:flex-row">
          {otherSampleMedia && otherSampleMedia.map((item: any) => (
            <article key={item?._id} className=" mb-3 w-1/2 p-2  md:mb-0 md:w-1/3 md:p-3">
              <div className=" flex items-end overflow-hidden rounded-xl">
                <MediaViewer
                  data={{
                    mediaType: item?.media_type,
                    mediaSrc: `${NEXT_PUBLIC_SERVER_FILES_URL}/${item?.file?.file_name}`,
                  }}
                  videoPlayerContainerClassName="bg-black w-full"
                  videoPlayerClassName="aspect-video h-full w-full rounded-lg"
                />
              </div>

              <div className="mt-2 text-center text-xs text-white">{item.media_title}</div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
