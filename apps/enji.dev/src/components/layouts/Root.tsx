import localFont from '@next/font/local';
import clsx from 'clsx';
import { PropsWithChildren, useEffect } from 'react';

const jetbrainsMono = localFont({
  src: [
    {
      path: '../../assets/fonts/JetBrainsMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/JetBrainsMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/JetBrainsMono-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
});

const plusJakartaSans = localFont({
  src: [
    {
      path: '../../assets/fonts/PlusJakartaSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/PlusJakartaSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
});

function Root({ children }: PropsWithChildren) {
  useEffect(() => {
    document.documentElement.classList.add(
      jetbrainsMono.variable,
      plusJakartaSans.variable
    );
  }, []);

  return (
    <div
      id="__root"
      className={clsx([jetbrainsMono.variable, plusJakartaSans.variable])}
    >
      {children}
    </div>
  );
}

export default Root;
