import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export default function ContractLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: 'عقد التكوين بين المرشح ومؤسسة تعليم السياقة',
};
