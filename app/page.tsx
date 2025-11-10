import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <main
      className={cn(
        "bg-linear-to-br from-gray-50 to-gray-100",
        "dark:from-gray-900 dark:to-gray-800"
      )}
    >
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <div
          className={cn(
            "font-bold text-6xl md:text-7xl lg:text-8xl",
            "bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-teal-400 animate-fade-in"
          )}
        >
          Todo List
        </div>
        <p
          className={cn(
            "mt-6 text-xl md:text-2xl text-gray-600 text-center max-w-2xl animate-fade-in-up",
            "dark:text-gray-300"
          )}
        >
          简单高效的待办事项管理工具，助你轻松规划每一天
        </p>
        <div className="mt-10 flex gap-4 animate-fade-in-up delay-200">
          <Link href={session ? "/todo" : "/login"}>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              开始使用
            </Button>
          </Link>
          <Link href="/readmore">
            <Button
              size="lg"
              variant="outline"
              className={cn(
                "border-gray-300",
                "dark:border-gray-700 dark:text-gray-200"
              )}
            >
              了解更多
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
