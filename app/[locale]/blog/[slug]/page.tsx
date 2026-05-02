import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/markdown";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="relative z-10 min-h-screen px-6 pt-28 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            {post.tags.length > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className={cn(
            // Base
            "prose prose-neutral dark:prose-invert prose-lg max-w-none",
            // Headings
            "prose-headings:font-bold prose-headings:tracking-tight",
            "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4",
            "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
            // Paragraph
            "prose-p:leading-relaxed",
            // Links
            "prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline",
            // Inline code
            "prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
            // Code blocks
            "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-xl",
            // Blockquote
            "prose-blockquote:border-l-blue-500 prose-blockquote:text-muted-foreground",
            // Images
            "prose-img:rounded-xl",
            // Lists
            "prose-li:leading-relaxed",
            // Tables
            "prose-table:border prose-table:rounded-lg",
            "prose-th:bg-muted prose-th:px-4 prose-th:py-2",
            "prose-td:px-4 prose-td:py-2",
          )}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}
