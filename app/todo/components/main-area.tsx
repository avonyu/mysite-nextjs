"use client";

import { useState, useRef, cloneElement } from "react";
import { useParams } from "next/navigation";
import { Plus, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import TaskItem from "./task-item";
import { createTodoTask } from "@/lib/actions/todo/todo-actions";
import { type TodoTask } from "@/generated/prisma/client";
import reorder from "@/lib/utils/reorder";
import {
  useGetTodoSetById,
  useGetTasksBySetId,
  useTodoActions,
  useGetUser,
} from "@/store/todo-app";
import SetCard from "./set-card";
import { defaultTodoSet } from "../config";

/**
 * 获取当前日期的字符串表示
 * @returns 日期和星期的字符串表示
 */
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

function MainArea() {
  const params = useParams();
  const setId = params.setId as string;

  const currentSet = useGetTodoSetById(setId) || defaultTodoSet[0];
  const tasks = useGetTasksBySetId(setId);
  const { addTask, updateTask, deleteTask } = useTodoActions();
  const user = useGetUser();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 处理创建任务的表单提交，可快速响应用户输入
  const handleCreateTodo = async (formData: FormData) => {
    if (!user?.id) return;
    const content = formData.get("content") as string;
    if (!content.trim()) return; // 内容为空时，不处理

    // 如果在特定列表创建任务，需要附加属性
    if (setId === "myday") {
      formData.append("isToday", "true");
    } else if (setId === "important") {
      formData.append("isImportant", "true");
    } else if (
      setId !== "inbox" &&
      setId !== "planned" &&
      setId !== "assigned_to_me" &&
      setId !== "flagged"
    ) {
      // 如果是自定义列表，可能需要 setId（取决于 createTodoTask 实现，目前它只接受 content）
      // 注意：目前的 createTodoTask 实现只从 formData 读取 content。
      // 如果需要支持 setId，需要更新 createTodoTask 或 formData。
      // 假设 createTodoTask 会处理或者我们需要传入更多信息。
      // 这是一个潜在的问题，但目前保持原样，只做最小修改。
    }

    // 调用 Server Action
    const res = await createTodoTask(user.id, formData);

    if (res.code === 200 && res.data && res.data[0]) {
      const newTask = res.data[0];
      // 更新 Store
      addTask(newTask);
      // 清空输入框 (通过重置 form)
      // 由于使用的是 action，可以通过 key 重置或者受控组件。这里简单起见，假设 input 会被清空或者手动清空
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleTaskUpdate = (updatedTask: TodoTask) => {
    updateTask(updatedTask);
  };

  // 对任务进行排序以便显示
  const orderedTasks = reorder(tasks);

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
        backgroundImage: `url(${currentSet.bgImg})`,
      }}
    >
      <div className="flex flex-col px-12 h-full">
        {/* 顶部导航栏 */}
        {currentSet.id === "myday" ? (
          <div className="py-6">
            <h1 className="text-white text-3xl font-semibold ml-2">
              {currentSet.label}
            </h1>
            <p className="text-white text-sm font-medium ml-2">{getData()}</p>
          </div>
        ) : (
          <div className="flex items-center py-6">
            {currentSet.icon &&
              cloneElement(
                currentSet.icon as React.ReactElement<{ size?: number; className?: string }>,
                { size: 24, className: "text-white" }
              )}
            <h1 className="text-white text-3xl font-semibold ml-2">
              {currentSet.label}
            </h1>
          </div>
        )}

        {/* 任务列表容器 */}
        <div
          className={cn(
            "flex-1 py-1 flex flex-col space-y-0.5 overflow-y-auto relative",
            orderedTasks.length === 0 && "items-center justify-center",
            "scrollbar-thin",
          )}
        >
          {/* 任务卡片列表 */}
          {orderedTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onUpdate={handleTaskUpdate}
              onDelete={(deletedTask) => {
                deleteTask(deletedTask.id);
              }}
            />
          ))}

          {/* 提示卡片 */}
          {currentSet.card && orderedTasks.length === 0 && (
            <SetCard todoSet={currentSet} />
          )}
        </div>

        {/* 添加任务按钮 */}
        <div className="mt-2 h-20">
          {currentSet.id !== "assigned_to_me" &&
            currentSet.id !== "flagged" && (
              <div
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-3 border-0 bg-white/70 backdrop-blur text-gray-600 rounded text-sm hover:bg-white/80",
                  "dark:text-white dark:bg-zinc-800/70 dark:hover:bg-zinc-700/70",
                )}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <Circle
                    size={20}
                    strokeWidth={2}
                    className={cn(
                      "absolute text-gray-800 dark:text-white pointer-events-none transition-all duration-200 transform",
                      isInputFocused ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <Plus
                    size={20}
                    strokeWidth={2}
                    className={cn(
                      "absolute text-gray-800 dark:text-white transition-all duration-200 transform",
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
                    className={cn(
                      "w-full bg-transparent text-black dark:text-white",
                      "placeholder:text-gray-800 dark:placeholder:text-white",
                      "focus:outline-none focus:placeholder-transparent dark:focus:placeholder-transparent",
                    )}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  {setId === "important" && (
                    <input type="hidden" name="isImportant" value="true" />
                  )}
                </form>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}

export default MainArea;
