import clsx from 'clsx';
import { m, useAnimationControls } from 'framer-motion';
import Image from 'next/image';

import useTranslation from '@/hooks/useTranslation';

const animation = {
  hide: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

function HeaderTitle() {
  const controls = useAnimationControls();
  const { t } = useTranslation('home');

  return (
    <div>
      <m.div
        className={clsx(
          'mb-1 flex items-center gap-1 text-2xl text-slate-600',
          'md:mb-0 md:gap-2 md:text-4xl',
          'dark:text-slate-400'
        )}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {t('header.greeting')}
        <m.div
          initial={{
            opacity: 0,
            y: 16,
            rotate: 30,
            transformOrigin: 'right center',
          }}
          animate={controls}
          transition={{
            type: 'spring',
            delay: 0.35,
            bounce: 0.7,
            duration: 0.7,
          }}
        >
          <Image
            className={clsx('w-7 md:w-10')}
            alt={t('header.emojiAlt')}
            src="/assets/emojis/love-you-gesture.png"
            width={48}
            height={48}
            onLoadingComplete={() => {
              controls.start({
                opacity: 1,
                y: 0,
                rotate: 0,
              });
            }}
            priority
          />
        </m.div>
      </m.div>
      <span className={clsx('text-slate-700', 'dark:text-slate-300')}>
        <m.span
          className={clsx(
            'mb-4 block text-[2.5rem] font-[1000] leading-none',
            'md:mb-6 md:text-7xl'
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.2 }}
        >
          {t('header.intro.im')}{' '}
          <strong className={clsx('text-accent-600', 'dark:text-accent-500')}>
            {t('header.intro.firstName')}
          </strong>{' '}
          {t('header.intro.lastName')}{' '}
        </m.span>
        <m.h1
          className={clsx(
            'block text-base text-slate-600',
            'md:text-xl',
            'dark:text-slate-400'
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.3 }}
        >
          <span className={clsx('lowercase')}>{t('header.intro.aka')}</span>{' '}
          <strong
            className={clsx('font-bold  text-slate-700', 'dark:text-slate-300')}
          >
            {t('header.intro.nickname')}
          </strong>{' '}
          {t('header.intro.typical')}{' '}
          <strong
            className={clsx(
              'font-underscore  text-slate-700',
              'dark:text-slate-300'
            )}
          >
            {t('header.intro.mbti')}
          </strong>
          {t('header.intro.whoLoves')}{' '}
          <strong
            className={clsx(
              'font-underscore  text-slate-700',
              'dark:text-slate-300'
            )}
          >
            {t('header.intro.game')}
          </strong>
          ,{' '}
          <strong
            className={clsx(
              'font-underscore  text-slate-700',
              'dark:text-slate-300'
            )}
          >
            {t('header.intro.technology')}{' '}
          </strong>
          ,
          <span className={clsx('block')}>
            {' '}
            <strong
              className={clsx(
                'font-underscore  text-slate-700',
                'dark:text-slate-300'
              )}
            >
              {t('header.intro.entertainment')}
            </strong>{' '}
            {t('header.intro.suffix')}
          </span>
        </m.h1>
      </span>
    </div>
  );
}

export default HeaderTitle;
