import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "VidFetch Atelier | The Luxury Video Downloader",
  description:
    "An exquisite, high-performance video extraction suite. Download media seamlessly in 4K, 1080p Full HD, or pristine Studio Audio from any public link with zero quality loss.",
  keywords: [
    "luxury video downloader",
    "video extractor",
    "4k video download",
    "studio audio mp3",
    "instagram reels downloader",
    "youtube hd downloader",
    "tiktok no watermark",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
