import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ThemeToggler";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-image flex items-center justify-center h-screen">
      <div className="relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-14 right-4">
            <ModeToggle />
          </div>
        </ThemeProvider>
      {children}
      </div>
    </div>
  );
}
