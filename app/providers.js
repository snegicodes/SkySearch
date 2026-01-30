"use client";

import { ThemeProvider } from "next-themes";
import { MUIThemeProvider } from "@/src/providers/MUIThemeProvider";

export function Providers({ children }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem
      suppressHydrationWarning
    >
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </ThemeProvider>
  );
}
