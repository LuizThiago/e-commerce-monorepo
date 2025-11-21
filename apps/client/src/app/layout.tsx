import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const layoutContainer =
  "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";

export const metadata: Metadata = {
  title: "Trendlama - Best Clothes",
  description: "Trendlama is the best e-commerce store for clothes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white`}
        >
          <div className="flex min-h-screen flex-col">
            <header className="w-full py-6">
              <div className={layoutContainer}>
                <Navbar />
              </div>
            </header>
            <main className="flex-1 w-full py-6">
              <div className={layoutContainer}>{children}</div>
            </main>
            <footer className="w-full pb-10">
              <div className={layoutContainer}>
                <Footer />
              </div>
            </footer>
          </div>
          <ToastContainer position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
