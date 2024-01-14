import {
  Banknote,
  BookOpenCheck,
  Building,
  CarFront,
  CircleDollarSign,
  Folder,
  Folders,
  GraduationCap,
  LogOut,
  Settings,
  User2,
  Users2,
  Wallet2,
} from 'lucide-react';
import type { OrganizationCustomRoleKey } from '@clerk/types';

import type { TranslationFunction } from '@/base/types';
import {
  DASH_EDITORS_PATH,
  DASH_EXAMS_PATH,
  DASH_EXPENSES_PATH,
  DASH_FINANCIAL_OVERVIEW_PATH,
  DASH_INSTRUCTORS_PATH,
  DASH_LESSONS_PATH,
  DASH_LICENSE_FILES_PATH,
  DASH_LOGOUT_PATH,
  DASH_MEMBER_FOLDER_PATH,
  DASH_PAYMENTS_PATH,
  DASH_SETTINGS_PATH,
  DASH_STUDENTS_PATH,
  DASH_VEHICLES_PATH,
} from '@/base/data/paths';

import type { SidebarLinkGroupProps } from './types';

const sidebarIconProps = {
  size: 18,
  className: 'mr-3',
};

export const getFallbackSidebarLinks = (t: TranslationFunction = () => ''): SidebarLinkGroupProps[] => [
  {
    title: t('account'),
    links: [
      {
        name: t('logout'),
        href: DASH_LOGOUT_PATH,
        icon: <LogOut {...sidebarIconProps} />,
        isSignOut: true,
      },
    ],
  },
];

export const getSidebarLinks = (
  t: TranslationFunction = () => '',
): {
  [_ in OrganizationCustomRoleKey | 'super_admin']: SidebarLinkGroupProps[];
} => {
  return {
    super_admin: [
      {
        title: t('users'),
        links: [
          {
            name: t('clients'),
            href: DASH_STUDENTS_PATH,
            icon: <User2 {...sidebarIconProps} />,
          },
          {
            name: t('monitors'),
            href: DASH_INSTRUCTORS_PATH,
            icon: <Users2 {...sidebarIconProps} />,
          },
          {
            name: t('editors'),
            href: DASH_EDITORS_PATH,
            icon: <Building {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('folders'),
        links: [
          {
            name: t('license-files'),
            href: DASH_LICENSE_FILES_PATH,
            icon: <Folders {...sidebarIconProps} />,
          },
          {
            name: t('lessons'),
            href: DASH_LESSONS_PATH,
            icon: <BookOpenCheck {...sidebarIconProps} />,
          },
          {
            name: t('exams'),
            href: DASH_EXAMS_PATH,
            icon: <GraduationCap {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('payment'),
        links: [
          {
            name: t('payments'),
            href: DASH_PAYMENTS_PATH,
            icon: <Wallet2 {...sidebarIconProps} />,
          },
          {
            name: t('expenses'),
            href: DASH_EXPENSES_PATH,
            icon: <Banknote {...sidebarIconProps} />,
          },
          {
            name: t('financial-overview'),
            href: DASH_FINANCIAL_OVERVIEW_PATH,
            icon: <CircleDollarSign {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('entities'),
        links: [
          {
            name: t('vehicles'),
            href: DASH_VEHICLES_PATH,
            icon: <CarFront {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('account'),
        links: [
          {
            name: t('settings'),
            href: DASH_SETTINGS_PATH,
            icon: <Settings {...sidebarIconProps} />,
          },
          {
            name: t('logout'),
            href: DASH_LOGOUT_PATH,
            icon: <LogOut {...sidebarIconProps} />,
            isSignOut: true,
          },
        ],
      },
    ],
    admin: [
      {
        title: t('users'),
        links: [
          {
            name: t('clients'),
            href: DASH_STUDENTS_PATH,
            icon: <User2 {...sidebarIconProps} />,
          },
          {
            name: t('monitors'),
            href: DASH_INSTRUCTORS_PATH,
            icon: <Users2 {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('folders'),
        links: [
          {
            name: t('license-files'),
            href: DASH_LICENSE_FILES_PATH,
            icon: <Folders {...sidebarIconProps} />,
          },
          {
            name: t('lessons'),
            href: DASH_LESSONS_PATH,
            icon: <BookOpenCheck {...sidebarIconProps} />,
          },
          {
            name: t('exams'),
            href: DASH_EXAMS_PATH,
            icon: <GraduationCap {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('payment'),
        links: [
          {
            name: t('payments'),
            href: DASH_PAYMENTS_PATH,
            icon: <Banknote {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('entities'),
        links: [
          {
            name: t('vehicles'),
            href: DASH_VEHICLES_PATH,
            icon: <CarFront {...sidebarIconProps} />,
          },
        ],
      },
      {
        title: t('account'),
        links: [
          {
            name: t('settings'),
            href: DASH_SETTINGS_PATH,
            icon: <Settings {...sidebarIconProps} />,
          },
          {
            name: t('logout'),
            href: DASH_LOGOUT_PATH,
            icon: <LogOut {...sidebarIconProps} />,
            isSignOut: true,
          },
        ],
      },
    ],
    basic_member: [
      {
        title: t('account'),
        links: [
          {
            name: t('folder'),
            href: DASH_MEMBER_FOLDER_PATH,
            icon: <Folder {...sidebarIconProps} />,
          },
          {
            name: t('settings'),
            href: DASH_SETTINGS_PATH,
            icon: <Settings {...sidebarIconProps} />,
          },
          {
            name: t('logout'),
            href: DASH_LOGOUT_PATH,
            icon: <LogOut {...sidebarIconProps} />,
            isSignOut: true,
          },
        ],
      },
    ],
    guest_member: [
      {
        title: t('account'),
        links: [
          {
            name: t('logout'),
            href: DASH_LOGOUT_PATH,
            icon: <LogOut {...sidebarIconProps} />,
            isSignOut: true,
          },
        ],
      },
    ],
  };
};
