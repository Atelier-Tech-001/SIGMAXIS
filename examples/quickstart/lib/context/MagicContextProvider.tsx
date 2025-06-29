"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";

type User = { email: string } | null;

interface MagicContextType {
  user: User;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  getToken: () => Promise<string | null>;
}

const MagicContext = createContext<MagicContextType | undefined>(undefined);

const magic =
  typeof window !== "undefined"
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!)
    : null;

export const MagicContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (!magic) return;
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const metadata = await magic.user.getInfo();
        setUser({ email: metadata.email || "" });
      }
    };
    checkUser();
  }, []);

  const login = async (email: string) => {
    if (!magic) return;
    await magic.auth.loginWithEmailOTP({ email });
    const metadata = await magic.user.getInfo();
    setUser({ email: metadata.email || "" });
  };

  const logout = async () => {
    if (!magic) return;
    await magic.user.logout();
    setUser(null);
  };

  const getToken = async () => {
    if (!magic) return null;
    return await magic.user.getIdToken();
  };

  return (
    <MagicContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
        getToken,
      }}
    >
      {children}
    </MagicContext.Provider>
  );
};

export const useMagic = () => {
  const context = useContext(MagicContext);
  if (!context) {
    throw new Error("useMagic must be used within MagicContextProvider");
  }
  return context;
};
