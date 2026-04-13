import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import PasswordModal from '@/components/PasswordModal';

import type { PropsWithChildren } from 'react';

const PASSWORD = 'itsacha';
const STORAGE_KEY = 'pw-verified';

interface PasswordContextValue {
  isVerified: boolean;
  requestAccess: (callback: () => void) => void;
}

const PasswordContext = createContext<PasswordContextValue>({
  isVerified: false,
  requestAccess: () => {},
});

function PasswordProvider({ children = null }: PropsWithChildren) {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }
    return false;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(
    null
  );

  const requestAccess = useCallback(
    (callback: () => void) => {
      if (isVerified) {
        callback();
        return;
      }
      setPendingCallback(() => callback);
      setIsModalOpen(true);
    },
    [isVerified]
  );

  const handleVerify = useCallback(
    (password: string): boolean => {
      if (password === PASSWORD) {
        setIsVerified(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setIsModalOpen(false);
        if (pendingCallback) {
          pendingCallback();
          setPendingCallback(null);
        }
        return true;
      }
      return false;
    },
    [pendingCallback]
  );

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setPendingCallback(null);
  }, []);

  const value = useMemo(
    () => ({ isVerified, requestAccess }),
    [isVerified, requestAccess]
  );

  return (
    <PasswordContext.Provider value={value}>
      {children}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onVerify={handleVerify}
      />
    </PasswordContext.Provider>
  );
}

function usePassword() {
  return useContext(PasswordContext);
}

export { usePassword };
export default PasswordProvider;
