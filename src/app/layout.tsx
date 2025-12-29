import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Exotica Farms | Premium Protected Farming",
  description: "Experience modern agriculture with our polyhouse and Shade Net farming. Fresh mushrooms, bell peppers, and cucumbers directly from our farm.",
};

import MainContentWrapper from "@/components/MainContentWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <ConditionalNavbar />
        <MainContentWrapper>
          {children}
        </MainContentWrapper>
        <ConditionalFooter />
      </body>
    </html>
  );
}
