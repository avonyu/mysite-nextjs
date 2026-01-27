"use client";

import { useState } from "react";
import { Home, Star, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function TaskItem({ task }: { task: Tasks }) {
  const [tasks, setTasks] = useState<Tasks[]>(simpleTasks);
  // 星标切换功能
  const toggleStar = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, starred: !task.starred } : task,
      ),
    );
  };
  return (
    <div className="bg-gray-50/95 rounded p-4 shadow-sm flex items-center gap-3 hover:bg-white transition-transform">
      <input type="checkbox" className="w-4.5 h-4.5" />
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

interface Tasks {
  id: number;
  title: string;
  subtitle: string;
  starred: boolean;
}

const simpleTasks: Tasks[] = [
  {
    id: 1,
    title:
      "写了一个爬虫去爬各种技术社区、爬领英，只要找到相关岗位，就会自动发邮件给我，我就立马去查看",
    subtitle: "",
    starred: false,
  },
  {
    id: 2,
    title: "前端/技术/自媒体矩阵",
    subtitle: "第 0 步，共 10 步",
    starred: false,
  },
  {
    id: 3,
    title: "面试问题",
    subtitle: "第 0 步，共 5 步",
    starred: false,
  },
  {
    id: 4,
    title: "自动化工具研究",
    subtitle: "",
    starred: false,
  },
  {
    id: 5,
    title: "高级前端:了解wasm",
    subtitle: "",
    starred: false,
  },
  {
    id: 6,
    title: "Prisma操作数据库",
    subtitle: "",
    starred: false,
  },
  {
    id: 7,
    title: "telegram图片整理",
    subtitle: "",
    starred: false,
  },
  {
    id: 8,
    title: "清理Chrome阅读清单",
    subtitle: "",
    starred: false,
  },
  {
    id: 9,
    title: "figma mcp",
    subtitle: "",
    starred: false,
  },
  {
    id: 10,
    title: "阮一峰Typescript教程",
    subtitle: "",
    starred: false,
  },
  {
    id: 11,
    title: "了解Dify的基础使用",
    subtitle: "",
    starred: false,
  },
  {
    id: 12,
    title: "了解敏捷开发（Agile software development）",
    subtitle: "第 0 步，共 1 步",
    starred: false,
  },
];

function MainArea() {
  // 任务数据
  const [tasks, setTasks] = useState<Tasks[]>(simpleTasks);

  return (
    <main
      className={cn(
        "w-full rounded-tl-md overflow-hidden",
        "bg-[url(/todo-wallpapers/bg-6.png)] bg-cover bg-center",
      )}
    >
      <div className="flex flex-col px-12 h-full">
        {/* 顶部导航栏 */}
        <div className="flex items-center py-6">
          <Home size={24} className="text-white" />
          <h1 className="text-white text-3xl font-semibold ml-2">任务</h1>
        </div>

        {/* 任务列表容器 */}
        <div
          className={cn(
            "flex-1 py-1 flex flex-col space-y-1 overflow-y-auto",
            "scrollbar-thin",
          )}
        >
          {/* 任务卡片列表 */}
          {tasks.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>

        {/* 添加任务按钮 */}
        <div className="pb-12 pt-2">
          <div className="w-full flex items-center gap-2 px-3 py-3 border border-gray-300 bg-white/80 text-gray-600 rounded-sm text-sm hover:bg-white">
            <Plus size={20} />
            添加任务
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainArea;
