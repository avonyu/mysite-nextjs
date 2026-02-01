"use client";

import { useState, useRef, useEffect, cloneElement } from "react";
import { Plus, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import TaskItem from "./task-item";
import {
  getAllTodoItemsByTodoSetId,
  createTodoItem,
} from "@/lib/actions/todo/todo-actions";
import { type TodoItem } from "@/generated/prisma/client";
import reorder from "@/lib/utils/reorder";
import { useTodoAppStore } from "@/store";
import { type todoSet } from "../config";
import SetCard from "./set-card";

const getData = () => {
  // 返回日期字符串，格式示例：2月1日，星期日
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  return `${month}月${day}日，${week[date.getDay()]}`;
};

function MainArea({ todoSet }: { todoSet: todoSet }) {
  const user = useTodoAppStore((state) => state.user);
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const createTodoItemWithUserId = createTodoItem.bind(null, user?.id);

  // 处理创建任务的表单提交，可快速响应用户输入
  const handleCreateTodo = async (formData: FormData) => {
    const content = formData.get("content") as string;
    if (!content.trim()) return; // 内容为空时，不处理
    const res = await createTodoItemWithUserId(formData);
    if (res.code === 200 && res.data && res.data[0]) {
      const newTask = res.data[0];
      setTasks(reorder([...tasks, newTask]));
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    getAllTodoItemsByTodoSetId(user.id, todoSet.id).then((res) => {
      setTasks(reorder(res.data || []));
    });
  }, [todoSet.id, user]);

  return (
    <main
      onMouseDown={(e) => {
        // 如果输入框已经聚焦，且点击的不是输入框本身，阻止默认行为（防止失去焦点）
        if (isInputFocused && e.target !== inputRef.current) {
          e.preventDefault();
        }
      }}
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "w-full rounded-tl-md overflow-hidden bg-cover bg-center transition-all duration-300 ease-in-out",
      )}
      style={{
        backgroundImage: `url(${todoSet.bgImg})`,
      }}
    >
      <div className="flex flex-col px-12 h-full">
        {/* 顶部导航栏 */}
        {todoSet.id === "today" ? (
          <div className="py-6">
            <h1 className="text-white text-3xl font-semibold ml-2">
              {todoSet.label}
            </h1>
            <p className="text-white text-sm font-medium ml-2">{getData()}</p>
          </div>
        ) : (
          <div className="flex items-center py-6">
            {todoSet.icon &&
              cloneElement(todoSet.icon, {
                size: 24,
                className: "text-white",
              })}
            <h1 className="text-white text-3xl font-semibold ml-2">
              {todoSet.label}
            </h1>
          </div>
        )}

        {/* 任务列表容器 */}
        <div
          className={cn(
            "flex-1 py-1 flex flex-col space-y-0.5 overflow-y-auto relative",
            tasks.length === 0 && "items-center justify-center",
            "scrollbar-thin",
          )}
        >
          {/* 任务卡片列表 */}
          {tasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onUpdate={(updatedTask) => {
                // 更新任务列表中的任务
                const updatedTasks = tasks.map((t) =>
                  t.id === updatedTask.id ? updatedTask : t,
                );
                setTasks(reorder(updatedTasks));
              }}
            />
          ))}
          {/* 提示卡片 */}
          {todoSet.card && tasks.length === 0 && <SetCard todoSet={todoSet} />}
        </div>

        {/* 添加任务按钮 */}
        <div className="pb-12 pt-2">
          <div className="w-full flex items-center gap-2 px-3 py-3 border border-gray-300 bg-white/70 backdrop-blur text-gray-600 rounded text-sm hover:bg-white/80">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Circle
                size={20}
                strokeWidth={2}
                className={cn(
                  "absolute text-gray-800 pointer-events-none transition-all duration-200 transform",
                  isInputFocused ? "opacity-100" : "opacity-0",
                )}
              />
              <Plus
                size={20}
                strokeWidth={2}
                className={cn(
                  "absolute text-gray-800 transition-all duration-200 transform",
                  isInputFocused ? "opacity-0" : "opacity-100",
                )}
              />
            </div>
            <form action={handleCreateTodo} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                name="content"
                placeholder="添加任务"
                className="w-full bg-transparent focus:outline-none"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainArea;
