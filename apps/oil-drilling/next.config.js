/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  // Ensure proper module resolution
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
