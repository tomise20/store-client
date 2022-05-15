/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com', 'localhost'],
    },
    reactStrictMode: true,
    publicRuntimeConfig: {
        backendUrl: process.env.BACKEND_URL,
    },
    assetPrefix: isProd ? 'tomise20' : '',
};

module.exports = nextConfig;

