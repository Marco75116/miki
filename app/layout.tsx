import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const myFont = localFont({
  src: [
    {
      path: "../lib/fonts/zt-chintzy/ZTChintzy-Light-BF65e6952145108.otf",
      weight: "300",
    },
    {
      path: "../lib/fonts/zt-chintzy/ZT-Chintzy-Black-BF65e6951ed0d80.otf",
      weight: "400",
    },
    {
      path: "../lib/fonts/zt-chintzy/ZTChintzy-Medium-BF65e695214f9dd.otf",
      weight: "500",
    },
    {
      path: "../lib/fonts/zt-chintzy/ZTChintzy-SemiBold-BF65e6952152dc6.otf",
      weight: "600",
    },
    {
      path: "../lib/fonts/zt-chintzy/ZTChintzy-Bold-BF65e695215474c.otf",
      weight: "700",
    },
    {
      path: "../lib/fonts/zt-chintzy/ZTChintzy-ExtraBold-BF65e6952156852.otf",
      weight: "800",
    },
  ],
});

export const metadata: Metadata = {
  title: "Miki",
  description:
    "Miki allow users to efficiently and effortlessly create, trade, and lend liquidity through one powerful platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${myFont.className}`}>{children}</body>
      </Providers>
    </html>
  );
}
