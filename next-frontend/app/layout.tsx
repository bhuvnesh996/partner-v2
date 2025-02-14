// app/layout.tsx
import type { Metadata } from "next";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "Admission Portals",
  description: "Admission Portals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}