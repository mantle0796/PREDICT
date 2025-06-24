import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import type { ReactNode } from "react";
import { WalletProvider } from "@/components/ui/WalletProvider";
import { Toast } from "@/components/ui/toast";
import { WrongNetworkAlert } from "@/components/ui/WrongNetworkAlert";
import { ReactQueryProvider } from "@/components/ui/ReactQueryProvider";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PREDICT",
  description: "Predict the future with Aptos, your opinion matters and make you earn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <ReactQueryProvider>

            {children}
            <WrongNetworkAlert />
            <Toaster />
          </ReactQueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
