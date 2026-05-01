import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  href: string;
}

function ProjectCard({ title, description, image, href }: ProjectCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg hover:border-blue-500/20 transition-all overflow-hidden relative z-10">
        {image && (
          <div className="relative w-full h-48">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default async function Projects() {
  const t = await getTranslations("Projects");

  const projects: ProjectCardProps[] = [
    {
      title: "Todo App",
      description: "Next.js 版复刻 Microsoft Todo",
      href: "https://github.com/avonyu/microsoft-todo",
    },
  ];

  return (
    <div id="projects" className="relative z-10 flex flex-col items-center px-4 py-16">
      <div className="max-w-4xl w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight mb-8">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
