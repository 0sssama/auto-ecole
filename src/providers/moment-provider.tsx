"use client";

import moment from "moment";
import React from "react";

import { frLocaleData } from "@/lib/data/locale-data";

import type { Locale } from "@/lib/locales";

export default function MomentProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  if (locale === "fr") moment.locale("fr", frLocaleData);
  else moment.locale("en");

  return <>{children}</>;
}
