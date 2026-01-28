import { useState } from "react";
import { Star, Check } from "lucide-react";

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
    <div className="bg-gray-50/95 rounded p-4 shadow-sm flex items-center gap-3 hover:bg-white transition-transform">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer appearance-none size-5 rounded-full border-2 border-gray-500 checked:bg-gray-500 checked:border-transparent transition-all"
        />
        <Check
          size={12}
          strokeWidth={3}
          className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{task.title}</div>
        {task.subtitle && (
          <div className="text-xs text-gray-600">{task.subtitle}</div>
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
