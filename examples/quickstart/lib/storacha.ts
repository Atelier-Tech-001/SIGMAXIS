// lib/storacha.ts
import * as Client from "@storacha/client";

async function getClient() {
  const token = process.env.STORACHA_API_KEY;
  if (!token) throw new Error("Falta STORACHA_API_KEY en .env.local");

  return await Client.create();
}

/**
 * Sube un objeto JSON a IPFS usando Storacha
 * @param data Contenido JSON a guardar
 * @param filename Nombre del archivo (por defecto metadata.json)
 */
export async function storeJSON(data: any, filename = "metadata.json") {
  const client = await getClient();
  const file = new File([JSON.stringify(data)], filename, {
    type: "application/json",
  });

  const root = await client.uploadFile(file);
  return {
    cid: root,
    url: `https://storacha.link/ipfs/${root}/${filename}`,
  };
}

/**
 * Sube un archivo binario (audio, video, imagen) a IPFS usando Storacha
 * @param file Blob o File
 * @param filename Nombre del archivo
 */
export async function storeFile(file: Blob, filename: string) {
  const client = await getClient();
  const wrappedFile = new File([file], filename, { type: (file as any).type });

  const root = await client.uploadFile(wrappedFile);
  return {
    cid: root,
    url: `https://storacha.link/ipfs/${root}/${filename}`,
  };
}
