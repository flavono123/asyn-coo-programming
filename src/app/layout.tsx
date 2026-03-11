import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "비둘기 프로그래밍 — Asyn-Coo Programming",
  description:
    "AI에게 코드를 맡기고 기다리는 현대적 개발 패러다임. 기둘.",
  openGraph: {
    title: "비둘기 프로그래밍 — Asyn-Coo Programming",
    description:
      "AI에게 코드를 맡기고 기다리는 현대적 개발 패러다임. 기둘.",
    images: ["/a-wait-pigeon.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${ibmPlexMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
