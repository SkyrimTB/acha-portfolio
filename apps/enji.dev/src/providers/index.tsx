import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from 'next-themes';

import mdxCustomComponents from '@/components/mdx/custom-components';
import ColorAccentProvider from '@/providers/ColorAccentProvider';
import FocusModeProvider from '@/providers/FocusModeProvider';
import FramerMotionProvider from '@/providers/FramerMotionProvider';
import GlobalStateProvider from '@/providers/GlobalStateProvider';
import PasswordProvider from '@/providers/PasswordProvider';

import type { PropsWithChildren } from 'react';

function Provider({ children = null }: PropsWithChildren) {
  return (
    <FramerMotionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <FocusModeProvider>
          <ColorAccentProvider defaultScheme="violet">
            <GlobalStateProvider>
              <PasswordProvider>
                <MDXProvider components={mdxCustomComponents}>
                  {children}
                </MDXProvider>
              </PasswordProvider>
            </GlobalStateProvider>
          </ColorAccentProvider>
        </FocusModeProvider>
      </ThemeProvider>
    </FramerMotionProvider>
  );
}

export default Provider;
