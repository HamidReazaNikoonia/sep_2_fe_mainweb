// components/CustomImage.tsx
import Image, { ImageProps } from 'next/image';
import React from 'react';
import clsx from 'clsx';


import product_placeholder from "@/public/assets/images/product_placeholder.png";

type CustomImageProps = ImageProps & {
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  fileName: string;
};

const NEXT_PUBLIC_SERVER_FILES_URL =  process.env.NEXT_PUBLIC_SERVER_FILES_URL || '';

const CustomImage: React.FC<CustomImageProps> = ({
  className,
  containerClassName,
  fileName,
  style,
  ...props
}) => {
  return (
    <div className={clsx('relative w-full h-full', containerClassName)} style={style}>
      <Image
        {...props}
        fill
        src={fileName ? `${NEXT_PUBLIC_SERVER_FILES_URL}/${fileName}` : product_placeholder}
        className={clsx('object-cover', className)}
        priority={props.priority || false} // Use priority for above-the-fold images
        placeholder={props.placeholder || 'empty'} // Customize placeholder
        quality={props.quality || 75} // Default image quality
        alt={props.alt || 'image'} // Ensure alt text is provided
      />
    </div>
  );
};

export default CustomImage;