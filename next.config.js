/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode to highlight potential problems in the app

  // Environment Variables (from .env.local)
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },

  // Image optimization settings (optional)
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary to optimize images
  },

  // Custom Webpack configuration (if needed)
  webpack(config, { isServer }) {
    // Example: Adding a custom alias
    config.resolve.alias['@components'] = path.join(__dirname, 'components');

    // If you want to enable specific server-side features like WebSocket, you can tweak settings here
    if (!isServer) {
      config.node = {
        fs: 'empty', // Example: fix for issues with certain Node.js modules in client-side code
      };
    }

    return config;
  },

  // Redirects (optional)
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
    ];
  },

  // Rewrites (optional)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://your-backend-url.com/api/:path*', // Proxy API requests to another server
      },
    ];
  },

  // Custom headers (optional)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Custom-Header',
            value: 'My custom header value',
          },
        ],
      },
    ];
  },
};

// Access environment variables for Cloudinary configuration
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;

module.exports = nextConfig;
