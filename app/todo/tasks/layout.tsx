"use client";

import { useState, useEffect } from "react";
import { useTodoActions } from "@/store/todo-app";
import Loading from "../components/loading";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { fetchInitialData } = useTodoActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    } else
      fetchInitialData(session.user.id).finally(() => {
        setLoading(false);
      });
  }, [fetchInitialData, router, session]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen max-h-screen flex dark:bg-zinc-800 overflow-hidden">
      <SidePannel />
      {children}
    </div>
  );
}

// 延迟导入 SidePannel 以避免在 Loading 时加载不必要的组件
import SidePannel from "../components/side-pannel";
