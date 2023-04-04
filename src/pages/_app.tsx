import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {store} from '../../redux/store';
import { useRouter } from 'next/router';
import { useRef } from 'react';

 
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const ref = useRef<string | null>(null);

  router.events?.on('routeChangeStart', () => {
    ref.current = router.asPath;
    document.body.dataset.lastRout = router.asPath
  });
  return (
    <Provider store={store}>
      <Component {...pageProps} lastRoute={ref.current}  />
    </Provider>
  );
}
