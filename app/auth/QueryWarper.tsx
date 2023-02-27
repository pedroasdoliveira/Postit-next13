"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QuerWarper = ({ children }: Prop) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QuerWarper;
