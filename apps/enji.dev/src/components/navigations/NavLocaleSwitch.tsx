import clsx from 'clsx';
import { useRouter } from 'next/router';

function NavLocaleSwitch() {
  const router = useRouter();
  const { locale } = router;
  const targetLocale = locale === 'zh' ? 'en' : 'zh';
  const label = locale === 'zh' ? 'EN' : '中';

  const switchLocale = () => {
    router.push(router.asPath, router.asPath, { locale: targetLocale });
  };

  return (
    <button
      type="button"
      className={clsx(
        'flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold',
        'hover:bg-slate-300/50',
        'dark:hover:bg-slate-800/50',
        'dark:font-semibold'
      )}
      aria-label={`Switch to ${targetLocale === 'zh' ? 'Chinese' : 'English'}`}
      title={`Switch to ${targetLocale === 'zh' ? '中文' : 'English'}`}
      onClick={switchLocale}
    >
      {label}
    </button>
  );
}

export default NavLocaleSwitch;
