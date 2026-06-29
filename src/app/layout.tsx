import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://patnamuslimhighschool.com'),
  title: 'Patna Muslim High School | Official ERP Portal',
  description: 'Official portal for Patna Muslim High School for student and teacher management.',
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}