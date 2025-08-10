/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react-dom/no-missing-button-type */
import { X } from 'lucide-react';

type SampleMedia = {
  url_address: string;
  media_title: string;
  file?: { file_name: string };
};

const VideoPlayer = ({ media, onClose }: { media: SampleMedia; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative mx-4 w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-10 text-white hover:text-gray-300"
        >
          <X className="size-8" />
        </button>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <video
            controls
            autoPlay
            className="size-full"
            src={media.url_address}
            poster={media.file?.file_name ? `/uploads/${media.file.file_name}` : undefined}
          >
            <source src={media.url_address} type="video/mp4" />
            مرورگر شما از ویدیو پشتیبانی نمی‌کند.
          </video>
        </div>
        <h3 className="mt-2 text-center font-medium text-white">{media.media_title}</h3>
      </div>
    </div>
  );
};

export default VideoPlayer;