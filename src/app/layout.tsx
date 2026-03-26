import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Settle — AI, thoughtfully deployed.",
  description:
    "We settle AI into your team's actual workflows — structured rollouts, production-grade instructions, and real results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=sentient@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
