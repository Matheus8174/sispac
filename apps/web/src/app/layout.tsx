/** @jsxImportSource react */

import 'raf/polyfill';
import 'setimmediate';

import { Inter } from 'next/font/google';

import '../../global.css';

import StylesProvider from '@/app/styles-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body className="bg-black-200">
        <StylesProvider>{children}</StylesProvider>
      </body>
    </html>
  );
}

export default RootLayout;
