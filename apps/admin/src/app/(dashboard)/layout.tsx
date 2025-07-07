import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard - Admin Panel",
  description: "Manage your application settings and content",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // @ts-expect-error weird-nextjs-issue
    <Suspense fallback={<Loading />}>
      <LayoutWithUser>{children}</LayoutWithUser>
    </Suspense>
  );
}

const LayoutWithUser = async ({ children }: { children: React.ReactNode }) => {
  const user = await api.auth.session();

  if (!user) return redirect("/login");
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <span className="loader"></span>
    </div>
  );
}
