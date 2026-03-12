"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { setCredentials } from "@/features/auth/authSlice";
import type { User } from "@/types/auth.types";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");

    if (token && storeRef.current) {
      const user: User | undefined = userRaw
        ? (JSON.parse(userRaw) as User)
        : undefined;
      storeRef.current.dispatch(setCredentials({ accessToken: token, user }));
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
