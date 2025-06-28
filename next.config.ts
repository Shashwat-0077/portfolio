import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "is1-ssl.mzstatic.com",
            },
        ],
    },
};

export default nextConfig;
