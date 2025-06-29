import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";
import { getConfig } from "@/wagmi.config";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaMask SDK Quickstart",
  description: "MetaMask SDK Quickstart app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie") ?? ""
  );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 z-[-10] overflow-hidden">
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] bg-repeat opacity-[0.03] mix-blend-soft-light" />

          {/* White diffuse light */}
          <div className="absolute w-[1800px] h-[1800px] -top-[1200px] -left-[900px] bg-white opacity-5 blur-[150px] rounded-full"></div>
        </div>

        <main className="flex flex-col max-w-screen-lg mx-auto pb-20">
          <Providers initialState={initialState}>
            <Navbar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
