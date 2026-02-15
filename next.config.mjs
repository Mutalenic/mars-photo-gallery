/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mars.nasa.gov"
      },
      {
        protocol: "https",
        hostname: "mars.jpl.nasa.gov"
      },
      {
        protocol: "https",
        hostname: "cdn.mars.nasa.gov"
      },
      {
        protocol: "https",
        hostname: "apod.nasa.gov"
      }
    ]
  }
};

export default nextConfig;
