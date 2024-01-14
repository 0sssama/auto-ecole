import { default as NextLink } from 'next/link';

import getSecureExternalLinkAttributes from '@/base/utils/client/get-secure-external-link-attributes';

import type { LinkComponentType } from './link.types';

const Link: LinkComponentType = ({ children, href, ...props }) => {
  if (href === undefined) return <div className={props.className}>{children}</div>;

  const externalProps = getSecureExternalLinkAttributes(href.toString());

  return (
    <NextLink {...props} {...externalProps} href={href}>
      {children}
    </NextLink>
  );
};

export default Link;
