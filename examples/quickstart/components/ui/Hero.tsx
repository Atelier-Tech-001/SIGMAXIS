/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAccount } from "wagmi";
//import { useSpring, animated } from "@react-spring/web"; 

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
      <section 
       // style={fadeInUp}  Aplica la animación
        className="relative mx-auto mt-28 text-center max-w-4xl px-4"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-zinc-100 drop-shadow-[0_0_25px_rgba(66,239,223,0.5)]">
          Instantes eternos en blockchain
        </h1>

        <p className="text-white opacity-70 text-lg mt-6 leading-relaxed">
          Asegurá tu segundo antes del colapso. <br /> Tu tiempo, tu token.
          <br />
          No necesitás saber de crypto. Conectá o ingresá como invitado.
        </p>
      </section>
    </>
  );
}