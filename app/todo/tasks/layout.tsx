"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
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

  // Use useCallback to stabilize the function reference
  const handleFetchInitialData = useCallback(async (userId: string) => {
    await fetchInitialData(userId);
    setLoading(false);
  }, [fetchInitialData]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    handleFetchInitialData(session.user.id);
  }, [session, router, handleFetchInitialData]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen max-h-screen flex dark:bg-zinc-800 overflow-hidden">
      <SidePannel />
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  );
}

// 延迟导入 SidePannel 以避免在 Loading 时加载不必要的组件
import SidePannel from "../components/side-pannel";
