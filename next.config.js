/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com', 'localhost'],
    },
    reactStrictMode: true,
    publicRuntimeConfig: {
        backendUrl: process.env.BACKEND_URL,
        apiToken: process.env.API_TOKEN,
    },
};

module.exports = nextConfig;

