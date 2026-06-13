import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spill The Tea",
  description: "A playful one-page space for hot takes, pop culture, and honest chatter.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
