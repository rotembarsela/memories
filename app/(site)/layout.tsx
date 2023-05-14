"use client";

import { Fragment, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Memories",
  description: "Created by Rotem Bar-Sela",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (!user) {
      push("/");
    }
  }, [push]);

  return (
    <Fragment>
      <Navbar />
      <main className="min-h-[calc(100%-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        {children}
      </main>
    </Fragment>
  );
}
