"use client";

import { useState } from "react";
import { useMagicAuth } from "@/lib/hooks/useMagicAuth";

export function EmailLogin() {
  const [email, setEmail] = useState("");
  const { login, user, logout, isLoggedIn } = useMagicAuth();

  return (
    <div className="text-white text-center">
      {!isLoggedIn ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await login(email);
          }}
          className="space-y-4"
        >
          <input
            type="email"
            className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white"
            placeholder="Ingresá tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#42efdf] text-black px-4 py-2 rounded-lg shadow-lg hover:bg-cyan-300 transition"
          >
            Recibir acceso
          </button>
        </form>
      ) : (
        <div>
          <p className="mb-2">Sesión iniciada como <strong>{user?.email}</strong></p>
          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
