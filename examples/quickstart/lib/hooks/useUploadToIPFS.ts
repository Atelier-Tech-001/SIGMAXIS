// lib/hooks/useUploadToIPFS.ts
import * as Client from "@storacha/client";

export const useUploadToIPFS = () => {
  const uploadFile = async (file: File) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("📦 Mock upload activo. No se está subiendo a IPFS.");
      const fakeCid = "bafybeifakecid1234567890";
      return `https://${fakeCid}.ipfs.mock/${file.name}`;
    }

    try {
      const token = process.env.NEXT_PUBLIC_STORACHA_API_KEY as string;
      if (!token) throw new Error("Falta NEXT_PUBLIC_STORACHA_API_KEY en .env.local");

      const client = await Client.create();
      const root = await client.uploadFile(file);

      console.log("✅ Archivo subido a IPFS CID:", root);
      return `https://storacha.link/ipfs/${root}/${file.name}`;
    } catch (err) {
      console.error("❌ Error subiendo a IPFS:", err);
      throw err;
    }
  };

  return { uploadFile };
};
