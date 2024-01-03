import isUrlExternal from './is-url-external';

/**
 * Retrieves secure attributes for external links, ensuring a safer browsing experience.
 * @param url - The URL to check and generate attributes for.
 * @returns Secure attributes ({ target: '_blank', rel: 'noopener noreferrer' }) for external links; an empty object otherwise.
 */
export default function getSecureExternalLinkAttributes(url?: string) {
  if (!url || !isUrlExternal(url)) return {};

  return { target: '_blank', rel: 'noopener noreferrer' };
}
