import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "LeadSense",
  description: "AI sales intelligence for modern teams",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
