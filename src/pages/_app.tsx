import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <NextNProgress
        color="#ff57b2"
        startPosition={0.3}
        stopDelayMs={200}
        height={10}
        showOnShallow
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
