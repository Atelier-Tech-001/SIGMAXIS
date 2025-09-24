"use client";

import { useMagic } from "@/lib/context/MagicContextProvider";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CreateTimestampForm } from "@/components/ui/CreateTimestampForm";
import { Hero } from "@/components/ui/Hero";

export default function MintPage() {
  const { userEmail } = useMagic();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const isLoggedIn = !!userEmail || isConnected;

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG === "true") {
      console.log("[DEBUG] MintPage → userEmail:", userEmail);
      console.log("[DEBUG] MintPage → wallet address:", address);
    }
  }, [userEmail, address]);

  return (
    <main className="min-h-screen w-full px-3 md:px-0 text-white">
      {!isLoggedIn && <Hero />}
      {isLoggedIn && <CreateTimestampForm />}
    </main>
  );
}
// Si no está logueado, mostramos Hero (login)
// Si está logueado, mostramos CreateTimestampForm
// En CreateTimestampForm, al hacer mint, redirigimos a /dashboard  router.push('/dashboard');
