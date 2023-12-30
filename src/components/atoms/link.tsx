import { default as NextLink, type LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import getSecureExternalLinkAttributes from '@/base/utils/client/get-secure-external-link-attributes';

interface ModifiedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactNode;
}

type LinkProps = Omit<NextLinkProps, keyof ModifiedLinkProps> & ModifiedLinkProps;

export default function Link({ children, href, ...props }: LinkProps) {
  if (href === undefined) return <>{children}</>;

  const externalProps = getSecureExternalLinkAttributes(href.toString());

  return (
    <NextLink {...props} {...externalProps} href={href}>
      {children}
    </NextLink>
  );
}
