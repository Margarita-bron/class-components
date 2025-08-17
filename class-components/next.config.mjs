import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
  distDir: './dist',
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
