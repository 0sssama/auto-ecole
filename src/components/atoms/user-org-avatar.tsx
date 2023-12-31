'use client';

import Link from 'next/link';
import { useOrganization } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/base/utils/client/cn';
import { useScroll } from '@/base/hooks/use-scroll';

export default function UserOrgAvatar() {
  const { scrolled } = useScroll({ threshold: 50 });

  const { organization } = useOrganization();

  if (!organization) return null;

  return (
    <Link href="/dash" className="inline-flex h-8 items-center">
      <Avatar className={cn('h-10 w-10 rounded-md shadow-lg transition-all', scrolled && 'h-8 w-8')}>
        <AvatarImage src={organization.imageUrl} alt={organization.name} />
        <AvatarFallback>{organization.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <p className={cn('ml-4 text-sm font-semibold leading-none transition-all', scrolled && 'ml-2 text-xs')}>
        {organization.name}
      </p>
    </Link>
  );
}
