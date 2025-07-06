/* import { Web3Storage } from "web3.storage";

export const useUploadToIPFS = () => {
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
  });

  const uploadFile = async (file: File) => {
    try {
      const cid = await client.put([file], {
        wrapWithDirectory: false,
      });
      console.log("Archivo subido a IPFS CID:", cid);
      return `https://${cid}.ipfs.w3s.link/${file.name}`;
    } catch (err) {
      console.error("Error subiendo a IPFS:", err);
      throw err;
    }
  };

  return { uploadFile };
};
 */

// lib/hooks/useUploadToIPFS.ts

export const useUploadToIPFS = () => {
  const uploadFile = async (file: File) => {
    console.warn("📦 Mock upload activo. No se está subiendo a IPFS.");
    // Simula un CID falso para desarrollo
    const fakeCid = "bafybeifakecid1234567890";
    return `https://${fakeCid}.ipfs.mock/${file.name}`;
  };

  return { uploadFile };
};
