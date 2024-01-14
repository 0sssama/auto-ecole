'use client';

import Image from 'next/image';
import Cookie from 'js-cookie';
import { MoonStar, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { SignOutButton, useOrganization, useUser } from '@clerk/nextjs';

import { Link } from '@/components/atoms/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/base/utils/client/cn';
import { locales, type Locale } from '@/base/data/locales';

import { LOCALE_COOKIE_NAME, UserNavLinks, langIcons, parseRoleToClient } from './user-nav.helpers';
import type { UserNavComponentType } from './user-nav.types';

const UserNav: UserNavComponentType = () => {
  const t = useTranslations('Dashboard.Header.UserNav');

  const router = useRouter();

  const { user } = useUser();
  const { membership } = useOrganization();

  const { theme: currentTheme, setTheme } = useTheme();

  const currentLocale = useLocale() as Locale;

  if (!user || !membership) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={user.fullName ?? ''} />
            <AvatarFallback>{`${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{parseRoleToClient(membership.role, t)}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <p className="mb-1 ml-1 mt-2 text-[10px] font-bold uppercase text-muted-foreground">{t('profile')}</p>
          {UserNavLinks(t).map((link, i) => (
            <DropdownMenuItem key={i} className="!p-0">
              <Link href={link.href} className="h-full w-full px-2 py-1.5">
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <p className="mb-1 ml-1 mt-2 text-[10px] font-bold uppercase text-muted-foreground">{t('Theme.title')}</p>
          {['light', 'dark'].map((theme, i) => (
            <DropdownMenuItem key={i} className="overflow-hidden !p-0">
              <button
                className={cn('flex h-full w-full cursor-pointer items-center gap-2 px-2 py-1.5', {
                  'bg-accent': theme === currentTheme,
                })}
                onClick={() => {
                  if (theme === currentTheme) return;

                  setTheme(theme);
                }}
              >
                {theme === 'dark' ? <MoonStar size={16} /> : <Sun size={16} />}
                {t(`Theme.${theme}`)}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <p className="mb-1 ml-1 mt-2 text-[10px] font-bold uppercase text-muted-foreground">{t('Langs.title')}</p>
          {locales.map((locale, i) => {
            const isCurrentLocale = locale === currentLocale;

            const visibleName = t(`Langs.${locale}`);

            return (
              <DropdownMenuItem key={i} className="overflow-hidden !p-0">
                <button
                  className={cn('flex h-full w-full cursor-pointer items-center gap-2 px-2 py-1.5', {
                    'bg-accent': isCurrentLocale,
                  })}
                  onClick={() => {
                    if (isCurrentLocale) return;

                    Cookie.set(LOCALE_COOKIE_NAME, locale);
                    setTimeout(() => {
                      router.refresh();
                    }, 100);
                  }}
                >
                  <Image src={langIcons[locale as keyof typeof langIcons]} alt={visibleName} height={18} width={18} />
                  {visibleName}
                </button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton signOutCallback={() => router.push('/')}>
          <DropdownMenuItem className="cursor-pointer font-semibold text-destructive hover:bg-destructive/20 hover:text-destructive focus:bg-destructive/20 focus:text-destructive">
            {t('logout')}
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
