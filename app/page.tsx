"use client";

import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [authVariant, setAuthVariant] = useState<AuthVariant>("LOGIN");

  return (
    <main className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="mx-auto w-full max-w-md">
        <Image
          alt="logo"
          width={48}
          height={48}
          className="mx-auto w-auto"
          src="/assets/images/diary.png"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {authVariant === "REGISTER"
            ? "Sign up to Memories"
            : "Sign in to your account"}
        </h2>
      </div>
      <AuthForm variant={authVariant} setVariant={setAuthVariant} />
    </main>
  );
}
