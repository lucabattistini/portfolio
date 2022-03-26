/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src/app', 'src/common', 'src/components', 'src/features', 'src/lib', 'src/pages'],
  },
};

module.exports = nextConfig;
