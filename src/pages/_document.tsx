import { NextComponentType } from 'next';

import type { AppType } from 'next/app';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = function () {
      return originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App: AppType) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component: NextComponentType) => Component,
      });
    };

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          {/* add google tag manager here */}
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* add more script here */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
