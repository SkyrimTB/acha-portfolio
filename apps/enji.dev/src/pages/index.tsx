import Head from '@/components/meta/Head';

import useTranslation from '@/hooks/useTranslation';

import { getBaseUrl } from '@/helpers/url';

import IndexContents from '@/contents/index';

function Index() {
  const { t } = useTranslation('home');

  return (
    <>
      <Head
        title={t('meta.title')}
        description={t('meta.description')}
        ogImage={`${getBaseUrl()}/assets/images/og-image.png`}
        overrideTitle
      />
      <IndexContents />
    </>
  );
}

export default Index;
