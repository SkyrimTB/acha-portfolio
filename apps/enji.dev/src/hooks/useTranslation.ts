import { useRouter } from 'next/router';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import zhCommon from '@/locales/zh/common.json';
import zhHome from '@/locales/zh/home.json';

const dictionaries = {
  en: { common: enCommon, home: enHome },
  zh: { common: zhCommon, home: zhHome },
} as const;

type Locale = keyof typeof dictionaries;
type Namespace = keyof (typeof dictionaries)['en'];

function getNestedValue(obj: unknown, path: string): string {
  const result = path.split('.').reduce<unknown>((current, key) => {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) return current[Number(key)];
    if (typeof current === 'object')
      return (current as Record<string, unknown>)[key];
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : path;
}

export default function useTranslation(ns: Namespace = 'common') {
  const { locale } = useRouter();
  const currentLocale = (locale || 'en') as Locale;
  const dictionary = dictionaries[currentLocale][ns];

  const t = (key: string): string => getNestedValue(dictionary, key);

  return { t, locale: currentLocale };
}
