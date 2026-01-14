import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Projects from "@/app/components/projects";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <>
      <Header />
      <main
        className={cn(
          "bg-linear-to-br from-gray-50 to-gray-100",
          "dark:from-gray-900 dark:to-gray-800"
        )}
      >
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <div
            className={cn(
              "font-bold text-5xl md:text-6xl lg:text-8xl leading-30",
              "bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-teal-400 animate-fade-in"
            )}
          >
            {"Hi, I'm Avon"}
          </div>
          <p
            className={cn(
              "mt-6 text-base md:text-xl lg:text-2xl text-gray-600 text-center max-w-2xl animate-fade-in-up",
              "dark:text-gray-300"
            )}
          >
            {"I'm a full-stack Engineer, and I love building things."}
          </p>
          <div className="mt-10 flex gap-4 animate-fade-in-up delay-200">
            <Link href="/#projects">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                My projects
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600">
                About Me
              </Button>
            </Link>
          </div>
        </div>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
