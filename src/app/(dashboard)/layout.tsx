"use client";

import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import AdminLayoutContent from "./AdminLayoutContent"; // split content

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}
