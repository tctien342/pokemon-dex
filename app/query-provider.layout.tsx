"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useRef } from "react";

export const QueryProviderLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const QueryClientRef = useRef<QueryClient>(new QueryClient());

  return (
    <QueryClientProvider client={QueryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
};
