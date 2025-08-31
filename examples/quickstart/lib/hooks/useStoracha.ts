// lib/hooks/useStoracha.ts
import * as Client from "@storacha/client";

async function makeStorachaClient() {
  const token = process.env.STORACHA_API_KEY;
  if (!token) throw new Error("Falta STORACHA_API_KEY en .env.local");
  return await Client.create();
}

/**
 * Guarda metadata de NFT en IPFS vía Storacha
 * @param metadata Objeto con metadata NFT
 */
export async function storeNFTMetadata(metadata: object) {
  const client = await makeStorachaClient();
  const file = new File([JSON.stringify(metadata)], "metadata.json", {
    type: "application/json",
  });

  const root = await client.uploadFile(file);
  console.log("📦 Guardado en Storacha con CID:", root);
  return root;
}
/**
 * Guarda un archivo (imagen, audio, video) en IPFS vía Storacha
 * @param file Blob o File
 * @param filename Nombre del archivo
 */