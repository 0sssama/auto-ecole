'use client';

// eslint-disable-next-line import/no-duplicates
import { fr, enUS } from 'date-fns/locale';
import type { ReactNode } from 'react';
//eslint-disable-next-line import/no-duplicates
import setDefaultOptions from 'date-fns/setDefaultOptions';

import type { Locale } from '@/base/data/locales';

export default function DateFnsProvider({ locale, children }: { children: ReactNode; locale: Locale }) {
  if (locale === 'fr') setDefaultOptions({ locale: fr });
  else setDefaultOptions({ locale: enUS });

  return <>{children}</>;
}
