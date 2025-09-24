"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Magic } from "magic-sdk";

type MagicContextType = {
  userEmail: string | null;
  loginWithEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const MagicContext = createContext<MagicContextType | undefined>(undefined);

export function MagicContextProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const loginWithEmail = async (email: string) => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string);
    await magic.auth.loginWithEmailOTP({ email });
    setUserEmail(email);
  };

  const logout = async () => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string);
    await magic.user.logout();
    setUserEmail(null);
  };

  return (
    <MagicContext.Provider value={{ userEmail, loginWithEmail, logout }}>
      {children}
    </MagicContext.Provider>
  );
}

export const useMagic = () => {
  const ctx = useContext(MagicContext);
  if (!ctx) throw new Error("useMagic debe usarse dentro de MagicContextProvider");
  return ctx;
};
