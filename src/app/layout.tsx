import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sprunger-dev",
  description: "Welcome to my second brain! This is a portfolio of my projects, experiences, and additionally my agenda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
