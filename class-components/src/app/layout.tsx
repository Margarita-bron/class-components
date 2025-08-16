import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary';
import { Header } from '../components/header/Header';
import { ThemeProviders } from './theme-provider';

export const metadata: Metadata = {
  title: 'Open Library',
  description:
    'Open Library - a digital library, a platform for publishing, storing and searching scientific and literary works',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProviders>
            <Header />
            {children}
          </ThemeProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
