"use client"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Asidebar from "./_components/Asidebar";
import Header from "./_components/Header";
import { AuthProvider } from "@/context/auth-provider";
import { UniversityProvider } from "@/context/university-context";
import DynamicAsidebar from "./_components/DynamicAsidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <UniversityProvider>
      <SidebarProvider>
        <DynamicAsidebar />
        <SidebarInset>
          <main className="w-full">
            <Header/>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
      </UniversityProvider>
    </AuthProvider>
  );
}
