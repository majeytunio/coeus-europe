"use client";

import { useEffect } from "react";
import { supabase } from "./supabase";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("admin/login");
      }
    });
  }, []);
}
