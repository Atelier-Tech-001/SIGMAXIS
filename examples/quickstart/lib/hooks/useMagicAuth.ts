import { Magic } from "magic-sdk";
import { useState } from "react";

const magic = typeof window !== "undefined" ? new Magic("pk_live_C8B2BE92F8C44F23") : null;

export const useMagicAuth = () => {
  const [user, setUser] = useState<null | { email: string }>(null);

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

  return {
    user,
    login,
    logout,
    isLoggedIn: !!user,
  };
};
