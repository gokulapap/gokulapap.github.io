/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so the site can be hosted on GitHub Pages.
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // next/image optimization is disabled because GitHub Pages serves
    // pure static files with no Next.js runtime.
    unoptimized: true,
  },
};

export default nextConfig;
