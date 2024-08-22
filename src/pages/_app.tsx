import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lato } from 'next/font/google';

const Lato700 = Lato({
  weight: '700',
  preload: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={Lato700.className}>
      <Component {...pageProps} />;
    </main>
    
  )
}
