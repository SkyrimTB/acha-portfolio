/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import clsx from 'clsx';
import NextImage from 'next/image';
import { useState } from 'react';

import type { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = NextImageProps & {
  immersive?: boolean;
  pair?: NextImageProps; // 新增: 用于并列显示的第二张图片
};

export default function Image({
  immersive = true,
  className,
  src,
  pair,
  ...props
}: ImageProps) {
  const [image, setImage] = useState<string>('');
  const [pairImage, setPairImage] = useState<string>('');

  function SingleImage({ src, className, ...imageProps }: NextImageProps) {
    return (
      <NextImage
        src={src}
        className={clsx(
          'border-divider-light rounded-lg border',
          'dark:border-divider-dark',
          className
        )}
        {...imageProps}
        onLoadingComplete={(img) => {
          setImage(img.currentSrc);
        }}
      />
    );
  }

  if (pair) {
    return (
      <div className={clsx('mdx-image relative')}>
        {immersive && (image || pairImage) ? (
          <div
            style={{ backgroundImage: `url(${image || pairImage})` }}
            className={clsx(
              'absolute -inset-8 z-[-1] rounded-[20%] bg-[length:180%_180%] bg-center opacity-25 blur-2xl',
              'hidden',
              'dark:block'
            )}
          />
        ) : null}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <SingleImage src={src} {...props} />
          </div>
          <div className="flex-1">
            <NextImage
              {...pair}
              className={clsx(
                'border-divider-light rounded-lg border',
                'dark:border-divider-dark',
                pair.className
              )}
              onLoadingComplete={(img) => {
                setPairImage(img.currentSrc);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('mdx-image relative')}>
      {immersive && image ? (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={clsx(
            'absolute -inset-8 z-[-1] rounded-[20%] bg-[length:180%_180%] bg-center opacity-25 blur-2xl',
            'hidden',
            'dark:block'
          )}
        />
      ) : null}
      <SingleImage src={src} className={className} {...props} />
    </div>
  );
}
