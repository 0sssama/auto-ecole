import { locales } from '@/base/data/locales';

export const cleanLocaleFromPathname = (pathname: string | undefined) => {
  if (pathname === undefined) return '';

  return pathname.replaceAll(new RegExp(`^/(${locales.join('|')})`, 'g'), '');
};

export const cleanPathname = (pathname: string | undefined) => {
  if (pathname === undefined) return '';

  return pathname
    .split('?')[0] // remove query params
    .replaceAll(new RegExp(`^/(${locales.join('|')})`, 'g'), '') // remove locale
    .replaceAll(/\/$/g, '') // remove trailing slashes
    .replaceAll(/\/{2,}/g, '/'); // replace duplicate slashes with a single slash
};
