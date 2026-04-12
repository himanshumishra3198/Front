"use client";

import { useAuthStore } from "../../stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading]);

  // prevent flicker
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // optional: block render until auth is confirmed
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
