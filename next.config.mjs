/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    // Product/blog images are served directly from MinIO (already
    // web-sized). Next's image optimizer proxies through a fetch that
    // refuses loopback/private-IP upstreams (SSRF protection) — correct
    // behavior, but it means it can never reach a same-host MinIO in dev,
    // and would need reconfiguring per deployment anyway. Serving
    // unoptimized sidesteps both issues without needing remotePatterns.
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/price-match", destination: "/pricelist", permanent: true },
    ];
  },
};

export default nextConfig;
