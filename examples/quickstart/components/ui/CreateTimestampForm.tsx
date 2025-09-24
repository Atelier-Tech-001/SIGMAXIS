"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Web3Storage } from "web3.storage";
import { useMintTimestamp } from "@/lib/hooks/useMintTimestamp";
import { Button } from "@/components/ui/button";

export function CreateTimestampForm() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { mintNFT } = useMintTimestamp();

  const handleMint = async () => {
    try {
      setStatus("⏳ Capturando preview...");
      if (!previewRef.current) throw new Error("previewRef no encontrado");

      // Screenshot con html2canvas
      const canvas = await html2canvas(previewRef.current);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      if (!blob) throw new Error("No se pudo generar blob PNG");

      const file = new File([blob], "timestamp.png", { type: "image/png" });

      // Web3.Storage client
      const client = new Web3Storage({
        token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
      });

      setStatus("⬆️ Subiendo imagen a IPFS...");
      const imageCid = await client.put([file]);
      const imageUrl = `ipfs://${imageCid}/timestamp.png`;

      // Metadata JSON
      const metadata = {
        name: "Instantáneo Singular",
        description: note || "Un instante único en el tiempo.",
        image: imageUrl,
        attributes: [{ trait_type: "fecha", value: new Date().toISOString() }],
      };

      const metadataFile = new File(
        [JSON.stringify(metadata)],
        "metadata.json",
        { type: "application/json" }
      );

      setStatus("⬆️ Subiendo metadata a IPFS...");
      const metadataCid = await client.put([metadataFile]);
      const metadataUrl = `ipfs://${metadataCid}/metadata.json`;

      setStatus("🚀 Ejecutando mint...");
      const tx = await mintNFT(metadataUrl);
      setStatus(`✅ NFT minteado! TxHash: ${tx}`);
    } catch (err) {
      console.error("[DEBUG] Error en handleMint:", err);
      setStatus("❌ Error en el proceso. Revisá consola.");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div
        ref={previewRef}
        className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl w-full max-w-lg text-center"
      >
        <h1 className="text-2xl font-bold text-primary">Crear Instante</h1>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escribe tu nota..."
          className="w-full mt-4 p-3 bg-black border border-zinc-700 rounded-md text-white"
        />
        <h2 className="text-sm text-zinc-400 mt-2">Vista previa aquí abajo 👇</h2>
      </div>

      <Button
        onClick={handleMint}
        className="bg-primary text-black hover:bg-[#2bdac8]"
      >
        Mintear Instante
      </Button>

      {status && <p className="text-sm text-zinc-400">{status}</p>}
    </div>
  );
}
// Al mintear, capturamos screenshot del div previewRef con html2canvas