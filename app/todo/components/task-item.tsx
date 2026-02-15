import { useState, useOptimistic, startTransition } from "react";
import { Star, Check, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { TodoTask } from "@/generated/prisma/client";
import {
  changeTodoTask,
  deleteTodoTask,
} from "@/lib/actions/todo/todo-actions";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuShortcut,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";

function TaskItem({
  task,
  className,
  onUpdate,
  onDelete,
}: {
  task: TodoTask;
  className?: string;
  onUpdate?: (updatedTask: TodoTask) => void;
  onDelete?: (deletedTask: TodoTask) => void;
}) {
  const [optimisticTask, setOptimisticTask] = useOptimistic(
    task,
    (state, changes: Partial<TodoTask>) => ({ ...state, ...changes }),
  );

  // 星标切换功能
  const toggleStar = async (taskId: string) => {
    const newIsStarred = !optimisticTask.isImportant;
    startTransition(() => {
      setOptimisticTask({ isImportant: newIsStarred, updatedAt: new Date() });
    });

    // 乐观更新：立即通知父组件进行排序
    onUpdate?.({
      ...task,
      isImportant: newIsStarred,
      updatedAt: new Date(),
    });

    // 更新数据库
    const res = await changeTodoTask(taskId, { isImportant: newIsStarred });
    if (res.code === 200 && res.data && res.data[0]) {
      // 数据库更新成功后，同步最新数据
      onUpdate?.(res.data[0]);
    } else {
      // 失败时，父组件回滚（useOptimistic 会自动处理本地 UI 回滚）
      onUpdate?.(task);
    }
  };

  // 完成状态切换功能
  const toggleFinish = async (taskId: string) => {
    const newIsFinish = !optimisticTask.isFinish;
    startTransition(() => {
      setOptimisticTask({ isFinish: newIsFinish, updatedAt: new Date() });
    });

    // 乐观更新：立即通知父组件进行排序
    onUpdate?.({
      ...task,
      isFinish: newIsFinish,
      updatedAt: new Date(),
    });

    // 更新数据库
    const res = await changeTodoTask(taskId, { isFinish: newIsFinish });
    if (res.code === 200 && res.data && res.data[0]) {
      onUpdate?.(res.data[0]);
    } else {
      onUpdate?.(task);
    }
  };

  // 添加到“我的一天”切换功能
  const toggleToday = async (taskId: string) => {
    const newIsToday = !optimisticTask.isToday;
    startTransition(() => {
      setOptimisticTask({ isToday: newIsToday, updatedAt: new Date() });
    });

    // 乐观更新：立即通知父组件
    onUpdate?.({
      ...task,
      isToday: newIsToday,
      updatedAt: new Date(),
    });

    // 更新数据库
    const res = await changeTodoTask(taskId, { isToday: newIsToday });
    if (res.code === 200 && res.data && res.data[0]) {
      onUpdate?.(res.data[0]);
    } else {
      onUpdate?.(task);
    }
  };

  // 删除任务功能
  const handleItemDelete = async (taskId: string) => {
    // 乐观更新：立即通知父组件删除任务
    onDelete?.(task);

    // 更新数据库
    const res = await deleteTodoTask(taskId);
    if (res.code === 200) {
      onDelete?.(res.data[0]);
    } else {
      // 如果失败，回滚状态
      // 注意：由于组件已被父组件卸载，这里的代码可能不会执行，
      // 但如果父组件正确处理了回滚（重新挂载），则无需在此处做额外操作
      // 此处逻辑主要依赖父组件的状态管理
    }
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "bg-gray-50/95 rounded p-3 shadow-sm flex items-center gap-3 hover:bg-white transition-transform",
            "dark:bg-zinc-800/95 dark:hover:bg-zinc-700/95",
            className,
          )}
        >
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={optimisticTask.isFinish}
              onChange={() => toggleFinish(task.id)}
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
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ",
                "text-gray-500 dark:text-gray-200 pointer-events-none opacity-0",
                "peer-checked:opacity-100 peer-checked:text-gray-200 dark:peer-checked:text-gray-900 peer-hover:opacity-100",
              )}
            />
          </div>
          <div className="flex-1">
            <div
              className={cn(
                "text-sm font-medium cursor-default",
                optimisticTask.isFinish ? "line-through text-gray-500" : "",
              )}
            >
              {task.content}
            </div>
            {optimisticTask.isToday && (
              <div className="text-xs text-gray-600 dark:text-gray-200 flex items-center gap-1">
                <Sun size={12} /> 我的一天
              </div>
            )}
          </div>
          <button
            onClick={() => toggleStar(task.id)}
            className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-500"
          >
            <Star
              size={16}
              fill={optimisticTask.isImportant ? "#6a7282" : "none"}
              className={optimisticTask.isImportant ? "text-gray-500" : ""}
            />
          </button>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem onClick={() => toggleToday(task.id)}>
            添加到“我的一天”
            <ContextMenuShortcut>Ctrl + T</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => toggleStar(task.id)}>
            删除重要标记
          </ContextMenuItem>
          <ContextMenuItem onClick={() => toggleFinish(task.id)}>
            标记为已完成
            <ContextMenuShortcut>Ctrl + D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>今天到期</ContextMenuItem>
          <ContextMenuItem>明天到期</ContextMenuItem>
          <ContextMenuItem>选择日期</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>将任务移动到...</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>默认任务列表</ContextMenuItem>
            <ContextMenuItem>其他任务列表</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => handleItemDelete(task.id)}
          className="text-red-500"
        >
          删除任务
          <ContextMenuShortcut>Delete</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default TaskItem;
