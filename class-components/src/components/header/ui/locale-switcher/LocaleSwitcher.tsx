'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../../../i18n/navigation';
import { useCallback } from 'react';
import './locale.css';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = useCallback(() => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  }, [locale, pathname, router]);

  return (
    <button className="locale-button" onClick={switchLocale}>
      {locale === 'en' ? 'RU' : 'EN'}
    </button>
  );
}
