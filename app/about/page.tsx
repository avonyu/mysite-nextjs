import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GradientColorText } from "@/components/gradient-color-text";

export default function AboutPage() {
  const stacks: Array<string> = [
    "Javascript",
    "Typescript",
    "React.js",
    "Next.js",
    "Node.js",
    "Bun",
    "Prisma",
    "Python",
  ];

  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-screen mx-10 md:mx-20">
        <div className="mt-30">
          <Avatar className="size-32 sm:size-32 md:size-52 lg:size-64">
            <AvatarImage src="/avatar.jpg" alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* TODO: 添加联系方式 */}
          <GradientColorText
            gradientColor="bg-linear-to-r from-[#2CD8D5] to-[#007adf] dark:from-[#009efd] dark:to-[#2af598]"
            className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 mb-5"
          >
            About Me
          </GradientColorText>
          <div className="mx-2 mb-4 md:text-xl max-w-4xl animate-fade-in-up dark:text-gray-300">
            <p className="mb-3">
              Hi, I’m Avon, a passionate full-stack engineer with a knack for
              turning creative ideas into robust, user-centric digital
              solutions.
            </p>
            <p className="mb-3">
              My tech stack spans front-end frameworks like React, Vue and
              Tailwind CSS, where I craft responsive, intuitive UIs that blend
              aesthetics with functionality. On the back end, I leverage
              Node.js, Express and PostgreSQL to build scalable APIs, optimize
              database performance and ensure seamless server-side operations. I
              also have hands-on experience with DevOps tools like Docker and
              Git, streamlining deployment workflows for faster, more reliable
              releases.
            </p>
            <p className="mb-3">
              Driven by curiosity, I thrive on solving complex problems and
              staying updated with emerging tech trends. When I’m not coding,
              you’ll find me contributing to open-source projects or
              experimenting with side projects that push my skills further.
              Let’s build something amazing together!
            </p>
          </div>
          {/* Sillls */}
          <div className="mb-4">
            <GradientColorText
              gradientColor="bg-linear-to-r from-[#2CD8D5] to-[#007adf] dark:from-[#009efd] dark:to-[#2af598]"
              className="text-xl md:text-2xl lg:text-4xl font-bold mb-4"
            >
              Skills
            </GradientColorText>
            <div className="flex gap-2 flex-wrap px-1 mx-2">
              {stacks.map((item, idx) => (
                <Badge key={idx}>{item}</Badge>
              ))}
            </div>
          </div>
          {/* S */}
          <div className="mb-4">
            <GradientColorText
              gradientColor="bg-linear-to-r from-[#2CD8D5] to-[#007adf] dark:from-[#009efd] dark:to-[#2af598]"
              className="text-xl md:text-2xl lg:text-4xl font-bold mb-4"
            >
              Send me message
            </GradientColorText>
            <div></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
