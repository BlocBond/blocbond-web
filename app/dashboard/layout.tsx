import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { NextAuthProvider } from "@/app/Providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grotto Climbing App",
  description: "Find gyms and routes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">``
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <Navbar />
            {children}
          </div>
          </div>  
        </NextAuthProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
