"use client";

import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import AdminLayoutContent from "./AdminLayoutContent"; // split content
import { ThemeProvider } from "@/context/ThemeContext";  

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
     <ThemeProvider> 
      <SidebarProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
