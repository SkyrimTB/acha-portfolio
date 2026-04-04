import clsx from 'clsx';
import Link from 'next/link';

import {
  ExternalLink,
  FigmaIcon,
  GitHubIcon,
  TwitterIcon,
} from '@/components/Icons';

import useTranslation from '@/hooks/useTranslation';

import dayjs from '@/utils/dayjs';

function LastUpdate() {
  const { t } = useTranslation('common');

  return (
    <a
      href="https://github.com/skyrimtb"
      target="_blank"
      rel="noreferrer nofollow"
      className={clsx('hover:underline')}
    >
      <span>{t('footer.seeRecentUpdate')}</span>
    </a>
  );
}

interface FooterLinkProps {
  title: string;
  href: string;
  label?: 'new' | 'soon';
  isInternal?: boolean;
}

function FooterLink({
  title,
  href,
  label = undefined,
  isInternal = true,
}: FooterLinkProps) {
  if (label === 'soon') {
    return (
      <span className={clsx('footer-link footer-link--soon')}>
        {title}
        <span className={clsx('footer-link__label')}>{label}</span>
      </span>
    );
  }

  if (isInternal) {
    return (
      <Link href={href} className={clsx('footer-link')}>
        {title}
        {label && <span className={clsx('footer-link__label')}>{label}</span>}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer nofollow"
      className={clsx('footer-link')}
    >
      {title}
      <ExternalLink className={clsx('h-3.5 w-3.5')} />
      {label && <span className={clsx('footer-link__label')}>{label}</span>}
    </a>
  );
}

interface FooterGroupProps {
  title: string;
  links: Array<FooterLinkProps>;
}

function FooterGroup({ title, links }: FooterGroupProps) {
  return (
    <div className={clsx('flex-1')}>
      <div
        className={clsx(
          'mb-2 px-2 text-[13px] text-slate-600',
          'dark:text-slate-400'
        )}
      >
        {title}
      </div>
      <ul className={clsx('flex flex-col')}>
        {links.map(({ title: linkTitle, href, label, isInternal }) => (
          <li key={href}>
            <FooterLink
              title={linkTitle}
              href={href}
              label={label}
              isInternal={isInternal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterDescription() {
  const { t } = useTranslation('common');

  return (
    <div className={clsx('max-w-[348px]')}>
      <div
        className={clsx(
          'mb-3 text-[13px] text-slate-600',
          'dark:text-slate-400'
        )}
      >
        {t('footer.aboutMe')}
      </div>
      <p className={clsx('mb-4 font-normal leading-relaxed')}>
        {t('footer.quote')}
      </p>
      <ul className={clsx('-ml-2 flex gap-1')}>
        <li>
          <a
            href="https://github.com/skyrimtb"
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx('flex h-9 w-9 items-center justify-center')}
            aria-label={t('footer.myGithubProfile')}
            title={t('footer.myGithubProfile')}
          >
            <GitHubIcon className={clsx('h-5 w-5')} />
          </a>
        </li>
      </ul>
    </div>
  );
}

function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer
      className={clsx(
        'background-grid background-grid--fade-in border-divider-light mt-24 pt-16 text-sm text-slate-900',
        'dark:border-divider-dark dark:text-slate-200'
      )}
    >
      <div className={clsx('content-wrapper')}>
        <div className={clsx('py-10 font-semibold')}>
          <div className={clsx('flex flex-col-reverse gap-16', 'lg:flex-row')}>
            <div className={clsx('flex-1')}>
              <FooterDescription />
            </div>
            <div
              className={clsx(
                '-mx-2 flex flex-1 flex-col gap-8',
                'sm:flex-row sm:gap-16 lg:mx-0'
              )}
            >
              <div className={clsx('flex', 'sm:gap-16')}>
                <FooterGroup
                  title={t('footer.work')}
                  links={[
                    { title: t('footer.contact'), href: '/work/contact' },
                    { title: t('footer.experience'), href: '/work/experience' },
                    {
                      title: t('footer.services'),
                      href: '/work/services',
                      label: 'soon',
                    },
                  ]}
                />
                <FooterGroup
                  title={t('footer.learn')}
                  links={[
                    {
                      title: t('footer.docs'),
                      href: '/docs',
                    },
                    {
                      title: t('footer.personalBlog'),
                      href: '/blog',
                    },
                    {
                      title: t('footer.til'),
                      href: '/today-i-learned',
                      label: 'new',
                    },
                  ]}
                />
              </div>
              <div className={clsx('flex', 'sm:gap-16')}>
                <FooterGroup
                  title={t('footer.thisSite')}
                  links={[
                    {
                      title: t('footer.designConcept'),
                      href: 'https://www.figma.com/community/file/1176392613303840973',
                      isInternal: false,
                    },
                    {
                      title: t('footer.sourceCode'),
                      href: 'https://github.com/enjidev/enji.dev',
                      isInternal: false,
                    },
                    {
                      title: t('footer.credits'),
                      href: '/credits',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'border-divider-light flex justify-between border-t py-6 text-xs',
            'dark:border-divider-dark'
          )}
        >
          <div className={clsx('font-semibold')}>
            {t('footer.copyright')} &copy; {dayjs().format('YYYY')},
            Enji Kusnadi
          </div>
          <div className={clsx('text-slate-500', 'dark:text-slate-400')}>
            <LastUpdate />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
