import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPostMetas } from "@/lib/markdown";
import { Link } from "@/i18n/navigation";
import { Calendar, Tag } from "lucide-react";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const posts = getAllPostMetas();

  return (
    <section className="relative z-10 min-h-screen px-6 pt-28 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mb-12 text-lg">
          {posts.length > 0
            ? `${posts.length} articles`
            : t("comingSoon")}
        </p>

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-6 rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm hover:border-blue-500/20 hover:bg-background/60 transition-all">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    {post.tags.length > 0 && (
                      <span className="inline-flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5" />
                        {post.tags.map((tag, i) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg">{t("comingSoon")}</p>
        )}
      </div>
    </section>
  );
}
