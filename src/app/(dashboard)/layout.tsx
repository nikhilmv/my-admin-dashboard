"use client";
import { Outfit } from 'next/font/google';
import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import AdminLayoutContent from "./AdminLayoutContent"; // split content
import { ThemeProvider } from "@/context/ThemeContext";  

const outfit = Outfit({
  subsets: ["latin"],
});
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${outfit.className} dark:bg-gray-900`}>
      <ThemeProvider> 
        <SidebarProvider>
          <AdminLayoutContent>{children}</AdminLayoutContent>
        </SidebarProvider>
      </ThemeProvider>
    </div> 
  );
}
