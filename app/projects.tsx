import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  href: string;
}

function ProjectCard({ title, description, image, href }: ProjectCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg transition-shadow overflow-hidden">
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

export default function Projects() {
  const projects: ProjectCardProps[] = [
    {
      title: "Todo App",
      description: "Next.js 版复刻 Microsoft Todo",
      href: "https://github.com/avonyu/microsoft-todo",
    },
  ];

  return (
    <div id="projects" className="flex flex-col items-center px-4 py-8">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-4">
          All My Projects
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
