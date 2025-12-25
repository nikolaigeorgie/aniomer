"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!bg-[rgb(18,18,24)] !text-white !border !border-violet-500/20",
            duration: 4000,
            style: {
              background: "rgb(18, 18, 24)",
              color: "#fff",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            },
            success: {
              iconTheme: {
                primary: "#8B5CF6",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </QueryClientProvider>
    </SessionProvider>
  );
}

