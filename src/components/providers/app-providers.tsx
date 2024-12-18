"use client";

import StoreProvider from "@/store";
import { Toaster } from "@/components/ui/toaster";
import { ConvexClientProvider } from "./convex-client-provider";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-primary-600 flex min-h-screen w-full">
      <main className="dark:bg-dark-primary flex w-full flex-col">
        {children}
      </main>
    </div>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ConvexClientProvider>
        <Toaster />
        <AppLayout>{children}</AppLayout>
      </ConvexClientProvider>
    </StoreProvider>
  );
};

export default AppProvider;
