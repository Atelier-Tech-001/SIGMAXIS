// lib/magic.ts
import { Magic } from '@magic-sdk/admin';

let magic: Magic | null = null;

if (typeof window !== "undefined" && !magic) {
  magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);
}

export default magic;
