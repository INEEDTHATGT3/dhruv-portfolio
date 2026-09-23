import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old résumé and project-draft links now point at the current résumé.
  async redirects() {
    return [{ source: "/manuals/:path*", destination: "/resume.pdf", permanent: true }];
  },
};

export default nextConfig;
