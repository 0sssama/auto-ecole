import type { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import type { LinkProps as NextLinkProps } from 'next/link';

interface ModifiedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactNode;
}

export type LinkProps = Omit<NextLinkProps, keyof ModifiedLinkProps> & ModifiedLinkProps;

export type LinkComponentType = FC<LinkProps>;
