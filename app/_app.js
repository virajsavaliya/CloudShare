// pages/_app.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Set color scheme to light when the app loads
  useEffect(() => {
    const handleRouteChange = () => {
      // Set color scheme to light
      document.documentElement.setAttribute('color-scheme', 'light');
    };

    // Initialize color scheme
    handleRouteChange();

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
