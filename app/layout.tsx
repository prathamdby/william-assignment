import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mentorship Platform",
  description: "Connect with mentors in your field",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
