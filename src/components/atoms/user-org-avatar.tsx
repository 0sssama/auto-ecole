"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { useScroll } from "@/lib/hooks/useScroll";

export default function UserOrgAvatar() {
  const { scrolled } = useScroll({ threshold: 50 });

  const { user } = useUser();

  const { organization } = user?.organizationMemberships[0] ?? {};

  if (!user || !organization) return null;

  return (
    <Link href="/dash" className="inline-flex items-center h-8">
      <Avatar
        className={cn(
          "rounded-md shadow-lg w-10 h-10 transition-all",
          scrolled && "w-8 h-8",
        )}
      >
        <AvatarImage src={organization.imageUrl} alt={organization.name} />
        <AvatarFallback>
          {organization.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p
        className={cn(
          "ml-4 text-sm font-semibold leading-none transition-all",
          scrolled && "ml-2 text-xs",
        )}
      >
        {organization.name}
      </p>
    </Link>
  );
}
