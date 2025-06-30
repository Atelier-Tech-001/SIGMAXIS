/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Magic } from "magic-sdk";
import { createContext, useContext, useEffect, useState } from "react";

const MagicContext = createContext<{
  magic: Magic | null;
  userEmail: string | null;
  loginWithEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: () => Promise<boolean>;
}>({
  magic: null,
  userEmail: null,
  loginWithEmail: async () => {},
  logout: async () => {},
  isLoggedIn: async () => false,
});

const MagicContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const initMagic = async () => {
      const m = new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string
      );
      setMagic(m);
    };

    initMagic();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      if (!magic) return;
  
      const loggedIn = await magic.user.isLoggedIn();
      if (!loggedIn) return;
  
      try {
        const info = await magic.user.getInfo();
        setUserEmail(info.email || null);
        if (info.email) localStorage.setItem("userEmail", info.email);
      } catch (error) {
        console.error("Error al obtener metadata del usuario:", error);
      }
    };
  
    checkSession();
  }, [magic]);

  // ✅ Función para login con email
  const loginWithEmail = async (email: string) => {
    if (!magic) return;

    try {
      // Inicia sesión con el código OTP que Magic envía al email
      const didToken = await magic.auth.loginWithEmailOTP({ email });

      // Obtiene la metadata del usuario logueado
      const metadata = await magic.user.getInfo();

      console.log("Metadata:", metadata);

      // Guarda el email en el estado y en localStorage
      setUserEmail(metadata.email || null);
      if (metadata.email) localStorage.setItem("userEmail", metadata.email);
    } catch (err) {
      console.error("Error al loguear con Magic:", err);
    }
  };

  // ✅ Función para logout
  const logout = async () => {
    if (!magic) return;
  
    try {
      const loggedIn = await magic.user.isLoggedIn();
      if (!loggedIn) {
        console.warn("No hay sesión activa.");
        return;
      }
  
      await magic.user.logout();
      setUserEmail(null);
      localStorage.removeItem("userEmail");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };
  

  const isLoggedIn = async () => {
    if (!magic) return false;
    try {
      return await magic.user.isLoggedIn();
    } catch {
      return false;
    }
  };

  return (
    <MagicContext.Provider
      value={{ magic, userEmail, loginWithEmail, logout, isLoggedIn }}
    >
      {children}
    </MagicContext.Provider>
  );
};

const useMagic = () => useContext(MagicContext);

const useIsAuthenticated = () => {
  const { userEmail } = useMagic();
  return !!userEmail;
};

export { MagicContextProvider, useMagic, useIsAuthenticated };
