// app/providers.tsx
"use client"

import { DM_Sans } from "next/font/google";
import './globals.css';
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/context/query-provider";

import { LoadingProvider } from "@/context/loading-context";
import Loading from "@/components/Loading";

const dm_sans = DM_Sans({ subsets: ["latin"] });
export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
    <QueryProvider>
     
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main className={`bg-background ${dm_sans.className} antialiased`}>
            {children}
            <Toaster />
            <Loading />
          </main>
        </ThemeProvider>
    </QueryProvider>
    </LoadingProvider>

  );
}