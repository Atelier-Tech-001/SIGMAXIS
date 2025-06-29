/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import Image from "next/image";
import { useAccount } from "wagmi";

export function PromoBanner() {
  const { isConnected } = useAccount();
  const now = new Date();
  const formatted = now.toLocaleTimeString(); // "12:21:11"
  const fullDate = now.toLocaleDateString(); // "19/01/1980"
  const timestamp = now.getTime(); // 317143271
 
  return (
    <section className="relative mx-auto mt-20 sm:mt-24 md:mt-32 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 max-w-5xl">
      {/* {isConnected && <PromoBanner />} */}

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold drop-shadow-[0_0_25px_rgba(66,239,223,0.6)] leading-tight md:leading-[1.15]">
        Comprá tu instante eterno
      </h1>

      <p className="text-white opacity-80 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-2xl">
        Detenelo. El <strong>{fullDate}</strong> a las{" "}
        <strong>{formatted}</strong> puede ser tuyo, para siempre.
      </p>

      <p className="text-xs sm:text-sm text-white opacity-50 mt-2">
        UNIX timestamp: {timestamp}
      </p>

      <Image
        src="/arrow.svg"
        alt="Arrow pointing to the connect wallet button"
        className="absolute scale-y-[-1] hidden md:block md:bottom-[-111px] md:left-[400px]"
        width={130}
        height={130}
      />
    </section>
  );
}
