import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify'; // 1. Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
metadataBase: new URL('https://www.patnamuslimhighschool.com'),
  title: 'Patna Muslim High School ',
  description:
  'Official website of Patna Muslim High School. Explore admissions, academics, facilities, school rules, announcements, and student and teacher portals.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    "Patna Muslim High School",
    "PMHS",
    "Patna Muslim High School official website",
    "School in Patna",
    "Best school in Patna",
    "School admissions Patna",
    "Bihar school",
    "Education in Patna",
    "Patna CBSE school",  
    "Patna secondary school",
  ],
  openGraph: {
    title: {
        default: "Patna Muslim High School | Official Website",
        template: "%s | Patna Muslim High School",
      },
    description:
      "Official website of Patna Muslim High School. Admissions, academics, facilities, and school updates.",
    url: "https://www.patnamuslimhighschool.com",
    siteName: "Patna Muslim High School",
    type: "website",
    images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Patna Muslim High School",
        },]
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
        <body>{children}
        <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          
        </body>
      </html>
    </ClerkProvider>
  );
}