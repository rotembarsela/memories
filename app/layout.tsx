"use client";

import { AuthContext } from "@/contexts/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { SA2Provider } from "@/contexts/SA2Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Memories",
  description: "Created by Rotem Bar-Sela",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          `
        text-gray-700
      `,
          inter.className
        )}
      >
        <AuthContext>
          {/*<SA2Provider>*/}
          {children}
          {/*</AuthContext>*/}
        </AuthContext>
      </body>
    </html>
  );
}
