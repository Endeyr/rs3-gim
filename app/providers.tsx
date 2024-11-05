'use client';
import Layout from '@/components/layout/layout';

import { ThemeProvider } from '../components/theme/theme-provider';
import { PlayerProvider } from './context/playerContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <PlayerProvider>
        <Layout>{children}</Layout>
      </PlayerProvider>
    </ThemeProvider>
  );
};
