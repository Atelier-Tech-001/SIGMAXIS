"use client";

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { timestampAbi } from "@/lib/contracts/timestampAbi";
import { Address } from "viem";
import { useMemo } from "react";

export function useMintTimestamp() {
  const { address } = useAccount();
  const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address;

  const {
    writeContractAsync,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const canMint = useMemo(() => Boolean(address && contractAddress), [address, contractAddress]);

  // Intenta mintWithURI(to, uri), si falla por "function not found", intenta safeMint(to, uri)
  const mintWithTokenURI = async (tokenURI: string) => {
    if (!address) throw new Error("Conecta tu wallet");
    if (!contractAddress) throw new Error("Falta NEXT_PUBLIC_NFT_CONTRACT_ADDRESS");

    try {
      // 1) Intento con mintWithURI
      return await writeContractAsync({
        address: contractAddress,
        abi: timestampAbi,
        functionName: "mintWithURI",
        args: [address, tokenURI],
      });
    } catch (err: any) {
      const msg = String(err?.message || "");
      const notFound =
        msg.includes("function selector") ||
        msg.includes("execution reverted") ||
        msg.includes("is not a function") ||
        msg.includes("Function does not exist");

      if (!notFound) throw err;

      // 2) Intento con safeMint
      return await writeContractAsync({
        address: contractAddress,
        abi: timestampAbi,
        functionName: "safeMint",
        args: [address, tokenURI],
      });
    }
  };

  return {
    address,
    canMint,
    mintWithTokenURI,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    writeError,
  };
}
