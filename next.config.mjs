/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/process", destination: "/sherbimet", permanent: true },
      { source: "/services/website", destination: "/services/web-ecommerce", permanent: true },
      { source: "/services/websites", destination: "/services/web-ecommerce", permanent: true },
      { source: "/services/ecommerce", destination: "/services/web-ecommerce", permanent: true },
      { source: "/services/mirembajtje", destination: "/services/web-ecommerce", permanent: true },
      { source: "/services/marketing", destination: "/services/marketing-growth", permanent: true },
      { source: "/services/seo", destination: "/services/marketing-growth", permanent: true },
      { source: "/services/social-media", destination: "/services/marketing-growth", permanent: true },
      { source: "/services/branding", destination: "/services/branding-content", permanent: true },
      { source: "/services/photography", destination: "/services/branding-content", permanent: true },
      { source: "/services", destination: "/sherbimet", permanent: true }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "s.wordpress.com"
      }
    ]
  }
};

export default nextConfig;
