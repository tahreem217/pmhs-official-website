import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs'
import { ToastContainer ,Bounce } from 'react-toastify';
import Footer from "@/components/landing/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PMHS | Public Model High School",
  description: "Official student and teacher portal for PMHS. Access announcements, exams, and academic records.",
  keywords: ["PMHS", "Patna Muslim High School", "School ERP", "Student Portal", "Teacher Dashboard"],
};

export default function rootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
     <body className={inter.className}>  {children} <ToastContainer position="top-right"
autoClose={3000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}/></body>

    </html>
     </ClerkProvider>
  );
}
