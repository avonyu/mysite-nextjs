import { useState } from "react";
import { Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tasks {
  id: number;
  title: string;
  subtitle: string;
  starred: boolean;
}

function TaskItem({ task }: { task: Tasks }) {
  // 星标切换功能
  const toggleStar = (taskId: number) => {
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === taskId ? { ...task, starred: !task.starred } : task,
    //   ),
    // );
  };

  return (
    <div
      className={cn(
        "bg-gray-50/95 rounded p-3 shadow-sm flex items-center gap-3 hover:bg-white transition-transform",
        "dark:bg-zinc-800/95 dark:hover:bg-zinc-700/95",
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className={cn(
            "appearance-none size-4 rounded-full border-2 border-gray-500",
            "peer checked:bg-gray-500 checked:border-transparent checked:border-0",
            "dark:border-gray-300",
          )}
        />
        <Check
          size={10}
          strokeWidth={4}
          className={cn(
            "absolute text-gray-500 dark:text-gray-200 pointer-events-none opacity-0",
            "peer-checked:opacity-100 dark:peer-checked:text-gray-900 peer-hover:opacity-100",
          )}
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{task.title}</div>
        {task.subtitle && (
          <div className="text-xs text-gray-600 dark:text-gray-200">
            {task.subtitle}
          </div>
        )}
      </div>
      <button
        onClick={() => toggleStar(task.id)}
        className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-500"
      >
        <Star
          size={16}
          fill={task.starred ? "#6a7282" : "none"}
          className={task.starred ? "text-gray-500" : ""}
        />
      </button>
    </div>
  );
}

export default TaskItem;
