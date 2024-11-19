import type { Metadata } from "next";
import { Berkshire_Swash } from "next/font/google";
import "./globals.css";
import { config } from "../../config";

const font = Berkshire_Swash({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advent Calendar",
  description: "Personal advent calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
