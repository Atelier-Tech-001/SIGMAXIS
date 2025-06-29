/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useMagicAuth } from "@/lib/hooks/useMagicAuth";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InstanteForm() {
  const { user, login, logout, perpetuar, isLoggedIn } = useMagicAuth();
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async () => {
    try {
      await login(email);
    } catch (err) {
      setMensaje("Error al iniciar sesión.");
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await perpetuar(fecha, hora);
      setMensaje("Instante guardado exitosamente.");
      console.log("Respuesta del backend:", result);
    } catch (err) {
      setMensaje("Error al guardar el instante.");
    }
  };

  return (
    <div className="p-6 bg-black text-white rounded-xl max-w-md w-full mx-auto border border-zinc-800">
      {!isLoggedIn ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Ingresá con tu email</h2>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={handleLogin}>Ingresar</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Hola, {user?.email}</h2>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="p-3 rounded bg-zinc-900 border border-zinc-700"
          />
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="p-3 rounded bg-zinc-900 border border-zinc-700"
          />
          <Button onClick={handleSubmit}>Guardar Instante</Button>
          <Button variant="ghost" onClick={logout} className="text-red-400">
            Cerrar sesión
          </Button>
        </div>
      )}

      {mensaje && <p className="mt-4 text-sm text-zinc-400">{mensaje}</p>}
    </div>
  );
}
