"use client";

import { useState } from "react";
import { useUploadToIPFS } from "@/lib/hooks/useUploadToIPFS";
import { storeJSON } from "@/lib/storacha";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EstelarVisualization } from "@/components/visualizations/EstelarVisualization";
import { GlitchVisualization } from "@/components/visualizations/GlitchVisualization";
import { useMintTimestamp } from "@/lib/hooks/useMintTimestamp";
import { useAccount } from "wagmi";

export function CreateTimestampForm() {
  const { uploadFile } = useUploadToIPFS();
  const { address, canMint, mintWithTokenURI, hash, isPending, isConfirming, isConfirmed, writeError } =
    useMintTimestamp();
  const { isConnected } = useAccount();

  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [visual, setVisual] = useState("simple");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStatus("Subiendo archivo (si hay) a IPFS…");
      let fileUrl: string | null = null;

      if (visual === "qr" && file) {
        fileUrl = await uploadFile(file);
      }

      // Metadata ERC-721: agregar atributos 
      const metadata: any = {
        name: date || new Date().toISOString(),
        description: note || "Instante único en SIGMAXIS",
        image: undefined as string | undefined, // si generás una imagen previa, setéala aquí (ipfs://...)
        external_url: "https://sigmaxis.app",   // opcional
        attributes: [
          { trait_type: "visual", value: visual },
          ...(fileUrl ? [{ trait_type: "content", value: fileUrl }] : []),
        ],
      };

      setPreview(JSON.stringify(metadata, null, 2));

      setStatus("Subiendo metadata.json a IPFS…");
      const { url: metadataUrl } = await storeJSON(metadata, "metadata.json");

      // Usamos gateway https. onchain debe ir ipfs://cid (opcional):
      // const tokenURI = metadataUrl.replace("https://w3s.link/ipfs/", "ipfs://");
      const tokenURI = metadataUrl;

      setStatus("Firmando y enviando transacción de acuñado…");
      await mintWithTokenURI(tokenURI);

      setStatus("Transacción enviada. Esperando confirmación…");
    } catch (err) {
      console.error("Error en creación/mint:", err);
      setStatus(`❌ Error: ${String((err as Error).message || err)}`);
      return;
    }
  };

  const explorer =
    process.env.NEXT_PUBLIC_CHAIN_ID === "11155111"
      ? "https://sepolia.etherscan.io/tx/"
      : "https://etherscan.io/tx/";

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
          <h2 className="text-xl font-bold text-primary">Crea tu instante único</h2>

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
                {visual === "simple" ? "Visualización: Simple" : `Visualización: ${visual}`}
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
            style={{ height: "300px" }}
          >
            {visual === "estelar" && <EstelarVisualization />}
            {visual === "glitch" && <GlitchVisualization />}
            {visual === "simple" && <p className="text-zinc-400">Selecciona una visualización…</p>}
          </div>

          <Button
            type="submit"
            disabled={!isConnected || !canMint || isPending || isConfirming}
            className="w-full bg-[#42efdf] text-black hover:bg-[#2bdac8] shadow-[0_0_10px_#42efdf]"
            title={!isConnected ? "Conecta tu wallet" : ""}
          >
            {isPending || isConfirming ? "Acuñando…" : "Crear y acuñar instante"}
          </Button>
        </div>
      </form>

      {/* 📄 Estado / Preview */}
      <div className="w-full mt-6 max-w-[900px] mx-auto grid gap-4">
        {status && (
          <div className="bg-zinc-900 border border-[#42efdf] rounded-xl shadow-[0_0_20px_#42efdf] p-4">
            <p className="text-sm">{status}</p>
            {hash && (
              <p className="text-sm mt-2">
                TX:{" "}
                <a
                  className="text-[#42efdf] underline"
                  href={`${explorer}${hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {hash}
                </a>
              </p>
            )}
            {writeError && <p className="text-red-400 mt-2">Error: {String(writeError.message)}</p>}
            {isConfirmed && <p className="text-green-400 mt-2">✅ ¡Acuñado con éxito!</p>}
          </div>
        )}

        {preview && (
          <div className="bg-zinc-900 border border-[#42efdf] rounded-xl shadow-[0_0_20px_#42efdf] p-4">
            <h3 className="text-lg font-bold text-[#42efdf] mb-2">📄 Metadata generada:</h3>
            <pre className="text-sm text-white whitespace-pre-wrap break-words max-h-60 overflow-auto">
              {preview}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}
