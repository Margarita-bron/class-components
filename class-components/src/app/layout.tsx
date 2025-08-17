import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '../components/error-boundary/ErrorBoundary';
import { Header } from '../components/header/Header';
import { ThemeProviders } from '../providers/theme-provider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import QueryInitializer from './QueryFromLS';
import ClientWrapper from '../providers/client-wrapper';

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
          <ClientWrapper>
              <Header />
<QueryInitializer/>
              {children}
          </ClientWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
