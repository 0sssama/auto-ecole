export const isArabicString = (str: string): boolean =>
  /^[ء-ي 0-9]+$/.test(str);
