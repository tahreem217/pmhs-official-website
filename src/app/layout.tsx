import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://patnamuslimhighschool.com'),
  title: "Patna Muslim High School | Official ERP Portal",
  description: "Official portal for Patna Muslim High School.",
  alternates: {
    canonical: '/',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
 
          <ToastContainer position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}