/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: [
      "@react-three/drei",
      "framer-motion",
      "react-icons",
      "lucide-react",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
