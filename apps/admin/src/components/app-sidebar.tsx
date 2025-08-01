"use client";

import { Accessibility, Command, LayoutDashboard, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { NavItems } from "@/components/nav-items";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StrapiUser } from "@/server/api/routers/auth";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: StrapiUser }) {
  const t = useTranslations("Sidebar");

  const data = {
    events: [
      {
        name: t("items.dashboard"),
        url: "/",
        icon: LayoutDashboard,
      },
      {
        name: t("items.events"),
        url: "/events",
        icon: Ticket,
      },
    ],
    accounts: [
      {
        name: t("items.disabilityCards"),
        url: "/disability-cards",
        icon: Accessibility,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {t("companyName")}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavItems label={t("navigation.events")} items={data.events} />
        <NavItems label={t("navigation.accounts")} items={data.accounts} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
