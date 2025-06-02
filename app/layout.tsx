import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTA IV Design Challenge",
  description:
    "The GTA 6 Landing Page is a cutting-edge web application designed to immerse visitors in the high-octane world of Grand Theft Auto VI.",
  generator: "Keith Ufumeli v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
