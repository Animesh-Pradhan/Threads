/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            serverComponentsExternalPackages: ["mongoose"],
        },
    },
};

module.exports = nextConfig;