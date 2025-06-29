/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/ui/Hero";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
    setIsReady(true);
  }, []);

  return (
    <main className="min-h-screen w-full px-3 md:px-0 text-white">
      <div className="flex flex-col gap-8 items-center sm:items-start w-full">
        <Hero />
        {userEmail ? (
          <p className="text-xl">
            Hola <span className="text-primary">{userEmail}</span>, ya estás logueado.
          </p>
        ) : null}
      </div>
      {!userEmail && isReady && (
        <footer
      className="fixed bottom-4 left-0 w-full flex justify-center pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <p className="text-zinc-500 text-sm bg-black/60 px-4 py-2 rounded-lg pointer-events-auto shadow">
        No estás logueado aún.
      </p>
    </footer>
      )}
    </main>
  );
}
