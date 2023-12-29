import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { ClerkProvider } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import {
  ThemeProvider,
  RecoilProvider,
  NprogressProvider,
  ToastProvider,
  TRPCProvider,
  NextUIProvider,
  MomentProvider,
} from "@/providers";
import { locales, type Locale } from "@/lib/locales";
import "@/styles/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ECPP Dashboard",
  description: "Ecole Planete Permis Dashboard",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: {
    locale: Locale;
  };
}) {
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);

  // TODO: ONLY PASS NECESSARY MESSAGES (THIS FUCKS UP PERFORMANCE)
  const messages = useMessages();

  return (
    // TODO: ONLY PASS NECESSARY MESSAGES (THIS FUCKS UP PERFORMANCE)
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider>
        <TRPCProvider>
          <html
            lang={locale}
            suppressHydrationWarning
            className="text-foreground bg-background"
          >
            <body
              className={`text-foreground bg-background min-h-screen ${vazirmatn.variable}`}
            >
              <NextUIProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="light"
                  enableSystem
                >
                  <NprogressProvider>
                    <RecoilProvider>
                      <ToastProvider>
                        <MomentProvider locale={locale}>
                          {children}
                        </MomentProvider>
                      </ToastProvider>
                    </RecoilProvider>
                  </NprogressProvider>
                </ThemeProvider>
              </NextUIProvider>
            </body>
          </html>
        </TRPCProvider>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
