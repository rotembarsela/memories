import "./globals.css";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>
        <main className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}
