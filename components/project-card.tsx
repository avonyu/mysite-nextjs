"use client";

import Link from "next/link";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  href: string;
}

export function ProjectCard({
  title,
  description,
  image,
  href,
}: ProjectCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        tiltReverse
        scale={1.02}
        transitionSpeed={600}
        perspective={700}
        className={cn(
          "relative shadow-lg h-64 rounded-xl",
          // "border border-border/40 bg-background/40 backdrop-blur-sm overflow-hidden",
          "border border-border/40 bg-background/40",
          "hover:shadow-xl hover:border-blue-500/20 transition-shadow",
          "transform-3d",
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-xl"
          />
        ) : (
          <div className="absolute rounded-xl inset-0 bg-linear-to-br from-blue-500/10 to-cyan-400/10" />
        )}
        <div
          className={cn(
            "translate-z-12",
            "absolute inset-x-0 bottom-0 p-6",
            // "bg-green-500/90"
            // "bg-linear-to-t from-background/90 via-background/60 to-transparent",
          )}
        >
          <div className="text-lg font-bold dark:text-white">{title}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {description}
          </div>
        </div>
      </Tilt>
    </Link>
  );
}
