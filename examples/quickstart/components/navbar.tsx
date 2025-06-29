"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatAddress } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function Navbar() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, chains } = useSwitchChain();

  const connector = connectors[0];

  return (
    <nav className="flex w-full px-3 md:px-0 h-fit py-10 justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-[#42efdf] text-3xl font-bold tracking-widest">
          ΣXIS
        </span>
        <span className="text-[#42efdf] text-lg font-mono tracking-tight">
          SIGMAXIS
        </span>
      </div>

      {isConnected ? (
        <div className="flex-col md:flex-row flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white h-fit md:px-3 py-2 rounded-2xl font-semibold flex justify-center  items-center gap-1">
              {chain?.name.split(" ").slice(0, 2).join(" ")} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full justify-center rounded-2xl">
              {chains.map(
                (c) =>
                  c.id !== chain?.id && (
                    <DropdownMenuItem
                      key={c.id}
                      onClick={() => switchChain({ chainId: c.id })}
                      className="cursor-pointer w-full flex justify-center rounded-2xl font-semibold"
                    >
                      {c.name}
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white h-fit px-7 py-2 rounded-2xl font-semibold flex items-center gap-1">
              {formatAddress(address)} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full flex justify-center rounded-2xl">
              <DropdownMenuItem
                onClick={() => disconnect()}
                className="text-red-400 cursor-pointer w-full flex justify-center rounded-2xl font-semibold"
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          className="bg-black text-white px-8 py-2 rounded-xl font-semibold shadow-[0_0_10px_#42efdf,0_0_20px_#42efdf] hover:shadow-[0_0_15px_#42efdf,0_0_30px_#42efdf] transition-shadow duration-300"
          onClick={() => connect({ connector })}
        >
          Connect Wallet
        </Button>
      )}
    </nav>
  );
}
