import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Static Soil Lab",
  description: "Advanced Soil Health Management Portal",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Next.js application" />
        <link rel="shortcut icon" href="/soil2.png" />
        <link rel="stylesheet" href="/fonts/kinn/stylesheet.css" />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
