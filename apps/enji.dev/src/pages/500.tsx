import Head from 'next/head';

import useTranslation from '@/hooks/useTranslation';

import Error500Contents from '@/contents/500';

import type { ReactElement } from 'react';

function Error500() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('error.serverError')}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <Error500Contents />
    </>
  );
}

Error500.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Error500;
