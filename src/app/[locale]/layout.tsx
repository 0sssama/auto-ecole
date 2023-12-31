import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Vazirmatn } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ClerkProvider } from '@clerk/nextjs';
import { notFound } from 'next/navigation';

import {
  ThemeProvider,
  RecoilProvider,
  NprogressProvider,
  ToastProvider,
  TRPCProvider,
  DateFnsProvider,
} from '@/base/providers';
import { locales, type Locale } from '@/base/data/locales';

import '@/base/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ECPP Dashboard',
  description: 'Ecole Planete Permis Dashboard',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);
  // TODO: ONLY PASS NECESSARY MESSAGES (THIS FUCKS UP PERFORMANCE)
  const messages = useMessages();

  return (
    // TODO: ONLY PASS NECESSARY MESSAGES (THIS FUCKS UP PERFORMANCE)
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider>
        <TRPCProvider>
          <html lang={locale} suppressHydrationWarning className="bg-background text-foreground">
            <body
              className={`min-h-screen bg-background text-foreground ${plusJakarta.variable} ${vazirmatn.variable}`}
            >
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                <NprogressProvider>
                  <RecoilProvider>
                    <ToastProvider>
                      <DateFnsProvider locale={locale}>{children}</DateFnsProvider>
                    </ToastProvider>
                  </RecoilProvider>
                </NprogressProvider>
              </ThemeProvider>
            </body>
          </html>
        </TRPCProvider>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => {
    return { locale };
  });
}
