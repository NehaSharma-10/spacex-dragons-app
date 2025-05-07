import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import Header from './components/Header'; 
import './App.css';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider  withGlobalStyles
    withNormalizeCSS
    theme={{
      primaryColor: 'teal', 
      fontFamily: 'Poppins, sans-serif', 
      headings: { fontFamily: 'Poppins, sans-serif' },
      defaultRadius: 'md', 
    }}>
      <Header />
      <Outlet /> 
    </MantineProvider>
  );
}
