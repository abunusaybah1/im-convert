import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout.tsx/Header";

export const metadata: Metadata = {
  title: "Im-Convert",
  description: "Convert your Jpeg image to PNG format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-blue-50">
      <body className="min-h-screen flex flex-col h-full w-full font-sans text-black bg-transparent">
        <Header />
        {children}
      </body>
    </html>
  );
}
