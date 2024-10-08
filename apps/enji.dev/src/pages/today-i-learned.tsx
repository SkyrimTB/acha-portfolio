import TILContents from '@/contents/TIL';
import HeaderImage from '@/contents/TIL/HeaderImage';
import Page from '@/contents-layouts/Page';

function TIL() {
  return (
    <Page
      frontMatter={{
        title: 'Today I Learned',
        description: `Short notes on my interested topics.`,
      }}
      headerImage={<HeaderImage />}
    >
      <TILContents />
    </Page>
  );
}

export default TIL;
