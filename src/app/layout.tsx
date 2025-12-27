import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
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
  title: "Exotica Farm | Premium Protected Farming",
  description: "Experience modern agriculture with our polyhouse and shednet farming. Fresh mushrooms, bell peppers, and cucumbers directly from our farm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
