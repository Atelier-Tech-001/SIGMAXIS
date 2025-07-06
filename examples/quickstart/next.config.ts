import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || "pk_live_C8B2BE92F8C44F23"
  },
  images: {
    domains: ["ipfs.io", "w3s.link"], // añade tus dominios de imágenes si es necesario
  }
};

export default nextConfig;
