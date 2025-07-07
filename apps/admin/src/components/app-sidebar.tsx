"use client";

import { Accessibility, Command, Ticket } from "lucide-react";
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  events: [
    {
      name: "Events",
      url: "/events",
      icon: Ticket,
    },
  ],
  accounts: [
    {
      name: "Disability Cards",
      url: "/disability-cards",
      icon: Accessibility,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: StrapiUser }) {
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
                    Events Planner Inc
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavItems label="Events" items={data.events} />
        <NavItems label="Accounts" items={data.accounts} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
