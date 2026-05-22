import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreetBite - Admin Panel",
  description: "StreetBite food delivery admin dashboard for managing vendors, riders, orders, and payments.",
  icons: {
    icon: "🔥",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e1e30',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#f5f5f5',
            },
          }}
        />
      </body>
    </html>
  );
}
