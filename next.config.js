/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openseauserdata.com"],
    loader: "imgix",
    path: "",
  },
};

module.exports = nextConfig;
