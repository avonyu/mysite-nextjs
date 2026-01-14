import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-screen px-4">
        <div className="max-w-4xl px-4 mt-30">
          <Avatar className="size-64">
            <AvatarImage src="/avatar.jpg" alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* TODO: 添加联系方式 */}
          <div
            className={cn(
              "font-bold text-6xl md:text-7xl lg:text-5xl mt-6 mb-5",
              "bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-teal-400 animate-fade-in"
            )}
          >
            {"About Me"}
          </div>
          <div className="text-xl md:text-2xl text-gray-400 text-center max-w-2xl animate-fade-in-up">
            Hi, My name is Avon, a full-stack Engineer, and I love building
            things. Hi, My name is Avon, a full-stack Engineer, and I love
            building things. Hi, My name is Avon, a full-stack Engineer, and I
            love building things.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
