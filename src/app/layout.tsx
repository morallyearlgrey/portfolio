import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kai Sprunger",
  description: "Kai Sprunger is a software developer majoring in CS at UCF."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        {children}
         </Providers>
      </body>
    </html>
  );
}
