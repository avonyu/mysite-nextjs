"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { getAllTodoItems } from "@/lib/server/todo/todo-actions";
import SidePannel from "./components/side-pannel";
import MainArea from "./components/main-area";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

function Loading() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-slate-600">
          <Spinner className="inline-block mr-2 size-6 relative bottom-1" />
          <span className="text-2xl">Loading...</span>
        </div>
      </div>
    </main>
  );
}

const { data: session } = await authClient.getSession();

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    getAllTodoItems(session?.user.id).finally(() => setLoading(false));
  }, []);

  // if (loading) return <Loading />;

  return (
    <div className="min-h-screen max-h-20 flex gap-2 dark:bg-gray-900">
      <SidePannel />
      <MainArea />
    </div>
  );
}
