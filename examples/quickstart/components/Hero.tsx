"use client";

import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { PromoBanner } from "@/components/PromoBanner/PromoBanner";

export function Hero() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected && <PromoBanner />}

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto mt-28 text-center max-w-4xl px-4"
      >
        <h1 className="text-7xl font-bold text-zinc-100 drop-shadow-[0_0_25px_rgba(66,239,223,0.5)]">
          Instantes eternos en blockchain
        </h1>

        <p className="text-white opacity-70 text-lg mt-6">
          Asegurá tu segundo en la historia. Tu tiempo, tu token.
          <br />
          No necesitás saber de crypto. Conectá o ingresá como invitado.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-[#42efdf] text-black font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_#42efdf] transition-shadow">
            Conectá tu wallet
          </button>
          <button className="border border-[#42efdf] text-white px-6 py-3 rounded-xl hover:bg-[#42efdf33] transition-all">
            Ingresar como invitado
          </button>
        </div>
      </motion.section>
    </>
  );
}
