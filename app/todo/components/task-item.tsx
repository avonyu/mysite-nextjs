import { useState } from "react";
import { Star, Check, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { TodoItem } from "@/generated/prisma/client";
import {
  changeTodoItem,
  deleteTodoItem,
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
  task: TodoItem;
  className?: string;
  onUpdate?: (updatedTask: TodoItem) => void;
  onDelete?: (deletedTask: TodoItem) => void;
}) {
  const [isStarred, setIsStarred] = useState(task.isImportant);
  const [isFinish, setIsFinish] = useState(task.isFinish);
  const [isToday, setIsToday] = useState(task.isToday);

  // 星标切换功能
  const toggleStar = async (taskId: string) => {
    const newIsStarred = !isStarred;
    setIsStarred(newIsStarred); // 乐观更新 UI

    // 乐观更新：立即通知父组件进行排序（同时更新时间以模拟编辑后的置顶效果）
    onUpdate?.({
      ...task,
      isImportant: newIsStarred,
      updatedAt: new Date(),
    });

    // 更新数据库
    const res = await changeTodoItem(taskId, { isImportant: newIsStarred });
    if (res.code === 200 && res.data && res.data[0]) {
      // 数据库更新成功后，再次确保数据一致性（主要是获取服务器端的准确 updatedAt）
      onUpdate?.(res.data[0]);
    } else {
      // 如果失败，回滚状态
      setIsStarred(!newIsStarred);
      onUpdate?.(task);
    }
  };

  // 完成状态切换功能
  const toggleFinish = async (taskId: string) => {
    const newIsFinish = !isFinish;
    setIsFinish(newIsFinish); // 乐观更新 UI

    // 乐观更新：立即通知父组件进行排序（同时更新时间以模拟编辑后的置顶效果）
    onUpdate?.({
      ...task,
      isFinish: newIsFinish,
      updatedAt: new Date(),
    });

    // 更新数据库
    const res = await changeTodoItem(taskId, { isFinish: newIsFinish });
    if (res.code === 200 && res.data && res.data[0]) {
      // 数据库更新成功后，再次确保数据一致性（主要是获取服务器端的准确 updatedAt）
      onUpdate?.(res.data[0]);
    } else {
      // 如果失败，回滚状态
      setIsFinish(!newIsFinish);
      onUpdate?.(task);
    }
  };
  // 添加到“我的一天”切换功能
  const toggleToday = async (taskId: string) => {
    const newIsToday = !isToday;
    setIsToday(newIsToday);
    // 乐观更新 UI
    onUpdate?.({
      ...task,
      isToday: newIsToday,
      updatedAt: new Date(),
    });

    // 更新数据库
    const res = await changeTodoItem(taskId, { isToday: newIsToday });
    if (res.code === 200 && res.data && res.data[0]) {
      // 数据库更新成功后，再次确保数据一致性（主要是获取服务器端的准确 updatedAt）
      onUpdate?.(res.data[0]);
    } else {
      // 如果失败，回滚状态
      setIsToday(!newIsToday);
      onUpdate?.(task);
    }
  };

  // 删除任务功能
  const handleItemDelete = async (taskId: string) => {
    // 乐观更新：立即通知父组件删除任务
    onDelete?.(task);

    // 更新数据库
    const res = await deleteTodoItem(taskId);
    if (res.code === 200) {
      // 数据库删除成功后，确保 UI 同步
      onDelete?.(res.data[0]);
    } else {
      // 如果失败，回滚状态
      onDelete?.(task);
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
              checked={isFinish}
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
                isFinish ? "line-through text-gray-500" : "",
              )}
            >
              {task.content}
            </div>
            {isToday && (
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
              fill={isStarred ? "#6a7282" : "none"}
              className={isStarred ? "text-gray-500" : ""}
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
