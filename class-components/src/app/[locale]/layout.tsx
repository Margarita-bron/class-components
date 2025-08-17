import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Header } from '../../components/header/Header';
import { ThemeProviders } from '../../providers/theme-provider';
import QueryInitializer from './QueryFromLS';
import StoreProvider from '../../redux/store-provider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

export const metadata: Metadata = {
  title: 'Open Library',
  description:
    'Open Library - a digital library, a platform for publishing, storing and searching scientific and literary works',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  modal: React.ReactNode;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <NextIntlClientProvider>
            <ThemeProviders>
              <StoreProvider>
                <Header />
                <QueryInitializer />
                {children}
              </StoreProvider>
            </ThemeProviders>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
