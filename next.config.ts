import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'https://preview-chat-2cada540-573c-4885-a799-3cd88bcdc52e.space-z.ai',
    'https://preview-2cada540-573c-4885-a799-3cd88bcdc52e.space.chatglm.site',
  ],
};

export default nextConfig;
