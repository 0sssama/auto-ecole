'use client';

import moment from 'moment';
import type { ReactNode } from 'react';

import { frLocaleData } from '@/base/data/locale-data';
import type { Locale } from '@/base/data/locales';

export default function MomentProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  if (locale === 'fr') moment.updateLocale('fr', frLocaleData);
  else moment.locale(locale);

  return <>{children}</>;
}
