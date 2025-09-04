//React
import React from "react";

//Next
import Document, { Main, NextScript, Html, Head } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: <React.Fragment>{initialProps.styles}</React.Fragment>
      };
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Nate Wessels - MERN Stack Developer</title>
          <link rel="icon" type="image/x-icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"true"}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Merienda:wght@400;700&display=swap"
            rel="stylesheet"
          />

          <link
            href={"https://use.fontawesome.com/releases/v5.3.1/css/all.css"}
            rel="stylesheet"
          />
          <link
            href={
              "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.css"
            }
            rel={"stylesheet"}
          />
          <style>{`
            body {
              max-width: 100vw;
              overflow-x: hidden;
              margin: 0;
              padding: 0;
            }

            html {
              max-width: 100vw;
              overflow-x: hidden;
              margin: 0;
              padding: 0;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
