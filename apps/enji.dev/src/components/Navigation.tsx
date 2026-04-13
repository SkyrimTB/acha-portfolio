import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { GitHubIcon, TwitterIcon } from '@/components/Icons';
import NavIcon from '@/components/navigations/NavIcon';
import NavIconQuickAccess from '@/components/navigations/NavIconQuickAccess';
import NavLink from '@/components/navigations/NavLink';
import NavLinkDropdown from '@/components/navigations/NavLinkDropdown';
import NavLinkExpanded from '@/components/navigations/NavLinkExpanded';
import NavLocaleSwitch from '@/components/navigations/NavLocaleSwitch';
import NavLogo from '@/components/navigations/NavLogo';

import useOnScroll from '@/hooks/useOnScroll';
import useTranslation from '@/hooks/useTranslation';
import { usePassword } from '@/providers/PasswordProvider';

function Navbar() {
  const router = useRouter();
  const isScrolled = useOnScroll(0);
  const { t } = useTranslation('common');
  const { requestAccess } = usePassword();

  const handleExperienceClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      requestAccess(() => {
        router.push('/work/experience');
      });
    },
    [requestAccess, router]
  );

  const workLinks = [
    { title: t('nav.experience'), href: '/work/experience', onClick: handleExperienceClick },
    { title: t('nav.contact'), href: '/work/contact' },
  ];

  return (
    <header
      className={clsx('fixed left-0 right-0 top-0 z-[1000]', 'fm:absolute')}
    >
      <div
        className={clsx(
          'fixed inset-0 h-16',
          [
            isScrolled === true && [
              'border-divider-light border-b bg-white/70 backdrop-blur',
              'dark:border-divider-dark dark:bg-slate-900/80',
            ],
          ],
          'fm:hidden'
        )}
      />
      <div className={clsx('h-2', [isScrolled === true && ['-mt-2']])} />
      <div className={clsx('content-wrapper-max')}>
        <div
          className={clsx(
            'relative z-50 flex h-16 items-center justify-between px-2 text-sm',
            'md:px-4'
          )}
        >
          <nav className={clsx('flex', 'md:gap-2')} data-accent="violet">
            <NavLogo href="/" title={t('nav.home')} />
            <ul className={clsx('flex items-center', 'md:gap-1')}>
              <li>
                <NavLink title={t('nav.blog')} href="/blog" />
              </li>
              <li className={clsx('lg:hidden')} data-accent="blue">
                <NavLinkDropdown title={t('nav.work')} items={workLinks} />
              </li>
              <li className={clsx('hidden lg:block')} data-accent="blue">
                <NavLinkExpanded title={t('nav.work')} items={workLinks} />
              </li>
            </ul>
          </nav>
          <ul className={clsx('flex items-center gap-1')}>
            <li className={clsx('hidden', 'sm:block')}>
              <NavIcon
                href="https://github.com/skyrimtb"
                icon={<GitHubIcon className={clsx('h-5 w-5')} />}
                title={t('nav.github')}
              />
            </li>
            <li>
              <NavLocaleSwitch />
            </li>
            <li className={clsx('hidden', 'sm:block')}>
              <div
                className={clsx(
                  'ml-1 mr-3 h-3 w-[1px] bg-slate-200',
                  'dark:bg-slate-700'
                )}
              />
            </li>
            <li>
              <NavIconQuickAccess />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
