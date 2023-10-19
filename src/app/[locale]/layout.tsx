import * as React from "react";
import type { Metadata } from "next";

import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";

import {
  ThemeProvider,
  RecoilProvider,
  NprogressProvider,
  ToastProvider,
  TRPCProvider,
} from "@/providers";

import "@/styles/globals.css";
import { notFound } from "next/navigation";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NEXT BOILERPLATE",
  description: "NEXTJS INSANE BOILERPLATE",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider>
        <TRPCProvider>
          <html lang={locale} suppressHydrationWarning>
            <body className={plusJakarta.className}>
              <RecoilProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="light"
                  enableSystem
                  disableTransitionOnChange
                >
                  <NprogressProvider>
                    <ToastProvider>{children}</ToastProvider>
                  </NprogressProvider>
                </ThemeProvider>
              </RecoilProvider>
            </body>
          </html>
        </TRPCProvider>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
