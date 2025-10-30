import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignIn from "@/components/sign-in";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
      <header>
        <div
          className={cn(
            "fixed w-full flex justify-between p-4 bg-white border-b border-gray-200",
            "dark:border-gray-800 dark:bg-gray-950"
          )}
        >
          <div
            className={cn(
              "p-1 text-cyan-500 font-bold text-xl",
              "dark:text-gray-100"
            )}
          >
            Todo List
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Button variant="secondary" className="cursor-pointer" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="cursor-pointer" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main
        className={cn(
          "min-h-screen bg-linear-to-br from-gray-50 to-gray-100",
          "dark:from-gray-900 dark:to-gray-800"
        )}
      >
        <div className="flex flex-col justify-center items-center h-screen px-4">
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
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              开始使用
            </Button>
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
          </div>
        </div>
      </main>
      <footer
        className={cn(
          "bottom-0 w-full bg-gray-100 border-t border-gray-200",
          "dark:bg-gray-900 dark:border-gray-800"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className={cn("text-sm text-gray-600", "dark:text-gray-400")}>
              © {new Date().getFullYear()} Todo List App. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link
                href="/about"
                className={cn(
                  "text-sm text-gray-600 hover:text-gray-900",
                  "dark:text-gray-400 dark:hover:text-gray-100"
                )}
              >
                About
              </Link>
              <Link
                href="/privacy"
                className={cn(
                  "text-sm text-gray-600 hover:text-gray-900",
                  "dark:text-gray-400 dark:hover:text-gray-100"
                )}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={cn(
                  "text-sm text-gray-600 hover:text-gray-900",
                  "dark:text-gray-400 dark:hover:text-gray-100"
                )}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
