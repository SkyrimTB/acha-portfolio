import NextHead from 'next/head';
import { useRouter } from 'next/router';

import useCurrentUrl from '@/hooks/useCurrentUrl';

import { getBaseUrl } from '@/helpers/url';

interface HeadProps {
  title: string;
  description: string;
  ogImage: string;
  overrideTitle?: boolean;
  structuredData?: string;
}

function Head({
  title,
  description,
  ogImage,
  overrideTitle = false,
  structuredData = '',
}: HeadProps) {
  const currentUrl = useCurrentUrl();
  const { locale, pathname } = useRouter();
  const baseUrl = getBaseUrl();

  const htmlTitle = overrideTitle ? title : `${title} — acha`;
  const ogLocale = locale === 'zh' ? 'zh_CN' : 'en_US';

  return (
    <NextHead>
      <title>{htmlTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* seo */}
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${pathname}`} />
      <link rel="alternate" hrefLang="zh" href={`${baseUrl}/zh${pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${pathname}`} />

      {/* og */}
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`Image with "${title}" text.`} />

      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@acha" />
      <meta name="twitter:creator" content="@acha" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`Image with "${title}" text.`} />

      {/* structured data */}
      {structuredData && (
        <script type="application/ld+json">{structuredData}</script>
      )}
    </NextHead>
  );
}

export default Head;
