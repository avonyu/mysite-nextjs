"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: string | null;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

type Priority = "NORMAL" | "IMPORTANT";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "NORMAL" as Priority,
  });

  // 获取所有待办事项
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos().finally(() => setLoading(false));
  }, []);

  // 创建新待办事项
  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "NORMAL",
        });
        fetchTodos();
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // 切换完成状态
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // 删除待办事项
  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const priorityConfig = {
    NORMAL: { label: "Normal", color: "bg-gray-100 text-gray-800" },
    IMPORTANT: { label: "Important", color: "bg-orange-100 text-orange-800" },
  };

  if (loading) {
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

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-linear-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-3">
            Todo List
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Simple and efficient task management
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-slate-200/50 dark:border-slate-700/50">
          <form onSubmit={createTodo} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What needs to be done?"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>

            {/* Expanded Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as Priority,
                    })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="NORMAL">Normal</option>
                  <option value="IMPORTANT">Important</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                placeholder="Add some details..."
              />
            </div>
          </form>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 dark:text-slate-500 text-lg mb-2">
                No tasks yet
              </div>
              <div className="text-slate-500 dark:text-slate-600 text-sm">
                Add your first task above to get started
              </div>
            </div>
          ) : (
            (Array.isArray(todos) ? todos : []).map((todo) => (
              <div
                key={todo.id}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all p-4 border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300/50 dark:hover:border-slate-600/50"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id, todo.completed)}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-1 ${
                      todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-slate-400 hover:border-blue-500"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3
                          className={`font-medium text-slate-900 dark:text-white transition-all ${
                            todo.completed ? "line-through text-slate-500" : ""
                          }`}
                        >
                          {todo.title}
                        </h3>
                        {todo.description && (
                          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                            {todo.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 mt-3">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          priorityConfig[todo.priority].color
                        }`}
                      >
                        {priorityConfig[todo.priority].label}
                      </span>

                      {todo.dueDate && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
