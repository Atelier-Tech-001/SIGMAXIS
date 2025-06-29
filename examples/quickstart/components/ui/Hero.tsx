/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAccount } from "wagmi";
import { PromoBanner } from "@/components/PromoBanner/PromoBanner";
//import { useSpring, animated } from "@react-spring/web"; 
import { EmailLoginModal } from "@/components/ui/email-login-modal";

export function Hero() {
  const { isConnected } = useAccount();

  /* // animación
  const fadeInUp = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 800, easing: t => 1 - Math.pow(1 - t, 3) }, // easeOut
  }); */

  return (
    <>
      {isConnected && <PromoBanner />}

      <section 
       // style={fadeInUp}  Aplica la animación
        className="relative mx-auto mt-28 text-center max-w-4xl px-4"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-zinc-100 drop-shadow-[0_0_25px_rgba(66,239,223,0.5)]">
          Instantes eternos en blockchain
        </h1>

        <p className="text-white opacity-70 text-lg mt-6 leading-relaxed">
          Asegurá tu segundo en la historia. Tu tiempo, tu token.
          <br />
          No necesitás saber de crypto. Conectá o ingresá como invitado.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary text-black font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_theme('colors.primary')] transition-shadow">
            Conectá tu wallet
          </button>
          <EmailLoginModal />
        </div>
      </section>
    </>
  );
}