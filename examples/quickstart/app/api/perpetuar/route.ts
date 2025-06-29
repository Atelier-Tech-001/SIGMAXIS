// /app/api/perpetuar/route.ts (si usás App Router)
import { magic } from "@/lib/magic";
import { NextRequest, NextResponse } from "next/server";

type Instante = {
  email: string;
  fecha: string;
  hora: string;
};

const instantes: Instante[] = []; // temporal

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const didToken = authHeader?.replace("Bearer ", "");

    if (!didToken) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const metadata = await magic.users.getMetadataByToken(didToken);

    if (!metadata?.email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const body = await req.json();
    const { fecha, hora } = body;

    instantes.push({ email: metadata.email, fecha, hora });

    return NextResponse.json({
      message: "Instante guardado",
      email: metadata.email,
    });
  } catch (error) {
    console.error("Error al guardar instante:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
