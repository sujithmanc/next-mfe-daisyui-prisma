/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    reactRoot: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
