import { locales } from "@/lib/locales";

export const cleanPathname = (pathname: string | undefined) => {
  if (pathname === undefined) {
    return "";
  }

  return pathname
    .split("?")[0] // remove query params
    .replace(new RegExp(`^/(${locales.join("|")})`, "g"), "") // remove locale
    .replace(/\/$/g, "") // remove trailing slashes
    .replace(/\/{2,}/g, "/"); // replace duplicate slashes with a single slash
};
