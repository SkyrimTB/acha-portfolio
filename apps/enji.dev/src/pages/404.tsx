import Head from 'next/head';

import useTranslation from '@/hooks/useTranslation';

import Error404Contents from '@/contents/404';

import type { ReactElement } from 'react';

function Error404() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('error.pageNotFound')}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <Error404Contents />
    </>
  );
}

Error404.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Error404;
