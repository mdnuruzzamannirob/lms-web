"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { setCredentials, setHydrated } from "@/features/auth/authSlice";
import type { User } from "@/types/auth.types";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");

    if (token) {
      const user: User | undefined = userRaw
        ? (JSON.parse(userRaw) as User)
        : undefined;
      store.dispatch(setCredentials({ accessToken: token, user }));
    } else {
      store.dispatch(setHydrated());
    }

    // Delay mount to avoid synchronous setState warnings inside effects
    setTimeout(() => {
      if (isMounted) setMounted(true);
    }, 0);

    return () => {
      isMounted = false;
    };
  }, [store]);

  if (!mounted) return null;

  return <Provider store={store}>{children}</Provider>;
}
