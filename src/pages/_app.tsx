import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-row">
        <Component {...pageProps} />
      </main> 
    </div>
  );
}

export default MyApp;