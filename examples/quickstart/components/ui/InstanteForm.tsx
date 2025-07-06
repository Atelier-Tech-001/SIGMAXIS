/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMagic } from "@/lib/context/MagicContextProvider";
import { useUploadToIPFS } from "@/lib/hooks/useUploadToIPFS";

export default function InstanteForm() {
  const { userEmail, logout } = useMagic();
  const { uploadFile } = useUploadToIPFS();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fecha || !hora) {
      setMensaje("Por favor completa la fecha y hora.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      let fileUrl = "";
      if (archivo) {
        fileUrl = await uploadFile(archivo);
      }

      console.log("📦 Datos:", { fecha, hora, archivo: fileUrl });
      setMensaje("✅ Instante guardado exitosamente.");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al guardar el instante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-black text-white rounded-xl max-w-md w-full mx-auto border border-zinc-800">
      <h2 className="text-lg font-semibold mb-2">
        Hola, <span className="text-primary">{userEmail}</span>
      </h2>
      <p className="text-sm text-zinc-400 mb-4">
        Crea un instante único y opcionalmente sube un archivo multimedia.
      </p>

      <div className="flex flex-col gap-4">
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
        <input
          type="file"
          onChange={(e) => setArchivo(e.target.files?.[0] || null)}
          className="p-3 rounded bg-zinc-900 border border-zinc-700 text-sm"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Instante"}
        </Button>
        <Button
          variant="ghost"
          onClick={logout}
          className="text-red-400"
        >
          Cerrar sesión
        </Button>
      </div>

      {mensaje && (
        <p className="mt-4 text-sm text-zinc-400">{mensaje}</p>
      )}
    </div>
  );
}
