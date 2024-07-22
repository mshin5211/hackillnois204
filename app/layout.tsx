import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | HackIllinois 2024',
    default: 'HackIllinois 2024',
  },
  description: "The schedule for HackIllinois 2024",
  keywords: ["HackIllinois", "Schedule", "2024"],
  authors: [{name: "Minseob Shin"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
