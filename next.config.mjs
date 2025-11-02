/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [new URL('https://ar-cade-fe.vercel.app/**')],
   },
};

export default nextConfig;
