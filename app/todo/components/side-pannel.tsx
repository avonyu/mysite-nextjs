"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Resizable } from "re-resizable";
import {
  Sun,
  Search,
  Star,
  SquareKanban,
  User,
  Flag,
  Plus,
  Home,
  Computer,
  Bookmark,
  FolderPlus,
  Briefcase,
  UserRoundCog,
  Settings,
  CircleQuestionMark,
  RefreshCw,
  House,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface NavList {
  id: string;
  label: string;
  icon: React.JSX.Element;
  count?: number | undefined;
}

const navList: NavList[] = [
  { id: "today", label: "我的一天", icon: <Sun size={16} /> },
  { id: "important", label: "重要", icon: <Star size={16} /> },
  {
    id: "planned",
    label: "计划内",
    icon: <SquareKanban size={16} />,
  },
  {
    id: "assigned",
    label: "已分配给我",
    icon: <User size={16} />,
  },
  {
    id: "flagged",
    label: "标记的电子邮件",
    icon: <Flag size={16} />,
  },
  {
    id: "tasks",
    label: "任务",
    icon: <Home size={16} />,
    count: 22,
  },
];

const customNavList: NavList[] = [
  {
    id: "self-project",
    label: "个人项目",
    icon: <Computer size={16} />,
  },
  {
    id: "resuma",
    label: "简历投递",
    icon: <Briefcase size={16} />,
  },
  {
    id: "work",
    label: "工作",
    icon: <Bookmark size={16} />,
  },
];

function UserInfo() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2.5 pb-2 ">
          <Avatar className="size-10">
            <AvatarImage
              src={session?.user.image || undefined}
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700">
              {session?.user.name}
            </h3>
            <p className="text-xs text-gray-600">{session?.user.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RefreshCw />
            重试同步
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CircleQuestionMark />
            了解详细信息
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserRoundCog />
          管理账户
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem>
              <House />
              返回主页
            </DropdownMenuItem>
          </Link>
          <Link href={session?.user ? "/todo/setting" : "/"}>
            <DropdownMenuItem>
              <Settings />
              设置
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function SidePannel() {
  const [activeNav, setActiveNav] = useState("tasks");

  return (
    <Resizable
      defaultSize={{ width: 250 }}
      enable={{ right: true }}
      minWidth={220}
      maxWidth={400}
    >
      <aside className="flex flex-col h-full w-full relative bg-white">
        {/* 侧边栏内容 */}
        <div className="h-full flex flex-col overflow-hidden px-3 pt-3 w-full relative">
          {/* 个人信息区 + 带图标的搜索框 */}
          <UserInfo />
          <div className="flex flex-col">
            <div className="relative mb-4">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="搜索"
                className="w-full pl-9 pr-3 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-gray-300"
              />
            </div>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 overflow-y-auto">
            {navList.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  activeNav === item.id
                    ? "bg-gray-100 text-gray-800"
                    : "bg-transparent text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
                {item.count && (
                  <span className="ml-auto text-xs text-gray-600 bg-gray-200 rounded-lg p-0.5">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
            <Separator />
            {/* 自定义菜单 */}
            {customNavList.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  activeNav === item.id
                    ? "bg-gray-100"
                    : "bg-transparent text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
                {item.count && (
                  <span className="ml-auto text-xs text-gray-600 bg-gray-200 rounded-lg p-0.5">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* 新建列表按钮 */}

        <div className="flex justify-between w-full p-3 bg-white border-t">
          <div className="flex items-center gap-2 rounded-md text-sm text-gray-800 hover:bg-gray-100">
            <Plus size={16} />
            新建列表
          </div>
          <div className="px-2 mt-0.5">
            <FolderPlus size={16} />
          </div>
        </div>
      </aside>
    </Resizable>
  );
}
