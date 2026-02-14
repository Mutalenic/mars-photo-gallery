import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mars Photo Intelligence",
  description: "Explore NASA rover captures with diagnostics, insights, and immersive storytelling"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
