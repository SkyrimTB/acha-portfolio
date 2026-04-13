import clsx from 'clsx';
import { m, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const overlayAnimation = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
};

const modalAnimation = {
  hide: { opacity: 0, y: 16, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (password: string) => boolean;
}

function PasswordModal({ isOpen, onClose, onVerify }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const ok = onVerify(password);
      if (!ok) {
        setError(true);
        setPassword('');
        inputRef.current?.focus();
      }
    },
    [password, onVerify]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={clsx('fixed inset-0 z-[9999] flex items-center justify-center')}
          initial="hide"
          animate="show"
          exit="hide"
        >
          {/* overlay */}
          <m.div
            className={clsx(
              'absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
            )}
            variants={overlayAnimation}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* modal */}
          <m.div
            className={clsx(
              'relative z-10 w-full max-w-sm rounded-2xl border p-6',
              'border-divider-light bg-white shadow-xl',
              'dark:border-divider-dark dark:bg-slate-900'
            )}
            variants={modalAnimation}
            transition={{ duration: 0.2 }}
          >
            <h2
              className={clsx(
                'mb-1 text-lg font-bold text-slate-800',
                'dark:text-slate-100'
              )}
            >
              Password Required
            </h2>
            <p
              className={clsx(
                'mb-5 text-sm text-slate-500',
                'dark:text-slate-400'
              )}
            >
              Enter the password to view resume & experience.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                className={clsx(
                  'h-10 w-full rounded-xl border px-4 text-sm font-medium outline-none transition',
                  'border-divider-light bg-slate-100 text-slate-700 placeholder:text-slate-400',
                  'focus:border-accent-500 focus:ring-1 focus:ring-accent-500',
                  'dark:border-divider-dark dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500',
                  'dark:focus:border-accent-400 dark:focus:ring-accent-400',
                  error && ['border-red-400', 'dark:border-red-500']
                )}
              />

              {error && (
                <p
                  className={clsx(
                    'mt-2 text-xs font-medium text-red-500',
                    'dark:text-red-400'
                  )}
                >
                  Incorrect password. Please try again.
                </p>
              )}

              <div className={clsx('mt-4 flex gap-2')}>
                <button
                  type="button"
                  onClick={onClose}
                  className={clsx(
                    'button button--ghost button--outline flex-1',
                    'md:rounded-xl'
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={clsx(
                    'button button--solid flex-1',
                    'md:rounded-xl'
                  )}
                >
                  Confirm
                </button>
              </div>
            </form>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default PasswordModal;
