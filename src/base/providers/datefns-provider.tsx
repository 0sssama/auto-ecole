'use client';
import type { ReactNode } from 'react';
import { fr, enUS } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

import type { Locale } from '@/base/data/locales';

export default function DateFnsProvider({ locale, children }: { children: ReactNode; locale: Locale }) {
  if (locale === 'fr') setDefaultOptions({ locale: fr });
  else setDefaultOptions({ locale: enUS });

  return <>{children}</>;
}
