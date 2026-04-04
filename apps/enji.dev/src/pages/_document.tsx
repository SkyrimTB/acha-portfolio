import { Head, Html, Main, NextScript } from 'next/document';

import type { DocumentProps } from 'next/document';

// eslint-disable-next-line no-underscore-dangle, react/destructuring-assignment
function Document({ __NEXT_DATA__: nextData }: DocumentProps) {
  return (
    <Html lang={nextData.locale || 'en'}>
      <Head />
      <body>
        <div id="skip-navigation" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
