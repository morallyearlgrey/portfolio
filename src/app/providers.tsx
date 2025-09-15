"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return ( <SessionProvider 
      refetchInterval={15} // Refetch session every 60 seconds
      refetchOnWindowFocus={true} // Refetch when window gets focus
    >
      {children}
    </SessionProvider> );
}