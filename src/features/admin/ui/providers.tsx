"use client";

import * as React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { useTheme } from "@/components/theme-provider";
import { PreferencesProvider } from "./preferences";

function AdminToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-center"
      gap={8}
      toastOptions={{
        classNames: {
          toast: "font-sans text-sm shadow-lg",
          actionButton: "!bg-primary !text-primary-foreground !font-medium",
        },
      }}
    />
  );
}

/** All client-side admin context in one place: URL state, prefs, toasts. */
export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <PreferencesProvider>
        {children}
        <AdminToaster />
      </PreferencesProvider>
    </NuqsAdapter>
  );
}
