"use client";

import { useState } from "react";
import { useUploadToIPFS } from "@/lib/hooks/useUploadToIPFS";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EstelarVisualization } from "@/components/visualizations/EstelarVisualization";
import { GlitchVisualization } from "@/components/visualizations/GlitchVisualization";
// import { QRVisualization } from "@/components/visualizations/QRVisualization";

export function CreateTimestampForm() {
  const { uploadFile } = useUploadToIPFS();
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [visual, setVisual] = useState("simple");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let fileUrl: string | null = null;

      if (file) {
        fileUrl = await uploadFile(file);
      }

      const metadata = {
        title: date || new Date().toISOString(),
        note,
        visual,
        fileUrl,
      };

      console.log("Metadata para acuñar NFT:", metadata);

      setPreview(JSON.stringify(metadata, null, 2));
    } catch (err) {
      console.error("Error creando instante:", err);
      alert("❌ Error al crear el instante.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-6 bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-700 mt-8"
        style={{
          fontFamily: "Roboto, sans-serif",
          maxWidth: "900px",
          margin: "0 auto",
          width: "900px",
          height: "450px",
        }}
      >
        {/* 📋 Formulario */}
        <div className="flex-1 flex flex-col gap-4" style={{ minWidth: "400px" }}>
          <h2 className="text-xl font-bold text-primary">
            Crea tu instante único
          </h2>

          <label className="flex flex-col gap-1">
            Fecha y Hora:
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
            />
          </label>

          <label className="flex flex-col gap-1">
            Nota (opcional):
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe algo sobre este instante..."
              className="p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
            />
          </label>

          <label className="flex flex-col gap-1">
            Visualización:
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full bg-black border border-[#42efdf] rounded p-2 text-white shadow-[0_0_10px_#42efdf] hover:shadow-[0_0_20px_#42efdf] transition-all duration-300">
                {visual === "simple"
                  ? "Visualización: Simple"
                  : `Visualización: ${visual}`}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black text-white border border-[#42efdf] rounded-lg shadow-[0_0_20px_#42efdf] w-[var(--radix-dropdown-menu-trigger-width)]">
                {["simple", "estelar", "glitch", "qr"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setVisual(option)}
                    className="w-full px-4 py-2 hover:bg-[#42efdf] hover:text-black cursor-pointer transition-colors duration-200 rounded text-center"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </label>

          {visual === "qr" && (
            <label className="flex flex-col gap-1">
              Archivo (Audio o Video):
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="file-input bg-black text-white border border-[#42efdf] rounded p-2 cursor-pointer
                file:text-white file:bg-[#42efdf] file:border-0 file:rounded-lg file:px-4 file:py-2
                hover:shadow-[0_0_20px_#42efdf] transition duration-300"
              />
            </label>
          )}
        </div>

        {/* 🎨 Visualización + Botón */}
        <div
          className="flex flex-col justify-between items-center gap-4"
          style={{ width: "400px", height: "100%" }}
        >
          {/* 🌌 Visualización dinámica */}
          <div
            className="w-full bg-zinc-800 rounded-xl border border-[#42efdf] shadow-[0_0_20px_#42efdf] p-2 flex items-center justify-center"
            style={{
              height: "300px",
            }}
          >
            {visual === "estelar" && <EstelarVisualization />}
            {visual === "glitch" && <GlitchVisualization />}
            {/* {visual === "qr" && <QRVisualization />} */}
            {visual === "simple" && (
              <p className="text-zinc-400">Selecciona una visualización…</p>
            )}
          </div>

          {/* ✅ Botón contextual */}
          <Button
            type="submit"
            className="w-full bg-[#42efdf] text-black hover:bg-[#2bdac8] shadow-[0_0_10px_#42efdf]"
          >
            Crear y acuñar instante
          </Button>
        </div>
      </form>

      {/* 📄 Metadata generada */}
      {preview && (
        <div className="w-full mt-6 bg-zinc-900 border border-[#42efdf] rounded-xl shadow-[0_0_20px_#42efdf] p-4 max-w-[900px] mx-auto">
          <h3 className="text-lg font-bold text-[#42efdf] mb-2">
            📄 Metadata generada:
          </h3>
          <pre className="text-sm text-white whitespace-pre-wrap break-words max-h-60 overflow-auto">
            {preview}
          </pre>
        </div>
      )}
    </>
  );
}
