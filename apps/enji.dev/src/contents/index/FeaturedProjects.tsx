import clsx from 'clsx';
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';

import useTranslation from '@/hooks/useTranslation';

const projects = [
  {
    slug: 'belay',
    title: 'Belay',
    descKey: 'featuredProjects.projects.belay.description',
    tags: ['React', 'Flask', 'SQLite'],
    image: '/assets/images/blog/belay/belay-mockup.png',
    color: 'bg-sky-300 dark:bg-sky-900',
  },
  {
    slug: 'aws-project',
    title: 'Genomics SaaS',
    descKey: 'featuredProjects.projects.aws-project.description',
    tags: ['AWS', 'S3', 'EC2', 'Flask'],
    image: '/assets/images/blog/aws-project/GAS-framework.png',
    color: 'bg-amber-300 dark:bg-amber-900',
  },
  {
    slug: 'parkin',
    title: 'Parkin',
    descKey: 'featuredProjects.projects.parkin.description',
    tags: ['Figma', 'UI/UX', 'Product Design'],
    image: '/assets/images/blog/parkin/prototype1.png',
    color: 'bg-pink-300 dark:bg-pink-900',
  },
];

const animation = {
  hide: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

function ProjectCard({
  slug,
  title,
  descKey,
  tags,
  image,
  color,
  index,
}: (typeof projects)[0] & { index: number }) {
  const { t } = useTranslation('home');
  const description = t(descKey);
  return (
    <m.div
      variants={animation}
      transition={{ delay: index * 0.1 }}
      className={clsx('flex-1')}
    >
      <Link
        href={`/blog/${slug}`}
        className={clsx(
          'border-divider-light group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white',
          'dark:border-divider-dark dark:bg-slate-900',
          'hover:border-accent-400 dark:hover:border-accent-500',
          'transition-colors duration-200'
        )}
      >
        <div
          className={clsx(
            'relative h-40 overflow-hidden',
            'md:h-48',
            color,
            'flex items-center justify-center'
          )}
        >
          <Image
            src={image}
            alt={title}
            width={400}
            height={200}
            className={clsx(
              'h-full w-full object-cover transition-transform duration-300',
              'group-hover:scale-105'
            )}
          />
        </div>
        <div className={clsx('flex flex-1 flex-col p-5')}>
          <h3
            className={clsx(
              'mb-2 text-lg font-bold text-slate-700',
              'dark:text-slate-200'
            )}
          >
            {title}
          </h3>
          <p
            className={clsx(
              'mb-4 flex-1 text-sm text-slate-600',
              'dark:text-slate-400'
            )}
          >
            {description}
          </p>
          <div className={clsx('flex flex-wrap gap-2')}>
            {tags.map((tag) => (
              <span
                key={tag}
                className={clsx(
                  'rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600',
                  'dark:bg-slate-800 dark:text-slate-400'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </m.div>
  );
}

function FeaturedProjects() {
  const { t } = useTranslation('home');

  return (
    <>
      <header className={clsx('mb-8')}>
        <SectionTitle
          title={t('featuredProjects.title')}
          caption={t('featuredProjects.caption')}
          description={t('featuredProjects.description')}
          button={{
            title: t('featuredProjects.seeAll'),
            href: '/blog',
          }}
        />
      </header>
      <SectionContent>
        <m.div
          className={clsx(
            'flex flex-col gap-6 pt-8',
            'md:flex-row md:gap-6 lg:gap-8'
          )}
          initial="hide"
          animate="show"
          transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              descKey={project.descKey}
              tags={project.tags}
              image={project.image}
              color={project.color}
              index={index}
            />
          ))}
        </m.div>
      </SectionContent>
    </>
  );
}

export default FeaturedProjects;
