"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Prop {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QuerWarper = ({ children }: Prop) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" reverseOrder={false} />
      {children}
    </QueryClientProvider>
  );
};

export default QuerWarper;
