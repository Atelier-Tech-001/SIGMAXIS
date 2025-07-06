"use client";

import { useMagic } from "@/lib/context/MagicContextProvider";
import { Hero } from "@/components/ui/Hero";
import { CreateTimestampForm } from "@/components/ui/CreateTimestampForm";

export default function Home() {
  const { userEmail } = useMagic();
  const isLoggedIn = !!userEmail;

  return (
    <main className="min-h-screen w-full px-3 md:px-0 text-white">
      <div className="flex flex-col gap-8 items-center sm:items-start w-full">
        {/* 👇 Si no está logueado, mostramos Hero con botones de login */}
        {!isLoggedIn && <Hero />}

        {/* 👇 Si está logueado, mostramos el formulario de timestamp */}
        {isLoggedIn && <CreateTimestampForm />}
      </div>

      {/* Footer solo visible si no está logueado */}
      {!isLoggedIn && (
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
