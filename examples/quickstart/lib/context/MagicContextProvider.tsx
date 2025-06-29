"use client";

import { Magic } from "magic-sdk";
import { createContext, useContext, useEffect, useState } from "react";

const MagicContext = createContext<{
  magic: Magic | null;
  userEmail: string | null;
  loginWithEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  magic: null,
  userEmail: null,
  loginWithEmail: async () => {},
  logout: async () => {},
});

export const MagicContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const initMagic = async () => {
      const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string);
      setMagic(m);
    };

    initMagic();
  }, []);

  useEffect(() => {
    if (magic) {
      magic.user.getInfo().then((info) => {
        setUserEmail(info.email || null);
      });
    }
  }, [magic]);

  return (
    <MagicContext.Provider value={{ magic, userEmail }}>
      {children}
    </MagicContext.Provider>
  );
};

export const useMagic = () => useContext(MagicContext);
