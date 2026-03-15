export default function Projects() {
  return (
    <div id="projects" className="flex flex-col items-center px-4 py-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* 页面标题 */}
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-4">
          All My Projects
        </h1>

        {/* 项目网格 */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Project 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Three.js
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Three.js应用</p>
          </div>

          {/* Project 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Web3 数字钱包
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              通过登录MetaMask钱包进行数字货币交易
            </p>
          </div>

          {/* Project 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              还未想好
            </h3>
            <p className="text-gray-600 dark:text-gray-300">敬请期待</p>
          </div>
        </div>
      </div>
    </div>
  );
}