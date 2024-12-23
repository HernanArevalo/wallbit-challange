import type { Metadata } from "next";
import { Sour_Gummy } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "Wallbit Challenge | Hernán Arévalo",
  description: "Generated by create next app",
};

const sourGummy = Sour_Gummy({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourGummy.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
