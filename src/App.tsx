import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import Header from './components/Header';  // Import Header component
import './App.css';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Header /> {/* Header component displayed on every page */}
      <Outlet /> {/* Child routes will be rendered here */}
    </MantineProvider>
  );
}
