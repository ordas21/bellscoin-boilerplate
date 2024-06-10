/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
    unoptimized: true
    },
    images: {
        domains: ['storage.googleapis.com', 'pbs.twimg.com', 'bellscoin.com' ],
    },
};

export default nextConfig;
