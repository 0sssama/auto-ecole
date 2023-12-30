/**
 * Checks if a given URL is external or a mailto link.
 * @param url - The URL to check.
 * @returns True if the URL is external or a mailto link, otherwise false.
 */
export default function isUrlExternal(url: string) {
  if (!url) return false;

  return url.startsWith('http') || url.startsWith('mailto');
}
