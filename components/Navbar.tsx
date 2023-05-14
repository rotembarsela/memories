"use client";

import { Button } from "@/features/button";
import { ToastError } from "@/features/toast";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { push } = useRouter();

  const handleSignout = async () => {
    try {
      const data = await signOut({ redirect: false, callbackUrl: "/" });
      ToastError("Logged out");
      push(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-16 max-w-5xl mx-auto">
      <nav className="flex flex-row justify-center items-center gap-10 h-full">
        <Link href="/">Memories</Link>
        <ul className="flex-1">
          <li>hello</li>
        </ul>
        <Button type="button" onClick={() => handleSignout()}>
          Logout
        </Button>
      </nav>
    </div>
  );
}
