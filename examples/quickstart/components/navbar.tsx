"use client";

import { useMagic } from "@/lib/context/MagicContextProvider";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmailLoginModal } from "@/components/ui/EmailLoginModal";
import { Menu, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { userEmail, logout: logoutMagic } = useMagic();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const connector = connectors[0];

  const isLoggedIn = !!userEmail || isConnected;

  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b border-zinc-800">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-[#42efdf] text-3xl font-bold tracking-widest">
          ΣXIS
        </span>
        <span className="text-[#42efdf] text-lg font-mono tracking-tight">
          SIGMAXIS
        </span>
      </div>

      <div className="flex gap-3 items-center">
        {/* ✅ Menú hamburguesa si está logueado */}
        {isLoggedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-black text-white border-zinc-700 hover:bg-zinc-800"
              >
                <Menu className="h-5 w-5" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white border border-zinc-700 rounded-lg p-2 w-48">
              <DropdownMenuItem
                onClick={() => router.push("/perfil")}
                className="cursor-pointer hover:bg-zinc-800 rounded-md px-3 py-2"
              >
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer hover:bg-zinc-800 rounded-md px-3 py-2"
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/mapa")}
                className="cursor-pointer hover:bg-zinc-800 rounded-md px-3 py-2"
              >
                Mapa
              </DropdownMenuItem>

              <div className="border-t border-zinc-700 my-2" />

              {userEmail && (
                <DropdownMenuItem
                  onClick={logoutMagic}
                  className="text-magenta-400 hover:bg-magenta-500 hover:text-black rounded-md px-3 py-2 cursor-pointer"
                >
                  Logout Magic
                </DropdownMenuItem>
              )}
              {isConnected && (
                <DropdownMenuItem
                  onClick={() => disconnect()}
                  className="text-orange-400 hover:bg-orange-500 hover:text-black rounded-md px-3 py-2 cursor-pointer"
                >
                  Disconnect Wallet
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* ✅ Botones de login si no hay sesión */}
        {!isLoggedIn && (
          <>
            <EmailLoginModal redirectTo="/mint" />
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
