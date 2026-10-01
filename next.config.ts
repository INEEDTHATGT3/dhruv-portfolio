import type { NextConfig } from "next";

// Sent on every response, locally (`next start`) and on Vercel alike.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Old résumé and project-draft links now point at the current résumé.
  async redirects() {
    return [{ source: "/manuals/:path*", destination: "/resume.pdf", permanent: true }];
  },
};

export default nextConfig;
