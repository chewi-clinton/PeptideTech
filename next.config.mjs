const minioPublicUrl = process.env.NEXT_PUBLIC_MINIO_URL || "http://localhost:13002";
const minioUrl = new URL(minioPublicUrl);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: minioUrl.protocol.replace(":", ""),
        hostname: minioUrl.hostname,
        port: minioUrl.port,
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "13002",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
