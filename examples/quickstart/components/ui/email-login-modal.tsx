/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Magic } from "magic-sdk";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MailIcon } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export function EmailLoginModal() {
  const [email, setEmail] = useState("");
  const magic =
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!magic) return;
  
    try {
      const didToken = await magic.auth.loginWithEmailOTP({ email });
      const metadata = await magic.user.getInfo();
  
      console.log("Metadata:", metadata);
      router.refresh(); // router.push si querés redireccionar
    } catch (err) {
      console.error("Login error", err);
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-primary hover:text-white">
          <MailIcon className="mr-2 h-4 w-4" />
          Ingresar sin wallet
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black text-white border border-zinc-800 shadow-[0_0_30px_#42efdf33] backdrop-blur-md">
        <DialogTitle className="text-xl font-semibold text-primary mb-2">
          Accedé con tu email
        </DialogTitle>
        <p className="text-sm text-zinc-400 mb-6">
          Te generamos una wallet efímera para que puedas comprar tu instante.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-primary"
          />

          <Button
            type="submit"
            className="bg-primary text-black hover:bg-[#2bdac8]"
          >
            Crear acceso y continuar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
