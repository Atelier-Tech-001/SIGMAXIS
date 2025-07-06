"use client";

import { useMagic } from "@/lib/context/MagicContextProvider";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatAddress } from "@/lib/utils";
import { EmailLoginModal } from "@/components/ui/EmailLoginModal";
import { ChevronDown } from "lucide-react";

export function Navbar() {
  const { userEmail, logout: logoutMagic } = useMagic();
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, chains } = useSwitchChain();

  const connector = connectors[0];

  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b border-zinc-800">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-[#42efdf] text-3xl font-bold tracking-widest">
          ΣXIS
        </span>
        <span className="text-[#42efdf] text-lg font-mono tracking-tight">
          SIGMAXIS
        </span>
      </div>

      <div className="flex gap-3 items-center">
        {/* Si está logueado por Magic */}
        {userEmail && (
          <>
            <span className="text-sm text-primary">{userEmail}</span>
            <Button
              variant="outline"
              onClick={logoutMagic}
              className="bg-black text-magenta-400 border-magenta-400 
                hover:bg-magenta-500 hover:text-black 
                shadow-[0_0_10px_#ff00ff,0_0_20px_#ff00ff] 
                transition-all duration-300"
            >
              Logout Magic
            </Button>
          </>
        )}

        {/* Si está conectado por wallet */}
        {isConnected && !userEmail && (
          <div className="flex-col md:flex-row flex gap-2">
            {/* Selector de red */}
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

            {/* Dirección + logout */}
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-white h-fit px-7 py-2 rounded-2xl font-semibold flex items-center gap-1">
                {formatAddress(address)} <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full flex justify-center rounded-2xl">
                <DropdownMenuItem
                  onClick={() => disconnect()}
                  className="bg-black text-orange-400 
                    hover:bg-orange-500 hover:text-black 
                    shadow-[0_0_10px_#ff9900,0_0_20px_#ff9900] 
                    cursor-pointer w-full flex justify-center rounded-2xl font-semibold transition-all duration-300"
                >
                  Disconnect Wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Si no hay sesión */}
        {!userEmail && !isConnected && (
          <>
            <EmailLoginModal />
            <Button
              className="bg-black text-white px-6 py-2 rounded-xl font-semibold shadow-[0_0_10px_#42efdf,0_0_20px_#42efdf] hover:shadow-[0_0_15px_#42efdf,0_0_30px_#42efdf] transition-shadow duration-300"
              onClick={() => connect({ connector })}
            >
              Connect Wallet
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
