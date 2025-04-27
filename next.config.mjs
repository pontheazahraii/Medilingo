/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Content-Range",
            value: "bytes : 0-9/*",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Add webpack configuration to handle clerk imports
  webpack: (config, { isServer, dev }) => {
    // Only apply in development mode
    if (dev) {
      // Add resolver aliases for clerk and database
      config.resolve.alias = {
        ...config.resolve.alias,
        '@clerk/nextjs': process.cwd() + '/lib/clerk-mock.ts',
        './queries': process.cwd() + '/db/mock-queries.ts',
        '@/db/queries': process.cwd() + '/db/mock-queries.ts',
        '@/lib/stripe': process.cwd() + '/lib/stripe-mock.ts',
      };
    }
    return config;
  },
};

export default nextConfig;
