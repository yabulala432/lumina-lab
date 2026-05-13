"use client";

import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
