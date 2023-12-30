'use client';

import { useTranslations } from 'next-intl';

import { HamburgerButton, HelpButton, Logo, UserNav, UserOrgAvatar } from '@/components/atoms';
import { cn } from '@/base/utils/client/cn';
import { useScroll } from '@/base/hooks/use-scroll';

const Header = () => {
  const t = useTranslations('Dashboard.Header');

  const { scrolled } = useScroll({ threshold: 50 });

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-[10] flex w-full items-center justify-center border-b bg-background/70 px-8 py-6 backdrop-blur backdrop-saturate-150 transition-all',
        scrolled && 'py-3 lg:py-5',
      )}
    >
      <div className="flex w-full max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-5">
          <Logo size={scrolled ? 'sm' : 'md'} />
          <span className="text-2xl font-thin leading-none text-foreground/80">/</span>
          <UserOrgAvatar />
        </div>
        <div className="flex items-center justify-end gap-3 lg:gap-5">
          <HelpButton>{t('help')}</HelpButton>
          <UserNav />
          <HamburgerButton className="lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Header;
