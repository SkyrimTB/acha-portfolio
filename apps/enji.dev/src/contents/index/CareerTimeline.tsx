import clsx from 'clsx';
import { m } from 'framer-motion';

import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';

import useTranslation from '@/hooks/useTranslation';

const milestones = [
  { year: '2000', labelIndex: 0, hasSub: false },
  { year: '2003', labelIndex: 1, hasSub: false },
  { year: '2013', labelIndex: 2, hasSub: false },
  { year: '2017', labelIndex: 3, hasSub: false },
  { year: '2018', labelIndex: 4, hasSub: false },
  { year: '2020', labelIndex: 5, hasSub: false },
  { year: '2021', labelIndex: 6, hasSub: true },
  { year: '2021', labelIndex: 7, hasSub: true },
  { year: '2022', labelIndex: 8, hasSub: true },
  { year: '2023', labelIndex: 9, hasSub: true },
  { year: '2024', labelIndex: 10, hasSub: false },
  { year: '2024', labelIndex: 11, hasSub: true },
  { year: '2025', labelIndex: 12, hasSub: true },
  { year: 'NOW', labelIndex: 13, isNow: true, hasSub: false },
];

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const itemLeftVariants = {
  hidden: { x: -50, opacity: 0, rotate: -4 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

const itemRightVariants = {
  hidden: { x: 50, opacity: 0, rotate: 4 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

// Mobile always slides from right
const itemMobileVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

function TimelineDot({
  isNow = false,
  delay,
}: {
  isNow?: boolean;
  delay: number;
}) {
  if (isNow) {
    return (
      <m.div
        className={clsx(
          'relative z-10 h-5 w-5 rounded-full',
          'bg-gradient-to-br from-violet-500 to-blue-500',
          'animate-breathe'
        )}
        variants={dotVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay,
        }}
      />
    );
  }

  return (
    <m.div
      className={clsx(
        'relative z-10 h-3.5 w-3.5 rounded-full',
        'bg-gradient-to-br from-violet-400 to-blue-400',
        'dark:from-violet-500 dark:to-blue-500',
        'animate-glow-pulse'
      )}
      variants={dotVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay,
      }}
    />
  );
}

function MilestoneContent({
  year,
  label,
  sub = '',
  isNow,
}: {
  year: string;
  label: string;
  sub?: string;
  isNow: boolean;
}) {
  return (
    <>
      <span
        className={clsx(
          'text-lg font-bold',
          isNow
            ? 'bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent'
            : 'text-accent-600 dark:text-accent-400'
        )}
      >
        {year}
      </span>
      <p
        className={clsx(
          'text-sm text-slate-600',
          'dark:text-slate-400',
          isNow && 'font-medium italic'
        )}
      >
        {label}
      </p>
      {sub && (
        <p
          className={clsx(
            'text-xs text-slate-400',
            'dark:text-slate-500'
          )}
        >
          {sub}
        </p>
      )}
    </>
  );
}

function MilestoneItem({
  year,
  label,
  sub = '',
  index,
  isNow = false,
}: {
  year: string;
  label: string;
  sub?: string;
  index: number;
  isNow?: boolean;
}) {
  const isLeft = index % 2 === 0;
  const delay = index * 0.1;

  return (
    <div
      className={clsx(
        'flex items-center gap-4',
        'md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6'
      )}
    >
      {/* Left content (desktop only) */}
      <div
        className={clsx('hidden md:flex', isLeft ? 'justify-end' : '')}
      >
        {isLeft && (
          <m.div
            className={clsx(
              'cursor-default text-right',
              'transition-transform duration-200 hover:scale-105'
            )}
            variants={itemLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 14,
              delay,
            }}
          >
            <MilestoneContent
              year={year}
              label={label}
              sub={sub}
              isNow={isNow}
            />
          </m.div>
        )}
      </div>

      {/* Center dot */}
      <div className={clsx('flex shrink-0 items-center justify-center')}>
        <TimelineDot isNow={isNow} delay={delay} />
      </div>

      {/* Right content (desktop) / Only content (mobile) */}
      <div className={clsx('flex-1 md:flex', !isLeft ? '' : 'md:opacity-0')}>
        {!isLeft && (
          <m.div
            className={clsx(
              'hidden cursor-default md:block',
              'transition-transform duration-200 hover:scale-105'
            )}
            variants={itemRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 14,
              delay,
            }}
          >
            <MilestoneContent
              year={year}
              label={label}
              sub={sub}
              isNow={isNow}
            />
          </m.div>
        )}

        {/* Mobile */}
        <m.div
          className={clsx(
            'md:hidden cursor-default',
            'transition-transform duration-200 hover:scale-105'
          )}
          variants={itemMobileVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            delay,
          }}
        >
          <MilestoneContent
            year={year}
            label={label}
            sub={sub}
            isNow={isNow}
          />
        </m.div>
      </div>
    </div>
  );
}

function CareerTimeline() {
  const { t } = useTranslation('home');
  return (
    <>
      <header className={clsx('mb-8')}>
        <SectionTitle
          title={t('timeline.title')}
          caption={t('timeline.caption')}
          description={t('timeline.description')}
        />
      </header>
      <SectionContent>
        <div className={clsx('relative mx-auto max-w-2xl py-8')}>
          {/* Animated gradient line */}
          <m.div
            className={clsx(
              'absolute left-[7px] top-0 h-full w-px md:left-1/2 md:-translate-x-1/2',
              'bg-gradient-to-b from-violet-500 via-blue-500 to-violet-500/20'
            )}
            style={{ originY: 0 }}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          {/* Milestone items */}
          <div className={clsx('flex flex-col gap-8')}>
            {milestones.map((milestone, index) => (
              <MilestoneItem
                key={`${milestone.year}-${milestone.labelIndex}`}
                year={milestone.year}
                label={t(`timeline.milestones.${milestone.labelIndex}.text`)}
                sub={
                  milestone.hasSub
                    ? t(`timeline.milestones.${milestone.labelIndex}.sub`)
                    : undefined
                }
                index={index}
                isNow={milestone.isNow}
              />
            ))}
          </div>
        </div>
      </SectionContent>
    </>
  );
}

export default CareerTimeline;
