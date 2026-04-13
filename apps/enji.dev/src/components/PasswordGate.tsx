import clsx from 'clsx';
import { useState } from 'react';

import { usePassword } from '@/providers/PasswordProvider';

import type { PropsWithChildren } from 'react';

function PasswordGate({ children = null }: PropsWithChildren) {
  const { isVerified, requestAccess } = usePassword();
  const [unlocked, setUnlocked] = useState(isVerified);

  if (unlocked || isVerified) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div
      className={clsx('flex min-h-[60vh] items-center justify-center px-4')}
    >
      <div
        className={clsx(
          'w-full max-w-sm rounded-2xl border p-8 text-center',
          'border-divider-light bg-white shadow-lg',
          'dark:border-divider-dark dark:bg-slate-900'
        )}
      >
        <h1
          className={clsx(
            'mb-2 text-xl font-bold text-slate-800',
            'dark:text-slate-100'
          )}
        >
          Password Required
        </h1>
        <p
          className={clsx(
            'mb-6 text-sm text-slate-500',
            'dark:text-slate-400'
          )}
        >
          This page is protected. Enter the password to continue.
        </p>
        <button
          type="button"
          onClick={() => {
            requestAccess(() => {
              setUnlocked(true);
            });
          }}
          className={clsx('button button--solid w-full', 'md:rounded-xl')}
        >
          Enter Password
        </button>
      </div>
    </div>
  );
}

export default PasswordGate;
