import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MomSafe 媽咪護航 | 現代媽咪全方位守護生態系",
  description: "AI 育兒日記、友善地圖、保母媒合、MomCoin 信任貨幣系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
        <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© 2026 MomSafe Inc. 現代媽咪全方位守護生態系</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900">隱私權政策</a>
              <a href="#" className="hover:text-gray-900">服務條款</a>
              <a href="#" className="hover:text-gray-900">聯絡我們</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
