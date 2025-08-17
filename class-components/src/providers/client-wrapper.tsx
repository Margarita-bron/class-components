'use client';

import { ThemeProviders } from './theme-provider';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProviders>{children}</ThemeProviders>;
}
