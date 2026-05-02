import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/project-card";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  href: string;
}

export default async function Projects() {
  const t = await getTranslations("Projects");

  const projects: ProjectCardProps[] = [
    {
      title: "Todo App",
      description: "The Next.js version replicates Microsoft Todo",
      href: "https://github.com/avonyu/microsoft-todo",
      // image: "/todo-app.png",
    },
  ];

  return (
    <div
      id="projects"
      className="relative z-10 flex flex-col items-center px-4 py-16"
    >
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
