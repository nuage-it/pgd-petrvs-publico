import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/pgd-petrvs-publico' : '';

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Turbopack configuration (Next.js 16+ default bundler)
  turbopack: {
    resolveAlias: {
      // Alias html2canvas to html2canvas-pro to support modern CSS color functions
      // (lab, oklch, oklab) used by Tailwind CSS v4
      'html2canvas': 'html2canvas-pro'
    }
  },
  // Webpack configuration (for compatibility/fallback)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'html2canvas': 'html2canvas-pro'
    }
    return config
  }
};

export default nextConfig;
