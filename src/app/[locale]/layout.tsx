import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Vazirmatn } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
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

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

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
  // TODO: ONLY PASS NECESSARY MESSAGES (THIS FUCKS UP PERFORMANCE)
  const messages = useMessages();

  if (!locales.includes(locale as any)) notFound();

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
            <NextUIProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
              >
                <body
                  className={`text-foreground bg-background min-h-screen ${plusJakarta.variable} ${vazirmatn.variable}`}
                >
                  <RecoilProvider>
                    <NprogressProvider>
                      <ToastProvider>
                        <MomentProvider locale={locale}>
                          {children}
                        </MomentProvider>
                      </ToastProvider>
                    </NprogressProvider>
                  </RecoilProvider>
                </body>
              </ThemeProvider>
            </NextUIProvider>
          </html>
        </TRPCProvider>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
