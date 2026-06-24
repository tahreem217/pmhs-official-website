import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script'; // 👈 Import this at the top
// ... keep your other imports like Clerk, Toast, etc.
import "./globals.css"; 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PMHS | Patna Muslim High School",
  description: "Official student and teacher portal for PMHS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider> 
      <html lang="en">
        <head>
   
          <Script id="google-translate-init" strategy="beforeInteractive">
            {`
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi,ur',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `}
          </Script>
    
          <Script 
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
            strategy="afterInteractive" 
          />
        </head>
        <body className={inter.className}>
           <div id="google_translate_element" style={{ display: 'none' }}></div>
          
          {children}
          
        
        </body>
      </html>
    </ClerkProvider>
  );
}