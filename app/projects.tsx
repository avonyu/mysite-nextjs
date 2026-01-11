import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Projects() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <div id="projects" className="flex flex-col items-center px-4 py-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* 页面标题 */}
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-4">
          All My Projects
        </h1>

        {/* 功能特性网格 */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* 功能卡片 1 */}
          <Link href={session ? "/todo" : "/login"}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Todo List
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                一款类似于 Microsoft To Do
                的待办事项管理工具，助你轻松规划每一天
              </p>
            </div>
          </Link>

          {/* 功能卡片 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Three.js
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Three.js应用</p>
          </div>

          {/* 功能卡片 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Web3 数字钱包
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              通过登录MetaMask钱包进行数字货币交易
            </p>
          </div>

          {/* 功能卡片 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              还未想好
            </h3>
            <p className="text-gray-600 dark:text-gray-300">还未想好</p>
          </div>
        </div>

        {/* 技术特点 */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            技术特点
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-blue-600 dark:text-blue-400 font-semibold">
                响应式设计
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                适配各种设备屏幕
              </div>
            </div>
            <div className="p-4">
              <div className="text-green-600 dark:text-green-400 font-semibold">
                实时同步
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                数据实时更新保存
              </div>
            </div>
            <div className="p-4">
              <div className="text-purple-600 dark:text-purple-400 font-semibold">
                高性能
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                快速加载和响应
              </div>
            </div>
          </div>
        </div> */}

        {/* 行动号召 */}
        <div className="text-center mt-12">
          <Link
            href="/todo"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            现在开始使用 TodoList
          </Link>
        </div>
      </div>
    </div>
  );
}
