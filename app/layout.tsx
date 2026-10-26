import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Fareed — Frontend Developer",
  icons: { icon: "/favicon.svg" },
  description:
    "Abdullah Fareed is a frontend developer and software engineering student in Karachi, building thoughtful web experiences and exploring AI-powered products.",
  openGraph: {
    title: "Abdullah Fareed — Frontend Developer",
    description: "Thoughtful interfaces. Ambitious ideas. Built for what comes next.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
