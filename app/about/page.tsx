import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GradientColorText } from "@/components/gradient-color-text";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-screen px-4">
        <div className="max-w-4xl px-4 mt-30">
          <Avatar className="size-64">
            {/* <AvatarImage src="/avatar.jpg" alt="avatar" /> */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* TODO: 添加联系方式 */}
          <h1
            className={cn(
              "font-bold text-6xl md:text-7xl lg:text-5xl mt-6 mb-5",
              "bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-teal-400 animate-fade-in"
            )}
          >
            About Me
          </h1>
          <div className="mb-4">
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl animate-fade-in-up">
              Hi, My name is Avon, a full-stack Engineer, and I love building
              things. Hi, My name is Avon, a full-stack Engineer, and I love
              building things. Hi, My name is Avon, a full-stack Engineer, and I
              love building things.
            </p>
          </div>
          {/* Sillls */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-cyan-400">Skills</h2>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">JavaScript/TypeScript</Badge>
              <Badge variant="outline">React.js</Badge>
              <Badge variant="outline">Vue.js</Badge>
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">Node.js</Badge>
              <Badge variant="outline">Bun</Badge>
              <Badge variant="outline">Prisma</Badge>
              <Badge variant="outline">Python</Badge>
            </div>
            <GradientColorText
              className="font-bold text-6xl"
              gradientColor="bg-linear-to-br from-[#a18cd1] to-[#fbc2eb]"
            >
              Made in China
            </GradientColorText>
          </div>
          {/* S */}
          <div className="mb-4">
            <h2 className="">Send me message</h2>
            <div></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
