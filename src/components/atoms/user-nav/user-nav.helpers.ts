import type { OrganizationCustomRoleKey } from '@clerk/types';

import frIcon from '@/assets/fr-icon.png';
import enIcon from '@/assets/en-icon.png';
import type { TranslationFunction } from '@/base/types';

export const langIcons = {
  fr: frIcon,
  en: enIcon,
};

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export const UserNavLinks = (t: TranslationFunction) => [
  {
    name: t('profile'),
    href: '#',
  },
  {
    name: t('billing'),
    href: '#',
  },
  {
    name: t('settings'),
    href: '#',
  },
];

export const parseRoleToClient = (role: OrganizationCustomRoleKey, t: TranslationFunction) => {
  switch (role) {
    case 'admin': {
      return t('admin');
    }
    case 'basic_member': {
      return t('student');
    }
    default: {
      return t('unknown');
    }
  }
};
